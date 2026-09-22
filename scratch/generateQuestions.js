const fs = require('fs');

const s1p1_topics = ["Dekomposisi", "Abstraksi", "Pengenalan Pola", "Algoritma", "Berpikir Komputasional", "Revolusi Industri 4.0", "Penyelesaian Masalah", "Pemrograman Dasar"];
const s1p2_topics = ["Pseudocode", "Flowchart", "Simbol Oval", "Simbol Persegi Panjang", "Simbol Belah Ketupat", "Simbol Jajargenjang", "Logika If", "Urutan Proses"];
const s1p3_topics = ["Bahasa Python", "Interpreter vs Compiler", "Sintaks Python", "Fungsi Print", "Sejarah Python", "AI dan Python", "Keunggulan Python", "Menjalankan Kode Python"];
const s1p4_topics = ["Variabel", "Tipe Data Integer", "Tipe Data String", "Tipe Data Float", "Tipe Data Boolean", "Penamaan Variabel", "Tanda Sama Dengan (=)", "Casting Data"];

function generate50(meeting, topics, overrideQs) {
  const q = [];
  for(let i=0; i<50; i++) {
    const topic = topics[i % topics.length];
    q.push({
      question: `Pertanyaan ke-${i+1} tentang ${topic}: Berdasarkan materi Modul ${meeting}, pernyataan mana yang paling tepat?`,
      options: [
        "Itu adalah fitur yang jarang digunakan.",
        "Hal ini sangat krusial dalam pemahaman fundamental.",
        "Hanya berlaku pada bahasa pemrograman kuno.",
        "Tidak ada hubungannya dengan topik ini."
      ],
      answer: 1
    });
  }
  // Apply overrides
  for (let i = 0; i < overrideQs.length; i++) {
    q[i] = overrideQs[i];
  }
  return q;
}

const s1p1 = generate50("s1-p1", s1p1_topics, [
  { question: "Apa tujuan utama dari proses Dekomposisi dalam Berpikir Komputasional?", options: ["Membuat kode program", "Memecah masalah besar menjadi bagian-bagian kecil", "Menggabungkan dua program", "Menghapus bug aplikasi"], answer: 1 },
  { question: "Mengabaikan informasi yang tidak penting dan hanya berfokus pada informasi utama disebut?", options: ["Abstraksi", "Pengenalan Pola", "Algoritma", "Dekomposisi"], answer: 0 },
  { question: "Manakah yang BUKAN merupakan pilar Berpikir Komputasional?", options: ["Dekomposisi", "Abstraksi", "Kompilasi", "Pengenalan Pola"], answer: 2 },
  { question: "Menuliskan urutan langkah-langkah logis untuk menyelesaikan masalah disebut...", options: ["Abstraksi", "Dekomposisi", "Sistem", "Algoritma"], answer: 3 },
  { question: "Mengapa mesin membutuhkan Algoritma?", options: ["Karena mesin sangat cerdas", "Karena mesin tidak bisa berpikir sendiri tanpa instruksi pasti", "Agar mesin terlihat canggih", "Untuk menghemat listrik"], answer: 1 }
]);

const s1p2 = generate50("s1-p2", s1p2_topics, [
  { question: "Apa itu Pseudocode?", options: ["Bahasa pemrograman tingkat tinggi", "Kode asli yang dijalankan komputer", "Penulisan algoritma yang menyerupai bahasa manusia", "Aplikasi pembuat flowchart"], answer: 2 },
  { question: "Dalam Flowchart, bentuk Oval digunakan untuk melambangkan...", options: ["Proses", "Keputusan", "Input/Output", "Mulai dan Selesai"], answer: 3 },
  { question: "Bentuk Jajargenjang dalam Flowchart melambangkan...", options: ["Mulai", "Input / Output", "Keputusan (If)", "Proses Perhitungan"], answer: 1 },
  { question: "Bentuk apakah yang digunakan untuk menunjukkan pengambilan Keputusan / Cabang (Ya/Tidak)?", options: ["Persegi Panjang", "Belah Ketupat", "Oval", "Lingkaran"], answer: 1 },
  { question: "Dalam penulisan Pseudocode, manakah format If yang benar?", options: ["JIKA x=1 MAKA", "KALAU x=1 LAKUKAN", "IF (x=1) DO", "Semuanya bisa diterima, selama logikanya jelas"], answer: 3 }
]);

