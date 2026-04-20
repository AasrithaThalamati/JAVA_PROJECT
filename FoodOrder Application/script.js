// =============================================
// ForkIt — script.js
// Full frontend logic (matches Java backend API)
// =============================================

// ---- DATA ----
const RESTAURANTS = [
    {
      id: 1, name: "Bella Napoli", cuisine: "Italian",
      emoji: "🍕", rating: 4.7, deliveryTime: "25-35 min",
      priceRange: "₹₹", tags: ["Pizza", "Pasta", "Risotto"],
      color: "#e85d26",
      menu: {
        "Starters": [
          { id: 101, name: "Bruschetta al Pomodoro", desc: "Toasted bread with fresh tomatoes, basil, olive oil", price: 180, emoji: "🥖" },
          { id: 102, name: "Arancini", desc: "Crispy fried rice balls stuffed with mozzarella", price: 220, emoji: "🟡" },
        ],
        "Mains": [
          { id: 103, name: "Margherita Pizza", desc: "San Marzano tomato, fresh mozzarella, basil", price: 350, emoji: "🍕" },
          { id: 104, name: "Spaghetti Carbonara", desc: "Egg yolk, guanciale, pecorino romano, black pepper", price: 380, emoji: "🍝" },
          { id: 105, name: "Penne Arrabiata", desc: "Spicy tomato sauce, garlic, chili flakes", price: 320, emoji: "🍝" },
          { id: 106, name: "Mushroom Risotto", desc: "Arborio rice, porcini mushrooms, parmesan", price: 420, emoji: "🍚" },
        ],
        "Desserts": [
          { id: 107, name: "Tiramisu", desc: "Espresso-soaked ladyfingers, mascarpone cream", price: 220, emoji: "🍮" },
          { id: 108, name: "Panna Cotta", desc: "Vanilla cream with berry coulis", price: 190, emoji: "🍮" },
        ]
      }
    },
    {
      id: 2, name: "Dragon Wok", cuisine: "Asian",
      emoji: "🍜", rating: 4.5, deliveryTime: "20-30 min",
      priceRange: "₹", tags: ["Noodles", "Dim Sum", "Wok"],
      color: "#c0392b",
      menu: {
        "Dim Sum": [
          { id: 201, name: "Steamed Har Gow", desc: "Shrimp dumplings in delicate rice flour wrapper", price: 240, emoji: "🥟" },
          { id: 202, name: "Pork Siu Mai", desc: "Open-top pork & shrimp dumplings", price: 220, emoji: "🥟" },
        ],
        "Noodles & Rice": [
          { id: 203, name: "Dan Dan Noodles", desc: "Spicy Sichuan noodles with minced pork", price: 290, emoji: "🍜" },
          { id: 204, name: "Fried Rice Special", desc: "Wok-fried rice with egg, vegetables, soy sauce", price: 260, emoji: "🍳" },
          { id: 205, name: "Pad Thai", desc: "Rice noodles, tamarind sauce, peanuts, bean sprouts", price: 310, emoji: "🍜" },
        ],
        "Soups": [
          { id: 206, name: "Hot & Sour Soup", desc: "Tofu, mushrooms, bamboo shoots, egg ribbon", price: 180, emoji: "🍲" },
          { id: 207, name: "Tom Yum Goong", desc: "Spicy lemongrass broth with prawns", price: 280, emoji: "🦐" },
        ]
      }
    },
    {
      id: 3, name: "Casa Mexico", cuisine: "Mexican",
      emoji: "🌮", rating: 4.6, deliveryTime: "25-40 min",
      priceRange: "₹₹", tags: ["Tacos", "Burritos", "Guacamole"],
      color: "#27ae60",
      menu: {
        "Starters": [
          { id: 301, name: "Guacamole & Chips", desc: "Fresh avocado, lime, cilantro, jalapeño with tortilla chips", price: 200, emoji: "🥑" },
          { id: 302, name: "Queso Fundido", desc: "Melted chorizo and cheese dip", price: 240, emoji: "🧀" },
        ],
        "Tacos": [
          { id: 303, name: "Al Pastor Tacos", desc: "Marinated pork, pineapple, onion, cilantro (3 pcs)", price: 320, emoji: "🌮" },
          { id: 304, name: "Carnitas Tacos", desc: "Slow-cooked pork carnitas, lime, salsa verde (3 pcs)", price: 340, emoji: "🌮" },
          { id: 305, name: "Veg Tacos", desc: "Roasted peppers, black beans, corn, queso (3 pcs)", price: 280, emoji: "🌮" },
        ],
        "Burritos": [
          { id: 306, name: "Chicken Burrito", desc: "Grilled chicken, rice, beans, guac, salsa", price: 390, emoji: "🌯" },
          { id: 307, name: "Beef Burrito", desc: "Spiced beef, rice, beans, sour cream, cheese", price: 420, emoji: "🌯" },
        ]
      }
    },
    {
      id: 4, name: "Spice Garden", cuisine: "Indian",
      emoji: "🍛", rating: 4.8, deliveryTime: "30-45 min",
      priceRange: "₹₹", tags: ["Curry", "Tandoor", "Biryani"],
      color: "#f39c12",
      menu: {
        "Appetizers": [
          { id: 401, name: "Samosa (2 pcs)", desc: "Crispy pastry filled with spiced potatoes and peas", price: 120, emoji: "🥟" },
          { id: 402, name: "Tandoori Chicken", desc: "Half chicken marinated in yogurt and spices, grilled in clay oven", price: 380, emoji: "🍗" },
          { id: 403, name: "Paneer Tikka", desc: "Cottage cheese cubes marinated in spices, char-grilled", price: 320, emoji: "🧀" },
        ],
        "Curries": [
          { id: 404, name: "Butter Chicken", desc: "Tender chicken in creamy tomato-based curry", price: 360, emoji: "🍛" },
          { id: 405, name: "Dal Makhani", desc: "Slow-cooked black lentils, butter, cream", price: 280, emoji: "🫘" },
          { id: 406, name: "Palak Paneer", desc: "Cottage cheese in spiced spinach gravy", price: 300, emoji: "🥬" },
          { id: 407, name: "Rogan Josh", desc: "Slow-cooked lamb in Kashmiri spices", price: 440, emoji: "🍖" },
        ],
        "Rice & Bread": [
          { id: 408, name: "Chicken Biryani", desc: "Fragrant basmati rice layered with spiced chicken", price: 420, emoji: "🍚" },
          { id: 409, name: "Garlic Naan", desc: "Soft leavened bread with garlic butter", price: 80, emoji: "🫓" },
          { id: 410, name: "Jeera Rice", desc: "Basmati rice tempered with cumin seeds", price: 150, emoji: "🍚" },
        ]
      }
    },
    {
      id: 5, name: "The Burger Lab", cuisine: "American",
      emoji: "🍔", rating: 4.4, deliveryTime: "20-30 min",
      priceRange: "₹", tags: ["Burgers", "Fries", "Shakes"],
      color: "#e74c3c",
      menu: {
        "Burgers": [
          { id: 501, name: "Classic Smash Burger", desc: "Double smashed beef patty, american cheese, pickles, special sauce", price: 340, emoji: "🍔" },
          { id: 502, name: "BBQ Bacon Burger", desc: "Beef patty, crispy bacon, bbq sauce, coleslaw", price: 380, emoji: "🍔" },
          { id: 503, name: "Crispy Chicken Burger", desc: "Fried chicken fillet, sriracha mayo, lettuce, pickles", price: 320, emoji: "🍗" },
          { id: 504, name: "Mushroom Swiss Burger", desc: "Beef patty, sautéed mushrooms, swiss cheese, truffle aioli", price: 360, emoji: "🍔" },
          { id: 505, name: "Veggie Burger", desc: "Black bean patty, avocado, tomato, lettuce, chipotle", price: 280, emoji: "🌿" },
        ],
        "Sides": [
          { id: 506, name: "Loaded Fries", desc: "Crispy fries, cheese sauce, jalapeños, ranch", price: 200, emoji: "🍟" },
          { id: 507, name: "Onion Rings", desc: "Beer-battered thick-cut onion rings", price: 160, emoji: "🍩" },
        ],
        "Shakes": [
          { id: 508, name: "Classic Vanilla Shake", desc: "Creamy hand-spun vanilla milkshake", price: 190, emoji: "🥛" },
          { id: 509, name: "Oreo Blast Shake", desc: "Thick Oreo cookie milkshake with whipped cream", price: 220, emoji: "🍦" },
        ]
      }
    },
    {
      id: 6, name: "Sweet Bliss", cuisine: "Desserts",
      emoji: "🍰", rating: 4.9, deliveryTime: "15-25 min",
      priceRange: "₹₹", tags: ["Cakes", "Waffles", "Ice Cream"],
      color: "#9b59b6",
      menu: {
        "Cakes & Pastries": [
          { id: 601, name: "Chocolate Lava Cake", desc: "Warm chocolate cake with molten center, vanilla ice cream", price: 280, emoji: "🍫" },
          { id: 602, name: "New York Cheesecake", desc: "Classic dense creamy cheesecake with berry compote", price: 320, emoji: "🍰" },
          { id: 603, name: "Belgian Waffle", desc: "Crispy waffle with fresh fruit, whipped cream, maple syrup", price: 250, emoji: "🧇" },
        ],
        "Ice Cream": [
          { id: 604, name: "Sundae Deluxe", desc: "3 scoops ice cream, hot fudge, nuts, cherry, whipped cream", price: 310, emoji: "🍨" },
          { id: 605, name: "Mango Sorbet", desc: "Fresh mango sorbet, chili lime dust", price: 180, emoji: "🥭" },
        ],
        "Hot Drinks": [
          { id: 606, name: "Affogato", desc: "Vanilla ice cream shot with hot espresso", price: 200, emoji: "☕" },
          { id: 607, name: "Hot Chocolate", desc: "Rich Belgian dark chocolate with marshmallows", price: 160, emoji: "☕" },
        ]
      }
    }
  ];
  
  // ---- STATE ----
  let cart = [];  // [{item, restaurantId, restaurantName, qty}]
  let currentRestaurant = null;
  let currentCuisineFilter = 'All';
  let activeMenuCategory = null;
  
  // ---- INIT ----
  document.addEventListener('DOMContentLoaded', () => {
    renderRestaurants();
    updateCartUI();
  });
  
  // =====================
  // RESTAURANTS
  // =====================
  function renderRestaurants(filter = '') {
    const grid = document.getElementById('restaurantGrid');
    if (!grid) return;
    const search = filter || (document.getElementById('searchInput')?.value || '').toLowerCase();
    const filtered = RESTAURANTS.filter(r => {
      const matchesCuisine = currentCuisineFilter === 'All' || r.cuisine === currentCuisineFilter;
      const matchesSearch = !search || r.name.toLowerCase().includes(search) ||
        r.cuisine.toLowerCase().includes(search) ||
        r.tags.some(t => t.toLowerCase().includes(search));
      return matchesCuisine && matchesSearch;
    });
  
    if (filtered.length === 0) {
      grid.innerHTML = `<div class="no-orders" style="grid-column:1/-1">
        <div class="icon">🔍</div><p>No restaurants found. Try a different search.</p>
      </div>`;
      return;
    }
  
    grid.innerHTML = filtered.map(r => `
      <div class="restaurant-card" onclick="openMenu(${r.id})">
        <div class="rest-banner" style="background:${r.color}22;">
          <span>${r.emoji}</span>
          <span class="rest-badge">${r.deliveryTime}</span>
        </div>
        <div class="rest-info">
          <h3>${r.name}</h3>
          <div class="rest-meta">
            <span class="rating">★ ${r.rating}</span>
            <span>${r.priceRange}</span>
            <span>${r.cuisine}</span>
          </div>
          <div class="rest-tags">
            ${r.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
          <button class="open-menu-btn">View Menu →</button>
        </div>
      </div>
    `).join('');
  }
  
  function filterRestaurants() { renderRestaurants(); }
  
  function setCuisine(cuisine, btn) {
    currentCuisineFilter = cuisine;
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    renderRestaurants();
  }
  
  // =====================
  // MENU MODAL
  // =====================
  function openMenu(restaurantId) {
    const r = RESTAURANTS.find(x => x.id === restaurantId);
    if (!r) return;
    currentRestaurant = r;
    activeMenuCategory = null;
  
    document.getElementById('modalHeader').innerHTML = `
      <h2>${r.emoji} ${r.name}</h2>
      <p>★ ${r.rating} &nbsp;|&nbsp; ${r.deliveryTime} &nbsp;|&nbsp; ${r.priceRange}</p>
    `;
  
    const categories = Object.keys(r.menu);
    document.getElementById('menuCategories').innerHTML = categories.map((cat, i) => `
      <button class="menu-cat-btn ${i === 0 ? 'active' : ''}" onclick="filterMenuCategory('${cat}', this)">${cat}</button>
    `).join('');
  
    renderMenuItems(null);
    updateModalCartCount();
    document.getElementById('menuModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  
  function closeMenu() {
    document.getElementById('menuModal').classList.remove('open');
    document.body.style.overflow = '';
  }
  
  function filterMenuCategory(cat, btn) {
    document.querySelectorAll('.menu-cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeMenuCategory = cat;
    renderMenuItems(cat);
  }
  
  function renderMenuItems(categoryFilter) {
    const r = currentRestaurant;
    const container = document.getElementById('menuItems');
    let html = '';
    Object.entries(r.menu).forEach(([cat, items]) => {
      if (categoryFilter && cat !== categoryFilter) return;
      html += `<div class="menu-section-title">${cat}</div>`;
      items.forEach(item => {
        const cartItem = cart.find(c => c.item.id === item.id);
        const qty = cartItem ? cartItem.qty : 0;
        html += `
          <div class="menu-item" id="menu-item-${item.id}">
            <span class="item-emoji">${item.emoji}</span>
            <div class="item-info">
              <h4>${item.name}</h4>
              <p>${item.desc}</p>
              <div class="item-price">₹${item.price}</div>
            </div>
            <div class="item-actions">
              ${qty > 0 ? `
                <div style="display:flex;align-items:center;gap:0.4rem">
                  <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
                  <span class="qty-display">${qty}</span>
                  <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                </div>
              ` : `
                <button class="add-btn" onclick="addToCart(${item.id})">+ Add</button>
              `}
            </div>
          </div>
        `;
      });
    });
    container.innerHTML = html;
  }
  
  // =====================
  // CART LOGIC
  // =====================
  function addToCart(itemId) {
    const item = findItemById(itemId);
    if (!item) return;
  
    // Only one restaurant at a time
    if (cart.length > 0 && cart[0].restaurantId !== currentRestaurant.id) {
      if (!confirm(`Your cart has items from ${cart[0].restaurantName}. Start a new cart from ${currentRestaurant.name}?`)) return;
      cart = [];
    }
  
    const existing = cart.find(c => c.item.id === itemId);
    if (existing) existing.qty++;
    else cart.push({ item, restaurantId: currentRestaurant.id, restaurantName: currentRestaurant.name, qty: 1 });
  
    updateCartUI();
    refreshMenuItemRow(itemId);
  }
  
  function changeQty(itemId, delta) {
    const idx = cart.findIndex(c => c.item.id === itemId);
    if (idx === -1) return;
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);
    updateCartUI();
    refreshMenuItemRow(itemId);
  }
  
  function refreshMenuItemRow(itemId) {
    if (!currentRestaurant) return;
    const cartItem = cart.find(c => c.item.id === itemId);
    const qty = cartItem ? cartItem.qty : 0;
    const row = document.getElementById(`menu-item-${itemId}`);
    if (!row) return;
    const actionsDiv = row.querySelector('.item-actions');
    actionsDiv.innerHTML = qty > 0 ? `
      <div style="display:flex;align-items:center;gap:0.4rem">
        <button class="qty-btn" onclick="changeQty(${itemId}, -1)">−</button>
        <span class="qty-display">${qty}</span>
        <button class="qty-btn" onclick="changeQty(${itemId}, 1)">+</button>
      </div>
    ` : `<button class="add-btn" onclick="addToCart(${itemId})">+ Add</button>`;
  }
  
  function findItemById(itemId) {
    for (const r of RESTAURANTS) {
      for (const items of Object.values(r.menu)) {
        const found = items.find(i => i.id === itemId);
        if (found) return found;
      }
    }
    return null;
  }
  
  function updateCartUI() {
    const total = cart.reduce((s, c) => s + c.item.price * c.qty, 0);
    const count = cart.reduce((s, c) => s + c.qty, 0);
  
    // Count badge
    const countEl = document.getElementById('cartCount');
    if (countEl) countEl.textContent = count;
    updateModalCartCount();
  
    // Cart items
    const itemsEl = document.getElementById('cartItems');
    const summaryEl = document.getElementById('cartSummary');
    if (!itemsEl) return;
  
    if (cart.length === 0) {
      itemsEl.innerHTML = '<div class="empty-cart">Your cart is empty 🛒</div>';
      if (summaryEl) summaryEl.style.display = 'none';
      return;
    }
  
    itemsEl.innerHTML = cart.map(c => `
      <div class="cart-item">
        <span class="cart-item-emoji">${c.item.emoji}</span>
        <div class="cart-item-info">
          <div class="name">${c.item.name}</div>
          <div class="rest">${c.restaurantName}</div>
          <div class="price">₹${c.item.price} × ${c.qty} = ₹${c.item.price * c.qty}</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${c.item.id}, -1)">−</button>
          <span class="qty-display">${c.qty}</span>
          <button class="qty-btn" onclick="changeQty(${c.item.id}, 1)">+</button>
        </div>
      </div>
    `).join('');
  
    if (summaryEl) {
      summaryEl.style.display = 'block';
      document.getElementById('subtotal').textContent = `₹${total}`;
      document.getElementById('totalAmount').textContent = `₹${total + 30}`;
    }
  }
  
  function updateModalCartCount() {
    const count = cart.reduce((s, c) => s + c.qty, 0);
    const el = document.getElementById('modalCartCount');
    if (el) el.textContent = count;
  }
  
  // =====================
  // CART DRAWER
  // =====================
  function openCart() {
    document.getElementById('cartDrawer')?.classList.add('open');
    document.getElementById('cartOverlay')?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    document.getElementById('cartDrawer')?.classList.remove('open');
    document.getElementById('cartOverlay')?.classList.remove('open');
    document.body.style.overflow = '';
  }
  
  // =====================
  // CHECKOUT
  // =====================
  function openCheckout() {
    closeCart();
    const total = cart.reduce((s, c) => s + c.item.price * c.qty, 0) + 30;
    const el = document.getElementById('checkoutTotal');
    if (el) el.textContent = `₹${total}`;
    document.getElementById('checkoutModal')?.classList.add('open');
  }
  function closeCheckout() {
    document.getElementById('checkoutModal')?.classList.remove('open');
  }
  
  function placeOrder() {
    const name = document.getElementById('custName')?.value.trim();
    const phone = document.getElementById('custPhone')?.value.trim();
    const address = document.getElementById('custAddress')?.value.trim();
    const payment = document.querySelector('input[name="pay"]:checked')?.value;
  
    if (!name || !phone || !address) {
      alert('Please fill in all delivery details!');
      return;
    }
  
    const orderId = 'FRK' + Date.now().toString().slice(-6);
    const total = cart.reduce((s, c) => s + c.item.price * c.qty, 0) + 30;
  
    const order = {
      id: orderId,
      restaurantId: cart[0]?.restaurantId,
      restaurantName: cart[0]?.restaurantName || 'Restaurant',
      items: cart.map(c => ({ ...c })),
      customer: { name, phone, address },
      payment,
      subtotal: total - 30,
      deliveryFee: 30,
      total,
      status: 'Pending',
      placedAt: new Date().toISOString(),
      statusHistory: [{ status: 'Pending', time: new Date().toISOString() }]
    };
  
    // Save to localStorage (acts as local DB; Java backend would persist to DB)
    const orders = getOrders();
    orders.unshift(order);
    localStorage.setItem('forkitOrders', JSON.stringify(orders));
  
    // Clear cart
    cart = [];
    updateCartUI();
    closeCheckout();
    closeMenu();
  
    // Show success
    document.getElementById('displayOrderId').textContent = orderId;
    document.getElementById('successMsg').textContent = `Your order from ${order.restaurantName} has been placed!`;
    document.getElementById('successModal')?.classList.add('open');
  
    // Simulate Java backend API call
    simulateBackendPlaceOrder(order);
  }
  
  function closeSuccess() {
    document.getElementById('successModal')?.classList.remove('open');
    document.body.style.overflow = '';
  }
  
  function viewOrders() {
    closeSuccess();
    window.location.href = 'orders.html';
  }
  
  // =====================
  // ORDERS PAGE
  // =====================
  function getOrders() {
    try { return JSON.parse(localStorage.getItem('forkitOrders') || '[]'); }
    catch { return []; }
  }
  
  let ordersFilterStatus = 'All';
  
  function renderOrders() {
    const list = document.getElementById('ordersList');
    if (!list) return;
    let orders = getOrders();
    if (ordersFilterStatus !== 'All') {
      orders = orders.filter(o => o.status === ordersFilterStatus);
    }
  
    if (orders.length === 0) {
      list.innerHTML = `<div class="no-orders">
        <div class="icon">📋</div>
        <p>${ordersFilterStatus !== 'All' ? `No ${ordersFilterStatus} orders.` : "You haven't placed any orders yet."}</p>
      </div>`;
      return;
    }
  
    list.innerHTML = orders.map(order => `
      <div class="order-card" id="order-${order.id}">
        <div class="order-card-top">
          <div>
            <div class="order-id">Order #${order.id}</div>
            <div class="order-rest">${order.restaurantName}</div>
            <div class="order-date">${formatDate(order.placedAt)}</div>
          </div>
          <span class="status-badge status-${order.status.replace(/\s/g, '-')}">${order.status}</span>
        </div>
        <div class="order-items-preview">
          ${order.items.map(i => `<span class="order-item-tag">${i.item.emoji} ${i.item.name} ×${i.qty}</span>`).join('')}
        </div>
        <div class="order-card-footer">
          <div class="order-total">₹${order.total}</div>
          <div class="order-actions">
            <button class="btn-detail" onclick="openOrderDetail('${order.id}')">Details</button>
            <select class="status-select" onchange="updateOrderStatus('${order.id}', this.value)" ${order.status === 'Delivered' || order.status === 'Cancelled' ? 'disabled' : ''}>
              <option value="">Update Status</option>
              <option value="Pending" ${order.status==='Pending'?'selected':''}>Pending</option>
              <option value="Preparing" ${order.status==='Preparing'?'selected':''}>Preparing</option>
              <option value="Out for Delivery" ${order.status==='Out for Delivery'?'selected':''}>Out for Delivery</option>
              <option value="Delivered" ${order.status==='Delivered'?'selected':''}>Delivered</option>
              <option value="Cancelled" ${order.status==='Cancelled'?'selected':''}>Cancel</option>
            </select>
            ${order.status !== 'Delivered' && order.status !== 'Cancelled' ?
              `<button class="btn-cancel" onclick="cancelOrder('${order.id}')">✕ Cancel</button>` : ''
            }
          </div>
        </div>
      </div>
    `).join('');
  }
  
  function filterOrders(status, btn) {
    ordersFilterStatus = status;
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    renderOrders();
  }
  
  function updateOrderStatus(orderId, newStatus) {
    if (!newStatus) return;
    const orders = getOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    order.status = newStatus;
    order.statusHistory = order.statusHistory || [];
    order.statusHistory.push({ status: newStatus, time: new Date().toISOString() });
    localStorage.setItem('forkitOrders', JSON.stringify(orders));
    renderOrders();
  
    // Simulate Java backend PATCH call
    simulateBackendUpdateStatus(orderId, newStatus);
  }
  
  function cancelOrder(orderId) {
    if (!confirm('Are you sure you want to cancel this order?')) return;
    updateOrderStatus(orderId, 'Cancelled');
  }
  
  function clearAllOrders() {
    if (!confirm('Clear all orders? This cannot be undone.')) return;
    localStorage.removeItem('forkitOrders');
    renderOrders();
  }
  
  // ---- ORDER DETAIL ----
  function openOrderDetail(orderId) {
    const orders = getOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
  
    const statusSteps = ['Pending', 'Preparing', 'Out for Delivery', 'Delivered'];
    const currentIdx = statusSteps.indexOf(order.status);
  
    const timelineHtml = statusSteps.map((step, i) => {
      const historyEntry = order.statusHistory?.find(h => h.status === step);
      let dotClass = 'tl-dot';
      if (i < currentIdx) dotClass += ' done';
      else if (i === currentIdx && order.status !== 'Cancelled') dotClass += ' current';
      return `
        <div class="tl-item">
          <div class="${dotClass}"></div>
          <div>
            <div class="tl-label">${step}</div>
            ${historyEntry ? `<div class="tl-time">${formatDate(historyEntry.time)}</div>` : ''}
          </div>
        </div>
      `;
    }).join('');
  
    document.getElementById('orderDetailContent').innerHTML = `
      <h2>Order Details</h2>
      <div class="detail-section">
        <h4>Order Info</h4>
        <div class="detail-row"><span>Order ID</span><strong>#${order.id}</strong></div>
        <div class="detail-row"><span>Restaurant</span><span>${order.restaurantName}</span></div>
        <div class="detail-row"><span>Placed At</span><span>${formatDate(order.placedAt)}</span></div>
        <div class="detail-row"><span>Payment</span><span>${order.payment}</span></div>
        <div class="detail-row"><span>Status</span><span class="status-badge status-${order.status.replace(/\s/g,'-')}">${order.status}</span></div>
      </div>
      <div class="detail-section">
        <h4>Customer</h4>
        <div class="detail-row"><span>Name</span><span>${order.customer.name}</span></div>
        <div class="detail-row"><span>Phone</span><span>${order.customer.phone}</span></div>
        <div class="detail-row"><span>Address</span><span>${order.customer.address}</span></div>
      </div>
      <div class="detail-section">
        <h4>Items</h4>
        ${order.items.map(i => `
          <div class="detail-row">
            <span>${i.item.emoji} ${i.item.name} ×${i.qty}</span>
            <span>₹${i.item.price * i.qty}</span>
          </div>
        `).join('')}
        <div class="detail-total">
          <span>Total (incl. ₹30 delivery)</span>
          <span>₹${order.total}</span>
        </div>
      </div>
      ${order.status !== 'Cancelled' ? `
      <div class="detail-section">
        <h4>Order Progress</h4>
        <div class="status-timeline">${timelineHtml}</div>
      </div>` : ''}
    `;
  
    document.getElementById('orderDetailModal')?.classList.add('open');
  }
  
  function closeOrderDetail() {
    document.getElementById('orderDetailModal')?.classList.remove('open');
  }
  
  // =====================
  // HELPERS
  // =====================
  function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) +
      ' ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  }
  
  // =====================
  // JAVA BACKEND SIMULATION
  // (Replace with real fetch calls when Java server is running)
  // =====================
  function simulateBackendPlaceOrder(order) {
    console.log('%c[Java Backend] POST /api/orders', 'color:#e85d26;font-weight:bold');
    console.log('Payload:', JSON.stringify({
      restaurantId: order.restaurantId,
      items: order.items.map(i => ({ itemId: i.item.id, quantity: i.qty, price: i.item.price })),
      customer: order.customer,
      paymentMethod: order.payment,
      totalAmount: order.total
    }, null, 2));
  }
  
  function simulateBackendUpdateStatus(orderId, status) {
    console.log(`%c[Java Backend] PATCH /api/orders/${orderId}/status`, 'color:#3b82f6;font-weight:bold');
    console.log('Body:', JSON.stringify({ status }, null, 2));
  }
  
  /*
   * ================================================================
   * HOW TO CONNECT REAL JAVA BACKEND
   *
   * Replace simulateBackendPlaceOrder() with:
   *
   * async function placeOrderToBackend(order) {
   *   const res = await fetch('http://localhost:8080/api/orders', {
   *     method: 'POST',
   *     headers: { 'Content-Type': 'application/json' },
   *     body: JSON.stringify({ ... })
   *   });
   *   return res.json();
   * }
   *
   * Replace simulateBackendUpdateStatus() with:
   *
   * async function updateStatusOnBackend(orderId, status) {
   *   await fetch(`http://localhost:8080/api/orders/${orderId}/status`, {
   *     method: 'PATCH',
   *     headers: { 'Content-Type': 'application/json' },
   *     body: JSON.stringify({ status })
   *   });
   * }
   * ================================================================
   */
