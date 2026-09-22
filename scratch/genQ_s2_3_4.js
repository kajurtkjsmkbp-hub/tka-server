const fs = require('fs');

const generateVariedQuestions = (moduleName, topics) => {
  const questions = [];
  const verbs = ['Apa pengertian paling tepat dari', 'Mengapa sangat penting mempelajari', 'Manakah pernyataan yang benar mengenai', 'Apa tujuan utama dari', 'Bagaimana konsep dasar dari'];
  const scenarios = ['dalam konteks Supervised Learning', 'pada penerapan Kecerdasan Artifisial masa kini', 'sebagai pondasi dasar AI Engineer', 'saat melatih sebuah model Machine Learning', 'dalam pengembangan sistem cerdas'];
  
  let id = 1;
  topics.forEach(topic => {
    verbs.forEach(verb => {
      scenarios.forEach(scenario => {
        if(id > 50) return;
        
        let dummyOptions = [
          "Sebuah sistem yang bergerak secara acak tanpa adanya panduan data.",
          "Bahasa pemrograman kuno yang sudah tidak digunakan di dunia industri.",
          "Proses mematikan sistem komputer untuk mencegah kebocoran memori.",
          "Hanya sekadar istilah fiksi ilmiah tanpa implementasi nyata.",
          "Metode untuk merusak algoritma lawan agar sistem menjadi lambat.",
          "Teknik memperbesar ukuran file gambar tanpa mengurangi resolusi."
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
       question: `(Evaluasi) ${fallback.question}`
     });
  }
  
  return questions.sort(() => Math.random() - 0.5);
};

const s2p3Topics = [
  { name: 'Supervised Learning', correct: 'Pendekatan ML di mana mesin dilatih menggunakan data yang sudah memiliki label atau kunci jawaban yang jelas.' },
  { name: 'Klasifikasi (Classification)', correct: 'Tugas Supervised Learning untuk memprediksi kategori atau kelas dari suatu data (misal: Spam atau Bukan Spam).' },
  { name: 'Fitur (Features)', correct: 'Karakteristik atau atribut dari data yang digunakan oleh model untuk membuat prediksi.' },
  { name: 'Label (Target)', correct: 'Jawaban benar yang ingin diprediksi oleh algoritma pada tahap pelatihan.' },
  { name: 'Binary Classification', correct: 'Jenis klasifikasi yang hanya memiliki dua kemungkinan hasil (contoh: Positif/Negatif, Ya/Tidak).' }
];

const s2p4Topics = [
  { name: 'Regresi (Regression)', correct: 'Tugas Supervised Learning untuk memprediksi nilai berupa angka kontinu atau bilangan bulat (misal: Prediksi harga rumah atau suhu cuaca).' },
  { name: 'Perbedaan Regresi dan Klasifikasi', correct: 'Klasifikasi memprediksi kategori (kucing/anjing), sedangkan Regresi memprediksi angka pasti (harga, suhu, kecepatan).' },
  { name: 'Linear Regression (Regresi Linear)', correct: 'Algoritma yang mencoba menarik sebuah garis lurus terbaik yang paling pas dengan sebaran data latih.' },
  { name: 'Overfitting', correct: 'Kondisi di mana model menghafal data latih terlalu baik sehingga gagal memprediksi data baru dengan benar.' },
  { name: 'Underfitting', correct: 'Kondisi di mana model gagal mempelajari pola data latih sehingga prediksinya sangat tidak akurat di semua kondisi.' }
];

const s2p3 = generateVariedQuestions('s2-p3', s2p3Topics);
const s2p4 = generateVariedQuestions('s2-p4', s2p4Topics);

let bankSoal = fs.readFileSync('src/app/dashboard/siswa/latihan/[id]/bankSoal.ts', 'utf8');

const str3 = `"s2-p3": ${JSON.stringify(s2p3)},`;
const str4 = `"s2-p4": ${JSON.stringify(s2p4)},`;

bankSoal = bankSoal.replace(/"default":/g, str3 + '\\n  ' + str4 + '\\n  "default":');

fs.writeFileSync('src/app/dashboard/siswa/latihan/[id]/bankSoal.ts', bankSoal);
console.log('Successfully injected bankSoal for s2-p3 and s2-p4!');
