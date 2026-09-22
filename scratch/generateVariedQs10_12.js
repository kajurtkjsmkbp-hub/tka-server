const fs = require('fs');

const generateVariedQuestions = (moduleName, topics) => {
  const questions = [];
  const verbs = ['Apa yang dimaksud dengan', 'Manakah penjelasan yang paling tepat mengenai', 'Mengapa kita perlu menerapkan', 'Bagaimana contoh penerapan dari', 'Apa tujuan utama dari memahami'];
  const scenarios = ['dalam pemrograman Python', 'saat menyusun logika program', 'dalam sistem komputasi', 'untuk mencegah aplikasi error', 'sebagai seorang programmer pemula'];
  
  let id = 1;
  topics.forEach(topic => {
    verbs.forEach(verb => {
      scenarios.forEach(scenario => {
        if(id > 50) return;
        
        let dummyOptions = [
          "Teknik untuk merusak sistem keamanan sebuah aplikasi komputer.",
          "Fungsi rahasia yang hanya bisa diakses oleh admin sistem.",
          "Sebuah alat fisik yang dimasukkan ke dalam CPU.",
          "Cara untuk membuat program berjalan lebih lambat.",
          "Mitos pemrograman yang sebenarnya tidak pernah ada.",
          "Kode kuno yang tidak lagi dipakai di bahasa modern."
        ].sort(() => Math.random() - 0.5).slice(0, 3);
        
        const options = [topic.correct, ...dummyOptions].sort(() => Math.random() - 0.5);
        const ansIndex = options.findIndex(opt => opt === topic.correct);
        
        questions.push({
          question: `${verb} ${topic.name} ${scenario}?`,
          options: options,
          answer: ansIndex
        });
        id++;
      });
    });
  });
  
  while(questions.length < 50) {
     const fallback = questions[Math.floor(Math.random() * questions.length)];
     questions.push({
       ...fallback,
       question: `(Pemantapan) ${fallback.question}`
     });
  }
  
  return questions.sort(() => Math.random() - 0.5);
};

const s1p10Topics = [
  { name: 'Debugging', correct: 'Proses mencari, menganalisis, dan memperbaiki kesalahan (bug) di dalam sebuah program.' },
  { name: 'Syntax Error', correct: 'Kesalahan penulisan kode karena tidak mengikuti aturan bahasa pemrograman, seperti kurang tanda kurung.' },
  { name: 'Logic Error (Error Logika)', correct: 'Program bisa berjalan tanpa henti atau tanpa error, tapi hasil akhirnya salah atau tidak sesuai yang diharapkan.' },
  { name: 'Blok Try-Except', correct: 'Mekanisme di Python untuk menangani error saat program berjalan (Runtime Error) agar program tidak tiba-tiba crash.' },
  { name: 'Pesan Error (Traceback)', correct: 'Informasi detail yang diberikan komputer untuk menunjukkan di baris mana error terjadi dan apa penyebabnya.' }
];

const s1p11Topics = [
  { name: 'Algoritma Terapan', correct: 'Penerapan konsep algoritma teoritis ke dalam kasus penyelesaian masalah di dunia nyata.' },
  { name: 'Pencarian Berurutan (Linear Search)', correct: 'Mencari sebuah data dari awal hingga akhir satu per satu sampai data tersebut ditemukan.' },
  { name: 'Algoritma Pengurutan (Sorting)', correct: 'Proses menyusun sekumpulan data secara sistematis, misalnya dari nilai terkecil ke terbesar.' },
  { name: 'Efisiensi Algoritma', correct: 'Ukuran seberapa cepat dan seberapa hemat memori sebuah program dalam menyelesaikan masalah.' },
  { name: 'Studi Kasus Penjadwalan', correct: 'Contoh penerapan algoritma untuk mengatur jadwal kelas agar tidak ada guru yang mengajar di waktu yang sama.' }
];

const s1p12Topics = [
  { name: 'Projek Kalkulator Pintar', correct: 'Integrasi dari konsep variabel, tipe data, perulangan, dan percabangan dalam satu program utuh.' },
  { name: 'Menu Navigasi di Terminal', correct: 'Penggunaan perulangan While agar aplikasi kalkulator terus berjalan sampai pengguna memilih tombol keluar.' },
  { name: 'Validasi Input User', correct: 'Mencegah program crash saat pengguna memasukkan huruf ketika program sebenarnya meminta angka.' },
  { name: 'Modularisasi Kode', correct: 'Memisahkan operasi matematika seperti tambah dan kurang ke dalam Fungsi-Fungsi yang terpisah.' },
  { name: 'Keterampilan Problem Solving', correct: 'Kemampuan akhir yang diharapkan dari menyusun kalkulator: mampu memecah masalah besar menjadi kode-kode logis.' }
];

const s1p10 = generateVariedQuestions('s1-p10', s1p10Topics);
const s1p11 = generateVariedQuestions('s1-p11', s1p11Topics);
const s1p12 = generateVariedQuestions('s1-p12', s1p12Topics);

// Read existing bankSoal
let bankSoal = fs.readFileSync('C:\\Users\\Komputer Vintage\\Music\\LMS-KKA\\lms-kka\\src\\app\\dashboard\\siswa\\latihan\\[id]\\bankSoal.ts', 'utf8');

// Inject the newly generated strings into the existing exported object
const str10 = `"s1-p10": ${JSON.stringify(s1p10)},`;
const str11 = `"s1-p11": ${JSON.stringify(s1p11)},`;
const str12 = `"s1-p12": ${JSON.stringify(s1p12)},`;

bankSoal = bankSoal.replace(/"default":/g, str10 + '\n  ' + str11 + '\n  ' + str12 + '\n  "default":');

fs.writeFileSync('C:\\Users\\Komputer Vintage\\Music\\LMS-KKA\\lms-kka\\src\\app\\dashboard\\siswa\\latihan\\[id]\\bankSoal.ts', bankSoal);
console.log('Successfully injected bankSoal for p10, p11, p12!');
