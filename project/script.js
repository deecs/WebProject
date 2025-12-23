// ==================== THEME TOGGLE ====================

function changeTheme() {
    const button = document.getElementById("theme-toggle");

    // Toggle the theme class
    document.body.classList.toggle("dark-mode");

    // Check the current mode AFTER toggling
    const isDark = document.body.classList.contains("dark-mode");

    // Save to local storage
    localStorage.setItem("theme", isDark ? "dark" : "light");

    // Update button and header colors
    if (isDark) {
        button.textContent = "🔅";
        button.style.backgroundColor = "#02001d";
        document.getElementById("new-header").style.backgroundColor = "#02001d";
    } else {
        button.textContent = "🌑";
        button.style.backgroundColor = "white";
        document.getElementById("new-header").style.backgroundColor = "white";
    }

  
}

// Apply saved theme on load
window.onload = () => {
    const saved = localStorage.getItem("theme");
    const isDark = saved === "dark";

    if (isDark) {
        document.body.classList.add("dark-mode");
        document.getElementById("theme-toggle").textContent = "🔅";
        document.getElementById("theme-toggle").style.backgroundColor = "#02001d";
        document.getElementById("new-header").style.backgroundColor = "#02001d";

        
    }
};


// ==================== PRODUCT DATA ====================

const products = {
    'freshly-prepared': [
        { id: 1, name: 'maneoushet jebne', price: 1.5, image: 'jebne.jpeg', description: 'soft hot mix of cheeses on a cloud of bread', time: 5 },
        { id: 2, name: 'maneoushet zaatar', price: 0.8, image: 'zaatar.jpeg', description: 'home-made zaatar mix on a warm pita', time: 5 },
        { id: 3, name: 'lahm baajin', price: 2.0, image: 'lahm.jpeg', description: 'Savory minced meat pie with spices', time: 10 },
        { id: 4, name: 'keshek', price: 1.50, image: 'keshek.jpeg', description: 'a lebanese classic made with yogurt and grains', time: 5 },
        { id: 5, name: 'sandwich halloum', price: 3.0, image: 'hallum.jpeg', description: 'halloumi cheese with the lebanese spark', time: 7 },
        { id: 6, name: 'sandwich double creme', price: 3.0, image: 'doublecream.jpeg', description: 'your fav cheese of all time', time: 7 },
        { id: 7, name: 'sandwich labne', price: 3.0, image: 'labnah-sandwich-8.jpg', description: 'let the lebanese labne do the magic', time: 7 },
        { id: 8, name: 'sandwich fries', price: 3.3, image: 'fries sand.jpg', description: 'crispy fries with a twist of flavor', time: 7 },
        { id: 9, name: 'box fries', price: 2.9, image: '-fry-box.webp', description: 'your regular fries with a sprinkle of our perfection', time: 5 },
        { id: 10, name: 'fajita', price: 5.99, image: 'fahita.jpeg', description: 'mexican in a lebanese fit', time: 15 },
        { id: 11, name: 'tawouk sandwich', price: 5.99, image: 'Grand-taouk-sandwich-.jpg', description: 'your go for meal', time: 15 },
    ],
    'salads': [
        { id: 12, name: 'tuna pasta salad', price: 5.99, image: 'tuna pasta.jpeg', description: 'light and filling', time: 0.5 },
        { id: 13, name: 'feta cheese', price: 6.50, image: 'feta.webp', description: 'Feta cheese, olives, cucumber, tomatoes. very basic yet delicious', time: 0.5 },
    ],
    'snacks': [
        { id: 14, name: 'chips', price: 1.00, image: 'chips.webp', description: 'Crispy golden potato chips', time: 0.2 },
        { id: 15, name: 'rice cake', price: 0.50, image: 'ricecake.webp', description: 'a light but a hunger breaker snack', time: 0.2 },
        { id: 16, name: 'chocolate', price: 1.20, image: 'chocolate.webp', description: 'a huge varaity of your fav chocolate bars', time: 0.2 },
        { id: 17, name: 'protein bar', price: 2.00, image: 'bars.webp', description: 'healthy but filling sweet snack', time: 0.2 },
        { id: 18, name: 'wafer', price: 0.40, image: 'wafer.webp', description: 'goes well with your every day coffee', time: 0.2 }
    ],
    'beverages': [
        { id: 19, name: 'hot teas', price: 0.50, image: 'OIP.webp', description: 'the cold killer', time: 0.2 },
        { id: 20, name: 'nescafe', price: 0.80, image: 'nescafe.webp', description: 'Rich espresso with steamed milk', time: 0.5 },
        { id: 21, name: 'Iced coffee', price: 1.00, image: 'icedcoffee.webp', description: 'Cold coffee with milk and ice', time: 0.3 },
        { id: 22, name: 'ice tea', price: 0.80, image: 'icetea.webp', description: 'your favorite lipton', time: 0.2 },
        { id: 23, name: 'Soft Drink', price: 1.00, image: 'softdrink.webp', description: 'Choice of cola, lemon, or orange', time: 0.2 },
        { id: 24, name: 'Bottled Water', price: 0.40, image: 'bottledwater.webp', description: 'Refreshing bottled water', time: 0.2 }
    ],
    'desserts': [
        { id: 25, name: 'jello cup', price: 3.00, image: 'jello.webp', description: 'Rich strawberry flavor', time: 0.2 },
        { id: 26, name: 'Cheesecake cup', price: 5.00, image: 'cheesecake.webp', description: 'Creamy cheesecake', time: 0.2 },
        { id: 27, name: 'custard cup', price: 3.00, image: 'custard.webp', description: 'a sweet you cannot resist', time: 0.2 },
    ]
};

