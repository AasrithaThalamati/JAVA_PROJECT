package com.railway.model;

public class Train {
    private String trainNumber;
    private String trainName;
    private String from;
    private String to;
    private String departureTime;
    private String arrivalTime;
    private String duration;
    private int totalSeats;
    private int availableSeats;
    private double baseFare;
    private String type; // EXPRESS, SUPERFAST, PREMIUM

    public Train() {}

    public Train(String trainNumber, String trainName, String from, String to,
                 String departureTime, String arrivalTime, String duration,
                 int totalSeats, int availableSeats, double baseFare, String type) {
        this.trainNumber = trainNumber;
        this.trainName = trainName;
        this.from = from;
        this.to = to;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.duration = duration;
        this.totalSeats = totalSeats;
        this.availableSeats = availableSeats;
        this.baseFare = baseFare;
        this.type = type;
    }

    public String getTrainNumber() { return trainNumber; }
    public void setTrainNumber(String v) { trainNumber = v; }
    public String getTrainName() { return trainName; }
    public void setTrainName(String v) { trainName = v; }
    public String getFrom() { return from; }
    public void setFrom(String v) { from = v; }
    public String getTo() { return to; }
    public void setTo(String v) { to = v; }
    public String getDepartureTime() { return departureTime; }
    public void setDepartureTime(String v) { departureTime = v; }
    public String getArrivalTime() { return arrivalTime; }
    public void setArrivalTime(String v) { arrivalTime = v; }
    public String getDuration() { return duration; }
    public void setDuration(String v) { duration = v; }
    public int getTotalSeats() { return totalSeats; }
    public void setTotalSeats(int v) { totalSeats = v; }
    public int getAvailableSeats() { return availableSeats; }
    public void setAvailableSeats(int v) { availableSeats = v; }
    public double getBaseFare() { return baseFare; }
    public void setBaseFare(double v) { baseFare = v; }
    public String getType() { return type; }
    public void setType(String v) { type = v; }
}
