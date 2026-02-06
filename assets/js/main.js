// ──────────────────────────────────────────
// DOM Elements
// ──────────────────────────────────────────

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const filterBtns = document.querySelectorAll('.filter-btn');
const productsGrid = document.getElementById('productsGrid');
const productModal = document.getElementById('productModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const modalClose2 = document.getElementById('modalClose2');
const cartPanel = document.getElementById('cartPanel');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// ──────────────────────────────────────────
// HELPER: Format Rupiah dengan spasi (Rp 120.000)
// ──────────────────────────────────────────

function formatRupiah(angka) {
  if (angka == null || angka === '') return 'Rp 0';
  return 'Rp ' + parseInt(angka).toLocaleString('id-ID');
}

// ──────────────────────────────────────────
// ANIMASI UNTUK PRODUK YANG BARU DI-RENDER
// ──────────────────────────────────────────

function animateNewProducts() {
  // Cari semua produk yang belum visible
  const newItems = document.querySelectorAll('.product-card:not(.visible)');
  
  newItems.forEach((el, index) => {
    // Hanya animasi yang di/near viewport
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight + 200;
    
    if (inView) {
      // Delay stagger kecil
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 100); // 0.1s per item
    }
  });
}


// ──────────────────────────────────────────
// Mobile Navigation Toggle
// ──────────────────────────────────────────

