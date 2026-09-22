const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Menambahkan data awal untuk LMS KKA...')

  // 1. Buat User Guru
  const guru1 = await prisma.user.upsert({
    where: { email: 'guru@smk.id' },
    update: {},
    create: {
      email: 'guru@smk.id',
      name: 'Bapak/Ibu Guru',
      password: 'password123', // Dalam produksi, gunakan bcrypt/hash
      role: 'TEACHER',
    },
  })

  // 2. Buat User Siswa
  const siswa1 = await prisma.user.upsert({
    where: { email: 'siswa@smk.id' },
    update: {},
    create: {
      email: 'siswa@smk.id',
      name: 'Siswa Teladan',
      password: 'password123',
      role: 'STUDENT',
    },
  })

  // 3. Materi Semester 1 (Koding & Berpikir Komputasional)
  const mat1 = await prisma.course.create({
    data: {
      title: 'Bab 1: Pengantar Berpikir Komputasional & Logika',
      semester: 1,
      content: `
        <h2>Pengantar Berpikir Komputasional</h2>
        <p>Berpikir komputasional (Computational Thinking) adalah metode memecahkan masalah dengan menerapkan teknik ilmu komputer. Kurikulum Merdeka menekankan 4 pilar utama:</p>
        <ul>
          <li><strong>Dekomposisi:</strong> Memecah masalah besar menjadi bagian-bagian kecil.</li>
          <li><strong>Pengenalan Pola:</strong> Mencari kesamaan di antara atau di dalam masalah.</li>
          <li><strong>Abstraksi:</strong> Fokus pada informasi penting saja.</li>
          <li><strong>Algoritma:</strong> Mengembangkan langkah-langkah solusi.</li>
        </ul>
        <p>Ini adalah fondasi utama sebelum kita mulai menulis kode pemrograman (koding).</p>
      `,
      questions: {
        create: [
          {
            type: 'MULTIPLE_CHOICE',
            content: '{"question": "Proses memecah masalah kompleks menjadi bagian-bagian yang lebih kecil dan mudah dikelola disebut?", "options": ["Abstraksi", "Dekomposisi", "Pengenalan Pola", "Algoritma"]}',
            answerKey: 'Dekomposisi'
          }
        ]
      }
    }
  })

  const mat2 = await prisma.course.create({
    data: {
      title: 'Bab 2: Dasar Pemrograman dengan Python',
      semester: 1,
      content: `
        <h2>Mengapa Python?</h2>
        <p>Python adalah bahasa pemrograman yang mudah dipelajari, sintaksnya sederhana, namun sangat powerful dan sering digunakan dalam industri Kecerdasan Artifisial.</p>
        
        <h3>1. Variabel dan Tipe Data</h3>
        <p>Variabel digunakan untuk menyimpan data. Contoh tipe data: Integer (angka), String (teks), Float (desimal), dan Boolean (Benar/Salah).</p>
        <pre><code>
# Contoh Koding Python
nama = "Budi"        # String
umur = 16            # Integer
nilai = 85.5         # Float
lulus = True         # Boolean

print("Halo", nama, "umur kamu", umur)
        </code></pre>

        <h3>2. Percabangan (If-Else)</h3>
        <p>Digunakan untuk mengambil keputusan berdasarkan kondisi.</p>
        <pre><code>
if nilai >= 75:
    print("Selamat, kamu lulus!")
else:
    print("Tetap semangat belajar!")
        </code></pre>
      `,
      questions: {
        create: [
          {
            type: 'CODING',
            content: '{"question": "Tuliskan kode Python untuk membuat variabel bernama `sekolah` dengan nilai string `SMK Bisa`, lalu print variabel tersebut.", "initialCode": "# tulis kodemu di bawah ini\\n"}',
            answerKey: 'sekolah = "SMK Bisa"\nprint(sekolah)'
          }
        ]
      }
    }
  })

  // 4. Materi Semester 2 (Kecerdasan Artifisial)
  const mat3 = await prisma.course.create({
    data: {
      title: 'Bab 3: Pengantar Kecerdasan Artifisial (AI)',
      semester: 2,
      content: `
        <h2>Apa itu Kecerdasan Artifisial?</h2>
        <p>Kecerdasan Artifisial (AI) adalah simulasi kecerdasan manusia yang dimodelkan di dalam mesin dan diprogram agar bisa berpikir seperti manusia.</p>
        
        <h3>Cabang-cabang Utama AI</h3>
        <ul>
          <li><strong>Machine Learning (Pembelajaran Mesin):</strong> Mesin belajar dari data tanpa diprogram secara eksplisit (contoh: Rekomendasi YouTube).</li>
          <li><strong>Natural Language Processing (NLP):</strong> Memungkinkan mesin memahami bahasa manusia (contoh: ChatGPT, Google Translate).</li>
          <li><strong>Computer Vision:</strong> Memungkinkan mesin melihat dan mengenali objek dari gambar atau video (contoh: Face ID, Self-driving car).</li>
        </ul>
        
        <p>Dalam Kurikulum Merdeka, siswa SMK diharapkan memahami etika penggunaan AI dan dampaknya terhadap dunia industri.</p>
      `,
      questions: {
        create: [
          {
            type: 'MULTIPLE_CHOICE',
            content: '{"question": "Teknologi AI yang digunakan agar komputer dapat memahami dan memproses teks bahasa manusia disebut?", "options": ["Computer Vision", "Natural Language Processing (NLP)", "Robotics", "IoT"]}',
            answerKey: 'Natural Language Processing (NLP)'
          }
        ]
      }
    }
  })

  console.log('Seeding selesai!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
