// utils.js – Fungsi umum untuk seluruh website Herbaprima

/**
 * Buat slug dari judul (untuk URL)
 * Contoh: "Herba PrimA 123!" → "herba-prima-123"
 */
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')   // hapus karakter non-alfanumerik kecuali spasi & strip
    .replace(/[\s-]+/g, '-')         // ganti spasi/strip berlebih jadi satu strip
    .replace(/^-+|-+$/g, '');        // hapus strip di awal/akhir
}

/**
 * Format angka jadi Rupiah dengan titik ribuan
 * Contoh: 70000 → "70.000"
 */
function formatNumber(num) {
  if (typeof num === 'string') num = parseInt(num);
  if (isNaN(num)) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Format harga lengkap dengan simbol
 * Contoh: 70000 → "Rp 70.000"
 */
function formatRupiah(num) {
  return 'Rp ' + formatNumber(num);
}

// Export untuk lingkungan modern (opsional, tidak wajib untuk browser biasa)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createSlug, formatNumber, formatRupiah };
}
