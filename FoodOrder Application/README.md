# 🍴 ForkIt — Food Ordering Mini Project

A complete food ordering web app with a polished HTML/CSS/JS frontend and a Java Spring Boot REST API backend.

---

## 📁 Project Structure

```
food-order/
├── index.html          ← Home: restaurants list, menu, cart, checkout
├── orders.html         ← Orders tracker with status updates
├── styles.css          ← All styles (warm editorial theme)
├── script.js           ← Frontend logic (cart, orders, modals)
└── java/
    ├── pom.xml
    └── src/main/java/com/forkit/
        ├── ForkItApplication.java      ← Spring Boot entry point
        ├── model/
        │   └── Order.java              ← Order + OrderItem + CustomerInfo
        ├── repository/
        │   └── OrderRepository.java    ← In-memory store (ConcurrentHashMap)
        ├── service/
        │   └── OrderService.java       ← Business logic + status transitions
        └── controller/
            └── OrderController.java    ← REST endpoints
```

---

## 🚀 Running the Frontend

Just open `index.html` in your browser — no server needed.
The frontend uses `localStorage` to persist orders by default.

---

## ☕ Running the Java Backend

### Prerequisites
- Java 17+
- Maven 3.8+

### Steps

```bash
cd food-order/java
mvn spring-boot:run
```

Server starts at: **http://localhost:8080**

---

## 🔌 API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| `GET` | `/api/orders` | List all orders |
| `GET` | `/api/orders?status=PENDING` | Filter by status |
| `GET` | `/api/orders?restaurantId=1` | Filter by restaurant |
| `GET` | `/api/orders/stats` | Dashboard stats |
| `GET` | `/api/orders/{id}` | Get single order |
| `POST` | `/api/orders` | Place new order |
| `PATCH` | `/api/orders/{id}/status` | Update status |
| `DELETE` | `/api/orders/{id}` | Delete order |

### Example: Place Order

```bash
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "restaurantId": 4,
    "restaurantName": "Spice Garden",
    "items": [
      {"itemId": 404, "itemName": "Butter Chicken", "quantity": 2, "price": 360},
      {"itemId": 409, "itemName": "Garlic Naan", "quantity": 4, "price": 80}
    ],
    "customer": {
      "name": "Priya Sharma",
      "phone": "9876543210",
      "address": "12 MG Road, Bangalore"
    },
    "paymentMethod": "UPI"
  }'
```

### Example: Update Status

```bash
curl -X PATCH http://localhost:8080/api/orders/FRK123456/status \
  -H "Content-Type: application/json" \
  -d '{"status": "PREPARING"}'
```

### Valid Status Transitions

```
PENDING → PREPARING → OUT_FOR_DELIVERY → DELIVERED
   ↓           ↓              ↓
CANCELLED   CANCELLED    CANCELLED
```

---

## 🔗 Connecting Frontend to Java Backend

In `script.js`, replace the simulation functions with real fetch calls:

```javascript
// Place order
const res = await fetch('http://localhost:8080/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(orderPayload)
});
const data = await res.json();

// Update status
await fetch(`http://localhost:8080/api/orders/${orderId}/status`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ status: newStatus })
});
```

---

## 🛠 Features

### Frontend
- 6 restaurants across 6 cuisines with full menus
- Real-time cart with quantity controls
- Checkout form with payment method selection
- Order tracking page with status filter
- Status update dropdown per order
- Order detail modal with timeline
- Search + cuisine filter
- Fully responsive design

### Java Backend
- Spring Boot REST API
- In-memory order store (swap for H2/MySQL easily)
- Status transition validation
- Computed totals server-side
- CORS enabled for local dev
- Dashboard stats endpoint
