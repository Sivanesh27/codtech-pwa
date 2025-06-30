// Register Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker Registered'));
}

// Push Notification
function notifyMe() {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            new Notification("Thanks for enabling notifications!", {
                body: "You’ll now receive updates.",
                icon: "icons/icon-192x192.png"
            });
        }
    });
}

// Dummy Products
const products = [
    { id: 1, name: "Smartwatch", price: 1999, img: "https://via.placeholder.com/200?text=Smartwatch" },
    { id: 2, name: "Bluetooth Speaker", price: 1299, img: "https://via.placeholder.com/200?text=Speaker" },
    { id: 3, name: "Wireless Earbuds", price: 999, img: "https://via.placeholder.com/200?text=Earbuds" }
];

// Load Products
const productList = document.getElementById('product-list');
products.forEach(p => {
    productList.innerHTML += `
        <div class="product">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `;
});

// Cart Functionality
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = "";
    cart.forEach(item => {
        cartList.innerHTML += `<li>${item.name} - ₹${item.price}</li>`;
    });
}

window.onload = loadCart;