const categoryInfo = {
    'freshly-prepared': { title: 'Freshly Prepared', desc: 'Hot meals made fresh daily' },
    'salads': { title: 'Salads', desc: 'Fresh and healthy salad options' },
    'snacks': { title: 'Snacks', desc: 'Quick bites and shareable treats' },
    'beverages': { title: 'Beverages', desc: 'Refreshing drinks for every taste' },
    'desserts': { title: 'Desserts', desc: 'Sweet treats to end your meal' }
};


// ==================== GLOBAL VARIABLES ====================

let cart = [];
let currentCategory = 'freshly-prepared';
let appliedDiscount = 0; // 0 = no discount, 0.3 = 30% off


// ==================== PRODUCT DISPLAY ====================

function displayProducts(category) {
    const grid = document.getElementById('productsGrid');
    const items = products[category];

    grid.innerHTML = items.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-footer">
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="add-btn" onclick="addToCart(${product.id})">Add</button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterCategory(category, event) {
    currentCategory = category;

    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    if (event) event.target.classList.add('active');

    // Update category title and description
    const info = categoryInfo[category];
    document.getElementById('categoryTitle').textContent = info.title;
    document.getElementById('categoryDesc').textContent = info.desc;

    // Display products for this category
    displayProducts(category);
}


// ==================== CART FUNCTIONS ====================

function findProduct(id) {
    for (let category in products) {
        let product = products[category].find(x => x.id === id);
        if (product) return product;
    }
    return null;
}

function addToCart(id) {
    const product = findProduct(id);
    const existing = cart.find(i => i.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function updateQuantity(id, amount) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.quantity += amount;
    
    // Remove item if quantity becomes 0 or negative
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== id);
    }

    updateCart();
}

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    updateCart();
}

function calculateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.10;
    const total = subtotal + tax;
    return { subtotal, tax, total };
}

