const products = [
  { id: 1, name: 'Comida Premium Perro', category: 'perro', price: 450, icon: '🐕' },
  { id: 2, name: 'Comida Premium Gato', category: 'gato', price: 420, icon: '🐈' },
  { id: 3, name: 'Juguete Interactive Ball', category: 'perro', price: 180, icon: '🎾' },
  { id: 4, name: 'Rascador Torre', category: 'gato', price: 650, icon: '🏗️' },
  { id: 5, name: 'Correa Ajustable', category: 'accesorio', price: 290, icon: '🔗' },
  { id: 6, name: 'Plato Doble Inox', category: 'accesorio', price: 340, icon: '🍽️' },
  { id: 7, name: 'Snack Dental Perro', category: 'perro', price: 120, icon: '🦴' },
  { id: 8, name: 'Arena Premium Gato', category: 'gato', price: 280, icon: '📦' },
  { id: 9, name: 'Cama Ortopédica', category: 'perro', price: 890, icon: '🛏️' },
  { id: 10, name: 'Transportadora', category: 'accesorio', price: 750, icon: '🧳' },
  { id: 11, name: 'Chaleco Reflectante', category: 'perro', price: 220, icon: '🦺' },
  { id: 12, name: 'Juguete Ratoncito', category: 'gato', price: 95, icon: '🐭' },
];

let cart = [];

const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartPanel = document.getElementById('cartPanel');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
const filterBtns = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contactForm');

function renderProducts(filter = 'all') {
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
  productsGrid.innerHTML = filtered.map(p => `
    <div class="product-card" data-category="${p.category}">
      <div class="product-image">${p.icon}</div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-footer">
          <span class="product-price">$${p.price}</span>
          <button class="add-cart-btn" onclick="addToCart(${p.id})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function updateCart() {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = count;
  cartTotal.textContent = `$${total}`;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">Tu carrito está vacío</p>';
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-icon">${item.icon}</div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name} x${item.qty}</div>
          <div class="cart-item-price">$${item.price * item.qty}</div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">&times;</button>
      </div>
    `).join('');
  }
}

function openCart() {
  cartPanel.classList.add('active');
  cartOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartPanel.classList.remove('active');
  cartOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

cartBtn.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.filter);
  });
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('¡Mensaje enviado! Nos pondremos en contacto contigo pronto.');
  contactForm.reset();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navLinks.classList.remove('active');
    }
  });
});

renderProducts();