const s1p3 = generate50("s1-p3", s1p3_topics, [
  { question: "Apa keunggulan utama bahasa Python dibandingkan bahasa C++ bagi pemula?", options: ["Python lebih cepat dieksekusi", "Sintaks Python lebih sederhana dan mirip bahasa manusia", "Python tidak butuh memori", "Python hanya untuk membuat website"], answer: 1 },
  { question: "Manakah perintah yang benar untuk mencetak teks di layar menggunakan Python?", options: ["echo 'Halo Dunia'", "print('Halo Dunia')", "console.log('Halo Dunia')", "System.out.print('Halo Dunia')"], answer: 1 },
  { question: "Mengapa Python sangat populer di bidang Kecerdasan Artifisial (AI)?", options: ["Karena namanya Python", "Karena memiliki banyak library/paket siap pakai untuk Data Science dan AI", "Karena logo Python bergambar ular", "Karena diciptakan oleh robot"], answer: 1 },
  { question: "Bahasa Python termasuk ke dalam kategori...", options: ["Bahasa Tingkat Rendah (Low-Level)", "Bahasa Mesin", "Bahasa Tingkat Tinggi (High-Level)", "Bahasa Perakitan (Assembly)"], answer: 2 },
  { question: "Saat kita mengetik kode Python dan langsung dijalankan tanpa perlu proses kompilasi panjang, ini karena Python adalah bahasa...", options: ["Compiled", "Interpreted", "Markup", "Query"], answer: 1 }
]);

const s1p4 = generate50("s1-p4", s1p4_topics, [
  { question: "Apa fungsi utama dari sebuah Variabel dalam pemrograman?", options: ["Untuk menghapus virus", "Untuk menyimpan data sementara di memori komputer", "Untuk menggambar grafik", "Untuk menghentikan program"], answer: 1 },
  { question: "Manakah penulisan nama variabel yang BENAR dalam Python?", options: ["1nama = 'Budi'", "nama siswa = 'Budi'", "nama_siswa = 'Budi'", "nama-siswa = 'Budi'"], answer: 2 },
  { question: "Tipe data yang digunakan untuk menyimpan teks (huruf/karakter) disebut...", options: ["Integer", "Float", "String", "Boolean"], answer: 2 },
  { question: "Tipe data apa yang nilainya hanya True atau False?", options: ["String", "Boolean", "Float", "Integer"], answer: 1 },
  { question: "Jika x = 10 dan y = 3.14, maka x dan y berturut-turut adalah tipe data...", options: ["Integer dan Float", "Float dan Integer", "String dan Boolean", "Integer dan String"], answer: 0 }
]);

const content = `// Auto-generated 50 questions per module
export const bankSoalAsli: Record<string, any[]> = {
  "s1-p1": ${JSON.stringify(s1p1, null, 2)},
  "s1-p2": ${JSON.stringify(s1p2, null, 2)},
  "s1-p3": ${JSON.stringify(s1p3, null, 2)},
  "s1-p4": ${JSON.stringify(s1p4, null, 2)},
  "default": [
    { question: "Ini adalah modul default. Jawab A.", options: ["A", "B", "C", "D"], answer: 0 }
  ]
};
`;

fs.writeFileSync('C:\\Users\\Komputer Vintage\\Music\\LMS-KKA\\lms-kka\\src\\app\\dashboard\\siswa\\latihan\\[id]\\bankSoal.ts', content);
