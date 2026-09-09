const products = [
  { id: 1, name: 'Comida Premium Perro', category: 'perro', price: 450, oldPrice: 520, discount: 13, image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&q=80' },
  { id: 2, name: 'Comida Premium Gato', category: 'gato', price: 420, oldPrice: null, discount: null, image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&q=80' },
  { id: 3, name: 'Juguete Interactive Ball', category: 'perro', price: 180, oldPrice: 210, discount: 14, image: 'https://images.unsplash.com/photo-1552410260-0fd9b577afa6?w=400&q=80' },
  { id: 4, name: 'Rascador Torre', category: 'gato', price: 650, oldPrice: null, discount: null, image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400&q=80' },
  { id: 5, name: 'Correa Ajustable', category: 'accesorio', price: 290, oldPrice: 340, discount: 15, image: 'https://images.unsplash.com/photo-1560421683-6856ea585c78?w=400&q=80' },
  { id: 6, name: 'Plato Doble Inox', category: 'accesorio', price: 340, oldPrice: null, discount: null, image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&q=80' },
  { id: 7, name: 'Snack Dental Perro', category: 'perro', price: 120, oldPrice: 150, discount: 20, image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400&q=80' },
  { id: 8, name: 'Arena Premium Gato', category: 'gato', price: 280, oldPrice: null, discount: null, image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&q=80' },
  { id: 9, name: 'Cama Ortopédica', category: 'perro', price: 890, oldPrice: 1050, discount: 15, image: 'https://images.unsplash.com/photo-1541599465526-7767dc7e8f9d?w=400&q=80' },
  { id: 10, name: 'Transportadora', category: 'accesorio', price: 750, oldPrice: null, discount: null, image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400&q=80' },
  { id: 11, name: 'Chaleco Reflectante', category: 'perro', price: 220, oldPrice: null, discount: null, image: 'https://images.unsplash.com/photo-1553226568-982e79f8dd5f?w=400&q=80' },
  { id: 12, name: 'Juguete Ratoncito', category: 'gato', price: 95, oldPrice: 120, discount: 21, image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&q=80' },
  { id: 13, name: 'Cepillo Deslanador', category: 'accesorio', price: 160, oldPrice: 190, discount: 16, image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&q=80' },
  { id: 14, name: 'Champú Hipoalergénico', category: 'accesorio', price: 210, oldPrice: 240, discount: 12, image: 'https://images.unsplash.com/photo-1583338917451-9e9e5e2d5f5b?w=400&q=80' },
  { id: 15, name: 'Bebedero Automático', category: 'gato', price: 580, oldPrice: 690, discount: 16, image: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=400&q=80' },
  { id: 16, name: 'Dispensador de Comida', category: 'perro', price: 460, oldPrice: null, discount: null, image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&q=80' },
];

let cart = [];
let currentFilter = 'all';
let currentSort = 'default';
let currentSearch = '';

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
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const productCards = document.querySelectorAll('.product-card');

function getFilteredProducts() {
  let result = products.filter(p =>
    (currentFilter === 'all' || p.category === currentFilter)
  );

  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }

  if (currentSort === 'asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'desc') {
    result.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'discount') {
    result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
  }

  return result;
}

function renderProducts() {
  const filtered = getFilteredProducts();
  productsGrid.innerHTML = filtered.map((p, i) => `
    <div class="product-card reveal" style="animation-delay: ${i * 0.05}s">
      <div class="product-image-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        ${p.discount ? `<span class="discount-badge">-${p.discount}%</span>` : ''}
        ${p.oldPrice ? `<span class="best-badge">Oferta</span>` : ''}
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-footer">
          <div class="price-block">
            ${p.oldPrice ? `<span class="old-price">$${p.oldPrice}</span>` : ''}
            <span class="product-price">$${p.price}</span>
          </div>
          <button class="add-cart-btn" onclick="addToCart(${p.id})" title="Agregar al carrito">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  if (filtered.length === 0) {
    productsGrid.innerHTML = '<p class="no-results">No se encontraron productos para tu búsqueda.</p>';
  }

  requestAnimationFrame(() => {
    document.querySelectorAll('.product-card.reveal').forEach(card => card.classList.add('visible'));
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  const btn = document.querySelector(`.add-cart-btn[onclick="addToCart(${id})"]`);
  if (btn) {
    btn.classList.add('added');
    setTimeout(() => btn.classList.remove('added'), 600);
  }

  cartBtn.classList.add('bump');
  setTimeout(() => cartBtn.classList.remove('bump'), 600);

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
        <div class="cart-item-icon">
          <img src="${item.image}" alt="${item.name}">
        </div>
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
    currentFilter = btn.dataset.filter;
    renderProducts();
  });
});

searchInput.addEventListener('input', (e) => {
  currentSearch = e.target.value.trim();
  renderProducts();
});

sortSelect.addEventListener('change', (e) => {
  currentSort = e.target.value;
  renderProducts();
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

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section-header, .service-card').forEach(el => {
  observer.observe(el);
});

window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

renderProducts();
