// Data produk — sesuai data yang Anda berikan
const products = [
  {
    id: "madu-pahit",
    name: "Madu Pahit",
    category: "Madu Premium",
    price: 120000,
    image: "https://argea-gh.github.io/myweb16/assets/images/products/madu_pahit.png",
    description: "Madu herbal pahit premium dari lebah hutan, kaya enzim & antioksidan.",
    benefits: ["Menjaga daya tahan tubuh", "Membantu metabolisme", "Mendukung kesehatan hati"],
    composition: "100% Madu murni dari nektar bunga hutan"
  },
  {
    id: "centella-teh",
    name: "Centella Teh Sinergi",
    category: "Minuman Sehat",
    price: 70000,
    image: "https://argea-gh.github.io/myweb16/assets/images/products/centella_teh.png",
    description: "Teh herbal Centella asiatica (daun kaki kuda) untuk relaksasi & sirkulasi darah.",
    benefits: ["Meningkatkan sirkulasi", "Meredakan stres", "Membantu kesegaran mental"],
    composition: "Ekstrak Centella asiatica, daun teh hijau, stevia"
  },
  {
    id: "deep-olive",
    name: "Deep Olive",
    category: "Minyak Herba",
    price: 145000,
    image: "https://argea-gh.github.io/myweb16/assets/images/products/deep_olive.png",
    description: "Minyak zaitun extra virgin dengan campuran herbal sinergi untuk pijat & perawatan.",
    benefits: ["Mengurangi nyeri otot", "Melembutkan kulit", "Membantu relaksasi"],
    composition: "Olive oil, ekstrak jahe, serai, kayu putih, minyak bijan"
  },
  {
    id: "etta-goat",
    name: "Etta Goat Milk",
    category: "Minuman Sehat",
    price: 75000,
    image: "https://argea-gh.github.io/myweb16/assets/images/products/etta_goatmilk.png",
    description: "Susu kambing etawa bubuk, tinggi kalsium & protein, mudah dicerna.",
    benefits: ["Memperkuat tulang", "Meningkatkan imunitas", "Cocok untuk lansia & anak"],
    composition: "Susu kambing etawa bubuk, madu, kurma"
  },
  {
    id: "madu-multiflora",
    name: "Madu Multiflora",
    category: "Madu Premium",
    price: 100000,
    image: "https://argea-gh.github.io/myweb16/assets/images/products/madu_multiflora.png",
    description: "Madu campur nektar berbagai bunga alami, rasa manis seimbang & kaya nutrisi.",
    benefits: ["Sumber energi alami", "Membantu pencernaan", "Menjaga kesehatan saluran napas"],
    composition: "100% madu multiflora murni"
  },
  {
    id: "madu-habbat",
    name: "Madu Habbat",
    category: "Madu Premium",
    price: 130000,
    image: "https://argea-gh.github.io/myweb16/assets/images/products/madu_habbat.png",
    description: "Madu premium dengan ekstrak habbatussauda (jinten hitam) untuk imunitas ekstra.",
    benefits: ["Meningkatkan daya tahan", "Anti-inflamasi alami", "Membantu kesehatan pernapasan"],
    composition: "Madu multiflora, ekstrak habbatussauda, minyak habbatussauda"
  },
  {
    id: "hni-coffee",
    name: "HNI Coffee",
    category: "Minuman Sehat",
    price: 125000,
    image: "https://argea-gh.github.io/myweb16/assets/images/products/coffee_hni.png",
    description: "Kopi herbal dengan madu & ginseng, tanpa gula tambahan.",
    benefits: ["Meningkatkan fokus", "Tanpa efek jantung berdebar", "Tanpa gula"],
    composition: "Kopi robusta, madu, ekstrak ginseng, jahe"
  },
  {
    id: "hania-fc",
    name: "Hania Susu Kambing Full Cream",
    category: "Minuman Sehat",
    price: 75000,
    image: "https://argea-gh.github.io/myweb16/assets/images/products/hania_goatmilk.png",
    description: "Susu kambing full cream, tinggi lemak sehat & kalsium.",
    benefits: ["Meningkatkan berat badan sehat", "Memperkuat gigi & tulang", "Cocok untuk pemulihan"],
    composition: "Susu kambing full cream, madu"
  },
  {
    id: "sevel-stamina",
    name: "Sevel Stamina",
    category: "Minuman Sehat",
    price: 115000,
    image: "https://argea-gh.github.io/myweb16/assets/images/products/sevel_stamina.png",
    description: "Minuman herbal penambah stamina pria & wanita, berbasis madu & ginseng.",
    benefits: ["Meningkatkan vitalitas", "Mengurangi kelelahan", "Meningkatkan daya tahan"],
    composition: "Madu, ekstrak ginseng, tribulus, purwoceng"
  },
  {
    id: "cappucino-less",
    name: "Hania Cappuccino Less Sugar",
    category: "Minuman Sehat",
    price: 50000,
    image: "https://argea-gh.github.io/myweb16/assets/images/products/hania_realco.png",
    description: "Cappuccino rendah gula dengan susu kambing & madu.",
    benefits: ["Rendah gula", "Rasa nikmat tanpa bersalah", "Cocok untuk diet"],
    composition: "Kopi, susu kambing, madu, stevia"
  },
  {
    id: "madu-health",
    name: "Madu HNI Health",
    category: "Madu Premium",
    price: 80000,
    image: "https://argea-gh.github.io/myweb16/assets/images/products/madu_hni_health.png",
    description: "Madu harian keluarga, diformulasi khusus untuk kesehatan menyeluruh.",
    benefits: ["Pemeliharaan kesehatan harian", "Aman untuk anak & dewasa", "Rasa manis alami"],
    composition: "Madu multiflora, propolis, royal jelly"
  },
  {
    id: "gluta-juicy",
    name: "Hania Gluta Juicy Drink",
    category: "Minuman Sehat",
    price: 185000,
    image: "https://argea-gh.github.io/myweb16/assets/images/products/hania_gluta.png",
    description: "Minuman glutation untuk kulit cerah & antioksidan tinggi.",
    benefits: ["Mencerahkan kulit", "Anti penuaan", "Detoks alami"],
    composition: "Glutation, vitamin C, ekstrak delima, madu"
  },
  {
    id: "mahkota-dara",
    name: "Mahkota Dara",
    category: "Aneka Herbal",
    price: 200000,
    image: "https://argea-gh.github.io/myweb16/assets/images/products/mahkota_dara.png",
    description: "Herbal khusus wanita untuk kesegaran & kesehatan reproduksi.",
    benefits: ["Menjaga kesehatan organ kewanitaan", "Mengurangi keputihan", "Menyeimbangkan hormon"],
    composition: "Ekstrak daun sirih, kunyit, temu lawak, mahkota dewa"
  },
  {
    id: "habbats-kapsul",
    name: "Habbatusauda Kapsul",
    category: "Aneka Herbal",
    price: 60000,
    image: "https://argea-gh.github.io/myweb16/assets/images/products/habbatussauda.png",
    description: "Kapsul habbatussauda 100% murni, untuk imunitas & kesehatan jantung.",
    benefits: ["Meningkatkan imunitas", "Menurunkan kolesterol", "Anti radang"],
    composition: "100% minyak habbatussauda murni"
  },
  {
    id: "mhs-hot",
    name: "Minyak Herba Sinergi Hot",
    category: "Minyak Herba",
    price: 55000,
    image: "https://argea-gh.github.io/myweb16/assets/images/products/minyak_herba_hot.png",
    description: "Minyak gosok hangat untuk nyeri otot, pegal, dan masuk angin.",
    benefits: ["Menghangatkan tubuh", "Mengurangi nyeri sendi", "Meredakan masuk angin"],
    composition: "Minyak kelapa, jahe, serai, kayu putih, cengkeh"
  },
  {
    id: "zareen-serum",
    name: "Zareen Bright Glow Serum",
    category: "Perawatan Kulit",
    price: 70000,
    image: "https://argea-gh.github.io/myweb16/assets/images/products/zareen_serum.png",
    description: "Serum wajah herbal untuk mencerahkan & melembabkan kulit.",
    benefits: ["Mencerahkan kulit", "Mengurangi noda", "Melembabkan alami"],
    composition: "Ekstrak licorice, niacinamide alami, aloe vera, madu"
  },
  {
    id: "sabun-kolagen",
    name: "Sabun Kolagen",
    category: "Perawatan Kulit",
    price: 25000,
    image: "https://argea-gh.github.io/myweb16/assets/images/products/sabun_kolagen.png",
    description: "Sabun herbal dengan kolagen alami untuk kekenyalan kulit.",
    benefits: ["Mengencangkan kulit", "Mengurangi keriput", "Mengangkat kotoran"],
    composition: "Kolagen ikan, susu kambing, ekstrak chamomile"
  },
  {
    id: "hibis-panty",
    name: "Hibis Pantyliner",
    category: "Perawatan Pribadi",
    price: 225000,
    image: "https://argea-gh.github.io/myweb16/assets/images/products/hibis_panty.png",
    description: "Pantyliner herbal dengan ekstrak daun sirih & chamomile.",
    benefits: ["Menjaga kesegaran", "Anti bakteri alami", "Aman untuk sensitif"],
    composition: "Kapas organik, ekstrak daun sirih, chamomile, tea tree oil"
  },
    {
    id: "zidavit",
    name: "Madu Zidavit",
    category: "madu Premium",
    price: 80000,
    image: "assets/images/products/madu_zidavit.webp",
    description: "Suplemen multivitamin alami berbentuk cairan oral yang diformulasikan khusus untuk mendukung masa keemasan (golden age) pertumbuhan anak. Produk ini mengombinasikan kebaikan madu murni dengan ekstrak herbal pilihan serta minyak ikan sidat untuk memberikan nutrisi lengkap bagi tubuh dan otak anak. Dengan rasa jeruk yang segar, Zidavit menjadi solusi praktis bagi orang tua untuk memastikan buah hati tetap sehat dan cerdas.",
    benefits: ["Menjaga kesegaran", "Anti bakteri alami", "Aman untuk sensitif"],
    composition: "Kapas organik, ekstrak daun sirih, chamomile, tea tree oil"
  }
];

// Ekspor untuk main.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { products };
}
