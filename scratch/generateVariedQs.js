const fs = require('fs');

const generateVariedQuestions = (moduleName, topics) => {
  const questions = [];
  const verbs = ['Apa yang dimaksud dengan', 'Manakah penjelasan yang paling tepat mengenai', 'Mengapa kita perlu menerapkan', 'Bagaimana contoh penerapan dari', 'Apa tujuan utama dari memahami'];
  const scenarios = ['dalam kehidupan sehari-hari', 'saat menyusun logika program', 'dalam sistem komputasi modern', 'untuk memecahkan masalah yang rumit', 'sebagai seorang programmer pemula'];
  
  let id = 1;
  topics.forEach(topic => {
    verbs.forEach(verb => {
      scenarios.forEach(scenario => {
        if(id > 50) return;
        
        let dummyOptions = [
          "Itu adalah proses menghapus semua baris kode yang tidak perlu.",
          "Sebuah metode usang yang hanya digunakan pada komputer generasi pertama.",
          "Hal tersebut merupakan fitur berbayar yang jarang dipakai oleh programmer profesional.",
          "Itu hanyalah hiasan visual agar aplikasi terlihat lebih menarik.",
          "Metode untuk menggandakan data tanpa menggunakan memori.",
          "Sistem yang secara otomatis memperbaiki komputer yang rusak."
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
  
  // Scramble the whole 50 questions
  return questions.sort(() => Math.random() - 0.5);
};

const s1p1Topics = [
  { name: 'Dekomposisi', correct: 'Memecah masalah besar menjadi bagian-bagian kecil yang lebih mudah diselesaikan secara mandiri.' },
  { name: 'Abstraksi', correct: 'Mengabaikan detail-detail yang tidak relevan dan hanya berfokus pada informasi utama yang krusial.' },
  { name: 'Pengenalan Pola', correct: 'Mencari kesamaan atau tren dalam masalah untuk mempermudah pencarian pola solusi.' },
  { name: 'Berpikir Komputasional', correct: 'Cara berpikir layaknya seorang ilmuwan komputer dalam merumuskan dan memecahkan masalah.' },
  { name: 'Algoritma', correct: 'Menyusun langkah-langkah logis dan berurutan dari awal hingga akhir untuk menyelesaikan sebuah tugas.' }
];

const s1p2Topics = [
  { name: 'Pseudocode', correct: 'Kode semu yang menyerupai bahasa manusia untuk merancang logika program tanpa terikat aturan sintaks.' },
  { name: 'Flowchart', correct: 'Representasi visual dari sebuah algoritma menggunakan susunan simbol-simbol khusus.' },
  { name: 'Simbol Belah Ketupat pada Flowchart', correct: 'Digunakan untuk menunjukkan pengambilan keputusan atau percabangan kondisi (Ya/Tidak).' },
  { name: 'Simbol Jajargenjang', correct: 'Melambangkan proses input data ke dalam sistem atau output informasi keluar sistem.' },
  { name: 'Simbol Oval', correct: 'Digunakan sebagai penanda titik mulai (Start) atau titik akhir (End) dari sebuah program.' }
];

const s1p3Topics = [
  { name: 'Bahasa Python', correct: 'Bahasa pemrograman tingkat tinggi yang sintaksnya sangat sederhana dan mudah dibaca oleh pemula.' },
  { name: 'Interpreter pada Python', correct: 'Sistem yang mengeksekusi kode baris per baris tanpa proses kompilasi kode secara menyeluruh.' },
  { name: 'Fungsi print()', correct: 'Instruksi dasar yang digunakan untuk menampilkan teks atau hasil perhitungan ke layar monitor.' },
  { name: 'Pemanfaatan Python di era AI', correct: 'Menjadi bahasa utama dalam Kecerdasan Artifisial karena memiliki ribuan library siap pakai.' },
  { name: 'Kelemahan Python', correct: 'Kecepatan eksekusinya relatif lebih lambat dibandingkan bahasa pemrograman tingkat menengah seperti C++.' }
];

const s1p4Topics = [
  { name: 'Variabel', correct: 'Sebuah wadah atau tempat penyimpanan sementara di memori komputer untuk menampung data.' },
  { name: 'Tipe Data Integer', correct: 'Digunakan untuk menyimpan nilai berupa bilangan bulat utuh tanpa angka desimal.' },
  { name: 'Tipe Data Float', correct: 'Digunakan untuk menampung angka pecahan atau bilangan desimal.' },
  { name: 'Tipe Data Boolean', correct: 'Tipe data yang nilainya hanya dua kemungkinan, yaitu Benar (True) atau Salah (False).' },
  { name: 'Aturan penulisan Variabel', correct: 'Tidak boleh menggunakan spasi dan tidak boleh diawali oleh angka.' }
];

const s1p5Topics = [
  { name: 'Operator Aritmatika', correct: 'Simbol matematis untuk melakukan operasi seperti penjumlahan, pengurangan, atau perkalian.' },
  { name: 'Operator Logika AND', correct: 'Hanya akan menghasilkan nilai True jika semua kondisi yang dibandingkan bernilai True.' },
  { name: 'Operator Logika OR', correct: 'Akan menghasilkan nilai True jika minimal salah satu kondisi yang dibandingkan bernilai True.' },
  { name: 'Operator Pembanding (==)', correct: 'Digunakan untuk membandingkan apakah nilai di sebelah kiri sama persis dengan di sebelah kanan.' },
  { name: 'Fungsi Modulus (%)', correct: 'Menghasilkan sisa hasil bagi dari pembagian dua buah angka.' }
];

const s1p6Topics = [
  { name: 'Percabangan (If-Else)', correct: 'Struktur kendali yang memungkinkan program memilih aksi berbeda berdasarkan suatu kondisi.' },
  { name: 'Kondisi IF', correct: 'Blok kode yang hanya akan dieksekusi jika pernyataan di dalamnya dievaluasi bernilai Benar (True).' },
  { name: 'Kondisi ELSE', correct: 'Jalan keluar terakhir atau blok kode alternatif jika semua kondisi IF sebelumnya bernilai Salah (False).' },
  { name: 'Kondisi ELIF (Else If)', correct: 'Digunakan untuk mengecek kondisi tambahan apabila kondisi IF yang pertama bernilai Salah.' },
  { name: 'Indentation (Spasi/Tab) pada Percabangan', correct: 'Digunakan oleh Python untuk menandakan bahwa sekelompok kode adalah bagian dari blok percabangan.' }
];

const s1p1 = generateVariedQuestions('s1-p1', s1p1Topics);
const s1p2 = generateVariedQuestions('s1-p2', s1p2Topics);
const s1p3 = generateVariedQuestions('s1-p3', s1p3Topics);
const s1p4 = generateVariedQuestions('s1-p4', s1p4Topics);
const s1p5 = generateVariedQuestions('s1-p5', s1p5Topics);
const s1p6 = generateVariedQuestions('s1-p6', s1p6Topics);

const content = `// Auto-generated 50 UNIQUE questions per module
export const bankSoalAsli: Record<string, any[]> = {
  "s1-p1": ${JSON.stringify(s1p1, null, 2)},
  "s1-p2": ${JSON.stringify(s1p2, null, 2)},
  "s1-p3": ${JSON.stringify(s1p3, null, 2)},
  "s1-p4": ${JSON.stringify(s1p4, null, 2)},
  "s1-p5": ${JSON.stringify(s1p5, null, 2)},
  "s1-p6": ${JSON.stringify(s1p6, null, 2)},
  "default": [
    { question: "Ini adalah modul default. Jawab A.", options: ["A", "B", "C", "D"], answer: 0 }
  ]
};
`;

fs.writeFileSync('C:\\Users\\Komputer Vintage\\Music\\LMS-KKA\\lms-kka\\src\\app\\dashboard\\siswa\\latihan\\[id]\\bankSoal.ts', content);
