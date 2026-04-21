package com.railway.dao;

import com.railway.model.Ticket;
import com.railway.model.Train;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

public class RailwayDAO {

    private static final Map<String, Ticket> ticketStore = new LinkedHashMap<>();
    private static final Map<String, Train> trainStore = new LinkedHashMap<>();
    private static final Map<String, Set<String>> bookedSeats = new HashMap<>();
    private static int ticketCounter = 2000;

    static {
        init();
    }

    private static void init() {
        addTrain(new Train("12301", "Rajdhani Express",     "New Delhi",  "Mumbai Central", "16:25", "08:35", "16h 10m", 72, 72, 1455, "PREMIUM"));
        addTrain(new Train("12302", "Shatabdi Express",     "Mumbai",     "Pune",           "07:30", "10:10", "2h 40m",  50, 50, 395,  "EXPRESS"));
        addTrain(new Train("12303", "Duronto Express",      "New Delhi",  "Kolkata",        "08:15", "06:30", "22h 15m", 60, 60, 1620, "SUPERFAST"));
        addTrain(new Train("12304", "Garib Rath",           "Chennai",    "Bangalore",      "09:00", "14:20", "5h 20m",  70, 70, 480,  "EXPRESS"));
        addTrain(new Train("12305", "Vande Bharat Exp",     "Hyderabad",  "New Delhi",      "05:55", "22:30", "16h 35m", 80, 80, 2150, "PREMIUM"));
        addTrain(new Train("12306", "Tejas Express",        "Mumbai",     "Ahmedabad",      "06:40", "12:50", "6h 10m",  64, 64, 720,  "PREMIUM"));
        addTrain(new Train("12307", "Karnataka Express",    "Bangalore",  "New Delhi",      "18:45", "06:15", "35h 30m", 72, 72, 1890, "SUPERFAST"));
        addTrain(new Train("12308", "Humsafar Express",     "Lucknow",    "Mumbai",         "11:25", "15:40", "28h 15m", 60, 60, 1120, "EXPRESS"));

        for (String id : trainStore.keySet()) {
            bookedSeats.put(id, new HashSet<>());
        }
    }

    private static void addTrain(Train t) {
        trainStore.put(t.getTrainNumber(), t);
    }

    public List<Train> getAllTrains() {
        return new ArrayList<>(trainStore.values());
    }

    public List<Train> searchTrains(String from, String to) {
        return trainStore.values().stream()
            .filter(t -> t.getFrom().equalsIgnoreCase(from) && t.getTo().equalsIgnoreCase(to))
            .collect(Collectors.toList());
    }

    public Train getTrainByNumber(String num) {
        return trainStore.get(num);
    }

    public Map<String, String> getSeatMap(String trainNumber) {
        Train train = trainStore.get(trainNumber);
        if (train == null) return null;
        Set<String> booked = bookedSeats.getOrDefault(trainNumber, new HashSet<>());
        Map<String, String> seats = new LinkedHashMap<>();
        for (int i = 1; i <= train.getTotalSeats(); i++) {
            String s = String.format("S%02d", i);
            seats.put(s, booked.contains(s) ? "BOOKED" : "AVAILABLE");
        }
        return seats;
    }

    public Ticket bookTicket(String name, int age, String gender, String trainNumber,
                             String date, String seatClass) {
        Train train = trainStore.get(trainNumber);
        if (train == null || train.getAvailableSeats() <= 0) return null;

        Set<String> booked = bookedSeats.getOrDefault(trainNumber, new HashSet<>());
        String seatNumber = null;
        for (int i = 1; i <= train.getTotalSeats(); i++) {
            String c = String.format("S%02d", i);
            if (!booked.contains(c)) { seatNumber = c; break; }
        }
        if (seatNumber == null) return null;

        double fare = train.getBaseFare();
        switch (seatClass) {
            case "AC First Class": fare *= 2.8; break;
            case "AC 2-Tier":      fare *= 2.0; break;
            case "AC 3-Tier":      fare *= 1.5; break;
            case "Sleeper":        fare *= 1.0; break;
            default:               fare *= 0.7; break;
        }
        fare = Math.round(fare * 100.0) / 100.0;

        String ticketId = "PNR" + (++ticketCounter);
        String bookedOn = LocalDate.now().toString();

        Ticket t = new Ticket(ticketId, name, age, gender,
                train.getFrom(), train.getTo(),
                trainNumber, train.getTrainName(),
                date, seatNumber, seatClass, fare, "CONFIRMED", bookedOn);

        ticketStore.put(ticketId, t);
        booked.add(seatNumber);
        bookedSeats.put(trainNumber, booked);
        train.setAvailableSeats(train.getAvailableSeats() - 1);
        return t;
    }

    public boolean cancelTicket(String ticketId) {
        Ticket t = ticketStore.get(ticketId);
        if (t == null || "CANCELLED".equals(t.getStatus())) return false;
        t.setStatus("CANCELLED");
        Set<String> booked = bookedSeats.getOrDefault(t.getTrainNumber(), new HashSet<>());
        booked.remove(t.getSeatNumber());
        Train train = trainStore.get(t.getTrainNumber());
        if (train != null) train.setAvailableSeats(train.getAvailableSeats() + 1);
        return true;
    }

    public Ticket getTicket(String ticketId) {
        return ticketStore.get(ticketId);
    }

    public List<Ticket> getAllTickets() {
        return new ArrayList<>(ticketStore.values());
    }

    public List<String> getStations() {
        Set<String> stations = new LinkedHashSet<>();
        trainStore.values().forEach(t -> { stations.add(t.getFrom()); stations.add(t.getTo()); });
        return new ArrayList<>(stations);
    }
}