function initHeader() {
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking nav link
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

// ──────────────────────────────────────────
// Render Products Grid
// ──────────────────────────────────────────

function renderProducts(category = 'all') {
  // Cek apakah elemen ada (hindari error di halaman selain produk/index)
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  // Ambil produk dari localStorage atau default
  let productList = JSON.parse(localStorage.getItem('herbaprimaProducts')) || products;

  const filtered = category === 'all' 
    ? productList 
    : productList.filter(p => p.category === category);

  grid.innerHTML = '';
  filtered.forEach(product => {
    const priceFormatted = formatRupiah(product.price);
    const card = document.createElement('div');
    card.className = 'product-card stagger-item slide-up';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" data-id="${product.id}" onError="this.src='https://via.placeholder.com/260x180?text=No+Image'" />
      <div class="card-body">
        <span class="category">${product.category}</span>
        <h4>${product.name}</h4>
        <div class="price">${priceFormatted}</div>
        <button class="btn btn-outline btn-add" data-id="${product.id}">Pilih Produk</button>
      </div>
    `;
    grid.appendChild(card);
  });

  // Event: Pilih Produk → modal
  document.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      const product = productList.find(p => p.id === id);
      if (product) openProductModal(product);
    });
  });

  // Event: Klik gambar → modal
  document.querySelectorAll('.product-card img').forEach(img => {
    img.addEventListener('click', (e) => {
      const id = e.target.dataset.id || e.target.closest('.product-card').querySelector('button').dataset.id;
      const product = productList.find(p => p.id === id);
      if (product) openProductModal(product);
    });
  });

// ✅ ANIMASI LANGSUNG SETELAH KLIK KATEGORI
  // Gunakan requestAnimationFrame + delay kecil untuk DOM update
  requestAnimationFrame(() => {
    setTimeout(animateNewProducts, 50);
  });
}

// ──────────────────────────────────────────
// Product Modal
// ──────────────────────────────────────────

function openProductModal(product) {
  const priceFormatted = formatRupiah(product.price);
  modalBody.innerHTML = `
    <div class="product-modal-header">
      <img src="${product.image}" alt="${product.name}" />
      <div class="modal-info">
  <div class="info-section">
    <span class="info-label">Kategori</span>
    <p class="info-value">${product.category}</p>
  </div>
  
  <div class="info-section">
    <h2 class="product-name">${product.name}</h2>
  </div>

  <div class="info-section">
    <span class="info-label">Deskripsi</span>
    <p class="info-value">${product.description || '—'}</p>
  </div>

  <div class="info-section">
    <span class="info-label">Manfaat Utama</span>
    <ul class="benefits-list">
      ${product.benefits && product.benefits.length 
        ? product.benefits.map(b => `<li>${b}</li>`).join('')
        : '<li>—</li>'
      }
    </ul>
  </div>

  <div class="info-section">
    <span class="info-label">Komposisi</span>
    <p class="info-value">${product.composition || '—'}</p>
  </div>

  <div class="info-section price-section">
    <span class="info-label">Harga</span>
    <div class="price-large">${formatRupiah(product.price)}</div>
  </div>
</div>
    
    <div class="btn-group">
  <button class="btn btn-primary" id="addToCartBtn" data-id="${product.id}">
    ➕ Tambah ke Keranjang
  </button>
  <a href="https://wa.me/6282241900467?text=Saya%20mau%20pesan%20${encodeURIComponent(product.name)}%2C%20harga%20${encodeURIComponent(formatRupiah(product.price))}." 
     target="_blank" class="btn btn-whatsapp">
    📲 Langsung ke WhatsApp
  </a>
</div>
  `;

  productModal.style.display = 'block';
  setTimeout(() => {
    productModal.classList.add('active');
  }, 10);

  // Add to cart from modal
  document.getElementById('addToCartBtn')?.addEventListener('click', () => {
    addToCart(product);
    closeModal();
  });
}

function closeModal() {
  productModal.classList.remove('active');
  setTimeout(() => {
    productModal.style.display = 'none';
  }, 300);
}

modalClose.addEventListener('click', closeModal);
modalClose2.addEventListener('click', closeModal);

// Close modal on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && productModal.style.display === 'block') {
    closeModal();
  }
});

// Close modal on outside click
window.addEventListener('click', (e) => {
  if (e.target === productModal) {
    closeModal();
  }
});

// ──────────────────────────────────────────
// Cart System (localStorage)
// ──────────────────────────────────────────

function loadCart() {
  const cart = JSON.parse(localStorage.getItem('herbaprimaCart') || '[]');
  updateCartDisplay(cart);
  return cart;
}

function saveCart(cart) {
  localStorage.setItem('herbaprimaCart', JSON.stringify(cart));
}

function addToCart(product) {
  const cart = loadCart();
  const existing = cart.find(item => item.id === product.id);
  
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  saveCart(cart);
  updateCartDisplay(cart);
  showCartPanel();
}

function removeItem(id) {
  let cart = loadCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  updateCartDisplay(cart);
}
// ──────────────────────────────────────────
// CART: Ubah Jumlah (+ / -)
// ──────────────────────────────────────────

function changeQuantity(id, delta) {
  const cart = JSON.parse(localStorage.getItem('herbaprimaCart') || '[]');
  const item = cart.find(i => i.id === id);
  
  if (item) {
    item.quantity += delta;
    if (item.quantity < 1) item.quantity = 1;
    saveCart(cart);
    updateCartDisplay(cart);
  }
}

// Event delegation untuk tombol +/- (agar tetap jalan saat dinamis)
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('qty-plus')) {
    const id = e.target.closest('.cart-item').dataset.id;
    changeQuantity(id, 1);
  } else if (e.target.classList.contains('qty-minus')) {
    const id = e.target.closest('.cart-item').dataset.id;
    changeQuantity(id, -1);
  }
});
// ───── End of CART: Ubah Jumlah (+ / -) ────

function updateCartDisplay(cart) {
  // Hitung total sekali saja
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalFormatted = formatRupiah(total);

  // Update tampilan keranjang
  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="text-align:center; color:#6b7280;">Keranjang masih kosong</p>';
  } else {
    cartItems.innerHTML = cart.map(item => {
      const itemTotal = item.price * item.quantity;
      return `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" />
          <div class="cart-info">
            <h4>${item.name}</h4>
            <div class="price-unit">(${formatRupiah(item.price)} × ${item.quantity})</div>
            <div class="price-item-total">${formatRupiah(itemTotal)}</div>
            <div class="qty-control">
              <button class="qty-btn qty-minus">−</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn qty-plus">+</button>
            </div>
          </div>
          <button class="cart-remove" data-id="${item.id}" aria-label="Hapus ${item.name}">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
    }).join('');

    // Event delegation untuk tombol hapus
    document.querySelectorAll('.cart-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        removeItem(e.target.closest('.cart-remove').dataset.id);
      });
    });
  }

  // ✅ Update SEMUA elemen total (hanya 1x hitung)
  if (cartTotal) cartTotal.textContent = totalFormatted;
  if (document.getElementById('cartTotalSticky')) {
    document.getElementById('cartTotalSticky').textContent = totalFormatted;
  }

  // ✅ Update badge
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cartBadge');
  if (badge) {
    badge.textContent = totalCount;
    badge.classList.toggle('show', totalCount > 0);
  }

  // ✅ Update tombol checkout (versi ringkas)
  const updateCheckoutButton = (btn, itemsList) => {
    if (!btn) return;
    if (cart.length > 0) {
      const text = `Halo Herbaprima, saya mau pesan:\n${itemsList}\n\nTotal: ${totalFormatted}`;
      btn.href = `https://wa.me/6282241900467?text=${encodeURIComponent(text)}`;
    } else {
      btn.href = '#';
    }
  };

  // Update semua tombol checkout
  updateCheckoutButton(checkoutBtn, cart.map(item => 
    `• ${item.name} (${formatRupiah(item.price)} × ${item.quantity}) = ${formatRupiah(item.price * item.quantity)}`
  ).join('\n'));
  
  updateCheckoutButton(document.getElementById('checkoutBtnSticky'), cart.map(item => 
    `• ${item.name} = ${formatRupiah(item.price * item.quantity)}`
  ).join('\n'));
}

