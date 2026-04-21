package com.railway.model;

public class Ticket {
    private String ticketId;
    private String passengerName;
    private int age;
    private String gender;
    private String from;
    private String to;
    private String trainNumber;
    private String trainName;
    private String travelDate;
    private String seatNumber;
    private String seatClass;
    private double fare;
    private String status;
    private String bookedOn;

    public Ticket() {}

    public Ticket(String ticketId, String passengerName, int age, String gender,
                  String from, String to, String trainNumber, String trainName,
                  String travelDate, String seatNumber, String seatClass,
                  double fare, String status, String bookedOn) {
        this.ticketId = ticketId;
        this.passengerName = passengerName;
        this.age = age;
        this.gender = gender;
        this.from = from;
        this.to = to;
        this.trainNumber = trainNumber;
        this.trainName = trainName;
        this.travelDate = travelDate;
        this.seatNumber = seatNumber;
        this.seatClass = seatClass;
        this.fare = fare;
        this.status = status;
        this.bookedOn = bookedOn;
    }

    public String getTicketId() { return ticketId; }
    public void setTicketId(String v) { ticketId = v; }
    public String getPassengerName() { return passengerName; }
    public void setPassengerName(String v) { passengerName = v; }
    public int getAge() { return age; }
    public void setAge(int v) { age = v; }
    public String getGender() { return gender; }
    public void setGender(String v) { gender = v; }
    public String getFrom() { return from; }
    public void setFrom(String v) { from = v; }
    public String getTo() { return to; }
    public void setTo(String v) { to = v; }
    public String getTrainNumber() { return trainNumber; }
    public void setTrainNumber(String v) { trainNumber = v; }
    public String getTrainName() { return trainName; }
    public void setTrainName(String v) { trainName = v; }
    public String getTravelDate() { return travelDate; }
    public void setTravelDate(String v) { travelDate = v; }
    public String getSeatNumber() { return seatNumber; }
    public void setSeatNumber(String v) { seatNumber = v; }
    public String getSeatClass() { return seatClass; }
    public void setSeatClass(String v) { seatClass = v; }
    public double getFare() { return fare; }
    public void setFare(double v) { fare = v; }
    public String getStatus() { return status; }
    public void setStatus(String v) { status = v; }
    public String getBookedOn() { return bookedOn; }
    public void setBookedOn(String v) { bookedOn = v; }
}
