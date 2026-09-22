export type Challenge = {
  id: number;
  title: string;
  prompt: string;
  checks: string[];
  simOut: string;
  successMsg: string;
  poin: number;
  answerCode: string;
  penalty: number;
};

export const labData: Record<string, { title: string; challenges: Challenge[] }> = {

  "s2-p7": {
    title: "Virtual Lab 2: Deep Learning & Computer Vision",
    challenges: [
      { id: 1, title: "Tantangan 1: Matriks Gambar", prompt: "Buat variabel array 2D bernama 'piksel' = [[0, 255], [255, 0]]. Cetak nilai dari piksel[0][1].", checks: ['piksel', '255', 'print'], simOut: "255", successMsg: "Benar!", poin: 15, answerCode: "piksel = [[0, 255], [255, 0]]\nprint(piksel[0][1])", penalty: 5 },
      { id: 2, title: "Tantangan 2: Bounding Box (X,Y)", prompt: "Buat fungsi 'luas_box(panjang, lebar)' yang me-return panjang * lebar. Cetak luas_box(50, 40).", checks: ['luas_box', '*', 'print'], simOut: "2000", successMsg: "Tepat!", poin: 20, answerCode: "def luas_box(panjang, lebar):\n    return panjang * lebar\nprint(luas_box(50, 40))", penalty: 5 },
      { id: 3, title: "Tantangan 3: Filter CNN Sederhana", prompt: "Buat variabel 'hasil_filter' = 255 * 0.5. Cetak 'hasil_filter'.", checks: ['hasil_filter', '*', 'print'], simOut: "127.5", successMsg: "Hebat!", poin: 20, answerCode: "hasil_filter = 255 * 0.5\nprint(hasil_filter)", penalty: 5 },
      { id: 4, title: "Tantangan 4: Deteksi Wajah?", prompt: "Buat variabel probabilitas = 0.85. Jika > 0.8, cetak 'Wajah Ditemukan'.", checks: ['probabilitas', '0.8', 'if', 'print'], simOut: "Wajah Ditemukan", successMsg: "Sempurna!", poin: 25, answerCode: "probabilitas = 0.85\nif probabilitas > 0.8:\n    print('Wajah Ditemukan')", penalty: 10 },
      { id: 5, title: "Tantangan 5: Deteksi Warna Merah", prompt: "Warna RGB merah adalah (255,0,0). Buat fungsi is_merah(r) me-return 'Merah' jika r == 255. Cetak is_merah(255).", checks: ['is_merah', '255', 'Merah', 'print'], simOut: "Merah", successMsg: "Luar biasa!", poin: 20, answerCode: "def is_merah(r):\n    if r == 255: return 'Merah'\nprint(is_merah(255))", penalty: 10 }
    ]
  },
  "s2-p8": {
    title: "Virtual Lab 2: Natural Language Processing (NLP)",
    challenges: [
      { id: 1, title: "Tantangan 1: Case Folding (Huruf Kecil)", prompt: "Buat variabel teks = 'HELLO'. Cetak hasil teks.lower().", checks: ['teks', 'lower', 'print'], simOut: "hello", successMsg: "Benar!", poin: 15, answerCode: "teks = 'HELLO'\nprint(teks.lower())", penalty: 5 },
      { id: 2, title: "Tantangan 2: Menghitung Kata", prompt: "Buat array kata = ['Halo', 'Dunia']. Cetak panjang array dengan len().", checks: ['kata', 'len', 'print'], simOut: "2", successMsg: "Tepat!", poin: 20, answerCode: "kata = ['Halo', 'Dunia']\nprint(len(kata))", penalty: 5 },
      { id: 3, title: "Tantangan 3: Filter Sentimen Negatif", prompt: "Buat array review = ['Bagus', 'Jelek']. Cetak review[1].", checks: ['review', '1', 'print'], simOut: "Jelek", successMsg: "Hebat!", poin: 20, answerCode: "review = ['Bagus', 'Jelek']\nprint(review[1])", penalty: 5 },
      { id: 4, title: "Tantangan 4: Robot Penjawab", prompt: "Buat fungsi balas(chat) jika chat=='halo' kembalikan 'Hai juga!'. Cetak balas('halo').", checks: ['balas', 'halo', 'Hai juga!', 'print'], simOut: "Hai juga!", successMsg: "Sempurna!", poin: 25, answerCode: "def balas(chat):\n    if chat == 'halo': return 'Hai juga!'\nprint(balas('halo'))", penalty: 10 },
      { id: 5, title: "Tantangan 5: Tokenisasi Sederhana", prompt: "Buat variabel teks = 'Saya belajar AI'. Cetak hasil teks.split(' ').", checks: ['teks', 'split', 'print'], simOut: "['Saya', 'belajar', 'AI']", successMsg: "Luar biasa!", poin: 20, answerCode: "teks = 'Saya belajar AI'\nprint(teks.split(' '))", penalty: 10 }
    ]
  },


  "s2-p3": {
    title: "Virtual Lab 2: Supervised Learning (Klasifikasi)",
    challenges: [
      { id: 1, title: "Fungsi Klasifikasi Sederhana", prompt: "Buat fungsi 'klasifikasi_hewan(suara)' yang me-return 'Kucing' jika suara=='meong', dan 'Anjing' jika suara=='guk'. Cetak hasil fungsi dengan argumen 'meong'.", checks: ['def', 'klasifikasi_hewan', 'meong', 'Kucing', 'print'], simOut: "Kucing", successMsg: "Benar!", poin: 15, answerCode: "def klasifikasi_hewan(suara):\n    if suara == 'meong': return 'Kucing'\n    return 'Anjing'\nprint(klasifikasi_hewan('meong'))", penalty: 5 },
      { id: 2, title: "Deteksi Kategori Umur", prompt: "Buat fungsi 'kategori_umur(u)' yang me-return 'Dewasa' jika u >= 18, dan 'Anak' jika tidak. Cetak hasil untuk u=15.", checks: ['kategori_umur', 'Dewasa', 'Anak', 'print'], simOut: "Anak", successMsg: "Tepat!", poin: 20, answerCode: "def kategori_umur(u):\n    if u >= 18: return 'Dewasa'\n    return 'Anak'\nprint(kategori_umur(15))", penalty: 5 },
      { id: 3, title: "Prediksi Spam Email", prompt: "Buat variabel 'email' = 'Anda mendapat hadiah 100 juta!'. Jika mengandung kata 'hadiah', cetak 'Spam', selain itu 'Bukan Spam'.", checks: ['email', 'hadiah', 'Spam', 'print'], simOut: "Spam", successMsg: "Hebat!", poin: 20, answerCode: "email = 'Anda mendapat hadiah 100 juta!'\nif 'hadiah' in email:\n    print('Spam')\nelse:\n    print('Bukan Spam')", penalty: 5 },
      { id: 4, title: "Klasifikasi Nilai Ujian", prompt: "Buat fungsi 'grade(n)' yang me-return 'A' jika n >= 90, 'B' jika n >= 80, 'C' untuk lainnya. Cetak hasil untuk n=85.", checks: ['grade', 'A', 'B', 'C', 'print'], simOut: "B", successMsg: "Sempurna!", poin: 25, answerCode: "def grade(n):\n    if n >= 90: return 'A'\n    if n >= 80: return 'B'\n    return 'C'\nprint(grade(85))", penalty: 10 },
      { id: 5, title: "Ekstraksi Fitur Teks", prompt: "Buat variabel 'teks' = 'Hujan lebat'. Hitung dan cetak panjang teks tersebut menggunakan fungsi len().", checks: ['teks', 'len', 'print'], simOut: "11", successMsg: "Luar biasa!", poin: 20, answerCode: "teks = 'Hujan lebat'\nprint(len(teks))", penalty: 10 }
    ]
  },
  "s2-p4": {
    title: "Virtual Lab 2: Supervised Learning (Regresi)",
    challenges: [
      { id: 1, title: "Prediksi Regresi Linear Dasar", prompt: "Diketahui persamaan garis y = 2x + 10. Buat variabel x = 5, hitung dan cetak nilai y.", checks: ['y', 'x', '2', '10', '*', '+', 'print'], simOut: "20", successMsg: "Benar!", poin: 15, answerCode: "x = 5\ny = 2 * x + 10\nprint(y)", penalty: 5 },
      { id: 2, title: "Fungsi Prediksi Harga Rumah", prompt: "Buat fungsi 'prediksi_harga(luas)' yang me-return luas * 5 + 100. Cetak prediksi untuk luas = 50.", checks: ['prediksi_harga', 'luas', '5', '100', 'print'], simOut: "350", successMsg: "Tepat!", poin: 20, answerCode: "def prediksi_harga(luas):\n    return luas * 5 + 100\nprint(prediksi_harga(50))", penalty: 5 },
      { id: 3, title: "Menghitung Mean Absolute Error (MAE)", prompt: "Diketahui prediksi = 350, aktual = 300. Hitung error dengan (prediksi - aktual), dan cetak hasilnya.", checks: ['prediksi', 'aktual', '350', '300', '-', 'print'], simOut: "50", successMsg: "Hebat!", poin: 20, answerCode: "prediksi = 350\naktual = 300\nerror = prediksi - aktual\nprint(error)", penalty: 5 },
      { id: 4, title: "Konversi Suhu (Regresi)", prompt: "Buat fungsi 'celcius_ke_fahrenheit(c)' yang me-return (c * 9/5) + 32. Cetak untuk c = 30.", checks: ['celcius_ke_fahrenheit', '9/5', '32', 'print'], simOut: "86.0", successMsg: "Sempurna!", poin: 25, answerCode: "def celcius_ke_fahrenheit(c):\n    return (c * 9/5) + 32\nprint(celcius_ke_fahrenheit(30))", penalty: 10 },
      { id: 5, title: "Menghitung Total Pendapatan", prompt: "Diberikan array penjualan = [100, 150, 200]. Hitung total menggunakan sum() lalu cetak.", checks: ['penjualan', 'sum', 'print'], simOut: "450", successMsg: "Luar biasa!", poin: 20, answerCode: "penjualan = [100, 150, 200]\nprint(sum(penjualan))", penalty: 10 }
    ]
  },
  "s2-p5": {
    title: "Virtual Lab 2: Unsupervised Learning (Clustering K-Means)",
    challenges: [
      { id: 1, title: "Tantangan 1: Inisialisasi K-Means", prompt: "Buat variabel 'K' = 3 dan 'data_poin' = 150. Cetak nilai dari (data_poin / K).", checks: ['K', '3', 'data_poin', '150', '/', 'print'], simOut: "50.0", successMsg: "Benar!", poin: 15, answerCode: "K = 3\ndata_poin = 150\nprint(data_poin / K)", penalty: 5 },
      { id: 2, title: "Tantangan 2: Titik Pusat (Centroid)", prompt: "Buat list 'centroids' berisi 3 nilai angka bebas (misal 10, 20, 30). Cetak elemen kedua.", checks: ['centroids', 'print'], simOut: "20", successMsg: "Tepat!", poin: 20, answerCode: "centroids = [10, 20, 30]\nprint(centroids[1])", penalty: 5 },
      { id: 3, title: "Tantangan 3: Jarak Titik ke Pusat", prompt: "Buat fungsi 'jarak(a, b)' yang mengembalikan nilai mutlak dari selisih a dan b (Gunakan abs(a - b)). Cetak hasil untuk a=5, b=12.", checks: ['jarak', 'abs', '-', 'print'], simOut: "7", successMsg: "Hebat!", poin: 20, answerCode: "def jarak(a, b):\n    return abs(a - b)\nprint(jarak(5, 12))", penalty: 5 },
      { id: 4, title: "Tantangan 4: Mengelompokkan Data", prompt: "Buat fungsi 'cek_kelompok(nilai)' yang me-return 'Grup A' jika nilai < 50, dan 'Grup B' jika >= 50. Cetak hasil untuk 45.", checks: ['cek_kelompok', 'Grup A', 'Grup B', 'print'], simOut: "Grup A", successMsg: "Sempurna!", poin: 25, answerCode: "def cek_kelompok(nilai):\n    if nilai < 50: return 'Grup A'\n    return 'Grup B'\nprint(cek_kelompok(45))", penalty: 10 },
      { id: 5, title: "Tantangan 5: Rata-rata Klaster", prompt: "Buat array 'klaster' = [10, 20, 30]. Hitung rata-rata dengan (sum(klaster)/len(klaster)) dan cetak.", checks: ['klaster', 'sum', 'len', '/', 'print'], simOut: "20.0", successMsg: "Luar biasa!", poin: 20, answerCode: "klaster = [10, 20, 30]\nrata_rata = sum(klaster)/len(klaster)\nprint(rata_rata)", penalty: 10 }
    ]
  },
  "s2-p6": {
    title: "Virtual Lab 2: Pengantar Jaringan Saraf Tiruan (ANN)",
    challenges: [
      { id: 1, title: "Tantangan 1: Neuron Sederhana", prompt: "Buat fungsi 'neuron(input_val, bobot)' yang me-return input_val * bobot. Cetak hasil dari neuron(5, 0.5).", checks: ['neuron', 'input_val', 'bobot', '*', 'print'], simOut: "2.5", successMsg: "Benar!", poin: 15, answerCode: "def neuron(input_val, bobot):\n    return input_val * bobot\nprint(neuron(5, 0.5))", penalty: 5 },
      { id: 2, title: "Tantangan 2: Menambahkan Bias", prompt: "Buat fungsi 'neuron_bias(i, w, b)' yang me-return (i * w) + b. Cetak hasil untuk i=2, w=3, b=1.", checks: ['neuron_bias', '*', '+', 'print'], simOut: "7", successMsg: "Tepat!", poin: 20, answerCode: "def neuron_bias(i, w, b):\n    return (i * w) + b\nprint(neuron_bias(2, 3, 1))", penalty: 5 },
      { id: 3, title: "Tantangan 3: Fungsi Aktivasi ReLU", prompt: "Buat fungsi 'relu(x)' yang me-return 0 jika x < 0, selain itu me-return x. Cetak hasil untuk x = -5.", checks: ['relu', '<', '0', 'print'], simOut: "0", successMsg: "Hebat!", poin: 20, answerCode: "def relu(x):\n    if x < 0: return 0\n    return x\nprint(relu(-5))", penalty: 5 },
      { id: 4, title: "Tantangan 4: Menghitung Loss (Error)", prompt: "Buat fungsi 'mse(pred, target)' yang me-return (pred - target) ** 2. Cetak hasil untuk pred=10, target=8.", checks: ['mse', '-', '**', '2', 'print'], simOut: "4", successMsg: "Sempurna!", poin: 25, answerCode: "def mse(pred, target):\n    return (pred - target) ** 2\nprint(mse(10, 8))", penalty: 10 },
      { id: 5, title: "Tantangan 5: Jaringan 2 Layer", prompt: "Buat fungsi 'ann(x)' yang mengalikan x dengan 2 (hidden) lalu ditambah 5 (output). Cetak hasil untuk x=10.", checks: ['ann', '*', '2', '+', '5', 'print'], simOut: "25", successMsg: "Luar biasa!", poin: 20, answerCode: "def ann(x):\n    hidden = x * 2\n    output = hidden + 5\n    return output\nprint(ann(10))", penalty: 10 }
    ]
  },

  "s1-p1": {
    title: "Virtual Lab S1-P1: Pengantar Berpikir Komputasional",
    challenges: [
      {
        id: 1,
        title: "Langkah 1: Dekomposisi",
        prompt: "Cetak 'Pecah masalah besar'.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `print('Pecah masalah besar')`,
        penalty: 5
      },
      {
        id: 2,
        title: "Langkah 2: Pengenalan Pola",
        prompt: "Cetak 'Cari pola berulang'.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `print('Cari pola berulang')`,
        penalty: 5
      },
      {
        id: 3,
        title: "Langkah 3: Abstraksi",
        prompt: "Cetak 'Abaikan detail tidak penting'.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `print('Abaikan detail tidak penting')`,
        penalty: 5
      },
      {
        id: 4,
        title: "Langkah 4: Algoritma",
        prompt: "Cetak 'Buat langkah solusi'.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `print('Buat langkah solusi')`,
        penalty: 5
      },
      {
        id: 5,
        title: "Langkah 5: Evaluasi",
        prompt: "Cetak 'Uji solusi yang dibuat'.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `print('Uji solusi yang dibuat')`,
        penalty: 5
      }
    ]
  },
  "s1-p2": {
    title: "Virtual Lab S1-P2: Algoritma dan Pseudocode",
    challenges: [
      {
        id: 1,
        title: "Mulai Algoritma",
        prompt: "Cetak 'Mulai program'.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `print('Mulai program')`,
        penalty: 5
      },
      {
        id: 2,
        title: "Baca Input",
        prompt: "Cetak 'Membaca input dari user'.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `print('Membaca input dari user')`,
        penalty: 5
      },
      {
        id: 3,
        title: "Proses Data",
        prompt: "Cetak 'Melakukan perhitungan'.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `print('Melakukan perhitungan')`,
        penalty: 5
      },
      {
        id: 4,
        title: "Tampilkan Output",
        prompt: "Cetak 'Menampilkan hasil ke layar'.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `print('Menampilkan hasil ke layar')`,
        penalty: 5
      },
      {
        id: 5,
        title: "Selesai Algoritma",
        prompt: "Cetak 'Selesai program'.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `print('Selesai program')`,
        penalty: 5
      }
    ]
  },
  "s1-p3": {
    title: "Virtual Lab S1-P3: Pengenalan Bahasa Pemrograman (Python)",
    challenges: [
      {
        id: 1,
        title: "Hello World",
        prompt: "Cetak teks 'Hello World!'.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `print('Hello World!')`,
        penalty: 5
      },
      {
        id: 2,
        title: "Baris Kedua",
        prompt: "Cetak 'Belajar Python itu seru'.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `print('Belajar Python itu seru')`,
        penalty: 5
      },
      {
        id: 3,
        title: "Komentar di Python",
        prompt: "Buat komentar '# Ini komentar', lalu cetak 'Python'.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `# Ini komentar
print('Python')`,
        penalty: 5
      },
      {
        id: 4,
        title: "Kutip Ganda",
        prompt: "Cetak teks \"Menggunakan kutip ganda\".",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `print("Menggunakan kutip ganda")`,
        penalty: 5
      },
      {
        id: 5,
        title: "Kutip Tunggal",
        prompt: "Cetak teks 'Menggunakan kutip tunggal'.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `print('Menggunakan kutip tunggal')`,
        penalty: 5
      }
    ]
  },
  "s1-p4": {
    title: "Virtual Lab S1-P4: Variabel dan Tipe Data",
    challenges: [
      {
        id: 1,
        title: "Variabel String",
        prompt: "Buat variabel nama='Budi', lalu cetak nama.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `nama = 'Budi'
print(nama)`,
        penalty: 5
      },
      {
        id: 2,
        title: "Variabel Integer",
        prompt: "Buat variabel umur=15, lalu cetak umur.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `umur = 15
print(umur)`,
        penalty: 5
      },
      {
        id: 3,
        title: "Variabel Float",
        prompt: "Buat variabel berat=45.5, lalu cetak berat.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `berat = 45.5
print(berat)`,
        penalty: 5
      },
      {
        id: 4,
        title: "Variabel Boolean",
        prompt: "Buat variabel aktif=True, lalu cetak aktif.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `aktif = True
print(aktif)`,
        penalty: 5
      },
      {
        id: 5,
        title: "Tipe Data",
        prompt: "Cetak hasil dari type(umur) dimana umur=15.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `umur = 15
print(type(umur))`,
        penalty: 5
      }
    ]
  },
  "s1-p5": {
    title: "Virtual Lab S1-P5: Operator Logika dan Aritmatika",
    challenges: [
      {
        id: 1,
        title: "Penjumlahan",
        prompt: "Buat a=10, b=5. Cetak a + b.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `a=10
b=5
print(a+b)`,
        penalty: 5
      },
      {
        id: 2,
        title: "Pengurangan",
        prompt: "Buat a=10, b=5. Cetak a - b.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `a=10
b=5
print(a-b)`,
        penalty: 5
      },
      {
        id: 3,
        title: "Perkalian",
        prompt: "Buat a=10, b=5. Cetak a * b.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `a=10
b=5
print(a*b)`,
        penalty: 5
      },
      {
        id: 4,
        title: "Pembagian",
        prompt: "Buat a=10, b=5. Cetak a / b.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `a=10
b=5
print(a/b)`,
        penalty: 5
      },
      {
        id: 5,
        title: "Modulus",
        prompt: "Cetak sisa bagi dari 10 % 3.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `print(10 % 3)`,
        penalty: 5
      }
    ]
  },
  "s1-p6": {
    title: "Virtual Lab S1-P6: Percabangan (If/Else)",
    challenges: [
      {
        id: 1,
        title: "If Dasar",
        prompt: "Buat x=10. Jika x > 5, cetak 'Lebih besar'.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `x=10
if x>5:
  print('Lebih besar')`,
        penalty: 5
      },
      {
        id: 2,
        title: "If Else",
        prompt: "Buat x=3. Jika x > 5 cetak 'Besar', else cetak 'Kecil'.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `x=3
if x>5:
  print('Besar')
else:
  print('Kecil')`,
        penalty: 5
      },
      {
        id: 3,
        title: "If Elif Else",
        prompt: "Buat x=5. Jika x>5 'Besar', elif x==5 'Sama', else 'Kecil'. Cetak hasilnya.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `x=5
if x>5:
  print('Besar')
elif x==5:
  print('Sama')
else:
  print('Kecil')`,
        penalty: 5
      },
      {
        id: 4,
        title: "Operator Sama Dengan",
        prompt: "Buat x=10. Jika x == 10 cetak 'Sepuluh'.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `x=10
if x==10:
  print('Sepuluh')`,
        penalty: 5
      },
      {
        id: 5,
        title: "Operator Tidak Sama",
        prompt: "Buat x=8. Jika x != 10 cetak 'Bukan Sepuluh'.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `x=8
if x!=10:
  print('Bukan Sepuluh')`,
        penalty: 5
      }
    ]
  },
  "s1-p7": {
    title: "Virtual Lab S1-P7: Perulangan (For/While)",
    challenges: [
      {
        id: 1,
        title: "For Loop Range",
        prompt: "Gunakan for i in range(3): print(i)",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `for i in range(3):
  print(i)`,
        penalty: 5
      },
      {
        id: 2,
        title: "For Loop List",
        prompt: "Buat buah=['apel','jeruk']. Gunakan for untuk cetak elemennya.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `buah=['apel','jeruk']
for b in buah:
  print(b)`,
        penalty: 5
      },
      {
        id: 3,
        title: "While Loop",
        prompt: "Buat i=0. While i < 2: print(i) lalu i+=1.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `i=0
while i<2:
  print(i)
  i+=1`,
        penalty: 5
      },
      {
        id: 4,
        title: "Break",
        prompt: "For i in range(5): if i==2: break. print(i)",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `for i in range(5):
  if i==2:
    break
  print(i)`,
        penalty: 5
      },
      {
        id: 5,
        title: "Continue",
        prompt: "For i in range(3): if i==1: continue. print(i)",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `for i in range(3):
  if i==1:
    continue
  print(i)`,
        penalty: 5
      }
    ]
  },
  "s1-p8": {
    title: "Virtual Lab S1-P8: Fungsi dan Prosedur",
    challenges: [
      {
        id: 1,
        title: "Deklarasi Fungsi",
        prompt: "Buat fungsi sapa() yg mencetak 'Halo'. Panggil fungsi itu.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `def sapa():
  print('Halo')
sapa()`,
        penalty: 5
      },
      {
        id: 2,
        title: "Fungsi dengan Parameter",
        prompt: "Buat fungsi sapa(nama) yg mencetak nama. Panggil sapa('Budi').",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `def sapa(nama):
  print(nama)
sapa('Budi')`,
        penalty: 5
      },
      {
        id: 3,
        title: "Fungsi dengan Return",
        prompt: "Buat fungsi tambah(a,b) return a+b. Cetak tambah(2,3).",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `def tambah(a,b):
  return a+b
print(tambah(2,3))`,
        penalty: 5
      },
      {
        id: 4,
        title: "Fungsi Default Argumen",
        prompt: "Buat fungsi sapa(nama='Tamu') yg mencetak nama. Panggil sapa().",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `def sapa(nama='Tamu'):
  print(nama)
sapa()`,
        penalty: 5
      },
      {
        id: 5,
        title: "Fungsi Prosedur",
        prompt: "Buat fungsi garis() yg mencetak '---'. Panggil fungsi itu.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `def garis():
  print('---')
garis()`,
        penalty: 5
      }
    ]
  },
  "s1-p9": {
    title: "Virtual Lab S1-P9: Struktur Data Dasar (List, Array)",
    challenges: [
      {
        id: 1,
        title: "Membuat List",
        prompt: "Buat list arr=[1, 2, 3]. Cetak arr.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `arr = [1, 2, 3]
print(arr)`,
        penalty: 5
      },
      {
        id: 2,
        title: "Akses List",
        prompt: "Buat arr=['a','b','c']. Cetak elemen pertama (indeks 0).",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `arr=['a','b','c']
print(arr[0])`,
        penalty: 5
      },
      {
        id: 3,
        title: "Tambah List",
        prompt: "Buat arr=[1,2]. Gunakan arr.append(3). Cetak arr.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `arr=[1,2]
arr.append(3)
print(arr)`,
        penalty: 5
      },
      {
        id: 4,
        title: "Hapus List",
        prompt: "Buat arr=[1,2,3]. Gunakan arr.pop(). Cetak arr.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `arr=[1,2,3]
arr.pop()
print(arr)`,
        penalty: 5
      },
      {
        id: 5,
        title: "Panjang List",
        prompt: "Buat arr=[1,2]. Cetak panjangnya dengan len(arr).",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `arr=[1,2]
print(len(arr))`,
        penalty: 5
      }
    ]
  },
  "s1-p10": {
    title: "Virtual Lab S1-P10: Penanganan Error (Debugging)",
    challenges: [
      {
        id: 1,
        title: "Try Except Blok",
        prompt: "Coba print(1/0) dalam blok try, tangkap dengan except lalu print('Error').",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `try:
  print(1/0)
except:
  print('Error')`,
        penalty: 5
      },
      {
        id: 2,
        title: "ValueError",
        prompt: "Coba print(int('a')) dalam try, except ValueError: print('Salah nilai').",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `try:
  print(int('a'))
except ValueError:
  print('Salah nilai')`,
        penalty: 5
      },
      {
        id: 3,
        title: "Try Except Else",
        prompt: "Gunakan try: print(1) except: print('Err') else: print('Aman').",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `try:
  print(1)
except:
  print('Err')
else:
  print('Aman')`,
        penalty: 5
      },
      {
        id: 4,
        title: "Try Finally",
        prompt: "Gunakan try: print(1) finally: print('Selesai').",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `try:
  print(1)
finally:
  print('Selesai')`,
        penalty: 5
      },
      {
        id: 5,
        title: "Raise Exception",
        prompt: "Gunakan raise Exception('Uji coba') di dalam blok try, dan tangkap di except.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `try:
  raise Exception('Uji coba')
except:
  print('Tertangkap')`,
        penalty: 5
      }
    ]
  },
  "s1-p11": {
    title: "Virtual Lab S1-P11: Studi Kasus Algoritma Terapan",
    challenges: [
      {
        id: 1,
        title: "Cari Nilai Maksimal",
        prompt: "Gunakan fungsi max([1,5,3]) lalu cetak hasilnya.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `print(max([1,5,3]))`,
        penalty: 5
      },
      {
        id: 2,
        title: "Cari Nilai Minimal",
        prompt: "Gunakan fungsi min([1,5,3]) lalu cetak hasilnya.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `print(min([1,5,3]))`,
        penalty: 5
      },
      {
        id: 3,
        title: "Urutkan Angka",
        prompt: "Buat arr=[3,1,2]. Gunakan arr.sort(). Cetak arr.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `arr=[3,1,2]
arr.sort()
print(arr)`,
        penalty: 5
      },
      {
        id: 4,
        title: "Jumlahkan Angka",
        prompt: "Gunakan fungsi sum([1,2,3]) lalu cetak.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `print(sum([1,2,3]))`,
        penalty: 5
      },
      {
        id: 5,
        title: "Pembalik Urutan",
        prompt: "Buat arr=[1,2,3]. Gunakan arr.reverse(). Cetak arr.",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `arr=[1,2,3]
arr.reverse()
print(arr)`,
        penalty: 5
      }
    ]
  },
  "s1-p12": {
    title: "Virtual Lab S1-P12: Projek Nyata - Kalkulator Pintar",
    challenges: [
      {
        id: 1,
        title: "Fungsi Tambah",
        prompt: "Buat fungsi tambah(a,b) return a+b. Cetak tambah(5,5).",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `def tambah(a,b): return a+b
print(tambah(5,5))`,
        penalty: 5
      },
      {
        id: 2,
        title: "Fungsi Kurang",
        prompt: "Buat fungsi kurang(a,b) return a-b. Cetak kurang(10,5).",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `def kurang(a,b): return a-b
print(kurang(10,5))`,
        penalty: 5
      },
      {
        id: 3,
        title: "Fungsi Kali",
        prompt: "Buat fungsi kali(a,b) return a*b. Cetak kali(2,3).",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `def kali(a,b): return a*b
print(kali(2,3))`,
        penalty: 5
      },
      {
        id: 4,
        title: "Fungsi Bagi",
        prompt: "Buat fungsi bagi(a,b) return a/b. Cetak bagi(10,2).",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `def bagi(a,b): return a/b
print(bagi(10,2))`,
        penalty: 5
      },
      {
        id: 5,
        title: "Kalkulator Utama",
        prompt: "Buat fungsi hitung(op, a, b) yg mengecek op '+','-','*','/'. Panggil hitung('+', 1, 1).",
        checks: ['print'], 
        simOut: "Sukses",
        successMsg: "Sempurna!",
        poin: 15,
        answerCode: `def hitung(op, a, b):
  if op=='+': return a+b
  if op=='-': return a-b
  if op=='*': return a*b
  if op=='/': return a/b
print(hitung('+', 1, 1))`,
        penalty: 5
      }
    ]
  },
  "s2-p1": {
    title: "Virtual Lab 2: Sejarah & Konsep Dasar AI",
    challenges: [
      {
        id: 1, title: "Tahun Kelahiran AI", prompt: "Alan Turing memperkenalkan 'Turing Test' pada tahun 1950. Cetak tahun tersebut ke konsol menggunakan perintah print.", checks: ['print', '1950'], simOut: "1950", successMsg: "Tepat sekali!", poin: 15, answerCode: "print(1950)", penalty: 5
      },
      {
        id: 2, title: "Deklarasi Tokoh AI", prompt: "Buat variabel bernama 'tokoh' dan isi dengan teks 'Alan Turing'. Kemudian cetak variabel tersebut.", checks: ['tokoh', 'Alan Turing', 'print'], simOut: "Alan Turing", successMsg: "Bagus!", poin: 20, answerCode: "tokoh = 'Alan Turing'\nprint(tokoh)", penalty: 5
      },
      {
        id: 3, title: "Simulasi Turing Test", prompt: "Buat variabel 'skor' = 85. Jika skor lebih dari 80, cetak 'Lolos Turing Test'.", checks: ['skor', '85', 'if', '80', 'print', 'Lolos Turing Test'], simOut: "Lolos Turing Test", successMsg: "Luar biasa!", poin: 25, answerCode: "skor = 85\nif skor > 80:\n    print('Lolos Turing Test')", penalty: 10
      },
      {
        id: 4, title: "Sejarah Kemenangan AI", prompt: "Buat list (array) bernama 'ai_wins' berisi: 'Deep Blue' dan 'AlphaGo'. Lalu cetak elemen kedua.", checks: ['ai_wins', 'Deep Blue', 'AlphaGo', 'print'], simOut: "AlphaGo", successMsg: "Hebat!", poin: 25, answerCode: "ai_wins = ['Deep Blue', 'AlphaGo']\nprint(ai_wins[1])", penalty: 10
      },
      {
        id: 5, title: "Kamus Data Era AI", prompt: "Buat dictionary bernama 'era' berisi {'1950': 'Turing', '2020': 'LLM'}. Cetak dictionary tersebut.", checks: ['era', '{', "'1950'", 'print'], simOut: "{'1950': 'Turing', '2020': 'LLM'}", successMsg: "Sempurna!", poin: 30, answerCode: "era = {'1950': 'Turing', '2020': 'LLM'}\nprint(era)", penalty: 15
      }
    ]
  },
  "s2-p2": {
    title: "Virtual Lab 2: Machine Learning vs Konvensional",
    challenges: [
      {
        id: 1, title: "Aturan Pasti", prompt: "Buat variabel sisi = 5, volume = sisi * sisi * sisi, dan cetak volume.", checks: ['sisi', '5', 'volume', '*', 'print'], simOut: "125", successMsg: "Benar!", poin: 15, answerCode: "sisi = 5\nvolume = sisi * sisi * sisi\nprint(volume)", penalty: 5
      },
      {
        id: 2, title: "Rule-Based System", prompt: "Buat variabel pesan = 'Selamat menang hadiah'. Jika kata 'hadiah' ada di dalam pesan, cetak 'SPAM'.", checks: ['pesan', 'hadiah', 'in', 'if', 'print', 'SPAM'], simOut: "SPAM", successMsg: "Keren!", poin: 20, answerCode: "pesan = 'Selamat menang hadiah'\nif 'hadiah' in pesan:\n    print('SPAM')", penalty: 10
      },
      {
        id: 3, title: "Bobot & Bias", prompt: "Misal W = 0.8, B = 2. Jika input X = 10, prediksi Y = W * X + B. Cetak nilai Y.", checks: ['0.8', '2', '10', '*', '+', 'print'], simOut: "10.0", successMsg: "Super!", poin: 25, answerCode: "W = 0.8\nB = 2\nX = 10\nY = W * X + B\nprint(Y)", penalty: 10
      },
      {
        id: 4, title: "Feature Extraction", prompt: "Cari tahu berapa jumlah huruf 'A' pada teks 'APEL DAN ANGGUR'. Gunakan .count('A').", checks: ['count', "'A'", 'print'], simOut: "3", successMsg: "Cerdas!", poin: 25, answerCode: "teks = 'APEL DAN ANGGUR'\nprint(teks.count('A'))", penalty: 10
      },
      {
        id: 5, title: "Evaluasi Akurasi", prompt: "Prediksi 85 dari total 100 benar. Hitung akurasi (benar / total * 100) dan cetak.", checks: ['85', '100', '/', '*', 'print'], simOut: "85.0", successMsg: "Luar biasa!", poin: 30, answerCode: "benar = 85\ntotal = 100\nakurasi = (benar / total) * 100\nprint(akurasi)", penalty: 15
      }
    ]
  }
,
  "s2-p9": {
    title: "Virtual Lab 9: Reinforcement Learning & AI Agents",
    challenges: [
      {
        id: 1, title: "Inisialisasi Environment", prompt: "Buat variabel environment = 'Mario Level 1'. Cetak state awal dari environment tersebut.", checks: ['environment', 'Mario Level 1', 'print'], simOut: "Mario Level 1", successMsg: "Berhasil inisialisasi lingkungan!", poin: 15, answerCode: "environment = 'Mario Level 1'\nprint(environment)", penalty: 5
      },
      {
        id: 2, title: "Action Pilihan", prompt: "Ada 3 aksi: ['Lompat', 'Maju', 'Mundur']. Cetak aksi ke-0 (Lompat).", checks: ['Lompat', 'Maju', 'Mundur', '[0]', 'print'], simOut: "Lompat", successMsg: "Aksi berhasil dipilih!", poin: 20, answerCode: "aksi = ['Lompat', 'Maju', 'Mundur']\nprint(aksi[0])", penalty: 10
      },
      {
        id: 3, title: "Sistem Reward", prompt: "Buat variabel reward = 0. Jika variabel aksi_pilih = 'Lompat', tambahkan reward sebesar +10. Cetak reward.", checks: ['reward', 'aksi_pilih', 'Lompat', '+=', '10', 'print'], simOut: "10", successMsg: "Bot mendapat poin atas aksinya!", poin: 25, answerCode: "reward = 0\naksi_pilih = 'Lompat'\nif aksi_pilih == 'Lompat':\n    reward += 10\nprint(reward)", penalty: 10
      },
      {
        id: 4, title: "Sistem Penalti", prompt: "Jika variabel aksi_pilih = 'Diam' dan posisi = 'Jebakan', kurangi reward -50. Cetak reward setelah penalti.", checks: ['Diam', 'Jebakan', '-=', '50', 'print'], simOut: "-50", successMsg: "Aksi negatif mendapatkan penalti!", poin: 25, answerCode: "reward = 0\naksi_pilih = 'Diam'\nposisi = 'Jebakan'\nif aksi_pilih == 'Diam' and posisi == 'Jebakan':\n    reward -= 50\nprint(reward)", penalty: 10
      },
      {
        id: 5, title: "Q-Table Update", prompt: "Buat dictionary q_table = {'State_A_Maju': 5}. Perbarui nilainya menjadi 15 karena berhasil. Cetak q_table.", checks: ['q_table', 'State_A_Maju', '15', 'print'], simOut: "{'State_A_Maju': 15}", successMsg: "Sempurna! Bot belajar dari pengalamannya.", poin: 30, answerCode: "q_table = {'State_A_Maju': 5}\nq_table['State_A_Maju'] = 15\nprint(q_table)", penalty: 15
      }
    ]
  },
  "s2-p10": {
    title: "Virtual Lab 10: Generative AI & Etika AI",
    challenges: [
      {
        id: 1, title: "Kreativitas Prompt", prompt: "Buat variabel prompt = 'Buatkan puisi tentang laut'. Cetak prompt tersebut.", checks: ['prompt', 'puisi tentang laut', 'print'], simOut: "Buatkan puisi tentang laut", successMsg: "Prompt siap dikirim ke LLM!", poin: 15, answerCode: "prompt = 'Buatkan puisi tentang laut'\nprint(prompt)", penalty: 5
      },
      {
        id: 2, title: "Injeksi Sistem", prompt: "Gabungkan variabel system_role = 'Kamu adalah dokter' dengan prompt user = 'Sakit kepala'. Cetak gabungannya.", checks: ['system_role', 'dokter', 'Sakit kepala', '+', 'print'], simOut: "Kamu adalah dokter Sakit kepala", successMsg: "Role system berhasil diatur!", poin: 20, answerCode: "system_role = 'Kamu adalah dokter '\nuser = 'Sakit kepala'\nprint(system_role + user)", penalty: 10
      },
      {
        id: 3, title: "Filter Data Sensitif", prompt: "Jika teks output AI mengandung kata 'password', ganti teks menjadi '[SENSOR]'. Gunakan .replace(). Cetak hasilnya.", checks: ['replace', 'password', '[SENSOR]', 'print'], simOut: "Ini adalah [SENSOR] kamu", successMsg: "Sistem keamanan berjalan baik!", poin: 25, answerCode: "output_ai = 'Ini adalah password kamu'\noutput_aman = output_ai.replace('password', '[SENSOR]')\nprint(output_aman)", penalty: 10
      },
      {
        id: 4, title: "Discriminator GANs", prompt: "Buat variabel skor_generator = 0.9. Jika skor > 0.8, cetak 'Lolos Ujian Palsu', jika tidak cetak 'Terdeteksi Palsu'.", checks: ['0.9', '0.8', 'if', 'else', 'print', 'Lolos Ujian Palsu'], simOut: "Lolos Ujian Palsu", successMsg: "Cerdas! Generator berhasil menipu Discriminator.", poin: 25, answerCode: "skor_generator = 0.9\nif skor_generator > 0.8:\n    print('Lolos Ujian Palsu')\nelse:\n    print('Terdeteksi Palsu')", penalty: 10
      },
      {
        id: 5, title: "Siklus Pelatihan GANs", prompt: "Gunakan for loop dari i=1 hingga 3. Di dalam loop, cetak 'Epoch ' + str(i).", checks: ['for', 'range', '1', '4', 'print', 'str', 'Epoch'], simOut: "Epoch 1\nEpoch 2\nEpoch 3", successMsg: "Luar biasa! Pelatihan berhasil.", poin: 30, answerCode: "for i in range(1, 4):\n    print('Epoch ' + str(i))", penalty: 15
      }
    ]
  }

,
  "s2-p11": {
    title: "Virtual Lab 11: AIoT (AI & Internet of Things)",
    challenges: [
      {
        id: 1, title: "Sensor Suhu", prompt: "Buat variabel suhu = 35. Jika suhu > 30, cetak 'Nyalakan Kipas', jika tidak cetak 'Kipas Mati'.", checks: ['suhu', '35', '30', 'if', 'else', 'print', 'Nyalakan Kipas'], simOut: "Nyalakan Kipas", successMsg: "Logika IoT berhasil bekerja!", poin: 15, answerCode: "suhu = 35\nif suhu > 30:\n    print('Nyalakan Kipas')\nelse:\n    print('Kipas Mati')", penalty: 5
      },
      {
        id: 2, title: "Sensor Jarak (Ultrasonik)", prompt: "Jarak mobil dengan dinding = 20 cm. Jika jarak < 50, cetak 'AWAS NABRAK'.", checks: ['jarak', '20', '<', '50', 'print', 'AWAS NABRAK'], simOut: "AWAS NABRAK", successMsg: "Sensor parkir aktif!", poin: 20, answerCode: "jarak = 20\nif jarak < 50:\n    print('AWAS NABRAK')", penalty: 10
      },
      {
        id: 3, title: "Smart Light (Lampu Pintar)", prompt: "Buat variabel jam = 19. Jika jam >= 18 atau jam <= 5, cetak 'Lampu Menyala'.", checks: ['jam', '19', '18', '5', 'or', 'print', 'Lampu Menyala'], simOut: "Lampu Menyala", successMsg: "Otomasi rumah cerdas berfungsi baik!", poin: 25, answerCode: "jam = 19\nif jam >= 18 or jam <= 5:\n    print('Lampu Menyala')", penalty: 10
      },
      {
        id: 4, title: "Deteksi Pergerakan (PIR)", prompt: "Ada gerakan = True, Mode Keamanan = True. Jika keduanya True, cetak 'Bunyikan Alarm'.", checks: ['True', 'and', 'if', 'print', 'Bunyikan Alarm'], simOut: "Bunyikan Alarm", successMsg: "Sistem keamanan berjalan responsif!", poin: 25, answerCode: "gerakan = True\nmode_keamanan = True\nif gerakan and mode_keamanan:\n    print('Bunyikan Alarm')", penalty: 10
      },
      {
        id: 5, title: "Simulasi Edge AI", prompt: "Ada list data = [10, 50, 90, 20]. Cari nilai maksimum menggunakan fungsi max(), lalu cetak 'Puncak: ' + nilai max.", checks: ['data', 'max', 'print', 'Puncak:'], simOut: "Puncak: 90", successMsg: "Analitik Edge berhasil!", poin: 30, answerCode: "data = [10, 50, 90, 20]\npuncak = max(data)\nprint('Puncak: ' + str(puncak))", penalty: 15
      }
    ]
  },
  "s2-p12": {
    title: "Virtual Lab 12: Deployment & API",
    challenges: [
      {
        id: 1, title: "Persiapan JSON", prompt: `Buat string JSON: data = '{"nama": "AI Model", "versi": 1}'. Cetak data tersebut.`, checks: ['data', 'nama', 'AI Model', 'print'], simOut: '{"nama": "AI Model", "versi": 1}', successMsg: "JSON siap ditransmisikan!", poin: 15, answerCode: `data = '{"nama": "AI Model", "versi": 1}'\nprint(data)`, penalty: 5
      },
      {
        id: 2, title: "Membuat URL Endpoint", prompt: "Buat variabel url_api = 'https://api.modelku.com/predict'. Cetak URL tersebut.", checks: ['url_api', 'predict', 'print'], simOut: "https://api.modelku.com/predict", successMsg: "Endpoint berhasil didefinisikan!", poin: 20, answerCode: "url_api = 'https://api.modelku.com/predict'\nprint(url_api)", penalty: 10
      },
      {
        id: 3, title: "Simulasi Request HTTP", prompt: "Buat variabel status_code = 200. Jika 200, cetak 'Request Berhasil'. Jika 404, cetak 'Not Found'.", checks: ['status_code', '200', '404', 'if', 'else', 'print'], simOut: "Request Berhasil", successMsg: "Koneksi API sukses!", poin: 25, answerCode: "status_code = 200\nif status_code == 200:\n    print('Request Berhasil')\nelse:\n    print('Not Found')", penalty: 10
      },
      {
        id: 4, title: "Routing Web Dasar", prompt: "Variabel rute = '/home'. Jika rute == '/', cetak 'Beranda'. Jika rute == '/home', cetak 'Dasbor'.", checks: ['rute', '/home', '/', 'if', 'print', 'Dasbor'], simOut: "Dasbor", successMsg: "Routing berhasil dikonfigurasi!", poin: 25, answerCode: "rute = '/home'\nif rute == '/':\n    print('Beranda')\nelif rute == '/home':\n    print('Dasbor')", penalty: 10
      },
      {
        id: 5, title: "Uji Stabilitas Server", prompt: "Gunakan perulangan 1 hingga 3. Cetak 'Ping ke-' + angka perulangan.", checks: ['for', 'range', '1', '4', 'print', 'str', 'Ping ke-'], simOut: "Ping ke-1\nPing ke-2\nPing ke-3", successMsg: "Server stabil. AI siap melayani publik!", poin: 30, answerCode: "for i in range(1, 4):\n    print('Ping ke-' + str(i))", penalty: 15
      }
    ]
  }

};
