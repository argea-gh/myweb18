// Muat daftar produk & isi checkbox
document.addEventListener('DOMContentLoaded', () => {
  loadProductsIntoCheckboxes();
  setupPreview();
});

function loadProductsIntoCheckboxes() {
  const container = document.getElementById('productCheckboxes');
  const products = JSON.parse(localStorage.getItem('herbaprima_products') || '[]');
  container.innerHTML = products.map(p => `
    <label>
      <input type="checkbox" name="related" value="${p.id}"> ${p.name}
    </label>
  `).join('');
}

function setupPreview() {
  const title = document.getElementById('title');
  const summary = document.getElementById('summary');
  const content = document.getElementById('content');
  const image = document.getElementById('image');
  const preview = document.getElementById('preview');

  const updatePreview = () => {
    const imgTag = image.value ? `<img src="${image.value}" alt="Ilustrasi" style="max-width:100%; height:auto; border-radius:8px; margin:12px 0;">` : '';
    preview.innerHTML = `
      <h2>${title.value || 'Judul Artikel'}</h2>
      ${summary.value ? `<p><em>${summary.value}</em></p>` : ''}
      ${imgTag}
      <div>${content.value.replace(/\n/g, '<br>')}</div>
    `;
  };

  [title, summary, content, image].forEach(el => el.addEventListener('input', updatePreview));
}

function saveArticle() {
  const title = document.getElementById('title').value.trim();
  const summary = document.getElementById('summary').value.trim();
  const content = document.getElementById('content').value.trim();
  const image = document.getElementById('image').value.trim();
  const related = Array.from(document.querySelectorAll('input[name="related"]:checked')).map(cb => cb.value);

  if (!title || !content) {
    alert('Judul dan isi wajib diisi!');
    return;
  }

  const article = {
    id: Date.now(),
    slug: createSlug(title),
    title,
    summary,
    content,
    image,
    relatedProducts: related,
    createdAt: new Date().toISOString()
  };

  const articles = JSON.parse(localStorage.getItem('herbaprima_education_articles') || '[]');
  articles.push(article);
  localStorage.setItem('herbaprima_education_articles', JSON.stringify(articles));

  alert('✅ Artikel berhasil disimpan!');
  window.location.href = 'index.html';
}

function exportToHTML() {
  const title = document.getElementById('title').value || 'Artikel Tanpa Judul';
  const summary = document.getElementById('summary').value || '';
  const content = document.getElementById('content').value || '';
  const image = document.getElementById('image').value || '';
  const relatedIds = Array.from(document.querySelectorAll('input[name="related"]:checked')).map(cb => cb.value);

  // Ambil data produk
  const allProducts = JSON.parse(localStorage.getItem('herbaprima_products') || '[]');
  const relatedProducts = allProducts.filter(p => relatedIds.includes(p.id.toString()));

  let productHtml = '';
  if (relatedProducts.length > 0) {
    productHtml = `
      <h2>Produk Terkait</h2>
      <div class="product-grid">
        ${relatedProducts.map(p => `
          <div class="product-card">
            <img src="${p.image}" alt="${p.name}" />
            <h3>${p.name}</h3>
            <p>Harga: Rp ${formatRupiah(p.price)}</p>
            <button onclick="window.open('https://wa.me/6282241900467?text=Saya%20tertarik%20dengan%20${encodeURIComponent(p.name)}', '_blank')">Beli via WhatsApp</button>
          </div>
        `).join('')}
      </div>
    `;
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title} - Herbaprima</title>
  <style>
    body { font-family: Poppins, sans-serif; line-height: 1.6; padding: 20px; max-width: 800px; margin: 0 auto; }
    img { max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0; }
    .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; margin-top: 24px; }
    .product-card img { width: 100%; height: 150px; object-fit: cover; }
    button { background: #2E7D32; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; }
  </style>
</head>
<body>
  <h1>${title}</h1>
  ${summary ? `<p><em>${summary}</em></p>` : ''}
  ${image ? `<img src="${image}" alt="Ilustrasi">` : ''}
  <div>${content.replace(/\n/g, '<br>')}</div>
  ${productHtml}
  <hr>
  <p><a href="/">&larr; Kembali ke Beranda</a></p>
</body>
</html>
  `;

  // Download sebagai file
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${createSlug(title)}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Fungsi bantu (pastikan utils.js menyediakan ini)
function createSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function formatRupiah(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
