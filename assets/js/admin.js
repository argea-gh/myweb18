// ──────────────────────────────────────────
// Admin Panel Logic (localStorage-based)
// ──────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // ──────────────────────────────────────────
  // 🔐 KEAMANAN ADMIN
  // ──────────────────────────────────────────
  const ADMIN_PASSWORD = 'herba2026';
  const ACCESS_KEY = 'herbaprima_admin_token';

  function isAuthenticated() {
    const token = localStorage.getItem(ACCESS_KEY);
    if (!token) return false;
    try {
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

  function requireAuth() {
    if (!isAuthenticated()) {
      const pass = prompt("🔒 Panel Admin Herbaprima\n\nMasukkan password:");
      if (pass === ADMIN_PASSWORD) {
        grantAccess();
      } else {
        alert("❌ Password salah! Mengalihkan ke website utama...");
        window.location.href = "index.html";
        return false;
      }
    }
    return true;
  }

  // Jalankan autentikasi
  if (!requireAuth()) return;

  // ──────────────────────────────────────────
  // DOM Elements (setelah DOM siap!)
  // ──────────────────────────────────────────
  const form = document.getElementById('productForm');
  const formTitle = document.getElementById('form-title');
  const productIdInput = document.getElementById('productId');
  const nameInput = document.getElementById('productName');
  const categoryInput = document.getElementById('productCategory');
  const priceInput = document.getElementById('productPrice');
  const imageInput = document.getElementById('productImage');
  const descInput = document.getElementById('productDesc');
  const benefitsInput = document.getElementById('productBenefits');
  const compositionInput = document.getElementById('productComposition');
  const previewImg = document.getElementById('previewImg');
  const imagePreview = document.getElementById('imagePreview');
  const btnReset = document.getElementById('btnReset');
  const productTableBody = document.getElementById('productTableBody');
  const productCount = document.getElementById('productCount');
  const btnExport = document.getElementById('btnExport');

  if (!form || !productTableBody) {
    console.error('Elemen admin tidak ditemukan. Pastikan HTML sudah benar.');
    return;
  }

  // ──────────────────────────────────────────
  // Load produk
  // ──────────────────────────────────────────
  let products = JSON.parse(localStorage.getItem('herbaprimaProducts')) || [];

  // ──────────────────────────────────────────
  // Fungsi Render & Aksi (sama seperti sebelumnya)
  // ──────────────────────────────────────────

  function renderProductTable() {
    productTableBody.innerHTML = '';
    productCount.textContent = products.length;

    products.forEach((product, index) => {
      const priceFormatted = `Rp ${product.price.toLocaleString('id-ID')}`;
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/60?text=No+Image'" /></td>
        <td><strong>${product.name}</strong><br><small>${product.category}</small></td>
        <td>${product.category}</td>
        <td>${priceFormatted}</td>
        <td>
          <button class="btn btn-sm btn-edit" data-index="${index}">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button class="btn btn-sm btn-delete" data-index="${index}">
            <i class="fas fa-trash"></i> Hapus
          </button>
        </td>
      `;
      productTableBody.appendChild(row);
    });

    // Event listeners
    document.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.target.closest('button').dataset.index;
        editProduct(index);
      });
    });

    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.target.closest('button').dataset.index;
        deleteProduct(index);
      });
    });
  }

  function fillForm(product, index = null) {
    productIdInput.value = index !== null ? index : '';
    nameInput.value = product.name || '';
    categoryInput.value = product.category || '';
    priceInput.value = product.price || '';
    imageInput.value = product.image || '';
    descInput.value = product.description || '';
    benefitsInput.value = product.benefits ? product.benefits.join(', ') : '';
    compositionInput.value = product.composition || '';

    if (product.image) {
      previewImg.src = product.image;
      previewImg.style.display = 'block';
      imagePreview.style.display = 'block';
    } else {
      previewImg.style.display = 'none';
      imagePreview.style.display = 'none';
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!nameInput.value.trim() || !categoryInput.value || !priceInput.value || !imageInput.value) {
      alert('⚠️ Nama, kategori, harga, dan URL gambar wajib diisi!');
      return;
    }

    const priceValue = parseInt(priceInput.value);
    if (isNaN(priceValue) || priceValue < 1000) {
      alert('⚠️ Harga minimal Rp 1.000');
      return;
    }

    const product = {
      id: nameInput.value.trim().toLowerCase().replace(/\s+/g, '-'),
      name: nameInput.value.trim(),
      category: categoryInput.value,
      price: priceValue,
      image: imageInput.value.trim(),
      description: descInput.value.trim(),
      benefits: benefitsInput.value
        ? benefitsInput.value.split(',').map(b => b.trim()).filter(b => b)
        : [],
      composition: compositionInput.value.trim()
    };

    const index = productIdInput.value;
    if (index !== '') {
      products[index] = product;
    } else {
      products.push(product);
    }

    // ✅ SIMPAN & RENDER
    localStorage.setItem('herbaprimaProducts', JSON.stringify(products));
    renderProductTable();
    form.reset();
    imagePreview.style.display = 'none';
    formTitle.textContent = '➕ Tambah Produk Baru';
    productIdInput.value = '';
  });

  btnReset.addEventListener('click', () => {
    form.reset();
    imagePreview.style.display = 'none';
    formTitle.textContent = '➕ Tambah Produk Baru';
    productIdInput.value = '';
  });

  function editProduct(index) {
    const product = products[index];
    fillForm(product, index);
    formTitle.textContent = '✏️ Edit Produk';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function deleteProduct(index) {
    if (confirm(`Hapus produk "${products[index].name}"? Tindakan ini tidak bisa dikembalikan.`)) {
      products.splice(index, 1);
      localStorage.setItem('herbaprimaProducts', JSON.stringify(products));
      renderProductTable();
    }
  }

  // Preview gambar
  imageInput.addEventListener('input', () => {
    const url = imageInput.value.trim();
    if (url && /\.(jpg|jpeg|png|webp)$/i.test(url)) {
      previewImg.src = url;
      previewImg.style.display = 'block';
      imagePreview.style.display = 'block';
    } else {
      previewImg.style.display = 'none';
      imagePreview.style.display = 'none';
    }
  });

  // Ekspor
  btnExport.addEventListener('click', () => {
    const dataStr = JSON.stringify(products, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `herbaprima-products-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  });

  // ──────────────────────────────────────────
  // Inisialisasi akhir
  // ──────────────────────────────────────────
  renderProductTable();
});
