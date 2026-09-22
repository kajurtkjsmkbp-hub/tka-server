const fs = require('fs');

const generateVariedQuestions = (moduleName, topics) => {
  const questions = [];
  const verbs = ['Apa pengertian paling tepat dari', 'Mengapa sangat penting mempelajari', 'Manakah pernyataan yang benar mengenai', 'Apa tujuan utama dari', 'Bagaimana konsep dasar dari'];
  const scenarios = ['dalam konteks Kecerdasan Artifisial (AI)', 'dalam sejarah perkembangan komputasi', 'pada penerapan teknologi masa kini', 'sebagai pondasi Machine Learning', 'bagi seorang AI Engineer'];
  
  let id = 1;
  topics.forEach(topic => {
    verbs.forEach(verb => {
      scenarios.forEach(scenario => {
        if(id > 50) return;
        
        let dummyOptions = [
          "Sebuah alat fisik yang diciptakan untuk menggantikan otak manusia secara keseluruhan.",
          "Bahasa pemrograman kuno yang sudah tidak relevan di dunia modern.",
          "Kode rahasia yang digunakan hacker untuk membobol sistem pertahanan.",
          "Proses mematikan komputer secara paksa untuk menghemat listrik.",
          "Hanya sekadar mitos sains fiksi yang tidak mungkin terwujud di dunia nyata.",
          "Sebuah virus komputer yang bisa berkembang biak tanpa batas."
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

const s2p1Topics = [
  { name: 'Kecerdasan Artifisial (AI)', correct: 'Simulasi kecerdasan manusia yang dimodelkan di dalam mesin dan diprogram agar bisa berpikir seperti manusia.' },
  { name: 'Turing Test', correct: 'Metode pengujian yang dibuat oleh Alan Turing untuk menentukan apakah sebuah mesin memiliki kecerdasan setara manusia.' },
  { name: 'AI Musim Dingin (AI Winter)', correct: 'Periode dalam sejarah AI di mana pendanaan dan ketertarikan terhadap penelitian AI menurun drastis karena gagal memenuhi ekspektasi.' },
  { name: 'Narrow AI (AI Sempit)', correct: 'Jenis AI yang hanya dirancang dan dilatih untuk melakukan satu tugas spesifik (seperti asisten virtual atau pemutar catur).' },
  { name: 'General AI (AGI)', correct: 'Tingkatan AI hipotetis di mana mesin memiliki kecerdasan dan pemahaman kognitif yang setara dengan kecerdasan manusia secara umum.' }
];

const s2p2Topics = [
  { name: 'Pemrograman Tradisional', correct: 'Pendekatan di mana programmer harus menuliskan secara eksplisit semua aturan (rules) dan logika (if-else) untuk memproses data.' },
  { name: 'Machine Learning (ML)', correct: 'Cabang dari AI di mana mesin diberikan data dan hasil akhir, lalu mesin tersebut belajar sendiri untuk menemukan polanya.' },
  { name: 'Dataset (Data Latih)', correct: 'Kumpulan data historis yang sangat besar yang diberikan kepada algoritma ML agar bisa dipelajari polanya.' },
  { name: 'Model', correct: 'Hasil akhir atau otak buatan yang tercipta setelah algoritma Machine Learning selesai mempelajari sebuah dataset.' },
  { name: 'Keunggulan ML dibanding Tradisional', correct: 'ML sangat unggul dalam memecahkan masalah kompleks yang aturannya terlalu rumit jika ditulis manual dengan logika If-Else.' }
];

const s2p1 = generateVariedQuestions('s2-p1', s2p1Topics);
const s2p2 = generateVariedQuestions('s2-p2', s2p2Topics);

let bankSoal = fs.readFileSync('C:\\Users\\Komputer Vintage\\Music\\LMS-KKA\\lms-kka\\src\\app\\dashboard\\siswa\\latihan\\[id]\\bankSoal.ts', 'utf8');

const str1 = `"s2-p1": ${JSON.stringify(s2p1)},`;
const str2 = `"s2-p2": ${JSON.stringify(s2p2)},`;

bankSoal = bankSoal.replace(/"default":/g, str1 + '\n  ' + str2 + '\n  "default":');

fs.writeFileSync('C:\\Users\\Komputer Vintage\\Music\\LMS-KKA\\lms-kka\\src\\app\\dashboard\\siswa\\latihan\\[id]\\bankSoal.ts', bankSoal);
console.log('Successfully injected bankSoal for s2-p1 and s2-p2!');
