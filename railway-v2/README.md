# 🚂 RailConnect Pro — Railway Reservation System v2

A **premium full-stack Java web application** for Indian Railway reservations.  
Deep navy + gold luxury design · Glassmorphism · Animated UI · Full booking workflow

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Java 11 · Servlets · Gson |
| Frontend | HTML5 · CSS3 · Vanilla JS |
| Build | Maven 3.6+ |
| Server | Apache Tomcat 9/10 |

---

## Project Structure

```
railconnect-pro/
├── pom.xml
├── src/main/
│   ├── java/com/railway/
│   │   ├── model/
│   │   │   ├── Ticket.java
│   │   │   └── Train.java
│   │   ├── dao/
│   │   │   └── RailwayDAO.java       ← In-memory data + logic
│   │   └── servlet/
│   │       ├── BookTicketServlet.java
│   │       ├── CancelTicketServlet.java
│   │       ├── ViewSeatsServlet.java
│   │       └── CORSFilter.java
│   └── webapp/
│       ├── index.html                ← Main UI
│       ├── css/style.css
│       ├── js/app.js
│       └── WEB-INF/web.xml
```

---

## Quick Start

### Option 1 — Embedded Tomcat (Easiest)

```bash
# Open terminal in VS Code (Ctrl + `)
cd railconnect-pro
mvn tomcat7:run

# Open: http://localhost:8080/railconnect/
```

### Option 2 — Deploy to external Tomcat

```bash
mvn clean package
cp target/railconnect-pro-2.0.0.war /path/to/tomcat/webapps/railconnect.war
# Start Tomcat → http://localhost:8080/railconnect/
```

---

## VS Code Setup

1. Install **Extension Pack for Java** (Microsoft)
2. Open folder in VS Code: `File → Open Folder → railconnect-pro`
3. Open Terminal: `Ctrl + `` ` 
4. Run: `mvn tomcat7:run`
5. Open browser: `http://localhost:8080/railconnect/`

---

## Pre-loaded Trains

| # | Train | Route | Base Fare |
|---|-------|-------|-----------|
| 12301 | Rajdhani Express | New Delhi → Mumbai | ₹1,455 |
| 12302 | Shatabdi Express | Mumbai → Pune | ₹395 |
| 12303 | Duronto Express | New Delhi → Kolkata | ₹1,620 |
| 12304 | Garib Rath | Chennai → Bangalore | ₹480 |
| 12305 | Vande Bharat Exp | Hyderabad → New Delhi | ₹2,150 |
| 12306 | Tejas Express | Mumbai → Ahmedabad | ₹720 |
| 12307 | Karnataka Express | Bangalore → New Delhi | ₹1,890 |
| 12308 | Humsafar Express | Lucknow → Mumbai | ₹1,120 |

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/railconnect/api/book?from=X&to=Y` | Search trains |
| POST | `/railconnect/api/book` | Book ticket |
| GET | `/railconnect/api/cancel?ticketId=PNR2001` | Get ticket |
| POST | `/railconnect/api/cancel` | Cancel ticket |
| GET | `/railconnect/api/seats` | All trains |
| GET | `/railconnect/api/seats?trainNumber=12301` | Seat map |

---

## Features

- **Book Ticket** — Search by route, view train details, select class with dynamic fare preview, passenger form, confirmation receipt with printable ticket
- **Cancel Ticket** — PNR lookup, full ticket preview, cancellation with refund notice
- **View Seats** — Visual seat grid with availability stats (💺 available / 🚫 booked)
- Animated background, sticky header with live clock, toast notifications, responsive design
