const fs = require('fs');

const generateVariedQuestions = (moduleName, topics) => {
  const questions = [];
  const verbs = ['Apa yang dimaksud dengan', 'Manakah penjelasan yang paling tepat mengenai', 'Mengapa kita perlu menerapkan', 'Bagaimana contoh penerapan dari', 'Apa tujuan utama dari memahami'];
  const scenarios = ['dalam pemrograman Python', 'saat menyusun logika perulangan/struktur', 'dalam sistem komputasi modern', 'untuk memecahkan masalah yang efisien', 'sebagai seorang software engineer'];
  
  let id = 1;
  topics.forEach(topic => {
    verbs.forEach(verb => {
      scenarios.forEach(scenario => {
        if(id > 50) return;
        
        let dummyOptions = [
          "Fitur ini digunakan khusus untuk menghapus hardware yang rusak.",
          "Hanya sebuah mitos di kalangan programmer tua.",
          "Fungsi yang akan merusak sistem jika dijalankan di Windows.",
          "Kode rahasia untuk meretas database sekolah.",
          "Sebuah bahasa pemrograman baru yang menggantikan Python.",
          "Metode kuno yang tidak ada lagi di era AI modern."
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

const s1p7Topics = [
  { name: 'Perulangan (Looping)', correct: 'Mengeksekusi satu blok kode berkali-kali secara otomatis tanpa harus menulisnya berulang-ulang.' },
  { name: 'Perulangan For', correct: 'Digunakan saat kita sudah mengetahui dengan pasti berapa kali perulangan harus dilakukan.' },
  { name: 'Perulangan While', correct: 'Akan terus berjalan berulang kali selama suatu kondisi masih bernilai True.' },
  { name: 'Fungsi range() pada Python', correct: 'Untuk menghasilkan deret angka berurutan yang sering dipasangkan dengan perulangan For.' },
  { name: 'Infinite Loop (Perulangan Tak Terbatas)', correct: 'Kesalahan program di mana perulangan While tidak pernah berhenti karena kondisinya tidak pernah False.' }
];

const s1p8Topics = [
  { name: 'Fungsi (Function)', correct: 'Blok kode modular yang memiliki nama dan dapat dipanggil kapan saja untuk menjalankan tugas spesifik.' },
  { name: 'Kata kunci def', correct: 'Digunakan di Python untuk mendeklarasikan atau membuat sebuah fungsi baru.' },
  { name: 'Parameter', correct: 'Variabel masukan yang kita letakkan di dalam tanda kurung saat mendefinisikan sebuah fungsi.' },
  { name: 'Kata kunci return', correct: 'Digunakan untuk mengembalikan nilai hasil dari perhitungan di dalam fungsi ke pemanggilnya.' },
  { name: 'Prosedur', correct: 'Fungsi yang hanya menjalankan aksi (seperti mencetak sesuatu) tanpa mengembalikan suatu nilai (tidak ada return).' }
];

const s1p9Topics = [
  { name: 'Struktur Data List', correct: 'Wadah atau koleksi yang dapat menyimpan banyak data sekaligus di dalam satu variabel.' },
  { name: 'Indeks pada List', correct: 'Nomor urut posisi sebuah elemen di dalam List, di mana indeks pertama selalu dimulai dari angka 0.' },
  { name: 'Fungsi append()', correct: 'Digunakan untuk menambahkan elemen atau data baru di posisi paling akhir pada sebuah List.' },
  { name: 'Array dalam Python', correct: 'Biasanya direpresentasikan dengan tipe data List yang dinamis dan fleksibel.' },
  { name: 'Tanda Kurung Siku [ ]', correct: 'Karakter khusus yang digunakan untuk mendefinisikan atau mengakses elemen List di Python.' }
];

const s1p7 = generateVariedQuestions('s1-p7', s1p7Topics);
const s1p8 = generateVariedQuestions('s1-p8', s1p8Topics);
const s1p9 = generateVariedQuestions('s1-p9', s1p9Topics);

// Read existing bankSoal
let bankSoal = fs.readFileSync('C:\\Users\\Komputer Vintage\\Music\\LMS-KKA\\lms-kka\\src\\app\\dashboard\\siswa\\latihan\\[id]\\bankSoal.ts', 'utf8');

// Inject the newly generated strings into the existing exported object
const str7 = `"s1-p7": ${JSON.stringify(s1p7)},`;
const str8 = `"s1-p8": ${JSON.stringify(s1p8)},`;
const str9 = `"s1-p9": ${JSON.stringify(s1p9)},`;

bankSoal = bankSoal.replace(/"default":/g, str7 + '\n  ' + str8 + '\n  ' + str9 + '\n  "default":');

fs.writeFileSync('C:\\Users\\Komputer Vintage\\Music\\LMS-KKA\\lms-kka\\src\\app\\dashboard\\siswa\\latihan\\[id]\\bankSoal.ts', bankSoal);
console.log('Successfully injected bankSoal for p7, p8, p9!');
