// ──────────────────────────────────────────
// 🔐 KEAMANAN ADMIN
// ──────────────────────────────────────────
(function() {
  const ADMIN_PASSWORD = 'herba2026';
  const ACCESS_KEY = 'herbaprima_admin_token';

  function isAuthenticated() {
    try {
      const token = localStorage.getItem(ACCESS_KEY);
      if (!token) return false;
      const { pass, exp } = JSON.parse(token);
      return pass === ADMIN_PASSWORD && Date.now() < exp;
    } catch (e) {
      return false;
    }
  }

  function grantAccess() {
    const expires = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem(ACCESS_KEY, JSON.stringify({ pass: ADMIN_PASSWORD, exp: expires }));
  }

  if (!isAuthenticated()) {
    const pass = prompt("🔒 Panel Admin Herbaprima\n\nMasukkan password:");
    if (pass !== ADMIN_PASSWORD) {
      alert("❌ Password salah!");
      window.location.href = "index.html";
    } else {
      grantAccess();
    }
  }
})();

// ──────────────────────────────────────────
// LOGIKA ADMIN
// ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('productForm');
  const productIdInput = document.getElementById('productId');
  const nameInput = document.getElementById('productName');
  const categoryInput = document.getElementById('productCategory');
  const priceInput = document.getElementById('productPrice');
  const imageInput = document.getElementById('productImage');
  const descInput = document.getElementById('productDesc');
  const benefitsInput = document.getElementById('productBenefits');
  const compositionInput = document.getElementById('productComposition');
  const productTableBody = document.getElementById('productTableBody');
  const productCount = document.getElementById('productCount');

  let products = JSON.parse(localStorage.getItem('herbaprimaProducts')) || [];

  // ──────────────────────────────────────────
  // Render Tabel
  // ──────────────────────────────────────────
  function renderProductTable() {
    productTableBody.innerHTML = '';
    productCount.textContent = products.length;

    products.forEach((p, i) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><img src="${p.image}" alt="${p.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2750%27 height=%2750%27 viewBox=%270 0 50 50%27%3E%3Crect width=%2750%27 height=%2750%27 fill=%27%23f0f0f0%27/%3E%3C/svg%3E'" /></td>
        <td><strong>${p.name}</strong></td>
        <td>${p.category}</td>
        <td>Rp ${p.price.toLocaleString('id-ID')}</td>
        <td class="actions">
          <button class="btn" onclick="editProduct(${i})" style="background:#1976d2;">Edit</button>
          <button class="btn" onclick="deleteProduct(${i})" style="background:#d32f2f;">Hapus</button>
        </td>
      `;
      productTableBody.appendChild(row);
    });
  }

  // ──────────────────────────────────────────
  // Fungsi Global (untuk onclick)
  // ──────────────────────────────────────────
  window.editProduct = function(i) {
    const p = products[i];
    productIdInput.value = i;
    nameInput.value = p.name;
    categoryInput.value = p.category;
    priceInput.value = p.price;
    imageInput.value = p.image;
    descInput.value = p.description || '';
    benefitsInput.value = Array.isArray(p.benefits) ? p.benefits.join(', ') : '';
    compositionInput.value = p.composition || '';
  };

  window.deleteProduct = function(i) {
    if (confirm(`Hapus "${products[i].name}"?`)) {
      products.splice(i, 1);
      saveProducts();
      renderProductTable();
    }
  };

  // ──────────────────────────────────────────
  // Simpan ke localStorage
  // ──────────────────────────────────────────
  function saveProducts() {
    localStorage.setItem('herbaprimaProducts', JSON.stringify(products));
  }

  // ──────────────────────────────────────────
  // Submit Form
  // ──────────────────────────────────────────
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const category = categoryInput.value;
    const price = parseInt(priceInput.value);
    const image = imageInput.value.trim();
    const description = descInput.value.trim();
    const composition = compositionInput.value.trim();
    const benefits = benefitsInput.value
      ? benefitsInput.value.split(',').map(b => b.trim()).filter(b => b)
      : [];

    if (!name || !category || !price || !image) {
      alert('⚠️ Nama, kategori, harga, dan URL gambar wajib diisi!');
      return;
    }
    if (price < 1000) {
      alert('⚠️ Harga minimal Rp 1.000');
      return;
    }

    const product = {
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      category,
      price,
      image,
      description,
      benefits,
      composition
    };

    const idx = productIdInput.value;
    if (idx !== '') {
      products[idx] = product;
    } else {
      products.push(product);
    }

    saveProducts();
    renderProductTable();
    form.reset();
    productIdInput.value = '';
    alert('✅ Produk berhasil disimpan!');
  });

  // ──────────────────────────────────────────
  // Reset Form
  // ──────────────────────────────────────────
  document.getElementById('btnReset').addEventListener('click', () => {
    productIdInput.value = '';
  });

  // ──────────────────────────────────────────
  // Inisialisasi
  // ──────────────────────────────────────────
  renderProductTable();
});