function updateCart() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');

    // Update cart count badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Show empty cart message if no items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">🛍️</div>
                <p>Your cart is empty</p>
            </div>
        `;
        cartSummary.style.display = 'none';
        return;
    }

    // Display cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" style="width:60px;height:60px;object-fit:cover;border-radius:8px;">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-controls">
                <div class="qty-control">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span class="qty-number">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');

    // Update totals
    const totals = calculateTotals();
    document.getElementById('subtotal').textContent = `$${totals.subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${totals.tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${totals.total.toFixed(2)}`;

    cartSummary.style.display = 'block';
}


// ==================== DISCOUNT CODE ====================

function discount() {
    const code = document.getElementById("inp").value;
    const totals = calculateTotals();

    if (code === "123") {
        appliedDiscount = 0.3; // 30% off
        const discounted = totals.total * (1 - appliedDiscount);
        document.getElementById('total').textContent = `$${discounted.toFixed(2)}`;
    } else {
        appliedDiscount = 0; // No discount
        document.getElementById('total').textContent = `$${totals.total.toFixed(2)}`;
    }
}


// ==================== TIMER SYSTEM ====================

let graphicalTimerInterval = null;
let graphicalTimerRemaining = 0;
let graphicalTimerTotal = 0;

// Compute total preparation time from cart items
function computePrepSeconds(cart) {
    if (!Array.isArray(cart) || cart.length === 0) return 0;

   

    // Otherwise use item.time (in minutes) and convert to seconds
    return cart.reduce((sum, item) => {
        let time = item.time;
        
        // If time is a string like "5 mins", extract the number
        if (typeof time === "string") {
            const match = time.match(/(\d+(\.\d+)?)/);
            time = match ? Number(match[0]) : 0;
        }
        
        // Convert minutes to seconds
        return sum + (Number(time) ? Number(time) * 60 : 0);
    }, 0);
}

function startGraphicalTimerFromCart(cart) {
    const seconds = computePrepSeconds(cart);
    startGraphicalTimer(seconds);
}

function startGraphicalTimer(totalSeconds) {
    // Get DOM elements
    const box = document.getElementById("timerBox");
    const text = document.getElementById("timerText");
    const progressBar = document.getElementById("progressBar");
    const status = document.getElementById("timerStatus");

    // Show timer box
    box.style.display = "block";

    // Clear any existing timer
    if (graphicalTimerInterval) {
        clearInterval(graphicalTimerInterval);
        graphicalTimerInterval = null;
    }
    
    // Handle zero time - show ready immediately
    if (!totalSeconds || totalSeconds <= 0) {
        box.classList.remove("active");
        box.classList.add("timer-ready");
        text.textContent = "✅ Ready!";
        progressBar.style.width = "100%";
        status.textContent = "Order is ready.";
        playDing();
        return;
    }

    // Initialize timer
    graphicalTimerTotal = totalSeconds;
    graphicalTimerRemaining = totalSeconds;
    box.classList.add("active");
    box.classList.remove("timer-ready");
    status.textContent = "Preparing...";

    // Show initial UI
    updateTimerUI();

    // Start countdown (updates every second)
    graphicalTimerInterval = setInterval(() => {
        graphicalTimerRemaining--;

        // Timer finished
        if (graphicalTimerRemaining < 0) {
            clearInterval(graphicalTimerInterval);
            graphicalTimerInterval = null;

            // Show completion state
            text.textContent = "✅ Ready!";
            progressBar.style.width = "100%";
            box.classList.remove("active");
            box.classList.add("timer-ready");
            status.textContent = "Your order is ready!";
            playDing();
            
            // Clear cart after 3 seconds
            setTimeout(() => {
                cart = [];
                updateCart();
                box.style.display = "none";
            }, 3000);
            
            return;
        }
        
        updateTimerUI();
    }, 1000);

    // Update timer display
    function updateTimerUI() {
        // Format time as MM:SS
        const minutes = Math.floor(graphicalTimerRemaining / 60);
        const seconds = graphicalTimerRemaining % 60;
        const mm = minutes < 10 ? "0" + minutes : minutes;
        const ss = seconds < 10 ? "0" + seconds : seconds;
        text.textContent = `${mm}:${ss}`;

        // Update progress bar
        const elapsed = (graphicalTimerTotal - graphicalTimerRemaining);
        const percentage = Math.round((elapsed / graphicalTimerTotal) * 100);
        progressBar.style.width = percentage + "%";

        // Change color based on progress: green → yellow → red
        if (percentage < 50) {
            progressBar.style.background = "linear-gradient(90deg,#6ee7b7,#60a5fa)";
        } else if (percentage < 85) {
            progressBar.style.background = "linear-gradient(90deg,#facc15,#f97316)";
        } else {
            progressBar.style.background = "linear-gradient(90deg,#fb7185,#ef4444)";
        }
    }
}


// ==================== SOUND EFFECTS ====================

function playDing() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const now = ctx.currentTime;

        // First tone (A5 - 880Hz)
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(880, now);
        gain1.gain.setValueAtTime(0, now);
        gain1.gain.linearRampToValueAtTime(0.2, now + 0.01);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.22);

        // Second tone (E5 - 660Hz)
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(660, now + 0.18);
        gain2.gain.setValueAtTime(0, now + 0.18);
        gain2.gain.linearRampToValueAtTime(0.16, now + 0.19);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.48);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now + 0.18);
        osc2.stop(now + 0.48);
    } catch (error) {
        console.warn("AudioContext unavailable:", error);
    }
}


// ==================== CHECKOUT ====================

function checkoutAndStartTimer() {
    if (cart.length === 0) return;

    const code = document.getElementById("inp") ? document.getElementById("inp").value : "";
    let totals = calculateTotals();

    // Apply discount if code was entered
    if (appliedDiscount > 0) {
        totals.total = totals.total * (1 - appliedDiscount);
    }

    // Calculate preparation time
    const prepSeconds = computePrepSeconds(cart);

    // Show confirmation
    alert(`Order Confirmed! 🎉
Total: $${totals.total.toFixed(2)}
Prep Time: ${Math.floor(prepSeconds / 60)}m ${prepSeconds % 60}s`);

    // Start the timer
    startGraphicalTimer(prepSeconds);
}


// ==================== INITIALIZATION ====================

displayProducts(currentCategory);
updateCart();