// ──────────────────────────────────────────
// Cart Panel Toggles
// ──────────────────────────────────────────

function showCartPanel() {
  cartPanel.classList.add('active');
  cartOverlay.style.display = 'block';
}

cartClose.addEventListener('click', () => {
  cartPanel.classList.remove('active');
  cartOverlay.style.display = 'none';
});

cartOverlay.addEventListener('click', () => {
  cartPanel.classList.remove('active');
  cartOverlay.style.display = 'none';
});

// ──────────────────────────────────────────
// Category Filter
// ──────────────────────────────────────────

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.category);
  });
});

// ──────────────────────────────────────────
// Smooth Scroll for Anchor Links
// ──────────────────────────────────────────

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
      // Close mobile menu if open
      if (hamburger) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    }
  });
});

// ──────────────────────────────────────────
// SCROLL TO TOP BUTTON
// ──────────────────────────────────────────

const scrollToTopBtn = document.createElement('a');
scrollToTopBtn.id = 'scrollToTop';
scrollToTopBtn.href = '#hero';
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.setAttribute('aria-label', 'Kembali ke atas');
document.body.appendChild(scrollToTopBtn);

// Show/hide on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
});

// Smooth scroll ke atas
scrollToTopBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ──────────────────────────────────────────
// ANIMASI ENTRANCE ON SCROLL (Robust)
// ──────────────────────────────────────────

function animateOnScroll() {
  const elements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right');
  
  elements.forEach(el => {
    if (el.classList.contains('visible')) return; // hindari ulang
    
    const rect = el.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
    
    if (isVisible) {
      el.classList.add('visible');
    }
  });
}

// Jalankan saat SEMUA aset selesai (termasuk gambar)
window.addEventListener('load', () => {
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
});

// ──────────────────────────────────────────
// COMMON INIT (jalankan di semua halaman)
// ──────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  loadCart();
  
  // ✅ INISIALISASI ANIMASI PRODUK SAAT HALAMAN PERTAMA KALI DIMUAT (VERSI LEBIH HALUS)
  if (document.querySelector('.products-grid')) {
    setTimeout(() => {
      const productCards = document.querySelectorAll('.product-card');
      productCards.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const inView = rect.top < window.innerHeight + 200;
        
        if (inView && !el.classList.contains('visible')) {
          // ✅ STAGGER ANIMASI: 0.1 detik per item
          setTimeout(() => {
            el.classList.add('visible');
          }, index * 100); // 100ms = 0.1 detik
        }
      });
    }, 300);
  }
});

// Tambahan
// Buka keranjang saat klik tombol akses
document.getElementById('cartAccessBtn')?.addEventListener('click', (e) => {
  e.preventDefault();
  showCartPanel();
});

// ──────────────────────────────────────────
// EVENT: Klik Gambar Produk Unggulan di Index.html
// ──────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Cari semua gambar produk unggulan
  document.querySelectorAll('.product-img').forEach(img => {
    img.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      
      // Ambil data produk
      let productList = JSON.parse(localStorage.getItem('herbaprimaProducts')) || products;
      const product = productList.find(p => p.id === id);
      
      if (product) {
        openProductModal(product);
      } else {
        console.warn(`Produk dengan ID "${id}" tidak ditemukan.`);
      }
    });
  });
});
