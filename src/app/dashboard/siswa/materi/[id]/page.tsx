import Link from 'next/link';
import { notFound } from 'next/navigation';

// Data Materi Berdasarkan Kurikulum Merdeka SMK Kelas X
const materiData: Record<string, { title: string; content: React.ReactNode }> = {
  "s1-p1": {
      title: "Pengantar Berpikir Komputasional",
      content: (
        <div className="space-y-8 text-slate-700 leading-relaxed text-lg">
          
          <div className="text-slate-900 prose prose-lg max-w-none text-slate-700">
            <p className="text-xl font-medium text-slate-900 leading-normal">
              Selamat datang di dunia pemrograman! Sebelum kita menulis baris kode pertama, kita harus belajar bagaimana cara <strong>berpikir seperti seorang pemrogram</strong>. Komputer itu sangat bodoh; ia hanya bisa melakukan instruksi langkah-demi-langkah yang sangat spesifik. Oleh karena itu, kita menggunakan <em>Berpikir Komputasional</em> untuk memecahkan masalah besar menjadi instruksi kecil yang bisa dipahami mesin.
            </p>
          </div>
  
          <h3 className="text-3xl font-extrabold text-sky-800 mt-12 mb-6 border-b-2 border-sky-100 pb-4">4 Pilar Berpikir Komputasional</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-slate-100 p-6 rounded-2xl shadow-sm hover:border-sky-300 transition-colors">
              <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center text-2xl mb-4 font-black">1</div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">Dekomposisi (Decomposition)</h4>
              <p className="text-slate-600 text-sm">Memecah masalah yang rumit menjadi masalah-masalah kecil yang lebih mudah dikelola.</p>
            </div>
            
            <div className="bg-white border-2 border-slate-100 p-6 rounded-2xl shadow-sm hover:border-fuchsia-300 transition-colors">
              <div className="w-12 h-12 bg-fuchsia-100 text-fuchsia-600 rounded-xl flex items-center justify-center text-2xl mb-4 font-black">2</div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">Pengenalan Pola (Pattern Recognition)</h4>
              <p className="text-slate-600 text-sm">Mencari persamaan atau pola di antara masalah-masalah kecil tersebut untuk menyelesaikannya lebih cepat.</p>
            </div>
            
            <div className="bg-white border-2 border-slate-100 p-6 rounded-2xl shadow-sm hover:border-emerald-300 transition-colors">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-2xl mb-4 font-black">3</div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">Abstraksi (Abstraction)</h4>
              <p className="text-slate-600 text-sm">Fokus pada informasi yang penting saja dan mengabaikan detail yang tidak relevan.</p>
            </div>
            
            <div className="bg-white border-2 border-slate-100 p-6 rounded-2xl shadow-sm hover:border-amber-300 transition-colors">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center text-2xl mb-4 font-black">4</div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">Algoritma (Algorithm Design)</h4>
              <p className="text-slate-600 text-sm">Menyusun instruksi langkah demi langkah secara logis untuk menyelesaikan masalah tersebut.</p>
            </div>
          </div>
  
          <h3 className="text-3xl font-extrabold text-sky-800 mt-12 mb-6 border-b-2 border-sky-100 pb-4">Daftar Proyek Pertemuan 1</h3>
          
          {/* Proyek 1 */}
          <div className="bg-gradient-to-br from-slate-50 to-sky-50 border border-sky-100 p-8 rounded-3xl mb-8">
            <h4 className="text-2xl font-bold text-sky-900 mb-4 flex items-center gap-3">
              <span className="text-3xl">☕</span> Proyek 1: Mesin Pembuat Kopi Otomatis
            </h4>
            <div className="space-y-4 text-slate-700">
              <p className="text-slate-900 text-lg"><strong>Skenario:</strong> Anda diminta memprogram sebuah robot lengan untuk membuat secangkir kopi instan panas. Robot ini sangat bodoh, jika Anda tidak merincikan langkahnya, ia akan menuang air panas ke lantai!</p>
              
              <div className="bg-white p-6 rounded-xl border border-slate-200 mt-4">
                <h5 className="font-bold text-slate-800 mb-3 border-b pb-2">Langkah Algoritma (Pilar ke-4):</h5>
                <ol className="list-decimal pl-5 space-y-2 text-sm font-mono text-sky-800">
                  <li>Buka lemari dapur.</li>
                  <li>Ambil cangkir kosong.</li>
                  <li>Letakkan cangkir di atas meja.</li>
                  <li>Buka bungkus kopi saset.</li>
                  <li>Tuang isi saset ke dalam cangkir.</li>
                  <li>Panaskan 200ml air menggunakan teko listrik hingga mendidih.</li>
                  <li>Tuangkan air mendidih ke dalam cangkir.</li>
                  <li>Aduk selama 10 detik.</li>
                  <li>Sajikan.</li>
                </ol>
              </div>
              <p className="text-sm mt-4 bg-sky-100 p-4 rounded-lg text-sky-900">
                <strong>Pembahasan:</strong> Perhatikan betapa rincinya instruksi di atas. Kita tidak bisa sekadar berkata "Buat Kopi", karena komputer membutuhkan perintah eksplisit berurutan (Sekuensial).
              </p>
            </div>
          </div>
          
          {/* Proyek 2 */}
          <div className="bg-gradient-to-br from-slate-50 to-emerald-50 border border-emerald-100 p-8 rounded-3xl">
            <h4 className="text-2xl font-bold text-emerald-900 mb-4 flex items-center gap-3">
              <span className="text-3xl">🔍</span> Proyek 2: Memecahkan Kasus Kata Sandi (Dekomposisi)
            </h4>
            <div className="space-y-4 text-slate-700">
              <p className="text-slate-900 text-lg"><strong>Skenario:</strong> Anda lupa kata sandi koper Anda yang terdiri dari 3 digit angka (000 - 999). Mencoba menebaknya secara acak akan memakan waktu lama. Bagaimana cara Berpikir Komputasional menyelesaikannya?</p>
              
              <div className="bg-white p-6 rounded-xl border border-slate-200 mt-4">
                <h5 className="font-bold text-slate-800 mb-3 border-b pb-2">Solusi dengan Dekomposisi & Pola:</h5>
                <ul className="list-disc pl-5 space-y-2 text-sm text-emerald-800">
                  <li><strong>Dekomposisi:</strong> Pecah masalah dari "menebak 1000 kombinasi" menjadi memutar angka secara terstruktur per digit.</li>
                  <li><strong>Pengenalan Pola:</strong> Jika kita memutar roda pertama dari 0 ke 9, sementara roda lainnya tetap, kita mengeliminasi kemungkinan secara berurutan tanpa ada yang terlewat.</li>
                  <li><strong>Algoritma Brute-Force:</strong> 
                    <br/>1. Setel roda menjadi 0-0-0.
                    <br/>2. Coba buka. Jika gagal, lanjut langkah 3.
                    <br/>3. Tambah angka terakhir sebanyak +1 (menjadi 0-0-1).
                    <br/>4. Ulangi terus hingga mencapai 9-9-9.
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      )
    },
    "s1-p2": {
      title: "Algoritma dan Pseudocode",
      content: (
        <div className="space-y-8 text-slate-700 leading-relaxed text-lg">
          
          <div className="text-slate-900 prose prose-lg max-w-none text-slate-700">
            <p className="text-xl font-medium text-slate-900 leading-normal">
              Setelah memahami cara berpikir komputasional, langkah selanjutnya adalah menuliskannya sebelum di-coding. <strong>Pseudocode</strong> adalah "kode palsu" atau rancangan logika yang ditulis dalam bahasa manusia biasa agar mudah dipahami, sebelum diterjemahkan ke bahasa pemrograman sungguhan seperti Python atau Java.
            </p>
          </div>
  
          <h3 className="text-3xl font-extrabold text-sky-800 mt-12 mb-6 border-b-2 border-sky-100 pb-4">Struktur Dasar Pseudocode</h3>
          
          <div className="bg-slate-900 p-8 rounded-3xl shadow-xl text-emerald-300 font-mono text-sm leading-loose">
            <p className="text-slate-400"># Mulai Program</p>
            <p className="text-slate-900 text-lg"><span className="text-fuchsia-400">START</span></p>
            <br/>
            <p className="text-slate-400"># Deklarasi Variabel (Wadah Penyimpanan)</p>
            <p className="text-slate-900 text-lg"><span className="text-sky-400">DECLARE</span> NilaiUjian <span className="text-fuchsia-400">AS NUMBER</span></p>
            <br/>
            <p className="text-slate-400"># Input Data</p>
            <p className="text-slate-900 text-lg"><span className="text-sky-400">READ</span> NilaiUjian</p>
            <br/>
            <p className="text-slate-400"># Logika Pengambilan Keputusan (Percabangan)</p>
            <p className="text-slate-900 text-lg"><span className="text-fuchsia-400">IF</span> NilaiUjian &gt;= 75 <span className="text-fuchsia-400">THEN</span></p>
            <p className="pl-6 text-slate-900"><span className="text-amber-300">PRINT</span> "Selamat, Anda Lulus!"</p>
            <p className="text-slate-900 text-lg"><span className="text-fuchsia-400">ELSE</span></p>
            <p className="pl-6 text-slate-900"><span className="text-amber-300">PRINT</span> "Mohon Maaf, Anda Remidial."</p>
            <p className="text-slate-900 text-lg"><span className="text-fuchsia-400">END IF</span></p>
            <br/>
            <p className="text-slate-400"># Akhiri Program</p>
            <p className="text-slate-900 text-lg"><span className="text-fuchsia-400">END</span></p>
          </div>
  
          <h3 className="text-3xl font-extrabold text-sky-800 mt-12 mb-6 border-b-2 border-sky-100 pb-4">Daftar Proyek Pertemuan 2</h3>
          
          {/* Proyek 1 */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 p-8 rounded-3xl mb-8">
            <h4 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-3">
              <span className="text-3xl">🎫</span> Proyek 1: Mesin Tiket Bioskop Otomatis
            </h4>
            <div className="space-y-4 text-slate-700">
              <p className="text-slate-900 text-lg"><strong>Skenario:</strong> Sebuah bioskop membutuhkan program untuk menentukan apakah seorang pelanggan diizinkan menonton film horor (Kategori Usia 18+) berdasarkan umur yang dimasukkan.</p>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h5 className="font-bold text-slate-800 mb-3 border-b pb-2">Alur Logika (Bahasa Biasa):</h5>
                  <p className="text-sm">Tanyakan umur penonton. Jika umurnya 18 tahun atau lebih, maka cetak "Silakan masuk". Jika kurang dari 18 tahun, cetak "Dilarang masuk".</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-sm">
                  <h5 className="font-bold text-slate-300 mb-3 border-b border-slate-600 pb-2">Pseudocode:</h5>
                  <pre className="text-xs text-sky-300 font-mono">
{"START\n  READ Umur\n  IF Umur >= 18 THEN\n    PRINT \"Silakan masuk\"\n  ELSE\n    PRINT \"Dilarang masuk\"\n  END IF\nEND"}
                  </pre>
                </div>
              </div>
            </div>
          </div>
          
          {/* Proyek 2 */}
          <div className="bg-gradient-to-br from-fuchsia-50 to-pink-50 border border-fuchsia-100 p-8 rounded-3xl">
            <h4 className="text-2xl font-bold text-fuchsia-900 mb-4 flex items-center gap-3">
              <span className="text-3xl">🧮</span> Proyek 2: Mesin Kasir Diskon Pintar
            </h4>
            <div className="space-y-4 text-slate-700">
              <p className="text-slate-900 text-lg"><strong>Skenario:</strong> Supermarket mengadakan promo. Jika total belanjaan pelanggan di atas Rp 100.000, pelanggan mendapat diskon Rp 20.000. Jika tidak, tidak ada diskon.</p>
              
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-sm mt-4">
                  <h5 className="font-bold text-slate-300 mb-3 border-b border-slate-600 pb-2">Pseudocode:</h5>
                  <pre className="text-xs text-amber-300 font-mono leading-relaxed">
{"START\n  DECLARE TotalBelanja AS NUMBER\n  DECLARE Diskon AS NUMBER = 0\n  \n  READ TotalBelanja\n  \n  IF TotalBelanja > 100000 THEN\n    Diskon = 20000\n  END IF\n  \n  TotalBayar = TotalBelanja - Diskon\n  PRINT \"Total yang harus dibayar: Rp\", TotalBayar\nEND"}
                  </pre>
              </div>
              <p className="text-sm mt-4 bg-fuchsia-100 p-4 rounded-lg text-fuchsia-900">
                <strong>Pembahasan:</strong> Kita menggunakan variabel bantu <code>Diskon</code> yang nilainya 0 di awal. Nilainya hanya akan berubah menjadi 20000 jika syarat kondisinya terpenuhi! Ini adalah konsep fundamental pemograman.
              </p>
            </div>
          </div>

        </div>
      )
    },
    "s1-p3": {
    title: "Pengenalan Bahasa Pemrograman (Python)",
    content: (
      <div className="space-y-8 text-slate-700 leading-relaxed text-lg">
        
        <div className="text-slate-900 prose prose-lg max-w-none text-slate-700">
          <p className="text-xl font-medium text-slate-900 leading-normal">
            Selamat! Kamu telah berhasil merancang algoritma. Sekarang, saatnya mengubah logika tersebut menjadi perintah sungguhan yang bisa dieksekusi oleh mesin. Kita akan berkenalan dengan <strong>Python</strong>, salah satu bahasa pemrograman paling populer di dunia saat ini, terutama di bidang Kecerdasan Artifisial (AI) dan Data Science.
          </p>
        </div>

        <h3 className="text-3xl font-extrabold text-sky-800 mt-12 mb-6 border-b-2 border-sky-100 pb-4">Mengapa Memilih Python?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md text-center">
            <div className="text-4xl mb-4">📖</div>
            <h4 className="font-bold text-slate-800 mb-2">Mudah Dibaca</h4>
            <p className="text-base text-slate-900">Sintaks (tata bahasa) Python sangat mirip dengan bahasa Inggris manusia, membuatnya sangat ramah untuk pemula.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md text-center">
            <div className="text-4xl mb-4">🤖</div>
            <h4 className="font-bold text-slate-800 mb-2">Raja AI & Data</h4>
            <p className="text-base text-slate-900">Google, NASA, dan OpenAI (ChatGPT) sangat bergantung pada Python untuk melatih kecerdasan buatan mereka.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h4 className="font-bold text-slate-800 mb-2">Eksekusi Langsung</h4>
            <p className="text-base text-slate-900">Python adalah bahasa <em>Interpreter</em>. Artinya, kode langsung dibaca dan dijalankan baris demi baris tanpa perlu proses <em>Compile</em> yang lama.</p>
          </div>
        </div>

        <h3 className="text-3xl font-extrabold text-sky-800 mt-12 mb-6 border-b-2 border-sky-100 pb-4">Program Pertamamu: Hello World!</h3>
        <p className="text-slate-900 text-lg">
          Dalam tradisi Ilmu Komputer sejak tahun 1970-an, program pertama yang harus kamu tulis saat belajar bahasa baru adalah mencetak kalimat <strong>"Hello, World!"</strong> ke layar.
        </p>

        <div className="bg-slate-900 text-sky-300 p-6 rounded-2xl shadow-xl font-mono text-sm my-6">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="ml-2 text-slate-800 text-xs font-sans">main.py</span>
          </div>
          <p className="text-slate-400 mb-2"># Ini adalah sebuah komentar. Komputer akan mengabaikan teks ini.</p>
          <p className="text-slate-900 text-lg"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Hello, World! Saya siap belajar AI!"</span>)</p>
          
          <div className="mt-6 bg-black/50 p-4 rounded-lg border border-slate-800">
            <p className="text-xs text-slate-800 mb-1">OUTPUT TERMINAL:</p>
            <p className="text-white">Hello, World! Saya siap belajar AI!</p>
          </div>
        </div>

        {/* Proyek Mini Pertemuan 3 */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-100 border-2 border-emerald-200 p-8 rounded-3xl mt-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg animate-bounce">
              👨‍💻
            </div>
            <div>
              <h3 className="text-2xl font-black text-emerald-900">Proyek Mini: Hacker Pemula</h3>
              <p className="text-emerald-700 font-semibold">Tugas Eksperimen Kode di Komputer</p>
            </div>
          </div>
          <div className="space-y-4 text-emerald-900/80">
            <p className="text-slate-900 text-lg"><strong>Skenario:</strong> Kamu baru saja direkrut oleh tim keamanan Cyber. Bosmu memintamu untuk membuat sebuah program perkenalan identitas diri (ID Card) digital di terminal yang terlihat keren layaknya seorang <em>Hacker</em>.</p>
            
            <p className="font-bold text-emerald-950 mt-6">Instruksi Proyek (Praktik Lab):</p>
            <ol className="list-decimal pl-5 space-y-3 font-medium">
              <li>Buka komputer lab dan akses situs <strong>Google Colab</strong> (atau IDLE Python).</li>
              <li>Gunakan perintah `print()` sebanyak minimal 5 baris.</li>
              <li>Cetak sebuah kotak atau desain unik menggunakan simbol karakter (seperti `*`, `=`, atau `|`) yang di dalamnya berisi: <strong>Nama Agen, Kelas, dan Nama Kode (Julukan)</strong>.</li>
            </ol>
            
            <div className="bg-white/60 p-4 rounded-xl mt-4 border border-white font-mono text-sm">
              <p className="text-slate-800 mb-2">Contoh Ekspektasi Output:</p>
              <p className="text-slate-900 text-lg">=========================</p>
              <p className="text-slate-900 text-lg">| AGEN CYBER SEKOLAH  |</p>
              <p className="text-slate-900 text-lg">| Nama  : Budi S.     |</p>
              <p className="text-slate-900 text-lg">| Kode  : B1-NARY     |</p>
              <p className="text-slate-900 text-lg">=========================</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  "s1-p4": {
    title: "Variabel dan Tipe Data",
    content: (
      <div className="space-y-8 text-slate-700 leading-relaxed text-lg">
        
        <div className="text-slate-900 prose prose-lg max-w-none text-slate-700">
          <p className="text-xl font-medium text-slate-900 leading-normal">
            Dalam dunia nyata, kita membutuhkan kotak penyimpanan untuk menaruh barang (seperti tas untuk buku, atau toples untuk gula). Di dunia pemrograman, komputer membutuhkan memori untuk menyimpan informasi atau data yang akan diproses. Kotak penyimpanan ini disebut <strong>Variabel</strong>.
          </p>
        </div>

        <h3 className="text-3xl font-extrabold text-sky-800 mt-12 mb-6 border-b-2 border-sky-100 pb-4">Apa itu Variabel?</h3>
        <p className="text-slate-900 text-lg">
          Variabel adalah sebuah nama yang mewakili tempat (lokasi) di dalam memori komputer yang digunakan untuk menyimpan suatu nilai. Nilai yang ada di dalam variabel dapat <em>berubah-ubah</em> (bervariasi) selama program berjalan.
        </p>

        <div className="bg-slate-900 text-sky-300 p-6 rounded-2xl shadow-xl font-mono text-sm my-6">
          <p className="text-slate-400 mb-2"># Membuat variabel di Python sangat mudah!</p>
          <p className="text-slate-900 text-lg">nama_siswa = <span className="text-amber-300">"Andi Wijaya"</span></p>
          <p className="text-slate-900 text-lg">skor_game = <span className="text-fuchsia-400">100</span></p>
          <p className="text-slate-900 text-lg"><br/># Memanggil isi variabel ke layar</p>
          <p className="text-slate-900 text-lg"><span className="text-emerald-400">print</span>(nama_siswa)</p>
          <p className="text-slate-900 text-lg"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Mendapatkan skor:"</span>, skor_game)</p>
        </div>

        <h3 className="text-3xl font-extrabold text-sky-800 mt-12 mb-6 border-b-2 border-sky-100 pb-4">Tipe Data Dasar</h3>
        <p className="text-slate-900 text-lg">
          Sama seperti barang, data memiliki "jenis" yang berbeda. Kita tidak mungkin menyimpan air sup di dalam tas kertas, bukan? Komputer harus tahu apa jenis data yang dimasukkan agar tidak error saat dihitung.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
          <div className="bg-rose-50 p-5 rounded-2xl border border-rose-200">
            <div className="text-3xl mb-2">🔤</div>
            <h4 className="font-bold text-rose-900 text-lg">String (Teks)</h4>
            <p className="text-rose-700 text-sm mt-1">Digunakan untuk menyimpan huruf, kata, atau kalimat. Selalu diapit oleh tanda kutip ganda <code>"..."</code> atau tunggal <code>'...'</code>.</p>
            <p className="mt-3 font-mono text-xs bg-white p-2 rounded text-slate-800">alamat = "Jalan Merdeka"</p>
          </div>
          
          <div className="bg-sky-50 p-5 rounded-2xl border border-sky-200">
            <div className="text-3xl mb-2">🔢</div>
            <h4 className="font-bold text-sky-900 text-lg">Integer (Bilangan Bulat)</h4>
            <p className="text-sky-700 text-sm mt-1">Angka utuh tanpa koma/desimal. Digunakan untuk perhitungan matematika dasar dan pencacah.</p>
            <p className="mt-3 font-mono text-xs bg-white p-2 rounded text-slate-800">umur = 16</p>
          </div>

          <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
            <div className="text-3xl mb-2">📏</div>
            <h4 className="font-bold text-amber-900 text-lg">Float (Bilangan Desimal)</h4>
            <p className="text-amber-700 text-sm mt-1">Angka yang memiliki koma pecahan (Dalam Python, koma ditulis menggunakan titik <code>.</code>).</p>
            <p className="mt-3 font-mono text-xs bg-white p-2 rounded text-slate-800">berat_badan = 55.5</p>
          </div>

          <div className="bg-purple-50 p-5 rounded-2xl border border-purple-200">
            <div className="text-3xl mb-2">✅</div>
            <h4 className="font-bold text-purple-900 text-lg">Boolean (Logika Benar/Salah)</h4>
            <p className="text-purple-700 text-sm mt-1">Hanya bisa berisi salah satu dari dua nilai: <code>True</code> (Benar) atau <code>False</code> (Salah).</p>
            <p className="mt-3 font-mono text-xs bg-white p-2 rounded text-slate-800">sudah_lulus = True</p>
          </div>
        </div>

        {/* Proyek Mini Pertemuan 4 */}
        <div className="bg-gradient-to-br from-pink-50 to-rose-100 border-2 border-pink-200 p-8 rounded-3xl mt-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg animate-pulse">
              🎮
            </div>
            <div>
              <h3 className="text-2xl font-black text-pink-900">Proyek Mini: Game RPG Sederhana</h3>
              <p className="text-pink-700 font-semibold">Tugas Manipulasi Variabel</p>
            </div>
          </div>
          <div className="space-y-4 text-pink-900/80">
            <p className="text-slate-900 text-lg"><strong>Skenario:</strong> Kamu sedang merancang sistem internal untuk sebuah game petualangan (RPG). Kamu perlu menyimpan status karakter ksatria utamamu.</p>
            
            <p className="font-bold text-pink-950 mt-6">Instruksi Proyek Koding:</p>
            <ol className="list-decimal pl-5 space-y-3 font-medium">
              <li>Buat variabel String bernama <code>hero_name</code> dan isi dengan nama sesukamu.</li>
              <li>Buat variabel Integer bernama <code>level</code> dan isi dengan `1`.</li>
              <li>Buat variabel Float bernama <code>health_point</code> dan isi dengan `100.0`.</li>
              <li>Buat variabel Boolean bernama <code>has_magic_sword</code> dan isi dengan `True`.</li>
              <li>Gunakan perintah `print()` gabungan untuk menceritakan status karaktermu ke layar!</li>
            </ol>
            
            <div className="bg-white/60 p-4 rounded-xl mt-4 border border-white font-mono text-sm">
              <p className="text-slate-800 mb-2">Contoh Gabungan Print:</p>
              <p className="text-slate-900 text-lg">print("Ksatria bernama", hero_name, "telah bangkit!")</p>
              <p className="text-slate-900 text-lg">print("HP Saat ini:", health_point)</p>
            </div>
          </div>
        </div>

      </div>
    )
  },
  "s1-p5": {
    title: "Operator Logika dan Aritmatika",
    content: (
      <div className="space-y-8 text-slate-700 leading-relaxed text-lg">
        <div className="text-slate-900 prose prose-lg max-w-none text-slate-700">
          <p className="text-xl font-medium text-slate-900 leading-normal">
            Data yang hanya diam di dalam variabel tidak akan berguna jika tidak bisa dimanipulasi. Di sinilah <strong>Operator</strong> berperan. Komputer pada dasarnya adalah sebuah kalkulator raksasa yang sangat cepat. Pada pertemuan ini, kita akan memaksa komputer untuk melakukan matematika dan pengujian logika!
          </p>
        </div>

        <h3 className="text-3xl font-extrabold text-sky-800 mt-12 mb-6 border-b-2 border-sky-100 pb-4">1. Operator Aritmatika (Matematika Mesin)</h3>
        <p className="text-slate-900 text-lg">Berbeda dengan matematika di sekolah, komputer punya simbolnya sendiri untuk melakukan perhitungan.</p>
        
        <div className="overflow-x-auto my-6 border border-slate-200 rounded-2xl shadow-sm">
          <table className="w-full text-left text-sm md:text-base">
            <thead className="bg-slate-50 text-slate-600 font-bold">
              <tr>
                <th className="p-4 border-b">Nama Operator</th>
                <th className="p-4 border-b text-center">Simbol di Python</th>
                <th className="p-4 border-b">Contoh Kode</th>
                <th className="p-4 border-b">Hasil Output</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              <tr className="hover:bg-slate-50">
                <td className="p-4 font-semibold text-slate-800">Penjumlahan</td><td className="p-4 text-center font-black text-xl text-sky-600">+</td><td className="p-4 font-mono text-sm bg-slate-100 rounded">5 + 3</td><td className="p-4 font-bold text-emerald-600">8</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-4 font-semibold text-slate-800">Pengurangan</td><td className="p-4 text-center font-black text-xl text-sky-600">-</td><td className="p-4 font-mono text-sm bg-slate-100 rounded">10 - 2</td><td className="p-4 font-bold text-emerald-600">8</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-4 font-semibold text-slate-800">Perkalian</td><td className="p-4 text-center font-black text-xl text-sky-600">*</td><td className="p-4 font-mono text-sm bg-slate-100 rounded">4 * 2</td><td className="p-4 font-bold text-emerald-600">8</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-4 font-semibold text-slate-800">Pembagian</td><td className="p-4 text-center font-black text-xl text-sky-600">/</td><td className="p-4 font-mono text-sm bg-slate-100 rounded">16 / 2</td><td className="p-4 font-bold text-emerald-600">8.0 (Selalu Float)</td>
              </tr>
              <tr className="hover:bg-sky-50">
                <td className="p-4 font-semibold text-sky-900">Modulus (Sisa Bagi)</td><td className="p-4 text-center font-black text-xl text-sky-600">%</td><td className="p-4 font-mono text-sm bg-slate-100 rounded">10 % 3</td><td className="p-4 font-bold text-emerald-600">1 (Karena 9 habis dibagi 3, sisa 1)</td>
              </tr>
              <tr className="hover:bg-sky-50">
                <td className="p-4 font-semibold text-sky-900">Pangkat</td><td className="p-4 text-center font-black text-xl text-sky-600">**</td><td className="p-4 font-mono text-sm bg-slate-100 rounded">2 ** 3</td><td className="p-4 font-bold text-emerald-600">8 (Artinya 2 pangkat 3)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-3xl font-extrabold text-sky-800 mt-12 mb-6 border-b-2 border-sky-100 pb-4">2. Operator Logika (Pembuat Keputusan)</h3>
        <p className="text-slate-900 text-lg">Operator logika digunakan untuk mengecek apakah sebuah pernyataan itu <code>True</code> (Benar) atau <code>False</code> (Salah). Sangat sering digunakan dalam sistem keamanan (seperti cek password) atau Kecerdasan Artifisial.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-slate-900 p-6 rounded-3xl shadow-xl text-sky-300 font-mono text-sm border border-slate-700">
            <h4 className="text-white font-sans font-bold mb-4 border-b border-slate-700 pb-2">A. Perbandingan (Comparison)</h4>
            <ul className="space-y-3 text-slate-900">
              <li><span className="text-amber-400">==</span>  (Sama dengan)<br/> <span className="text-slate-800">contoh: 5 == 5 &rarr; True</span></li>
              <li><span className="text-amber-400">!=</span>  (Tidak sama dengan)<br/> <span className="text-slate-800">contoh: 5 != 3 &rarr; True</span></li>
              <li><span className="text-amber-400">&gt;</span>   (Lebih besar)<br/> <span className="text-slate-800">contoh: 10 &gt; 5 &rarr; True</span></li>
              <li><span className="text-amber-400">&lt;=</span>  (Kurang dari sama dengan)<br/> <span className="text-slate-800">contoh: 4 &lt;= 4 &rarr; True</span></li>
            </ul>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl shadow-xl text-emerald-300 font-mono text-sm border border-slate-700">
            <h4 className="text-white font-sans font-bold mb-4 border-b border-slate-700 pb-2">B. Logika (Boolean Logic)</h4>
            <ul className="space-y-3 text-slate-900">
              <li><span className="text-fuchsia-400 font-bold">and</span> (Semua harus True)<br/> <span className="text-slate-800">contoh: True and False &rarr; False</span></li>
              <li><span className="text-fuchsia-400 font-bold">or</span>  (Salah satu True sudah cukup)<br/> <span className="text-slate-800">contoh: True or False &rarr; True</span></li>
              <li><span className="text-fuchsia-400 font-bold">not</span> (Kebalikan)<br/> <span className="text-slate-800">contoh: not True &rarr; False</span></li>
            </ul>
          </div>
        </div>

        {/* Proyek Mini Pertemuan 5 */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-100 border-2 border-indigo-200 p-8 rounded-3xl mt-12 shadow-md">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
              🧮
            </div>
            <div>
              <h3 className="text-2xl font-black text-indigo-900">Proyek Analisis: "Kasir Supermarket Buggy"</h3>
              <p className="text-indigo-700 font-semibold">Studi Kasus Pembahasan Masalah</p>
            </div>
          </div>
          <div className="space-y-4 text-indigo-900/80">
            <p className="text-slate-900 text-lg"><strong>Masalah:</strong> Sebuah minimarket baru saja menginstal aplikasi kasir buatan <em>programmer amatir</em>. Aplikasi tersebut memiliki sebuah <em>Bug</em> (kecacatan). Ketika total belanja <strong>Rp 105.000</strong> dan pelanggan membayar dengan uang <strong>Rp 100.000</strong>, aplikasi justru bilang "Kembalian Anda: Rp -5.000" dan struk tercetak normal. Pelanggan bisa kabur padahal uangnya kurang!</p>
            
            <p className="font-bold text-indigo-950 mt-6">Tugas Perbaikan Kode (Debugging):</p>
            <p className="text-slate-900 text-lg">Rancang solusi untuk mencegah hal ini menggunakan perbandingan logika!</p>
            
            <div className="bg-slate-900 p-6 rounded-2xl text-sky-300 font-mono text-sm mt-4 shadow-xl">
              <p className="text-slate-400 mb-2"># SOLUSI (CARA PENYELESAIAN):</p>
              <p className="text-slate-900 text-lg">total_belanja = <span className="text-fuchsia-400">105000</span></p>
              <p className="text-slate-900 text-lg">uang_bayar = <span className="text-fuchsia-400">100000</span></p>
              <br/>
              <p className="text-slate-400"># Kita buat variabel logika boolean untuk mengecek uang</p>
              <p className="text-slate-900 text-lg">uang_cukup = uang_bayar <span className="text-amber-400">&gt;=</span> total_belanja</p>
              <br/>
              <p className="text-slate-900 text-lg"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Apakah uang cukup untuk membayar? "</span>, uang_cukup)</p>
              <p className="text-slate-400"># Output komputer: Apakah uang cukup untuk membayar? False</p>
              <br/>
              <p className="text-slate-400"># Kertas struk kasir HANYA BOLEH DICETAK jika uang_cukup bernilai True!</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  "s1-p6": {
    title: "Percabangan (If / Else)",
    content: (
      <div className="space-y-8 text-slate-700 leading-relaxed text-lg">
        
        <div className="text-slate-900 prose prose-lg max-w-none text-slate-700">
          <p className="text-xl font-medium text-slate-900 leading-normal">
            Di pertemuan sebelumnya (Proyek Kasir Supermarket), kita sudah mendapatkan nilai logika <code>True</code> atau <code>False</code>. Tapi bagaimana cara membuat komputer melakukan aksi <strong>berbeda</strong> berdasarkan nilai tersebut? Di sinilah konsep <strong>Percabangan (If/Else)</strong> menyelamatkan kita!
          </p>
          <p className="text-slate-900 text-lg">
            Percabangan adalah cara kita mengajari komputer untuk "mengambil keputusan" sendiri. Inilah cikal bakal terbentuknya Kecerdasan Artifisial (AI) tradisional.
          </p>
        </div>

        <h3 className="text-3xl font-extrabold text-sky-800 mt-12 mb-6 border-b-2 border-sky-100 pb-4">Struktur Dasar <code>if ... else</code> di Python</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8 items-center">
          <div>
            <p className="mb-4 text-slate-900">Dalam bahasa Inggris, <code>If</code> berarti "Jika", dan <code>Else</code> berarti "Jika tidak (Selain itu)". Aturannya di Python sangat ketat soal <strong>Indentation</strong> (Spasi / Tab masuk ke dalam). Kode yang masuk ke dalam berarti ia adalah milik blok <code>if</code> di atasnya.</p>
            <ul className="list-disc pl-5 text-slate-600">
              <li>Jangan lupa tanda titik dua <code>:</code> di akhir baris kondisi.</li>
              <li>Baris yang dieksekusi harus menjorok (di-Tab).</li>
            </ul>
          </div>
          
          <div className="bg-slate-900 text-sky-300 p-6 rounded-2xl shadow-xl font-mono text-sm border-l-4 border-emerald-500">
            <p className="text-slate-900 text-lg">cuaca = <span className="text-amber-300">"hujan"</span></p>
            <br/>
            <p className="text-slate-900 text-lg"><span className="text-fuchsia-400">if</span> cuaca <span className="text-amber-400">==</span> <span className="text-amber-300">"hujan"</span>:</p>
            <p className="pl-6 text-slate-400"># Baris ini dieksekusi jika kondisi BENAR (True)</p>
            <p className="pl-6 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Bawa payung!"</span>)</p>
            <p className="text-slate-900 text-lg"><span className="text-fuchsia-400">else</span>:</p>
            <p className="pl-6 text-slate-400"># Baris ini dieksekusi jika kondisi SALAH (False)</p>
            <p className="pl-6 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Pakai kacamata hitam!"</span>)</p>
          </div>
        </div>

        <h3 className="text-3xl font-extrabold text-sky-800 mt-12 mb-6 border-b-2 border-sky-100 pb-4">Bagaimana Jika Pilihannya Banyak? Gunakan <code>elif</code>!</h3>
        <p className="text-slate-900 text-lg">Kadang dunia tidak hanya Hitam dan Putih. Ada pilihan di tengah-tengah. Kita bisa menggunakan <code>elif</code> (singkatan dari <em>else if</em>).</p>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <p className="font-bold text-slate-800 mb-2">Contoh Menentukan Nilai Raport:</p>
          <pre className="font-mono text-sm bg-slate-900 text-sky-300 p-4 rounded-xl leading-loose">
nilai = <span className="text-fuchsia-400">85</span><br/><br/>
<span className="text-fuchsia-400">if</span> nilai &gt;= <span className="text-fuchsia-400">90</span>:<br/>
  <span className="text-emerald-400">print</span>(<span className="text-amber-300">"Nilai A (Sangat Baik)"</span>)<br/>
<span className="text-fuchsia-400">elif</span> nilai &gt;= <span className="text-fuchsia-400">80</span>:<br/>
  <span className="text-emerald-400">print</span>(<span className="text-amber-300">"Nilai B (Baik)"</span>)<br/>
<span className="text-fuchsia-400">elif</span> nilai &gt;= <span className="text-fuchsia-400">70</span>:<br/>
  <span className="text-emerald-400">print</span>(<span className="text-amber-300">"Nilai C (Cukup)"</span>)<br/>
<span className="text-fuchsia-400">else</span>:<br/>
  <span className="text-emerald-400">print</span>(<span className="text-amber-300">"Nilai D (Remedial)"</span>)<br/>
          </pre>
          <p className="mt-4 text-emerald-600 font-bold">Output: "Nilai B (Baik)"</p>
        </div>

        {/* Proyek Menantang Pertemuan 6 */}
        <div className="bg-gradient-to-br from-red-50 to-rose-100 border-2 border-red-200 p-8 rounded-3xl mt-12 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl shadow-red-200 animate-pulse">
              🛡️
            </div>
            <div>
              <h3 className="text-2xl font-black text-red-900">Proyek Lanjutan: Filter Anti-Anak Kecil di Bioskop</h3>
              <p className="text-red-700 font-semibold">Tugas Membuat Program Keputusan Validasi Umur</p>
            </div>
          </div>
          <div className="space-y-4 text-red-950/80">
            <p className="text-slate-900 text-lg"><strong>Skenario Menantang:</strong> Sebuah bioskop mempekerjakanmu untuk membuat mesin tiket otomatis bioskop dengan aturan ketat:</p>
            <ul className="list-disc pl-5 space-y-1 font-medium bg-white/50 p-4 rounded-xl text-slate-900">
              <li>Film "Siksa Neraka" Rating Dewasa (18+). Harga Tiket: Rp 50.000</li>
              <li>Jika pembeli berumur di bawah 18 tahun, transaksi harus <strong>DITOLAK</strong> meskipun uangnya cukup!</li>
              <li>Jika uangnya kurang, transaksi <strong>DITOLAK</strong> dengan alasan kurang uang.</li>
              <li>Hanya jika umurnya cukup DAN uangnya cukup, tiket berhasil dicetak.</li>
            </ul>
            
            <p className="font-bold text-red-900 mt-6">Cara Penyelesaian (Solusi Kode Bersarang / Nested If):</p>
            <div className="bg-slate-900 p-6 rounded-2xl text-sky-300 font-mono text-sm mt-4 shadow-2xl leading-loose">
              <p className="text-slate-900 text-lg">umur_pembeli = <span className="text-fuchsia-400">16</span></p>
              <p className="text-slate-900 text-lg">uang_pembeli = <span className="text-fuchsia-400">100000</span></p>
              <p className="text-slate-900 text-lg">harga_tiket = <span className="text-fuchsia-400">50000</span></p>
              <br/>
              <p className="text-slate-400"># Cek Syarat Utama (Umur)</p>
              <p className="text-slate-900 text-lg"><span className="text-fuchsia-400">if</span> umur_pembeli &gt;= <span className="text-fuchsia-400">18</span>:</p>
              <p className="pl-6 text-slate-400"># Umur cukup, sekarang cek uangnya (Ini disebut IF Bersarang)</p>
              <p className="pl-6 text-slate-900"><span className="text-fuchsia-400">if</span> uang_pembeli &gt;= harga_tiket:</p>
              <p className="pl-12 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Tiket Dicetak. Selamat menonton!"</span>)</p>
              <p className="pl-6 text-slate-900"><span className="text-fuchsia-400">else</span>:</p>
              <p className="pl-12 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Maaf, uang Anda tidak cukup!"</span>)</p>
              <p className="text-slate-900 text-lg"><span className="text-fuchsia-400">else</span>:</p>
              <p className="pl-6 text-slate-400"># Umur tidak cukup, langsung tolak</p>
              <p className="pl-6 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"AKSES DITOLAK: Anda masih di bawah umur!"</span>)</p>
              <br/>
              <p className="text-slate-400"># Hasil eksekusi untuk umur 16: "AKSES DITOLAK: Anda masih di bawah umur!"</p>
            </div>
            
            <p className="mt-4 italic text-sm font-semibold">Tantangan Ekstra: Cobalah ubah nilai `umur_pembeli` menjadi 25 dan jalankan kodenya di pikiranmu. Apa yang akan keluar?</p>
          </div>
        </div>
      </div>
    )
  },
  "s1-p7": {
    title: "Perulangan (For / While)",
    content: (
      <div className="space-y-8 text-slate-700 leading-relaxed text-lg">
        <div className="text-slate-900 prose prose-lg max-w-none text-slate-700">
          <p className="text-xl font-medium text-slate-900 leading-normal">
            Selamat datang di kekuatan super mesin yang sesungguhnya: <strong>Perulangan (Looping)</strong>. Jika manusia diminta menyalin kalimat "Saya tidak akan bolos lagi" sebanyak 1.000 kali, tangan manusia pasti akan lelah dan butuh waktu berjam-jam. Namun bagi komputer? Ia bisa melakukannya dalam waktu kurang dari 1 detik tanpa pernah mengeluh!
          </p>
        </div>

        <h3 className="text-3xl font-extrabold text-sky-800 mt-12 mb-6 border-b-2 border-sky-100 pb-4">1. Perulangan <code>for</code> (Terjadwal)</h3>
        <p className="text-slate-900 text-lg">Kita menggunakan perulangan <code>for</code> jika kita <strong>sudah tahu pasti</strong> berapa kali kita ingin mengulang suatu aksi (misalnya: ulangi sebanyak 10 kali, atau ulangi sebanyak jumlah siswa di kelas).</p>
        
        <div className="bg-slate-900 text-sky-300 p-6 rounded-2xl shadow-xl font-mono text-sm my-6 border-l-4 border-amber-500">
          <p className="text-slate-400 mb-2"># Contoh: Mencetak angka 1 sampai 5</p>
          <p className="text-slate-900 text-lg"><span className="text-fuchsia-400">for</span> i <span className="text-fuchsia-400">in</span> <span className="text-emerald-400">range</span>(<span className="text-fuchsia-400">1</span>, <span className="text-fuchsia-400">6</span>):</p>
          <p className="pl-6 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Menghitung:"</span>, i)</p>
          <br/>
          <div className="bg-black/50 p-4 rounded-lg border border-slate-800">
            <p className="text-xs text-slate-800 mb-1">OUTPUT TERMINAL:</p>
            <p className="text-white">Menghitung: 1<br/>Menghitung: 2<br/>Menghitung: 3<br/>Menghitung: 4<br/>Menghitung: 5</p>
          </div>
          <p className="text-xs text-slate-400 mt-3 font-sans">*Catatan: Di Python, fungsi range(1, 6) akan berhenti SEBELUM angka 6.</p>
        </div>

        <h3 className="text-3xl font-extrabold text-sky-800 mt-12 mb-6 border-b-2 border-sky-100 pb-4">2. Perulangan <code>while</code> (Tak Terbatas)</h3>
        <p className="text-slate-900 text-lg">Kita menggunakan perulangan <code>while</code> jika kita <strong>tidak tahu berapa kali harus mengulang</strong>, tetapi kita tahu aksi harus dihentikan <strong>JIKA suatu kondisi terpenuhi</strong> (Misalnya: "Terus serang bos monster SELAMA darahnya belum habis").</p>

        <div className="bg-slate-900 text-sky-300 p-6 rounded-2xl shadow-xl font-mono text-sm my-6 border-l-4 border-fuchsia-500">
          <p className="text-slate-900 text-lg">darah_monster = <span className="text-fuchsia-400">100</span></p>
          <br/>
          <p className="text-slate-400"># "Selama darah monster lebih dari 0, terus lakukan ini:"</p>
          <p className="text-slate-900 text-lg"><span className="text-fuchsia-400">while</span> darah_monster <span className="text-amber-400">&gt;</span> <span className="text-fuchsia-400">0</span>:</p>
          <p className="pl-6 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Menyerang monster!"</span>)</p>
          <p className="pl-6 text-slate-400"># Kurangi darah monster sebesar 20 poin tiap serangan</p>
          <p className="pl-6 text-slate-900">darah_monster = darah_monster - <span className="text-fuchsia-400">20</span></p>
          <p className="pl-6 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Darah tersisa:"</span>, darah_monster)</p>
          <br/>
          <p className="text-slate-400"># Looping akan otomatis BERHENTI saat darah mencapai 0.</p>
          <p className="text-slate-900 text-lg"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Monster Kalahkan!"</span>)</p>
        </div>

        {/* Proyek Mini Pertemuan 7 */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-100 border-2 border-orange-200 p-8 rounded-3xl mt-12 shadow-md">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg animate-spin-slow">
              🔄
            </div>
            <div>
              <h3 className="text-2xl font-black text-orange-900">Proyek Lanjutan: Hacker Pembobol Brankas (Brute Force)</h3>
              <p className="text-orange-700 font-semibold">Tugas Eksploitasi Perulangan (While Loop)</p>
            </div>
          </div>
          <div className="space-y-4 text-orange-900/80">
            <p className="text-slate-900 text-lg"><strong>Skenario:</strong> Seorang hacker sedang mencoba meretas PIN brankas 3-digit. Jika ia mencoba satu per satu dari `000` hingga `999` secara manual, jarinya akan keriting. Namun dengan *While Loop*, komputer bisa melakukannya dalam hitungan milidetik!</p>
            
            <p className="font-bold text-orange-950 mt-6">Solusi Kode Pemecah PIN:</p>
            
            <div className="bg-slate-900 p-6 rounded-2xl text-sky-300 font-mono text-sm mt-4 shadow-xl leading-loose">
              <p className="text-slate-900 text-lg">pin_rahasia = <span className="text-fuchsia-400">742</span></p>
              <p className="text-slate-900 text-lg">tebakan = <span className="text-fuchsia-400">0</span> <span className="text-slate-400"># Mulai menebak dari angka nol</span></p>
              <br/>
              <p className="text-slate-400"># Selama tebakan salah, mesin akan terus menebak secara otomatis!</p>
              <p className="text-slate-900 text-lg"><span className="text-fuchsia-400">while</span> tebakan <span className="text-amber-400">!=</span> pin_rahasia:</p>
              <p className="pl-6 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Mencoba PIN:"</span>, tebakan, <span className="text-amber-300">"&rarr; Gagal!"</span>)</p>
              <p className="pl-6 text-slate-900">tebakan = tebakan + <span className="text-fuchsia-400">1</span> <span className="text-slate-400"># Coba angka selanjutnya</span></p>
              <br/>
              <p className="text-slate-400"># Begitu mesin menemukan angka 742, Loop akan langsung berhenti.</p>
              <p className="text-slate-900 text-lg"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"BINGO! Brankas terbuka di PIN:"</span>, tebakan)</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  "s1-p8": {
    title: "Fungsi dan Prosedur (Sub-Program)",
    content: (
      <div className="space-y-8 text-slate-700 leading-relaxed text-lg">
        
        <div className="text-slate-900 prose prose-lg max-w-none text-slate-700">
          <p className="text-xl font-medium text-slate-900 leading-normal">
            Sejauh ini, kita telah menulis program dari atas ke bawah. Tetapi bagaimana jika aplikasi kita sudah berisi 10.000 baris kode? Tentu akan sangat berantakan dan sulit diperbaiki! Di sinilah peran <strong>Fungsi (Function)</strong>.
          </p>
          <p className="text-slate-900 text-lg">
            Bayangkan Fungsi itu seperti <strong>"Resep Masakan"</strong>. Kamu hanya perlu menulis resep Nasi Goreng <strong>satu kali</strong> saja. Nantinya, jika kamu ingin memasak Nasi Goreng, kamu tidak perlu menulis langkah-langkahnya dari awal, cukup "panggil" resepnya. Dalam pemrograman, ini disebut prinsip <strong>DRY (Don't Repeat Yourself)</strong>.
          </p>
        </div>

        <h3 className="text-3xl font-extrabold text-sky-800 mt-12 mb-6 border-b-2 border-sky-100 pb-4">Deklarasi Fungsi di Python (menggunakan <code>def</code>)</h3>
        
        <div className="bg-slate-900 text-sky-300 p-6 rounded-2xl shadow-xl font-mono text-sm my-6 border-l-4 border-sky-500">
          <p className="text-slate-400 mb-2"># 1. Mendefinisikan Fungsi (Hanya dibuat, belum dijalankan)</p>
          <p className="text-slate-900 text-lg"><span className="text-fuchsia-400">def</span> <span className="text-sky-400">ucapkan_selamat_pagi</span>():</p>
          <p className="pl-6 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Halo! Selamat pagi semuanya!"</span>)</p>
          <p className="pl-6 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Semoga harimu menyenangkan."</span>)</p>
          <br/>
          <p className="text-slate-400"># 2. Memanggil Fungsi (Bisa dilakukan berkali-kali)</p>
          <p className="text-slate-900 text-lg"><span className="text-sky-400">ucapkan_selamat_pagi</span>()</p>
          <p className="text-slate-900 text-lg"><span className="text-sky-400">ucapkan_selamat_pagi</span>()</p>
        </div>

        <h3 className="text-3xl font-extrabold text-sky-800 mt-12 mb-6 border-b-2 border-sky-100 pb-4">Parameter dan Argumen (Fungsi Dinamis)</h3>
        <p className="text-slate-900 text-lg">Resep masakan di atas terlalu kaku karena hanya bisa mencetak teks yang persis sama. Bagaimana jika kita ingin mesin sapaannya menyebutkan nama spesifik dari penggunanya? Kita bisa memasukkan bahan baku (disebut <em>Parameter</em>).</p>

        <div className="bg-slate-900 text-sky-300 p-6 rounded-2xl shadow-xl font-mono text-sm my-6 border-l-4 border-purple-500">
          <p className="text-slate-400"># 'nama' adalah kotak kosong yang akan kita isi nanti</p>
          <p className="text-slate-900 text-lg"><span className="text-fuchsia-400">def</span> <span className="text-sky-400">sapa_pengguna</span>(nama):</p>
          <p className="pl-6 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Akses Diberikan."</span>)</p>
          <p className="pl-6 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Selamat datang kembali, Tuan"</span>, nama)</p>
          <br/>
          <p className="text-slate-400"># Mari panggil dan masukkan data (Argumen)</p>
          <p className="text-slate-900 text-lg"><span className="text-sky-400">sapa_pengguna</span>(<span className="text-amber-300">"Budi"</span>)</p>
          <p className="text-slate-900 text-lg"><span className="text-sky-400">sapa_pengguna</span>(<span className="text-amber-300">"Albert Einstein"</span>)</p>
        </div>

        {/* Proyek Puncak Modul 8 */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700 p-8 rounded-3xl mt-12 shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg shadow-cyan-500/50">
              📐
            </div>
            <div>
              <h3 className="text-2xl font-black text-white">Proyek Master: Kalkulator Luas Tanah Pintar</h3>
              <p className="text-cyan-400 font-semibold">Tugas Menciptakan Mesin Fungsi Canggih</p>
            </div>
          </div>
          <div className="space-y-4 text-slate-300">
            <p className="text-slate-900 text-lg"><strong>Skenario:</strong> Sebuah perusahaan *Real Estate* lelah menghitung luas bidang tanah perumahan secara manual setiap kali ada klien datang. Mereka memintamu membuat <strong>mesin fungsi (Function)</strong> serbaguna yang bisa langsung menghitung luas tanah persegi panjang, dan langsung menampilkan total harga tanah tersebut (Rp 2 Juta per meter persegi).</p>
            
            <p className="font-bold text-white mt-6">Solusi Menggunakan `def` dan `return`:</p>
            <div className="bg-black/50 p-6 rounded-2xl text-sky-300 font-mono text-sm mt-4 border border-slate-700 leading-loose">
              <p className="text-slate-900 text-lg"><span className="text-fuchsia-400">def</span> <span className="text-sky-400">hitung_tanah</span>(panjang, lebar):</p>
              <p className="pl-6 text-slate-800"># Menghitung luas tanah</p>
              <p className="pl-6 text-slate-900">luas = panjang <span className="text-amber-400">*</span> lebar</p>
              <br/>
              <p className="pl-6 text-slate-800"># Menghitung harga (Rp 2 Juta / meter)</p>
              <p className="pl-6 text-slate-900">harga = luas <span className="text-amber-400">*</span> <span className="text-fuchsia-400">2000000</span></p>
              <br/>
              <p className="pl-6 text-slate-800"># Mengembalikan hasil (seperti Vending Machine mengeluarkan minuman)</p>
              <p className="pl-6 text-slate-900"><span className="text-fuchsia-400">return</span> luas, harga</p>
              <br/>
              <p className="text-slate-800"># ----------- PROGRAM UTAMA ----------- #</p>
              <p className="text-slate-800"># Ada pembeli melihat tanah ukuran 10x15 meter</p>
              <p className="text-slate-900 text-lg">luas_tanah, total_bayar = <span className="text-sky-400">hitung_tanah</span>(<span className="text-fuchsia-400">10</span>, <span className="text-fuchsia-400">15</span>)</p>
              <br/>
              <p className="text-slate-900 text-lg"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Total luas tanah:"</span>, luas_tanah, <span className="text-amber-300">"meter persegi"</span>)</p>
              <p className="text-slate-900 text-lg"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Total harga yang harus dibayar: Rp"</span>, total_bayar)</p>
            </div>
            
            <p className="mt-4 text-sm font-medium text-cyan-200">Kehebatan Fungsi: Besok jika ada 100 pembeli berbeda, bos perusahaan hanya perlu memanggil `hitung_tanah(x, y)` berulang kali tanpa perlu menulis rumus matematikanya lagi!</p>
          </div>
        </div>
      </div>
    )
  },
  "s1-p9": {
    title: "Struktur Data (List / Array)",
    content: (
      <div className="space-y-8 text-slate-700 leading-relaxed text-lg">
        
        <div className="text-slate-900 prose prose-lg max-w-none text-slate-700">
          <p className="text-xl font-medium text-slate-900 leading-normal">
            Di awal pertemuan, kita membayangkan Variabel sebagai "Kotak Penyimpanan". Namun, bagaimana jika kita harus menyimpan data 40 nama siswa di kelas? Apakah kita harus membuat variabel <code>siswa1</code>, <code>siswa2</code>, hingga <code>siswa40</code>? Itu sangat tidak efisien! 
          </p>
          <p className="text-slate-900 text-lg">
            Solusinya adalah menggunakan <strong>List (atau Array)</strong>. Bayangkan List seperti <strong>"Rak Laci Bersusun"</strong> di mana satu variabel bisa menyimpan banyak barang sekaligus, dan setiap laci diberi nomor urut (Indeks).
          </p>
        </div>

        <h3 className="text-3xl font-extrabold text-sky-800 mt-12 mb-6 border-b-2 border-sky-100 pb-4">Anatomi List di Python</h3>
        
        <div className="bg-slate-900 text-sky-300 p-6 rounded-2xl shadow-xl font-mono text-sm my-6 border-l-4 border-yellow-400">
          <p className="text-slate-400 mb-2"># Membuat List menggunakan kurung siku [ ]</p>
          <p className="text-slate-900 text-lg">keranjang_buah = [<span className="text-amber-300">"Apel"</span>, <span className="text-amber-300">"Mangga"</span>, <span className="text-amber-300">"Pisang"</span>, <span className="text-amber-300">"Jeruk"</span>]</p>
          <br/>
          <p className="text-slate-400"># PENTING: Di Ilmu Komputer, nomor urut (Indeks) selalu dimulai dari NOL, bukan SATU!</p>
          <p className="text-slate-900 text-lg"><span className="text-emerald-400">print</span>(keranjang_buah[<span className="text-fuchsia-400">0</span>]) <span className="text-slate-400"># Akan mencetak: Apel</span></p>
          <p className="text-slate-900 text-lg"><span className="text-emerald-400">print</span>(keranjang_buah[<span className="text-fuchsia-400">2</span>]) <span className="text-slate-400"># Akan mencetak: Pisang</span></p>
          <br/>
          <p className="text-slate-400"># Kita juga bisa MENGGANTI isinya</p>
          <p className="text-slate-900 text-lg">keranjang_buah[<span className="text-fuchsia-400">1</span>] = <span className="text-amber-300">"Durian"</span> <span className="text-slate-400"># Mangga diubah jadi Durian</span></p>
          <p className="text-slate-900 text-lg"><span className="text-emerald-400">print</span>(keranjang_buah)</p>
        </div>

        <h3 className="text-3xl font-extrabold text-sky-800 mt-12 mb-6 border-b-2 border-sky-100 pb-4">Operasi Canggih pada List</h3>
        <p className="text-slate-900 text-lg">List di Python sangat fleksibel. Ia memiliki "tombol-tombol ajaib" (disebut *Method*) bawaan untuk memanipulasi datanya dengan mudah.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-3 border-b pb-2 flex justify-between"><span>Menambah Data</span> <code className="text-xs bg-slate-100 px-2 py-1 rounded">.append()</code></h4>
            <p className="font-mono text-base text-slate-900 bg-slate-50 p-2 rounded">data.append("Anggur")<br/><span className="text-xs text-slate-400"># Memasukkan Anggur ke posisi paling belakang.</span></p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-3 border-b pb-2 flex justify-between"><span>Menghapus Data</span> <code className="text-xs bg-slate-100 px-2 py-1 rounded">.remove()</code></h4>
            <p className="font-mono text-base text-slate-900 bg-slate-50 p-2 rounded">data.remove("Apel")<br/><span className="text-xs text-slate-400"># Mencari Apel dan menghapusnya dari list.</span></p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-3 border-b pb-2 flex justify-between"><span>Panjang/Isi List</span> <code className="text-xs bg-slate-100 px-2 py-1 rounded">len()</code></h4>
            <p className="font-mono text-base text-slate-900 bg-slate-50 p-2 rounded">jumlah = len(data)<br/><span className="text-xs text-slate-400"># Menghitung total ada berapa barang di dalam laci.</span></p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-3 border-b pb-2 flex justify-between"><span>Mengurutkan Abjad</span> <code className="text-xs bg-slate-100 px-2 py-1 rounded">.sort()</code></h4>
            <p className="font-mono text-base text-slate-900 bg-slate-50 p-2 rounded">data.sort()<br/><span className="text-xs text-slate-400"># Menyusun list secara Alfabetis (A-Z) atau Angka (0-9).</span></p>
          </div>
        </div>

        {/* Proyek Modul 9 */}
        <div className="bg-gradient-to-br from-yellow-50 to-amber-100 border-2 border-yellow-300 p-8 rounded-3xl mt-12 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl shadow-yellow-200">
              🛒
            </div>
            <div>
              <h3 className="text-2xl font-black text-amber-900">Proyek Lanjutan: Sistem Inventaris Toko Online</h3>
              <p className="text-amber-700 font-semibold">Tugas Manajemen Data Rak List</p>
            </div>
          </div>
          <div className="space-y-4 text-amber-950/80">
            <p className="text-slate-900 text-lg"><strong>Skenario:</strong> Kamu diminta membangun fitur "Keranjang Belanja" (*Shopping Cart*) untuk aplikasi semacam Shopee/Tokopedia. Saat pembeli memencet tombol "Beli", barang harus masuk ke memori komputer secara berurutan, lalu ditampilkan semua isinya.</p>
            
            <p className="font-bold text-amber-900 mt-6">Simulasi Kode Solusi:</p>
            <div className="bg-slate-900 p-6 rounded-2xl text-sky-300 font-mono text-sm mt-4 shadow-2xl leading-loose">
              <p className="text-slate-900 text-lg">keranjang = [] <span className="text-slate-400"># Memori keranjang awalnya KOSONG</span></p>
              <br/>
              <p className="text-slate-400"># Pembeli memencet tombol Beli 3 kali</p>
              <p className="text-slate-900 text-lg">keranjang.append(<span className="text-amber-300">"Sepatu Sneakers"</span>)</p>
              <p className="text-slate-900 text-lg">keranjang.append(<span className="text-amber-300">"Kemeja Pria"</span>)</p>
              <p className="text-slate-900 text-lg">keranjang.append(<span className="text-amber-300">"Jam Tangan"</span>)</p>
              <br/>
              <p className="text-slate-400"># Pembeli berubah pikiran, menghapus Kemeja</p>
              <p className="text-slate-900 text-lg">keranjang.remove(<span className="text-amber-300">"Kemeja Pria"</span>)</p>
              <br/>
              <p className="text-slate-400"># Kita cetak struk menggunakan bantuan Loop FOR agar rapi!</p>
              <p className="text-slate-900 text-lg"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Isi Keranjang Belanja Anda:"</span>)</p>
              <p className="text-slate-900 text-lg"><span className="text-fuchsia-400">for</span> barang <span className="text-fuchsia-400">in</span> keranjang:</p>
              <p className="pl-6 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"- "</span> + barang)</p>
              <br/>
              <p className="text-slate-400"># Output yang muncul: <br/># - Sepatu Sneakers<br/># - Jam Tangan</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  "s1-p10": {
    title: "Penanganan Error (Debugging)",
    content: (
      <div className="space-y-8 text-slate-700 leading-relaxed text-lg">
        
        <div className="text-slate-900 prose prose-lg max-w-none text-slate-700">
          <p className="text-xl font-medium text-slate-900 leading-normal">
            Selamat datang di realita pahit dunia pemrograman! Bahkan di perusahaan teknologi raksasa seperti Google, tidak ada <em>Programmer</em> yang bisa menulis ratusan baris kode langsung berjalan sempurna 100% tanpa salah pada ketikan pertama. 
          </p>
          <p className="text-slate-900 text-lg">
            Aplikasi pasti akan mengalami <strong>Error (Crash)</strong>. Tugas terpenting seorang <em>Software Engineer</em> bukanlah sekadar menulis kode, melainkan mencari tahu mengapa kodenya rusak dan bagaimana cara memperbaikinya. Proses mencari kutu (bug) ini dinamakan <strong>Debugging</strong>.
          </p>
        </div>

        <h3 className="text-3xl font-extrabold text-sky-800 mt-12 mb-6 border-b-2 border-sky-100 pb-4">Tiga Jenis Monster "Error"</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
            <h4 className="font-black text-red-900 text-lg flex items-center gap-2 mb-2"><span>⚠️</span> Syntax Error</h4>
            <p className="text-red-700 text-sm">Kesalahan tata bahasa ketikan. Ibarat typo menulis "Syaa makan" alih-alih "Saya makan". Komputer langsung menolak menjalankan kodenya.</p>
            <p className="mt-3 text-xs font-mono text-red-900 bg-red-100 p-2 rounded">prnt("Halo") # Kurang huruf i</p>
          </div>
          <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200">
            <h4 className="font-black text-orange-900 text-lg flex items-center gap-2 mb-2"><span>🔥</span> Runtime Error</h4>
            <p className="text-orange-700 text-sm">Secara teks kodenya benar, tetapi saat aplikasi berjalan, terjadi masalah tak terduga yang membuatnya meledak/crash di tengah jalan.</p>
            <p className="mt-3 text-xs font-mono text-orange-900 bg-orange-100 p-2 rounded">hasil = 10 / 0 # Dibagi NOL!</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200">
            <h4 className="font-black text-purple-900 text-lg flex items-center gap-2 mb-2"><span>👻</span> Logical Error</h4>
            <p className="text-purple-700 text-sm">Yang paling berbahaya! Aplikasi TIDAK error dan tidak crash, tetapi hasilnya <strong>SALAH</strong> (Misal: Kalkulator 1+1 hasilnya 3).</p>
            <p className="mt-3 text-xs font-mono text-purple-900 bg-purple-100 p-2 rounded">luas = p + l # Salah rumus</p>
          </div>
        </div>

        <h3 className="text-3xl font-extrabold text-sky-800 mt-12 mb-6 border-b-2 border-sky-100 pb-4">Mencegah Aplikasi "Meledak" (Try-Except)</h3>
        <p className="text-slate-900 text-lg">Di bahasa Python, ada alat pelindung bernama blok <code>try...except</code>. Alat ini berfungsi bagaikan kantung udara (airbag) di mobil. Jika terjadi tabrakan (Runtime Error), aplikasi tidak akan langsung meledak ke wajah pengguna, melainkan memunculkan pesan peringatan yang elegan.</p>

        <div className="bg-slate-900 text-sky-300 p-6 rounded-2xl shadow-xl font-mono text-sm my-6 border-l-4 border-rose-500">
          <p className="text-slate-900 text-lg"><span className="text-fuchsia-400">try</span>:</p>
          <p className="pl-6 text-slate-400"># Blok TRY: "Komputer, tolong cobalah jalankan baris berbahaya ini..."</p>
          <p className="pl-6 text-slate-900">angka1 = <span className="text-fuchsia-400">100</span></p>
          <p className="pl-6 text-slate-900">angka2 = <span className="text-fuchsia-400">0</span></p>
          <p className="pl-6 text-slate-900">hasil = angka1 / angka2 <span className="text-slate-400"># &larr; FATAL: Pembagian dengan nol akan membuat sistem CRASH</span></p>
          <p className="pl-6 text-slate-900"><span className="text-emerald-400">print</span>(hasil)</p>
          <br/>
          <p className="text-slate-900 text-lg"><span className="text-fuchsia-400">except</span> <span className="text-rose-400">ZeroDivisionError</span>:</p>
          <p className="pl-6 text-slate-400"># Blok EXCEPT: "Kalau gagal dan meledak, tolong tangkap error-nya, dan cetak pesan ini saja."</p>
          <p className="pl-6 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Maaf, Anda tidak boleh membagi angka dengan NOL."</span>)</p>
          <br/>
          <div className="bg-black/50 p-4 rounded-lg border border-slate-800">
            <p className="text-xs text-slate-800 mb-1">HASIL EKSEKUSI:</p>
            <p className="text-emerald-400">Maaf, Anda tidak boleh membagi angka dengan NOL. <span className="text-slate-400">(Sistem tetap hidup)</span></p>
          </div>
        </div>

        {/* Proyek Modul 10 */}
        <div className="bg-gradient-to-br from-violet-50 to-fuchsia-100 border-2 border-violet-200 p-8 rounded-3xl mt-12 shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg shadow-purple-500/50">
              🕵️
            </div>
            <div>
              <h3 className="text-2xl font-black text-purple-950">Proyek Detektif: Perburuan Kutu Kode (Bug Bounty)</h3>
              <p className="text-purple-700 font-semibold">Tugas Menjadi Quality Assurance (QA) Tester</p>
            </div>
          </div>
          <div className="space-y-4 text-slate-800">
            <p className="text-slate-900 text-lg"><strong>Misi:</strong> Seseorang memberimu kode sebuah mesin ATM. Jika *User* salah memasukkan uang berbentuk huruf/teks (Misalnya memasukkan kata "Seratus" alih-alih angka "100"), mesin ATM akan *Crash* / Nge-hang, dan kartu ATM pengguna tertelan tidak bisa keluar. Tugasmu adalah mencegah aplikasi ATM rusak dengan menggunakan tameng pelindung `try-except`.</p>
            
            <p className="font-bold text-purple-900 mt-6">Bocoran Berkas Kode Perbaikan:</p>
            <div className="bg-black/50 p-6 rounded-2xl text-sky-300 font-mono text-sm mt-4 border border-slate-700 leading-loose">
              <p className="text-slate-900 text-lg"><span className="text-fuchsia-400">try</span>:</p>
              <p className="pl-6 text-slate-800"># Simulasi mesin meminta input angka dari keyboard pengguna</p>
              <p className="pl-6 text-slate-900">tarik_tunai = <span className="text-emerald-400">int</span>(<span className="text-amber-300">"Tiga Juta"</span>) <span className="text-slate-800"># ERROR! Kata 'Tiga Juta' tidak bisa diubah jadi tipe data INTEGER</span></p>
              <p className="pl-6 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Uang ditarik: Rp"</span>, tarik_tunai)</p>
              <br/>
              <p className="text-slate-900 text-lg"><span className="text-fuchsia-400">except</span> <span className="text-rose-400">ValueError</span>:</p>
              <p className="pl-6 text-slate-800"># Menggunakan perisai spesifik untuk error Value/Tipe Data</p>
              <p className="pl-6 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"TIDAK VALID! Tolong masukkan ANGKA, bukan HURUF."</span>)</p>
              <p className="pl-6 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Sistem dibatalkan secara aman. Kartu ATM dikeluarkan."</span>)</p>
            </div>
            
            <p className="mt-4 text-sm font-medium text-purple-900 bg-white/60 p-4 rounded-xl border border-white">Pesan Moral Programmer: "Selalu curigai pengguna aplikasimu. Mereka akan memasukkan data aneh yang tidak pernah kamu duga sebelumnya. Berlindunglah di balik <code>try-except</code>!"</p>
          </div>
        </div>
      </div>
    )
  },
  "s1-p11": {
    title: "Studi Kasus Algoritma Terapan",
    content: (
      <div className="space-y-8 text-slate-700 leading-relaxed text-lg">
        
        <div className="text-slate-900 prose prose-lg max-w-none text-slate-700">
          <p className="text-xl font-medium text-slate-900 leading-normal">
            Selamat! Kamu telah mempelajari semua fondasi dasar pemrograman Python: Variabel, Tipe Data, If/Else, Perulangan, Fungsi, dan Debugging. Sekarang, saatnya menggabungkan semua kepingan *puzzle* tersebut ke dalam satu <strong>Algoritma Terapan</strong>.
          </p>
          <p className="text-slate-900 text-lg">
            Di industri nyata, algoritma jarang berdiri sendiri. Biasanya kita menggunakan perulangan di dalam fungsi, percabangan di dalam perulangan, dan daftar (list) sebagai penampung hasilnya. Kita akan belajar bagaimana memecahkan masalah berskala besar!
          </p>
        </div>

        <h3 className="text-3xl font-extrabold text-sky-800 mt-12 mb-6 border-b-2 border-sky-100 pb-4">Studi Kasus: Algoritma Rekomendasi YouTube</h3>
        
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <p className="mb-4 text-slate-900">Tahukah kamu bagaimana YouTube merekomendasikan video? Algoritma mereka menggabungkan <strong>List</strong> (Riwayat tontonanmu) dan <strong>If/Else</strong> (Mengecek kategori yang paling sering kamu tonton). Mari kita buat simulasi sederhananya!</p>
          
          <div className="bg-slate-900 text-sky-300 p-6 rounded-xl font-mono text-sm shadow-xl leading-loose">
            <p className="text-slate-400"># 1. Riwayat tontonan dari List</p>
            <p className="text-slate-900 text-lg">riwayat_tontonan = [<span className="text-amber-300">"Gaming"</span>, <span className="text-amber-300">"Musik"</span>, <span className="text-amber-300">"Gaming"</span>, <span className="text-amber-300">"Edukasi"</span>, <span className="text-amber-300">"Gaming"</span>]</p>
            <br/>
            <p className="text-slate-400"># 2. Fungsi Mesin Rekomendasi</p>
            <p className="text-slate-900 text-lg"><span className="text-fuchsia-400">def</span> <span className="text-sky-400">berikan_rekomendasi</span>(riwayat):</p>
            <p className="pl-6 text-slate-900">poin_gaming = <span className="text-fuchsia-400">0</span></p>
            <p className="pl-6 text-slate-400"># Menghitung dengan Loop For</p>
            <p className="pl-6 text-slate-900"><span className="text-fuchsia-400">for</span> video <span className="text-fuchsia-400">in</span> riwayat:</p>
            <p className="pl-12 text-slate-900"><span className="text-fuchsia-400">if</span> video <span className="text-amber-400">==</span> <span className="text-amber-300">"Gaming"</span>:</p>
            <p className="pl-18 text-slate-900">poin_gaming = poin_gaming + <span className="text-fuchsia-400">1</span></p>
            <br/>
            <p className="pl-6 text-slate-400"># Algoritma Keputusan</p>
            <p className="pl-6 text-slate-900"><span className="text-fuchsia-400">if</span> poin_gaming <span className="text-amber-400">&gt;=</span> <span className="text-fuchsia-400">3</span>:</p>
            <p className="pl-12 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Rekomendasi Hari Ini: Live Stream Mobile Legends!"</span>)</p>
            <p className="pl-6 text-slate-900"><span className="text-fuchsia-400">else</span>:</p>
            <p className="pl-12 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Rekomendasi Hari Ini: Video Populer Campuran."</span>)</p>
            <br/>
            <p className="text-slate-400"># 3. Jalankan Mesin</p>
            <p className="text-slate-900 text-lg"><span className="text-sky-400">berikan_rekomendasi</span>(riwayat_tontonan)</p>
          </div>
        </div>

        {/* Proyek Modul 11 */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-100 border-2 border-emerald-300 p-8 rounded-3xl mt-12 shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl shadow-emerald-200 animate-bounce">
              👨‍🏫
            </div>
            <div>
              <h3 className="text-2xl font-black text-emerald-950">Proyek Lanjutan: Asisten Guru Penilai Ujian Otomatis</h3>
              <p className="text-emerald-700 font-semibold">Tugas Implementasi Kombinasi Konsep</p>
            </div>
          </div>
          <div className="space-y-4 text-emerald-900/80">
            <p className="text-slate-900 text-lg"><strong>Skenario:</strong> Bapak/Ibu guru kewalahan memeriksa nilai 5 siswa yang menumpuk. Kamu diminta membuat sebuah <strong>Fungsi</strong> yang menerima <strong>List (Daftar Nilai)</strong>, kemudian menggunakan <strong>Perulangan (Loop)</strong> untuk mengecek setiap nilai, dan <strong>Percabangan (If)</strong> untuk memisahkan siapa saja siswa yang "Lulus" (Nilai &gt;= 75) dan siapa yang "Remedial".</p>
            
            <p className="font-bold text-emerald-950 mt-6">Kode Solusi Sang Asisten:</p>
            <div className="bg-slate-900 p-6 rounded-2xl text-sky-300 font-mono text-sm mt-4 shadow-xl leading-loose">
              <p className="text-slate-900 text-lg"><span className="text-fuchsia-400">def</span> <span className="text-sky-400">analisis_ujian</span>(daftar_nilai):</p>
              <p className="pl-6 text-slate-900">siswa_lulus = <span className="text-fuchsia-400">0</span></p>
              <p className="pl-6 text-slate-900">siswa_remed = <span className="text-fuchsia-400">0</span></p>
              <br/>
              <p className="pl-6 text-slate-900"><span className="text-fuchsia-400">for</span> nilai <span className="text-fuchsia-400">in</span> daftar_nilai:</p>
              <p className="pl-12 text-slate-900"><span className="text-fuchsia-400">if</span> nilai <span className="text-amber-400">&gt;=</span> <span className="text-fuchsia-400">75</span>:</p>
              <p className="pl-18 text-slate-900">siswa_lulus = siswa_lulus + <span className="text-fuchsia-400">1</span></p>
              <p className="pl-12 text-slate-900"><span className="text-fuchsia-400">else</span>:</p>
              <p className="pl-18 text-slate-900">siswa_remed = siswa_remed + <span className="text-fuchsia-400">1</span></p>
              <br/>
              <p className="pl-6 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"=== LAPORAN HASIL UJIAN ==="</span>)</p>
              <p className="pl-6 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Total Siswa Lulus:"</span>, siswa_lulus)</p>
              <p className="pl-6 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Total Siswa Remedial:"</span>, siswa_remed)</p>
              <br/>
              <p className="text-slate-400"># Menjalankan Aplikasi</p>
              <p className="text-slate-900 text-lg">nilai_kelas_X = [<span className="text-fuchsia-400">80</span>, <span className="text-fuchsia-400">60</span>, <span className="text-fuchsia-400">95</span>, <span className="text-fuchsia-400">70</span>, <span className="text-fuchsia-400">100</span>]</p>
              <p className="text-slate-900 text-lg"><span className="text-sky-400">analisis_ujian</span>(nilai_kelas_X)</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  "s1-p12": {
    title: "Projek Nyata: Membuat Kalkulator Pintar",
    content: (
      <div className="space-y-8 text-slate-700 leading-relaxed text-lg">
        
        <div className="text-slate-900 prose prose-lg max-w-none text-slate-700">
          <p className="text-xl font-medium text-slate-900 leading-normal">
            Ujian Akhir Semester 1 ada di depan mata! Ini adalah tantangan puncak (*Capstone Project*). Pada pertemuan ini, tidak ada lagi teori panjang lebar. Kamu akan membuktikan bahwa kamu layak disebut sebagai seorang <strong>Junior Programmer</strong> dengan membangun aplikasi seutuhnya dari Nol!
          </p>
        </div>

        <h3 className="text-3xl font-extrabold text-sky-800 mt-12 mb-6 border-b-2 border-sky-100 pb-4">Spesifikasi Proyek Akhir</h3>
        
        <div className="bg-slate-800 p-8 rounded-3xl shadow-xl text-white">
          <h4 className="text-2xl font-bold mb-4 text-emerald-400 flex items-center gap-3">
            <span className="text-3xl">📱</span> Kalkulator Konsol Pintar (Versi 1.0)
          </h4>
          <p className="text-slate-300 mb-6">Aplikasi kalkulator ini tidak akan pernah mati sampai penggunanya secara eksplisit memilih opsi "Keluar". Ia juga kebal dari ledakan sistem jika terjadi error salah input!</p>
          
          <h5 className="font-bold text-sky-400 mb-2 border-b border-slate-600 pb-2">Persyaratan Wajib Algoritma:</h5>
          <ul className="list-disc pl-5 space-y-2 text-slate-300">
            <li>Harus menggunakan <strong>While Loop (Tak Terbatas)</strong> untuk menu utama.</li>
            <li>Harus memiliki <strong>Fungsi</strong> terpisah untuk setiap operasi (Tambah, Kurang, Kali, Bagi).</li>
            <li>Harus menggunakan <strong>If/Elif/Else</strong> untuk memilih menu (1, 2, 3, 4, 5).</li>
            <li>Harus menggunakan <strong>Try-Except</strong> untuk mencegah aplikasi *Crash* jika angka dibagi 0 atau salah input teks.</li>
          </ul>
        </div>

        <h3 className="text-3xl font-extrabold text-sky-800 mt-12 mb-6 border-b-2 border-sky-100 pb-4">Kode Sumber (Source Code) Akhir</h3>
        <p className="text-slate-900 text-lg">Silakan salin, pelajari, dan jalankan kode mahakarya ini di Google Colab atau Text Editor lokal (Visual Studio Code). Ubah kalimat menunya agar sesuai dengan kreasimu sendiri!</p>

        <div className="bg-slate-950 p-8 rounded-2xl text-sky-300 font-mono text-sm shadow-2xl leading-loose border-2 border-slate-700 overflow-x-auto">
          <p className="text-slate-800"># ==========================================</p>
          <p className="text-slate-800"># APLIKASI KALKULATOR PINTAR</p>
          <p className="text-slate-800"># Karya: [Nama Kamu]</p>
          <p className="text-slate-800"># ==========================================</p>
          <br/>
          <p className="text-slate-800"># 1. Deklarasi Fungsi-Fungsi Matematika</p>
          <p className="text-slate-900 text-lg"><span className="text-fuchsia-400">def</span> <span className="text-sky-400">tambah</span>(a, b): <span className="text-fuchsia-400">return</span> a <span className="text-amber-400">+</span> b</p>
          <p className="text-slate-900 text-lg"><span className="text-fuchsia-400">def</span> <span className="text-sky-400">kurang</span>(a, b): <span className="text-fuchsia-400">return</span> a <span className="text-amber-400">-</span> b</p>
          <p className="text-slate-900 text-lg"><span className="text-fuchsia-400">def</span> <span className="text-sky-400">kali</span>(a, b): <span className="text-fuchsia-400">return</span> a <span className="text-amber-400">*</span> b</p>
          <p className="text-slate-900 text-lg"><span className="text-fuchsia-400">def</span> <span className="text-sky-400">bagi</span>(a, b):</p>
          <p className="pl-6 text-slate-900"><span className="text-fuchsia-400">try</span>:</p>
          <p className="pl-12 text-slate-900"><span className="text-fuchsia-400">return</span> a <span className="text-amber-400">/</span> b</p>
          <p className="pl-6 text-slate-900"><span className="text-fuchsia-400">except</span> <span className="text-rose-400">ZeroDivisionError</span>:</p>
          <p className="pl-12 text-slate-900"><span className="text-fuchsia-400">return</span> <span className="text-amber-300">"Error: Tidak bisa dibagi dengan 0!"</span></p>
          <br/>
          <p className="text-slate-800"># 2. Perulangan Utama (Mesin Utama)</p>
          <p className="text-slate-900 text-lg"><span className="text-fuchsia-400">while True</span>:</p>
          <p className="pl-6 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"\n--- MENU KALKULATOR ---"</span>)</p>
          <p className="pl-6 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"1. Penjumlahan"</span>)</p>
          <p className="pl-6 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"2. Pengurangan"</span>)</p>
          <p className="pl-6 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"3. Perkalian"</span>)</p>
          <p className="pl-6 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"4. Pembagian"</span>)</p>
          <p className="pl-6 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"5. KELUAR"</span>)</p>
          <br/>
          <p className="pl-6 text-slate-900">pilihan = <span className="text-emerald-400">input</span>(<span className="text-amber-300">"Pilih menu (1/2/3/4/5): "</span>)</p>
          <br/>
          <p className="pl-6 text-slate-900"><span className="text-fuchsia-400">if</span> pilihan <span className="text-amber-400">==</span> <span className="text-amber-300">'5'</span>:</p>
          <p className="pl-12 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Selamat tinggal! Mesin dimatikan."</span>)</p>
          <p className="pl-12 text-slate-900"><span className="text-fuchsia-400">break</span> <span className="text-slate-800"># Menghancurkan perulangan While True</span></p>
          <br/>
          <p className="pl-6 text-slate-900"><span className="text-fuchsia-400">if</span> pilihan <span className="text-fuchsia-400">in</span> [<span className="text-amber-300">'1'</span>, <span className="text-amber-300">'2'</span>, <span className="text-amber-300">'3'</span>, <span className="text-amber-300">'4'</span>]:</p>
          <p className="pl-12 text-slate-900"><span className="text-fuchsia-400">try</span>:</p>
          <p className="pl-18 text-slate-900">angka1 = <span className="text-emerald-400">float</span>(<span className="text-emerald-400">input</span>(<span className="text-amber-300">"Masukkan angka pertama: "</span>))</p>
          <p className="pl-18 text-slate-900">angka2 = <span className="text-emerald-400">float</span>(<span className="text-emerald-400">input</span>(<span className="text-amber-300">"Masukkan angka kedua: "</span>))</p>
          <br/>
          <p className="pl-18 text-slate-900"><span className="text-fuchsia-400">if</span> pilihan <span className="text-amber-400">==</span> <span className="text-amber-300">'1'</span>:</p>
          <p className="pl-24 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Hasil:"</span>, <span className="text-sky-400">tambah</span>(angka1, angka2))</p>
          <p className="pl-18 text-slate-900"><span className="text-fuchsia-400">elif</span> pilihan <span className="text-amber-400">==</span> <span className="text-amber-300">'2'</span>:</p>
          <p className="pl-24 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Hasil:"</span>, <span className="text-sky-400">kurang</span>(angka1, angka2))</p>
          <p className="pl-18 text-slate-900"><span className="text-fuchsia-400">elif</span> pilihan <span className="text-amber-400">==</span> <span className="text-amber-300">'3'</span>:</p>
          <p className="pl-24 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Hasil:"</span>, <span className="text-sky-400">kali</span>(angka1, angka2))</p>
          <p className="pl-18 text-slate-900"><span className="text-fuchsia-400">elif</span> pilihan <span className="text-amber-400">==</span> <span className="text-amber-300">'4'</span>:</p>
          <p className="pl-24 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Hasil:"</span>, <span className="text-sky-400">bagi</span>(angka1, angka2))</p>
          <p className="pl-12 text-slate-900"><span className="text-fuchsia-400">except</span> <span className="text-rose-400">ValueError</span>:</p>
          <p className="pl-18 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Input TIDAK VALID! Pastikan Anda memasukkan ANGKA."</span>)</p>
          <p className="pl-6 text-slate-900"><span className="text-fuchsia-400">else</span>:</p>
          <p className="pl-12 text-slate-900"><span className="text-emerald-400">print</span>(<span className="text-amber-300">"Menu tidak tersedia! Pilih 1 sampai 5."</span>)</p>
        </div>

        <div className="bg-emerald-100 p-6 rounded-2xl mt-8 text-emerald-900 border border-emerald-300 font-bold text-center">
          🎉 SELAMAT! KAMU TELAH MENYELESAIKAN SELURUH MODUL KODING SEMESTER 1! 🎉<br/>
          <span className="font-normal text-emerald-700 block mt-2">Di Semester 2 nanti, kita akan belajar mengajari komputer untuk bisa BERPIKIR menggunakan Kecerdasan Artifisial (AI)!</span>
        </div>
      </div>
    )
  },
  // Default content for others to avoid crashing
  
    "s2-p1": {
      title: "Sejarah dan Konsep Dasar AI",
      content: (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-8 rounded-3xl shadow-xl border border-slate-800 text-white relative overflow-hidden mb-12">
              <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl">🤖</div>
              <h1 className="text-3xl font-black text-fuchsia-400 mb-4">Selamat Datang di Semester 2!</h1>
              <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">
                Semester ini kita memasuki dunia masa depan: <strong>Kecerdasan Artifisial (AI)</strong>. Bersiaplah untuk mengubah baris kode yang pasif menjadi mesin yang bisa <em>berpikir</em>.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-3xl font-black text-slate-800 mb-6">1. Sejarah & Konsep Dasar AI</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Kecerdasan Artifisial (AI) bukanlah sulap. Ia adalah ilmu yang mensimulasikan kecerdasan manusia di dalam mesin. Semua dimulai sejak tahun 1950-an ketika Alan Turing bertanya: <em>"Bisakah mesin berpikir?"</em>
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-sky-50 border border-sky-100 p-6 rounded-2xl">
                  <h3 className="font-bold text-sky-900 mb-3 text-lg">🧠 Turing Test</h3>
                  <p className="text-sky-800 text-sm mb-4">Ujian legendaris: Jika seseorang mengobrol lewat layar dan tidak bisa membedakan apakah yang membalas itu manusia atau mesin, maka mesin itu dianggap cerdas.</p>
                </div>
                
                <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl">
                  <h3 className="font-bold text-amber-900 mb-3 text-lg">❄️ AI Winter (Musim Dingin AI)</h3>
                  <p className="text-amber-800 text-sm mb-4">Zaman gelap AI (1970 - 1990an) di mana dana riset dihentikan karena ekspektasi robot canggih gagal dipenuhi oleh keterbatasan memori komputer masa itu.</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-black text-slate-800 mt-12 mb-6">Daftar Proyek Pertemuan 1</h2>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-100 border-2 border-indigo-200 p-8 rounded-3xl mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                  💬
                </div>
                <div>
                  <h3 className="text-2xl font-black text-indigo-900">Proyek 1: Simulasi Chatbot Klasik (ELIZA)</h3>
                  <p className="text-indigo-700 font-semibold">Memahami AI Berbasis Aturan (Rule-Based)</p>
                </div>
              </div>
              <div className="space-y-4 text-indigo-900/80">
                <p className="text-slate-900 text-lg"><strong>Skenario:</strong> Jauh sebelum ChatGPT ada, AI pertama bernama ELIZA mengelabui orang dengan meniru gaya bicara psikolog. ELIZA tidak cerdas, ia hanya menggunakan <code>if-else</code> dan menangkap kata kunci.</p>
                <div className="bg-slate-900 p-4 rounded-xl font-mono text-emerald-300 text-sm overflow-x-auto">
<pre><code>
print("Halo, saya Robot Psikolog. Ceritakan masalahmu!")

while True:

    pesan = input("Kamu: ").lower()

    if "sedih" in pesan:

        print("Robot: Mengapa kamu merasa sedih?")

    elif "marah" in pesan:

        print("Robot: Tarik napas dalam-dalam. Apa yang membuatmu marah?")

    elif "keluar" in pesan:

        print("Robot: Sampai jumpa!")

        break

    else:

        print("Robot: Hmm, ceritakan lebih lanjut tentang itu.")

</code></pre>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-rose-50 to-orange-100 border-2 border-rose-200 p-8 rounded-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                  🤖
                </div>
                <div>
                  <h3 className="text-2xl font-black text-rose-900">Proyek 2: Game Turing Test Sederhana</h3>
                  <p className="text-rose-700 font-semibold">Uji Kecerdasan Mesin vs Pemain</p>
                </div>
              </div>
              <div className="space-y-4 text-rose-900/80">
                <p className="text-slate-900 text-lg"><strong>Skenario:</strong> Buat program di mana komputer akan memberikan jawaban acak. Pengguna harus menebak apakah jawaban tersebut hasil ketikan manusia atau mesin acak.</p>
                <div className="bg-slate-900 p-4 rounded-xl font-mono text-amber-300 text-sm overflow-x-auto">
<pre><code>
import random



jawaban_mesin = ["Tentu saja!", "Saya tidak tahu.", "Bisa diulangi?", "Error 404"]



print("=== UJIAN TURING ===")

print("Tebak siapa yang membalas pesanamu!\n")



pertanyaan = input("Tanya sesuatu: ")

balasan = random.choice(jawaban_mesin)



print("\nBalasan Misterius:", balasan)

tebakan = input("Apakah ini Mesin (M) atau Manusia (H)? ")



if tebakan.upper() == "M":

    print("Tepat! Kamu tidak tertipu oleh mesin.")

else:

    print("Salah! Kamu baru saja ditipu oleh mesin sederhana.")

</code></pre>
                </div>
              </div>
            </div>

          </div>
      )
    },

    "s2-p2": {
      title: "Machine Learning vs Tradisional",
      content: (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-3xl font-black text-slate-800 mb-6">2. Pemrograman Tradisional vs Machine Learning</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Ini adalah pergeseran paradigma (cara berpikir) terbesar di dunia teknologi. Di pemrograman tradisional, Anda adalah Sang Dikte. Di Machine Learning (ML), Anda adalah Sang Guru.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-100 border border-slate-200 p-6 rounded-2xl">
                  <h3 className="font-bold text-slate-900 mb-3 text-lg">⚙️ Cara Tradisional</h3>
                  <p className="text-slate-800 text-sm mb-2"><strong>Aturan + Data = Hasil</strong></p>
                  <p className="text-slate-600 text-sm">Programmer menulis logika rumit (misal: "Jika warna merah & bentuk bulat, maka Apel"). Data diproses dengan aturan itu.</p>
                </div>
                
                <div className="bg-fuchsia-50 border border-fuchsia-200 p-6 rounded-2xl shadow-[inset_0_0_20px_rgba(217,70,239,0.1)]">
                  <h3 className="font-bold text-fuchsia-900 mb-3 text-lg">🧠 Machine Learning</h3>
                  <p className="text-fuchsia-800 text-sm mb-2"><strong>Data + Hasil (Jawaban) = Aturan (Model)</strong></p>
                  <p className="text-fuchsia-600 text-sm">Programmer memberikan ribuan foto apel (data) beserta label "Ini Apel" (jawaban). Mesin mencari sendiri polanya!</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-black text-slate-800 mt-12 mb-6">Daftar Proyek Pertemuan 2</h2>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-100 border-2 border-indigo-200 p-8 rounded-3xl mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                  🛡️
                </div>
                <div>
                  <h3 className="text-2xl font-black text-indigo-900">Proyek 1: Filter Spam Pendekatan Tradisional</h3>
                  <p className="text-indigo-700 font-semibold">Keterbatasan Pemrograman Berbasis Aturan</p>
                </div>
              </div>
              <div className="space-y-4 text-indigo-900/80">
                <p className="text-slate-900 text-lg"><strong>Skenario:</strong> Buat filter spam email menggunakan cara tradisional. Anda harus menulis manual kata kunci apa saja yang dianggap spam. Semakin pintar *spammer*, semakin panjang kode Anda (tidak efisien).</p>
                <div className="bg-slate-900 p-4 rounded-xl font-mono text-emerald-300 text-sm overflow-x-auto">
<pre><code>
email = "Dapatkan hadiah HADIAH uang tunai sekarang juga! klik link ini."



# Cara Tradisional: Programmer mendikte kata kunci spam

kata_spam = ["hadiah", "uang tunai", "gratis", "klik link"]

status = "Aman"



for kata in kata_spam:

    if kata in email.lower():

        status = "SPAM DETECTED!"

        break



print("Status Email:", status)

# Kekurangan: Bagaimana jika Spammer menulis 'h4d!ah'? Aturan ini akan gagal!

</code></pre>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-emerald-100 border-2 border-teal-200 p-8 rounded-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                  📊
                </div>
                <div>
                  <h3 className="text-2xl font-black text-teal-900">Proyek 2: Mesin Pengekstrak Fitur (Feature Extraction)</h3>
                  <p className="text-teal-700 font-semibold">Langkah Pertama dalam Machine Learning</p>
                </div>
              </div>
              <div className="space-y-4 text-teal-900/80">
                <p className="text-slate-900 text-lg"><strong>Skenario:</strong> Agar mesin bisa belajar membedakan kalimat Spam dan Non-Spam, mesin tidak bisa membaca teks secara langsung. Teks harus diubah menjadi angka (Fitur). Hitung panjang karakter dan jumlah huruf besar dari kalimat.</p>
                <div className="bg-slate-900 p-4 rounded-xl font-mono text-emerald-300 text-sm overflow-x-auto">
<pre><code>
kalimat = "SELAMAT!!! ANDA MENANG MOBIL!"



# Ekstraksi Fitur 1: Panjang Kalimat

panjang = len(kalimat)



# Ekstraksi Fitur 2: Hitung Huruf Besar (Spam biasanya banyak huruf besar)

jumlah_kapital = sum(1 for huruf in kalimat if huruf.isupper())



print("Data Kalimat diubah menjadi format angka untuk ML:")

print("Fitur [Panjang, Jml_Kapital] =&gt; [", panjang, ",", jumlah_kapital, "]")

# Angka [29, 23] ini yang nantinya disuapkan ke algoritma ML!

</code></pre>
                </div>
              </div>
            </div>

          </div>
      )
    },

  
    "s2-p3": {
      title: "Supervised Learning (Klasifikasi)",
      content: (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-3xl font-black text-slate-800 mb-6">3. Supervised Learning: Klasifikasi</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                <strong>Supervised Learning</strong> adalah metode melatih AI menggunakan data yang <em>sudah memiliki kunci jawaban</em> (Label). Sedangkan <strong>Klasifikasi</strong> adalah jenis supervised learning yang tugasnya menebak <em>Kategori</em> (misal: "Kucing" atau "Anjing", "Spam" atau "Bukan Spam").
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl">
                  <h3 className="font-bold text-emerald-900 mb-3 text-lg">📈 Fitur (Features)</h3>
                  <p className="text-emerald-800 text-sm mb-4">Informasi atau data mentah yang kita berikan ke AI. Contoh: Panjang badan, berat badan, bentuk telinga.</p>
                </div>
                
                <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl">
                  <h3 className="font-bold text-rose-900 mb-3 text-lg">🎯 Label (Target)</h3>
                  <p className="text-rose-800 text-sm mb-4">Jawaban benar yang kita ingin AI pelajari. Contoh: "Ini Kucing", "Ini Anjing". AI akan mencari hubungan antara Fitur dan Label.</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-black text-slate-800 mt-12 mb-6">Proyek Pertemuan 3</h2>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-100 border-2 border-indigo-200 p-8 rounded-3xl mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                  🐕
                </div>
                <div>
                  <h3 className="text-2xl font-black text-indigo-900">Proyek 1: Klasifikasi Kucing vs Anjing (Teks)</h3>
                  <p className="text-indigo-700 font-semibold">Simulasi Konsep Decision Tree Klasik</p>
                </div>
              </div>
              <div className="space-y-4 text-indigo-900/80">
                <p className="text-slate-900 text-lg"><strong>Skenario:</strong> Daripada memproses gambar yang rumit, kita akan mensimulasikan bagaimana model klasifikasi sederhana (Decision Tree) membedakan hewan berdasarkan ciri fisiknya.</p>
                <div className="bg-slate-900 p-4 rounded-xl font-mono text-emerald-300 text-sm overflow-x-auto">
<pre><code>
def klasifikasi_hewan(suara, suka_air):

    if suara == "meong":

        return "Kucing"

    elif suara == "guk":

        return "Anjing"

    else:

        if suka_air == "ya":

            return "Anjing (Mungkin Golden Retriever)"

        else:

            return "Tidak Teridentifikasi"



print("=== MESIN KLASIFIKASI HEWAN ===")

suara_input = input("Suara hewan (meong/guk/lainnya): ").lower()

air_input = input("Apakah suka air? (ya/tidak): ").lower()



hasil = klasifikasi_hewan(suara_input, air_input)

print("\nHasil Klasifikasi: Ini adalah", hasil)

</code></pre>
                </div>
              </div>
            </div>

            {/* VIRTUAL LAB */}
            

          </div>
      )
    },

    "s2-p4": {
      title: "Supervised Learning (Regresi)",
      content: (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-3xl font-black text-slate-800 mb-6">4. Supervised Learning: Regresi</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Berbeda dengan Klasifikasi yang memprediksi kategori/teks, <strong>Regresi</strong> bertugas memprediksi <em>Angka Terus-Menerus (Continuous Number)</em>. Contohnya: Prediksi harga rumah, prediksi suhu esok hari, atau prediksi jumlah penjualan bulan depan.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl">
                  <h3 className="font-bold text-amber-900 mb-3 text-lg">📈 Regresi Linear (Garis Lurus)</h3>
                  <p className="text-amber-800 text-sm mb-4">Cara paling dasar di mana AI menarik satu garis lurus diagonal yang paling pas melintasi titik-titik data (seperti menarik penggaris di atas grafik penyebaran titik).</p>
                </div>
                
                <div className="bg-sky-50 border border-sky-100 p-6 rounded-2xl">
                  <h3 className="font-bold text-sky-900 mb-3 text-lg">⚠️ Overfitting & Underfitting</h3>
                  <p className="text-sky-800 text-sm mb-4"><strong>Overfitting:</strong> AI terlalu menghafal data latihan sehingga bentuk grafiknya keriting, tapi gagal menebak data baru. <strong>Underfitting:</strong> AI terlalu bodoh dan menarik garis sembarangan.</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-black text-slate-800 mt-12 mb-6">Proyek Pertemuan 4</h2>

            <div className="bg-gradient-to-br from-teal-50 to-emerald-100 border-2 border-teal-200 p-8 rounded-3xl mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                  💰
                </div>
                <div>
                  <h3 className="text-2xl font-black text-teal-900">Proyek 1: Prediksi Harga Tanah (Regresi Linear Sederhana)</h3>
                  <p className="text-teal-700 font-semibold">Memahami Y = mX + C di balik Machine Learning</p>
                </div>
              </div>
              <div className="space-y-4 text-teal-900/80">
                <p className="text-slate-900 text-lg"><strong>Skenario:</strong> Pada dasarnya, Regresi Linear hanyalah mencari rumus kemiringan garis matematika (<code>Y = m * X + C</code>). Mari kita simulasikan prediksi harga tanah berdasarkan luas tanah.</p>
                <div className="bg-slate-900 p-4 rounded-xl font-mono text-amber-300 text-sm overflow-x-auto">
<pre><code>
print("=== PREDIKSI HARGA TANAH (REGRESI) ===")



# Di Machine Learning, Nilai M (Kemiringan) dan C (Titik Awal) dicari otomatis oleh komputer.

# Dalam simulasi ini, kita anggap komputer sudah menemukan nilainya:

# Harga = 2 Juta * LuasTanah + 10 Juta



M = 2000000

C = 10000000



luas = float(input("Masukkan luas tanah (meter persegi): "))



# Melakukan prediksi regresi

prediksi_harga = (M * luas) + C



# Format angka agar lebih rapi

print(f"\nPrediksi Harga Tanah: Rp {"{"}prediksi_harga:,.0f{"}"}")

</code></pre>
                </div>
              </div>
            </div>

            {/* VIRTUAL LAB */}
            

          </div>
      )
    },
    
  "s2-p5": {
    title: "Unsupervised Learning (Clustering)",
    content: (
      <div className="space-y-8 text-slate-700 leading-relaxed text-lg">
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-8 rounded-3xl shadow-xl border border-slate-800 text-white relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl">🧩</div>
          <h1 className="text-3xl font-black text-fuchsia-400 mb-4">Unsupervised Learning (Pembelajaran Tanpa Label)</h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">
            Di bab sebelumnya, kita belajar Supervised Learning (ada data, ada jawaban). Tapi bagaimana jika kita punya data yang <strong>tidak ada kunci jawabannya (tanpa label)</strong>? Di sinilah Unsupervised Learning dan <strong>Clustering</strong> beraksi! AI akan mencari pola tersembunyi sendiri secara otomatis.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-3xl font-black text-slate-800 mb-6">1. Apa itu Clustering?</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            Clustering adalah teknik mengelompokkan data yang mirip ke dalam satu "cluster" (kelompok) yang sama, sementara data yang berbeda akan ditempatkan di cluster lain. Ini seperti menyortir setumpuk pakaian kotor tanpa diberitahu mana kaos, celana, atau jaket — kamu menyortirnya berdasarkan kemiripan bentuk atau warna.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-fuchsia-50 border border-fuchsia-100 p-6 rounded-2xl">
              <h3 className="font-bold text-fuchsia-900 mb-3 text-lg">💡 Konsep K-Means</h3>
              <p className="text-fuchsia-800 text-sm">Algoritma clustering paling populer. Huruf "K" melambangkan jumlah kelompok yang ingin kita buat (misal K=3 untuk 3 kelompok). Algoritma ini mencari titik pusat (centroid) untuk mengumpulkan data-data di sekitarnya.</p>
            </div>
            <div className="bg-sky-50 border border-sky-100 p-6 rounded-2xl">
              <h3 className="font-bold text-sky-900 mb-3 text-lg">📌 Aplikasi Dunia Nyata</h3>
              <p className="text-sky-800 text-sm">Rekomendasi Netflix/YouTube, segmentasi pelanggan toko (pembeli hemat vs boros), dan pengelompokan gen dalam biologi.</p>
            </div>
          </div>
        </div>

        {/* Contoh Projek 1 */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 p-8 rounded-3xl mb-8">
          <h4 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-3">
            <span className="text-3xl">🛍️</span> Projek 1: Segmentasi Pelanggan Mall
          </h4>
          <div className="space-y-4 text-slate-700">
            <p className="text-slate-900 text-lg"><strong>Skenario:</strong> Anda bekerja sebagai Data Scientist di sebuah mall besar. Anda diberikan data 10.000 pelanggan berisi umur dan jumlah uang belanja. Tidak ada label apakah pelanggan itu "VVIP" atau "Biasa". Anda diminta mengelompokkan mereka menggunakan K-Means.</p>
            <div className="bg-white p-6 rounded-xl border border-slate-200 mt-4">
              <h5 className="font-bold text-slate-800 mb-3 border-b pb-2">Alur Pemrograman (Pola Pikir):</h5>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-indigo-800">
                <li>Impor library Python: <code>from sklearn.cluster import KMeans</code></li>
                <li>Tentukan jumlah grup (K). Misal K=3.</li>
                <li>Latih model AI (Fit) dengan data (umur, total_belanja).</li>
                <li>Sistem otomatis membuat 3 pusat grup (Centroids).</li>
                <li>Hasilnya: Kelompok 1 (Anak muda hemat), Kelompok 2 (Keluarga belanja sedang), Kelompok 3 (Orang kaya sering belanja). Mall sekarang bisa memberikan diskon yang spesifik!</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Contoh Projek 2 */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 p-8 rounded-3xl mb-8">
          <h4 className="text-2xl font-bold text-emerald-900 mb-4 flex items-center gap-3">
            <span className="text-3xl">📰</span> Projek 2: Pengelompokan Berita Otomatis
          </h4>
          <div className="space-y-4 text-slate-700">
            <p className="text-slate-900 text-lg"><strong>Skenario:</strong> Sebuah aplikasi baca berita online (seperti Google News) setiap hari menerima jutaan artikel. Aplikasi butuh AI yang bisa memisahkan berita Olahraga, Politik, dan Hiburan tanpa campur tangan manusia.</p>
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-sm mt-4">
              <h5 className="font-bold text-slate-300 mb-3 border-b border-slate-600 pb-2">Bagaimana AI menyelesaikannya?</h5>
              <p className="text-sm text-sky-300 font-mono leading-relaxed">
                # 1. Ubah setiap kata di artikel menjadi angka (TF-IDF Vectorization).<br/>
                # 2. Kata "Bola", "Gol", "Skor" akan saling berdekatan dalam grafik koordinat matematika.<br/>
                # 3. Model clustering akan menarik lingkaran di area "Bola, Gol" menjadi Grup 1 (Olahraga).<br/>
                # 4. Berita baru yang masuk otomatis tertarik ke magnet grup yang kata-katanya mirip!
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  "s2-p6": {
    title: "Pengantar Jaringan Saraf Tiruan (ANN)",
    content: (
      <div className="space-y-8 text-slate-700 leading-relaxed text-lg">
        <div className="bg-gradient-to-r from-slate-900 to-rose-950 p-8 rounded-3xl shadow-xl border border-slate-800 text-white relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl">🧠</div>
          <h1 className="text-3xl font-black text-rose-400 mb-4">Jaringan Saraf Tiruan (Artificial Neural Networks)</h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">
            Mari kita tingkatkan mesin kita agar bisa berpikir persis seperti otak manusia! Jaringan Saraf Tiruan (ANN) adalah fondasi dari <strong>Deep Learning</strong>. Algoritma ini terinspirasi dari struktur neuron biologis di dalam kepala kita.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-3xl font-black text-slate-800 mb-6">1. Bagaimana AI Meniru Otak?</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            Di dalam otak manusia, terdapat miliaran sel saraf (Neuron) yang saling terhubung dan menghantarkan listrik. Jika kita melihat api, neuron mata mengirim sinyal, neuron di otak menghitung sinyal tersebut, lalu memutuskan: "Itu panas!". AI melakukan hal yang sama secara matematis.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl">
              <h3 className="font-bold text-rose-900 mb-2">Input Layer (Mata/Telinga)</h3>
              <p className="text-rose-800">Lapisan neuron pertama. Menerima data mentah (piksel gambar, suara, teks).</p>
            </div>
            <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl">
              <h3 className="font-bold text-purple-900 mb-2">Hidden Layer (Otak Pemroses)</h3>
              <p className="text-purple-800">Lapisan tersembunyi. Di sinilah AI berpikir, mengalikan "bobot" (weights) pada data untuk mencari makna.</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
              <h3 className="font-bold text-emerald-900 mb-2">Output Layer (Keputusan)</h3>
              <p className="text-emerald-800">Hasil tebakan AI (misal: probabilitas 90% gambar tersebut adalah Kucing).</p>
            </div>
          </div>
        </div>

        {/* Contoh Projek 1 */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100 p-8 rounded-3xl mb-8">
          <h4 className="text-2xl font-bold text-rose-900 mb-4 flex items-center gap-3">
            <span className="text-3xl">✍️</span> Projek 1: Sistem Deteksi Tulisan Tangan Angka (MNIST)
          </h4>
          <div className="space-y-4 text-slate-700">
            <p className="text-slate-900 text-lg"><strong>Skenario:</strong> Bank membutuhkan AI untuk membaca angka pada cek (giro) yang ditulis dengan tangan manusia agar proses transfer berjalan otomatis. Anda menggunakan Dataset MNIST (kumpulan 60.000 gambar angka 0-9).</p>
            <div className="bg-white p-6 rounded-xl border border-slate-200 mt-4">
              <h5 className="font-bold text-slate-800 mb-3 border-b pb-2">Arsitektur Jaringan (Pemrograman Neural Network):</h5>
              <ul className="list-disc pl-5 space-y-2 text-sm text-rose-800">
                <li><strong>Input Layer:</strong> 784 Neuron (Karena 1 gambar berukuran 28x28 piksel = 784). Setiap neuron menerima tingkat kegelapan piksel.</li>
                <li><strong>Hidden Layer:</strong> 128 Neuron. Otak ini akan mencari bentuk lengkungan angka (misal angka 8 punya 2 lingkaran, angka 1 berupa garis lurus).</li>
                <li><strong>Output Layer:</strong> 10 Neuron (Menyala di salah satu dari angka 0, 1, 2, ... 9).</li>
              </ul>
              <p className="mt-4 text-sm font-semibold bg-rose-100 p-3 rounded-lg text-rose-900">Hasil akhirnya, saat gambar angka "3" dimasukkan, neuron ke-3 di Output Layer akan menyala paling terang (probabilitas 99%).</p>
            </div>
          </div>
        </div>

        {/* Contoh Projek 2 */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 p-8 rounded-3xl mb-8">
          <h4 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-3">
            <span className="text-3xl">🏠</span> Projek 2: Robot Prediksi Harga Properti
          </h4>
          <div className="space-y-4 text-slate-700">
            <p className="text-slate-900 text-lg"><strong>Skenario:</strong> Sebuah perusahaan Real Estate (Properti) ingin AI yang dapat menaksir harga jual sebuah rumah berdasarkan spesifikasi (Luas tanah, jumlah kamar, jarak ke stasiun). Regresi Linear tradisional dianggap kurang akurat karena hubungannya sangat kompleks.</p>
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-sm mt-4">
              <h5 className="font-bold text-slate-300 mb-3 border-b border-slate-600 pb-2">Cara AI Belajar (Backpropagation):</h5>
              <p className="text-sm text-amber-300 font-mono leading-relaxed">
                Tahap 1 (Menebak): AI menebak harga rumah = Rp 500 Juta.<br/>
                Tahap 2 (Kenyataan): Harga asli di lapangan = Rp 700 Juta. AI salah Rp 200 Juta (Loss / Error).<br/>
                Tahap 3 (Backpropagation): Sinyal error Rp 200 Juta dikirim mundur (back) ke otak AI.<br/>
                Tahap 4 (Belajar): AI mengubah hitungan "bobot" di sarafnya (misal: "Oh, ternyata jarak ke stasiun sangat berpengaruh!").<br/>
                Tahap 5: AI berlatih puluhan ribu kali hingga tebakannya mendekati 100% akurat.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },

  
  "s2-p7": {
    title: "Deep Learning & Computer Vision",
    content: (
      <div className="space-y-8 text-slate-700 leading-relaxed text-lg">
        <div className="bg-gradient-to-r from-slate-900 to-sky-950 p-8 rounded-3xl shadow-xl border border-slate-800 text-white relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl">👁️</div>
          <h1 className="text-3xl font-black text-sky-400 mb-4">Mata Buatan: Computer Vision</h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">
            Di pertemuan sebelumnya, kita belajar ANN. Tapi jika jaringan saraf ditambahkan "banyak lapisan" (Deep), ia menjadi <strong>Deep Learning</strong>! Kali ini kita akan melihat bagaimana Deep Learning, khususnya CNN (Convolutional Neural Networks), memberi AI kemampuan untuk <strong>melihat dan mengenali gambar</strong> layaknya manusia.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-3xl font-black text-slate-800 mb-6">1. Bagaimana AI Melihat Gambar?</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            Komputer tidak melihat "Kucing" atau "Anjing". Ia hanya melihat grid berisi ribuan angka piksel (0 untuk hitam, 255 untuk putih). Deep Learning menggunakan <strong>Konvolusi (Convolution)</strong>: semacam "kaca pembesar" atau "filter" matematika yang menggeser dan mencari pola garis, lengkungan, atau tekstur pada angka-angka tersebut.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-sky-50 border border-sky-100 p-6 rounded-2xl">
              <h3 className="font-bold text-sky-900 mb-3 text-lg">🔍 Filter Pinggiran (Edge Detection)</h3>
              <p className="text-sky-800 text-sm">Lapisan pertama AI biasanya hanya bertugas mencari mana batas pinggiran benda. Filter ini mendeteksi perubahan drastis warna dari terang ke gelap.</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl">
              <h3 className="font-bold text-emerald-900 mb-3 text-lg">🧩 Max Pooling</h3>
              <p className="text-emerald-800 text-sm">Mengecilkan ukuran gambar tanpa menghilangkan informasi penting (seperti garis atau mata). Ini membuat AI berlatih jauh lebih cepat.</p>
            </div>
          </div>
        </div>

        {/* Contoh Projek 1 */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-8 rounded-3xl mb-8">
          <h4 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-3">
            <span className="text-3xl">🚗</span> Projek 1: Mobil Otonom (Self-Driving Car)
          </h4>
          <div className="space-y-4 text-slate-700">
            <p className="text-slate-900 text-lg"><strong>Skenario:</strong> Tesla dan Google Waymo menggunakan Computer Vision agar mobil bisa menyetir sendiri. Bagaimana mereka mendeteksi lampu merah dan pejalan kaki?</p>
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-sm mt-4">
              <h5 className="font-bold text-slate-300 mb-3 border-b border-slate-600 pb-2">Logika Object Detection (YOLO):</h5>
              <p className="text-sm text-sky-300 font-mono leading-relaxed">
                # 1. Kamera mengirim gambar 60x per detik (FPS).<br/>
                # 2. AI memotong gambar menjadi grid (misal 13x13 kotak).<br/>
                # 3. Tiap kotak diprediksi: "Apakah ini Pejalan Kaki?" (Nilai 0.0 - 1.0)<br/>
                # 4. Jika Prediksi &gt; 0.8: Tarik kotak merah (Bounding Box) di layar!<br/>
                # 5. Program if/else darurat: Jika pejalan kaki dekat, REM OTOMATIS!
              </p>
            </div>
          </div>
        </div>

        {/* Contoh Projek 2 */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100 p-8 rounded-3xl mb-8">
          <h4 className="text-2xl font-bold text-rose-900 mb-4 flex items-center gap-3">
            <span className="text-3xl">😷</span> Projek 2: Deteksi Penggunaan Masker Cerdas
          </h4>
          <div className="space-y-4 text-slate-700">
            <p className="text-slate-900 text-lg"><strong>Skenario:</strong> Di era pandemi, Satpam kewalahan menegur orang yang tidak pakai masker. Anda membuat AI kamera untuk pintu masuk stasiun.</p>
            <div className="bg-white p-6 rounded-xl border border-slate-200 mt-4">
              <h5 className="font-bold text-slate-800 mb-3 border-b pb-2">Arsitektur CNN:</h5>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-rose-800">
                <li>Input: Kamera mendeteksi wajah (Face Tracking).</li>
                <li>Convolution: Filter mencari pola warna kain menutupi hidung.</li>
                <li>Output: Probabilitas "Bermasker" (98%) atau "Tanpa Masker" (2%).</li>
                <li>Aksi: Jika Tanpa Masker, bunyikan alarm otomatis di pintu masuk.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  },
  "s2-p8": {
    title: "Natural Language Processing (NLP)",
    content: (
      <div className="space-y-8 text-slate-700 leading-relaxed text-lg">
        <div className="bg-gradient-to-r from-slate-900 to-fuchsia-950 p-8 rounded-3xl shadow-xl border border-slate-800 text-white relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl">💬</div>
          <h1 className="text-3xl font-black text-fuchsia-400 mb-4">Mesin yang Bisa Berbahasa: NLP</h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">
            Jika Computer Vision adalah mata, maka <strong>Natural Language Processing (NLP)</strong> adalah mulut dan telinga AI. Bagaimana cara ChatGPT memahami lelucon, atau Google Translate menerjemahkan puisi? Semuanya berkat NLP!
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-3xl font-black text-slate-800 mb-6">1. Bagaimana Mesin Mengerti Teks?</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            Sekali lagi, komputer membenci huruf. Ia hanya bisa menghitung angka. Untuk membuat komputer mengerti kata, kita harus melakukan <strong>Tokenisasi (Tokenization)</strong> dan <strong>Word Embedding</strong> (Mengubah kata menjadi angka koordinat/vektor).
          </p>
          <div className="bg-slate-900 p-6 rounded-2xl text-emerald-300 font-mono text-sm shadow-xl">
            <h3 className="text-white font-sans font-bold mb-4 border-b border-slate-700 pb-2">Visualisasi Ruang Vektor (Word2Vec)</h3>
            <p className="text-slate-900 text-lg">Raja - Pria + Wanita = <strong>Ratu</strong></p>
            <br/>
            <p className="text-slate-400"># Komputer mengerti makna kata dari "jaraknya" di ruang 3D:</p>
            <p className="text-slate-900 text-lg">"Kucing" dan "Anjing" jaraknya berdekatan.</p>
            <p className="text-slate-900 text-lg">"Kucing" dan "Batu" jaraknya sangat berjauhan.</p>
          </div>
        </div>

        {/* Contoh Projek 1 */}
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100 p-8 rounded-3xl mb-8">
          <h4 className="text-2xl font-bold text-emerald-900 mb-4 flex items-center gap-3">
            <span className="text-3xl">😠</span> Projek 1: Analisis Sentimen Pelanggan
          </h4>
          <div className="space-y-4 text-slate-700">
            <p className="text-slate-900 text-lg"><strong>Skenario:</strong> Pemilik restoran pusing membaca 10.000 ulasan di Google Maps setiap bulan. Anda diminta membuat AI yang bisa membaca dan merangkum, apakah ulasan tersebut bernada Marah, Sedih, atau Bahagia.</p>
            <div className="bg-white p-6 rounded-xl border border-slate-200 mt-4">
              <h5 className="font-bold text-slate-800 mb-3 border-b pb-2">Langkah Pemrosesan (Preprocessing):</h5>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-emerald-800">
                <li><strong>Case Folding:</strong> Ubah "MAKANANNYA ENak!" menjadi "makanannya enak".</li>
                <li><strong>Stopwords Removal:</strong> Hapus kata tidak penting seperti "di", "yang", "dan".</li>
                <li><strong>Stemming:</strong> Ubah kata "makanannya" menjadi kata dasar "makan".</li>
                <li><strong>Prediksi:</strong> Masukkan ke model AI. Jika banyak vektor kata bernada positif ("enak", "murah", "bersih"), beri label "Sentimen Positif".</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Contoh Projek 2 */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 p-8 rounded-3xl mb-8">
          <h4 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-3">
            <span className="text-3xl">🤖</span> Projek 2: Membangun Chatbot Toko (Auto-Reply)
          </h4>
          <div className="space-y-4 text-slate-700">
            <p className="text-slate-900 text-lg"><strong>Skenario:</strong> Toko online "Baju Murah" kewalahan membalas chat pembeli. Anda membuat robot yang bisa menjawab pertanyaan "Apakah barang A siap?" secara instan tanpa terlihat kaku.</p>
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-sm mt-4">
              <h5 className="font-bold text-slate-300 mb-3 border-b border-slate-600 pb-2">Logika Pencocokan Niat (Intent Matching):</h5>
              <p className="text-sm text-amber-300 font-mono leading-relaxed">
                # Input User: "Gan, ukuran XL masih ready ngga ya buat besok?"<br/>
                # AI mengekstrak Niat (Intent): BERTANYA_STOK<br/>
                # AI mengekstrak Entitas (Entity): UKURAN_XL<br/>
                # Cek Database: SELECT * FROM stok WHERE ukuran='XL'<br/>
                # Output AI (Generative): "Halo Kak! Untuk ukuran XL warna hitam masih tersedia ya. Silakan langsung di-checkout sebelum kehabisan! 😊"
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },

      "s2-p9": {
    title: "Reinforcement Learning & AI Agents",
    content: (
      <div className="text-slate-900 prose prose-slate max-w-none prose-headings:text-slate-800 prose-headings:font-bold prose-p:text-slate-900 prose-p:text-lg prose-li:text-slate-900 prose-li:text-lg prose-p:leading-relaxed prose-a:text-fuchsia-500">
        <h2 className="text-3xl border-b-2 border-fuchsia-100 pb-2">Pengantar: Belajar Melalui Pengalaman</h2>
        <p className="text-lg">
          Pernahkah kamu bermain sepeda saat masih kecil? Awalnya, kamu pasti sering terjatuh (mendapat rasa sakit/hukuman). Namun, ketika kamu berhasil menyeimbangkan badan, kamu merasa senang (mendapat kepuasan/hadiah). Otakmu secara otomatis mengingat gerakan apa yang membuatmu seimbang dan menghindari gerakan yang membuatmu jatuh. Proses belajar melalui <i>Trial and Error</i> (coba-coba) inilah yang mendasari konsep <b>Reinforcement Learning (RL)</b> dalam dunia Kecerdasan Artifisial.
        </p>

        <h3 className="text-2xl mt-8">Bagaimana Reinforcement Learning Bekerja?</h3>
        <p className="text-slate-900 text-lg">
          Berbeda dengan <i>Supervised Learning</i> yang disuapi oleh data jawaban (kunci jawaban), pada <b>Reinforcement Learning</b>, kita membiarkan program (AI) belajar secara mandiri di dalam sebuah lingkungan (Environment). Program ini dipaksa untuk mencoba berbagai aksi, dan kita hanya memberikan umpan balik berupa skor.
        </p>

        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-8 border-fuchsia-500 my-8">
          <h4 className="text-fuchsia-800 font-bold mt-0 text-xl">5 Komponen Utama Reinforcement Learning</h4>
          <ul className="space-y-4 mt-4 text-slate-900">
            <li className="flex items-start text-slate-900">
              <span className="text-2xl mr-3">🤖</span>
              <div className="text-slate-900"><b className="text-slate-800">Agent (Agen):</b> Program AI atau entitas yang bertugas mengambil keputusan dan melakukan tindakan. (Contoh: Karakter robot di dalam game).
              </div>
            </li>
            <li className="flex items-start text-slate-900">
              <span className="text-2xl mr-3">🌍</span>
              <div className="text-slate-900"><b className="text-slate-800">Environment (Lingkungan):</b> Dunia atau ruang tempat Agent berinteraksi. (Contoh: Peta atau level di dalam sebuah game).
              </div>
            </li>
            <li className="flex items-start text-slate-900">
              <span className="text-2xl mr-3">📍</span>
              <div className="text-slate-900"><b className="text-slate-800">State (Status):</b> Situasi atau kondisi Agent saat ini di dalam Environment. (Contoh: "Robot berada di pinggir tebing" atau "Koordinat X=10, Y=5").
              </div>
            </li>
            <li className="flex items-start text-slate-900">
              <span className="text-2xl mr-3">🕹️</span>
              <div className="text-slate-900"><b className="text-slate-800">Action (Aksi):</b> Tindakan yang dipilih oleh Agent dari berbagai pilihan yang ada. (Contoh: Belok kiri, lompat, atau rem).
              </div>
            </li>
            <li className="flex items-start text-slate-900">
              <span className="text-2xl mr-3">🎁</span>
              <div className="text-slate-900"><b className="text-slate-800">Reward / Punishment (Imbalan / Hukuman):</b> Umpan balik dari Environment setelah Agent melakukan Action. Reward bernilai positif jika aksinya menguntungkan, dan bernilai negatif (Punishment) jika aksinya merugikan atau fatal.
              </div>
            </li>
          </ul>
        </div>

        <h3 className="text-2xl mt-8">Algoritma Q-Learning</h3>
        <p className="text-slate-900 text-lg">
          Bagaimana cara AI mengingat tindakan mana yang bagus dan mana yang buruk? AI menggunakan sebuah memori yang disebut <b>Q-Table</b> (Kualitas Table). Setiap kali AI mendapatkan <i>Reward</i> tinggi di suatu posisi tertentu, AI akan mencatat skor tersebut di Q-Table. Semakin sering ia berlatih (bermain jutaan kali), Q-Table tersebut akan menjadi sangat akurat layaknya buku panduan dewa, sehingga AI tidak akan pernah salah langkah lagi.
        </p>

        <hr className="my-12 border-slate-200" />

        <h2 className="text-3xl text-fuchsia-700">Contoh Projek 1: Membuat AI Bermain Flappy Bird Secara Mandiri</h2>
        <p className="text-slate-900 text-lg">
          Pada projek pertama ini, kita akan membahas secara mendalam bagaimana kita melatih AI untuk memainkan game Flappy Bird. Tujuannya adalah membuat burung terbang melewati celah pipa sebanyak-banyaknya tanpa menyentuh pipa atau jatuh ke tanah.
        </p>
        
        <h4 className="font-bold text-slate-800">1. Mendefinisikan Komponen RL</h4>
        <ul className="list-disc pl-6 mb-6 text-slate-900">
          <li><b>Agent:</b> Burung Flappy Bird.</li>
          <li><b>Environment:</b> Layar permainan yang bergerak ke kiri, di mana terdapat gravitasi dan pipa-pipa rintangan.</li>
          <li><b>State:</b> AI melihat 3 hal penting: Posisi Y (ketinggian burung), Jarak horizontal dari burung ke pipa terdekat, dan Jarak vertikal dari burung ke celah pipa terdekat.</li>
          <li><b>Action:</b> Hanya ada 2 pilihan (<i>Binary</i>): <code>0 = Diam</code> (terjatuh karena gravitasi), <code>1 = Lompat</code> (mengepakkan sayap ke atas).</li>
        </ul>

        <h4 className="font-bold text-slate-800">2. Menentukan Aturan Reward (Skor)</h4>
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-6">
          <p className="mb-2 text-slate-900">Kita harus mendesain skor sedemikian rupa agar AI terpacu untuk bertahan hidup:</p>
          <ul className="space-y-2 text-slate-900">
            <li className="text-emerald-600 font-bold">✔️ +1 Poin (Setiap Frame Bertahan): Diberikan selama burung masih hidup (terbang).</li>
            <li className="text-emerald-700 font-bold text-lg">✔️ +100 Poin (Melewati Pipa): Hadiah besar (Jackpot) saat burung sukses melewati celah pipa.</li>
            <li className="text-rose-600 font-bold">❌ -1000 Poin (Menabrak / Jatuh): Hukuman sangat keras (Punishment) jika burung menabrak pipa atau tanah, dan game over.</li>
          </ul>
        </div>

        <h4 className="font-bold text-slate-800">3. Proses Siklus Pembelajaran (Epochs)</h4>
        <p className="text-slate-900 text-lg">
          Saat AI pertama kali dijalankan (Epoch 1), ia tidak tahu apapun. Ia menekan tombol "Lompat" secara acak. Tentu saja, ia akan langsung menabrak pipa. Ia mendapat skor <b>-1000</b>. Di otaknya (Q-Table), ia mencatat: <i>"Oh, kalau saya berada di posisi dekat pipa bawah, mengepakkan sayap itu salah!"</i>.
        </p>
        <p className="text-slate-900 text-lg">
          Kita membiarkan game ini berjalan secara <i>looping</i> hingga 10.000 kali permainan (<i>Generations</i>). Karena komputer bisa mempercepat waktu simulasi, 10.000 game ini bisa diselesaikan dalam 5 menit. Di akhir simulasi, AI sudah mencoba semua kemungkinan bodoh, dihukum jutaan kali, dan akhirnya menemukan "jalur emas" untuk mendapatkan +100 poin terus menerus tanpa henti. Jadilah ia Flappy Bird kebal yang tidak pernah kalah!
        </p>

        <hr className="my-12 border-slate-200" />

        <h2 className="text-3xl text-fuchsia-700">Contoh Projek 2: Mobil Otonom (Self-Driving) Belajar Parkir</h2>
        <p className="text-slate-900 text-lg">
          Melatih mobil untuk parkir paralel di dunia nyata sangatlah mahal dan berbahaya (bisa merusak mobil lain). Oleh karena itu, *AI Engineer* menggunakan <b>Reinforcement Learning di dalam Simulator 3D</b> (seperti menggunakan game engine Unity3D).
        </p>
        
        <h4 className="font-bold text-slate-800">1. Komponen Simulator</h4>
        <ul className="list-disc pl-6 mb-6 text-slate-900">
          <li><b>Agent:</b> Mobil virtual yang dilengkapi sensor LIDAR (sinar laser untuk mengukur jarak ke rintangan).</li>
          <li><b>Environment:</b> Tempat parkir virtual dengan berbagai mobil terparkir acak, tiang listrik, dan pejalan kaki.</li>
          <li><b>State:</b> Data pembacaan 8 sensor LIDAR di sekeliling mobil, kecepatan mobil saat ini, dan sudut kemudi (setir).</li>
          <li><b>Action:</b> Menambah Gas (Akselerasi), Mengerem, Putar Setir ke Kiri, Putar Setir ke Kanan.</li>
        </ul>

        <h4 className="font-bold text-slate-800">2. Menyusun <i>Reward Engineering</i> yang Cerdas</h4>
        <p className="text-slate-900 text-lg">
          Dalam RL, <b>Agent akan melakukan apapun untuk memaksimalkan Reward</b>. Terkadang, jika kita salah merancang Reward, AI akan menemukan trik atau cara curang.
        </p>
        <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 mb-6">
          <p className="font-bold text-amber-800 mb-2">⚠️ Kasus Kesalahan Reward (Reward Hacking):</p>
          <p className="text-amber-700 text-sm">
            Jika kita <b>hanya</b> memberikan penalti -100 jika mobil menabrak. Apa yang akan dilakukan AI? Mobil AI akan belajar untuk <b>diam saja di tempat dan tidak pernah bergerak selamanya!</b> Karena dengan diam, ia dijamin tidak akan pernah menabrak dan tidak akan pernah mendapat penalti. Ini disebut <i>Reward Hacking</i>.
          </p>
        </div>
        <p className="text-slate-900 text-lg">
          Oleh karena itu, aturan Reward yang benar harus <b>memaksa</b> mobil bergerak ke tujuan:
        </p>
        <ul className="list-disc pl-6 mb-6 text-slate-900">
          <li className="text-emerald-700"><b>+1000 Poin:</b> Berhasil masuk ke kotak parkir target secara lurus.</li>
          <li className="text-emerald-600"><b>+10 Poin:</b> Untuk setiap detik, jarak mobil <b>semakin dekat</b> ke kotak target (memaksa mobil bergerak maju).</li>
          <li className="text-rose-600"><b>-10 Poin:</b> Setiap kali waktu berlalu (Time Penalty). Memaksa AI parkir secepat mungkin, tidak berlama-lama.</li>
          <li className="text-rose-800 font-bold"><b>-5000 Poin:</b> Menabrak apapun (Mobil lain/tiang), dan simulasi langsung di-reset.</li>
        </ul>

        <h4 className="font-bold text-slate-800">3. Hasil Simulasi</h4>
        <p className="text-slate-900 text-lg">
          Setelah dibiarkan mencoba ratusan ribu kali di Simulator, AI mobil ini mulai menguasai teknik memutar setir, mundur, hingga menyesuaikan sudut dengan sangat presisi layaknya supir profesional, tanpa menulis satu baris pun kode logika tradisional. Inilah kekuatan sejati Reinforcement Learning!
        </p>
      </div>
    )
  },
  
  "s2-p10": {
    title: "Generative AI & Etika AI",
    content: (
      <div className="text-slate-900 prose prose-slate max-w-none prose-headings:text-slate-800 prose-headings:font-bold prose-p:text-slate-900 prose-p:text-lg prose-li:text-slate-900 prose-li:text-lg prose-p:leading-relaxed prose-a:text-fuchsia-500">
        <h2 className="text-3xl border-b-2 border-fuchsia-100 pb-2">Pengantar: Era Penciptaan Sintetis</h2>
        <p className="text-lg">
          Kecerdasan Artifisial klasik berfokus pada <b>Analisis</b>: Mengelompokkan pelanggan (Clustering), mendeteksi objek (CNN), atau memprediksi harga (Regresi). Namun hari ini, kita telah memasuki era <b>Generative AI</b> (AI Generatif) — yaitu AI yang mampu <b>MENCIPTAKAN</b> konten baru yang belum pernah ada sebelumnya. Mulai dari teks esai, kode program, gambar, suara musik, hingga video realistis.
        </p>

        <h3 className="text-2xl mt-8">Bagaimana Mesin Bisa "Berimajinasi"?</h3>
        <p className="text-slate-900 text-lg">
          AI Generatif menggunakan Model Dasar (<i>Foundation Models</i>) yang berukuran sangat masif. Model ini dilatih menggunakan triliunan kata dan miliaran gambar dari seluruh internet. Mesin tidak "menyalin dan menempel" (<i>copy-paste</i>) dari Google, melainkan mereka mempelajari <b>struktur bahasa</b> dan <b>struktur visual</b> dunia kita. 
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-white p-6 rounded-2xl shadow border border-slate-100">
            <h4 className="text-fuchsia-700 mt-0 font-bold">📝 Large Language Models (LLM)</h4>
            <p className="text-sm">Contoh: ChatGPT, Claude, Gemini. AI ini memprediksi "kata apa yang paling masuk akal muncul selanjutnya" berdasarkan pola bahasa manusia yang dipelajarinya, sehingga mampu berdebat, menulis puisi, atau memperbaiki *coding*.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow border border-slate-100">
            <h4 className="text-fuchsia-700 mt-0 font-bold">🎨 Diffusion Models & GANs</h4>
            <p className="text-sm">Contoh: Midjourney, Stable Diffusion. AI ini belajar dari gambar yang diberi *noise* (bercak statis), lalu belajar menghapus bercak tersebut selangkah demi selangkah hingga membentuk gambar jernih baru sesuai dengan perintah (prompt).</p>
          </div>
        </div>

        <hr className="my-12 border-slate-200" />

        <h2 className="text-3xl text-fuchsia-700">Contoh Projek 1: Membangun Chatbot LLM untuk Rumah Sakit</h2>
        <p className="text-slate-900 text-lg">
          Bayangkan Anda diminta oleh Rumah Sakit untuk membuat asisten virtual (Chatbot) yang beroperasi 24 jam di WhatsApp. Jika kita menggunakan pemrograman konvensional, kita harus membuat jutaan kombinasi IF/ELSE untuk merespons pertanyaan pasien yang tak terduga. Dengan Generative AI (LLM), kita cukup menggunakan teknik <b>Prompt Engineering</b> (Rekayasa Prompt) dipadukan dengan API LLM.
        </p>

        <h4 className="font-bold text-slate-800">1. Menyuntikkan Kepribadian (System Prompt)</h4>
        <p className="text-slate-900 text-lg">Kita mengatur sebuah instruksi tersembunyi yang menjadi "roh" atau kepribadian AI. Pasien tidak bisa melihat instruksi ini.</p>
        <div className="bg-slate-800 text-slate-50 p-5 rounded-xl font-mono text-sm mb-6">
          <span className="text-emerald-400">System Role:</span><br/>
          "Kamu adalah Medibot, asisten virtual ramah dari Rumah Sakit Sehat Selalu. Jawab semua pertanyaan pasien dengan singkat dan sopan. Jika pasien menanyakan diagnosis penyakit parah, JANGAN berikan diagnosis, melainkan sarankan mereka untuk segera mengunjungi IGD atau buat janji temu dengan dokter spesialis."
        </div>

        <h4 className="font-bold text-slate-800">2. RAG (Retrieval-Augmented Generation)</h4>
        <p className="text-slate-900 text-lg">
          LLM seperti ChatGPT dilatih dengan data umum hingga tahun tertentu. LLM tidak tahu jadwal dokter di Rumah Sakit Sehat Selalu! Untuk mengatasinya, kita menggunakan teknik <b>RAG</b>. Saat pasien bertanya, sistem kita akan mencari jadwal dokter dari database internal rumah sakit terlebih dahulu, lalu menyisipkan teks jadwal tersebut ke dalam <i>prompt</i> sebelum dikirim ke LLM. 
        </p>
        <p className="text-slate-900 text-lg">
          AI kemudian membaca jadwal tersebut, merangkumnya, dan membalas pasien dengan kalimat manusiawi yang luwes: <i>"Halo Ibu Siti! Dokter Gigi Budi bertugas di hari Selasa jam 10 pagi. Apakah Ibu ingin saya bantu pesankan nomor antrean?"</i>. Chatbot ini tidak kaku seperti robot menu otomatis!
        </p>

        <hr className="my-12 border-slate-200" />

        <h2 className="text-3xl text-fuchsia-700">Contoh Projek 2: Merancang Pakaian Sintetis dengan GANs</h2>
        <p className="text-slate-900 text-lg">
          Dalam arsitektur <b>GANs (Generative Adversarial Networks)</b>, penciptaannya terinspirasi dari dua sistem AI yang <b>bertarung satu sama lain (Adversarial)</b>. Dalam projek ini, sebuah perusahaan Fashion ingin membuat jutaan desain jaket baru tanpa harus menyewa banyak desainer.
        </p>

        <h4 className="font-bold text-slate-800">1. Sistem Pertarungan Dua AI</h4>
        <ul className="list-disc pl-6 mb-6 text-slate-900">
          <li>
            <b>Generator (Si Pemalsu):</b> Program AI yang bertugas membuat gambar acak dari piksel yang berantakan, berusaha menggambar pola yang mirip "Jaket".
          </li>
          <li>
            <b>Discriminator (Si Detektif):</b> Program AI penguji yang dilatih menggunakan puluhan ribu foto jaket asli. Tugasnya hanya satu: Menentukan apakah gambar yang disodorkan kepadanya adalah jaket <b>ASLI (Real)</b> atau <b>PALSU (Fake)</b> buatan Generator.
          </li>
        </ul>

        <h4 className="font-bold text-slate-800">2. Evolusi Desain Melalui Pelatihan</h4>
        <p className="text-slate-900 text-lg">
          Di tahap awal, Generator menggambar coretan abstrak yang konyol. Discriminator dengan mudah menebak: <i>"Skor 0%, ini PALSU!"</i>. 
          Karena gagal, Generator dihukum (Loss) dan ia mengubah parameternya. Ia mencoba menambahkan kerah dan resleting. Discriminator tertipu sedikit: <i>"Skor 30%, mirip jaket, tapi masih PALSU!"</i>.
        </p>
        <p className="text-slate-900 text-lg">
          Proses "pemalsuan" dan "pendeteksian" ini berlanjut hingga puluhan juta kali! Pada suatu titik, Discriminator menjadi detektif super cerdas, TAPI Generator menjadi pemalsu tingkat dewa. Hasil akhir dari Generator sangat hiper-realistis: tekstur kain, pencahayaan, dan bentuk jaketnya begitu sempurna hingga Discriminator (dan manusia) tidak bisa membedakannya lagi dari jaket asli. Desain ini kemudian bisa langsung dicetak dan diproduksi di pabrik dunia nyata!
        </p>

        <hr className="my-12 border-slate-200" />

        <h2 className="text-3xl text-fuchsia-700 border-b-2 border-fuchsia-100 pb-2">Etika AI (AI Ethics): Ancaman Terbesar Umat Manusia?</h2>
        <p className="text-slate-900 text-lg">
          Dengan kekuatan penciptaan ini, datang pula bahaya dan tanggung jawab yang sangat besar. Sebagai AI Engineer, kita wajib memahami etika AI agar teknologi yang kita buat tidak menghancurkan masyarakat:
        </p>
        
        <ul className="space-y-6 mt-6 text-slate-900">
          <li className="bg-rose-50 p-6 rounded-2xl border-l-8 border-rose-500 shadow-sm">
            <h4 className="text-rose-800 font-bold mt-0 text-xl flex items-center gap-2"><span className="text-2xl">🎭</span> Deepfake & Hoaks</h4>
            <p className="text-rose-700 mb-0">Karena GANs bisa menciptakan wajah super realistis, penjahat menggunakan AI untuk menukar wajah (Deepfake) politikus atau figur publik dalam video, dan membuat mereka menyebarkan pidato kebencian palsu atau penipuan finansial. Ini bisa memicu kekacauan negara.</p>
          </li>
          <li className="bg-amber-50 p-6 rounded-2xl border-l-8 border-amber-500 shadow-sm">
            <h4 className="text-amber-800 font-bold mt-0 text-xl flex items-center gap-2"><span className="text-2xl">⚖️</span> Bias Data & Rasisme Algoritma</h4>
            <p className="text-amber-700 mb-0">AI layaknya cermin. Jika AI dilatih menggunakan data rekrutmen dari perusahaan yang secara historis memprioritaskan pelamar pria kulit putih, maka saat AI diminta menyeleksi CV pelamar baru, AI tersebut akan secara otomatis <b>mendiskriminasi</b> dan membuang CV dari kandidat wanita atau minoritas secara tidak adil.</p>
          </li>
          <li className="bg-sky-50 p-6 rounded-2xl border-l-8 border-sky-500 shadow-sm">
            <h4 className="text-sky-800 font-bold mt-0 text-xl flex items-center gap-2"><span className="text-2xl">©️</span> Hak Cipta & Pencurian Karya</h4>
            <p className="text-sky-700 mb-0">AI "mempelajari" miliaran karya lukis dan buku karya seniman dan penulis di seluruh dunia tanpa izin atau pembayaran royalti. Saat AI menjual kemampuannya untuk menggambar dengan gaya visual tertentu, perdebatan besar muncul: apakah ini bentuk inovasi teknologi, atau bentuk pencurian massal terang-terangan?</p>
          </li>
        </ul>
      </div>
    )
  },
  "s2-p11": {
    title: "AIoT (Kecerdasan Buatan & Internet of Things)",
    content: (
      <div className="text-slate-900 prose prose-slate max-w-none prose-headings:text-slate-800 prose-headings:font-bold prose-p:text-slate-900 prose-p:text-lg prose-li:text-slate-900 prose-li:text-lg prose-p:leading-relaxed prose-a:text-fuchsia-500">
        <h2 className="text-3xl border-b-2 border-fuchsia-100 pb-2">Pengantar: Ketika Benda Mati Menjadi Pintar</h2>
        <p className="text-lg">
          Selama ini, kita menjalankan AI di dalam komputer atau *server* yang besar. Namun, apa yang terjadi jika kita menanamkan "otak buatan" ini ke dalam benda-benda fisik sehari-hari di sekitar kita? Inilah yang disebut dengan <b>AIoT (Artificial Intelligence of Things)</b>, yaitu perpaduan antara kecerdasan AI dan sensor-sensor perangkat IoT.
        </p>

        <h3 className="text-2xl mt-8">Internet of Things (IoT) + AI = AIoT</h3>
        <p>
          IoT bertugas sebagai "mata dan telinga" (Sensor Suhu, Sensor Kamera, Sensor Jarak) yang mengumpulkan data. AI bertugas sebagai "otak" yang menganalisis data tersebut dalam hitungan milidetik dan membuat keputusan.
        </p>

        <hr className="my-12 border-slate-200" />

        <h2 className="text-3xl text-fuchsia-700">Contoh Projek 1: Sistem Smart Home Otomatis</h2>
        <p>
          Membangun rumah cerdas bukan sekadar bisa menyalakan lampu dari *smartphone*. Dengan AIoT, rumah bisa <b>memahami</b> kebiasaan pemiliknya tanpa perlu diperintah.
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li><b>Kamera Pengawas (Computer Vision):</b> Mampu membedakan apakah yang lewat di halaman adalah kucing peliharaan (abaikan), atau orang asing yang mencurigakan (bunyikan alarm).</li>
          <li><b>Penghematan AC Cerdas:</b> Termostat rumah mempelajari bahwa Anda selalu pulang jam 18:00 sore. AI akan otomatis menyalakan AC pada jam 17:50 agar ruangan sudah dingin tepat saat Anda membuka pintu, dan akan mematikan AC jika sensor tidak mendeteksi detak jantung manusia di ruangan selama 1 jam.</li>
        </ul>

        <hr className="my-12 border-slate-200" />

        <h2 className="text-3xl text-fuchsia-700">Contoh Projek 2: Pertanian Presisi (Precision Agriculture)</h2>
        <p>
          Para petani modern tidak lagi menebak-nebak kapan harus menyiram atau memanen padi.
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li><b>Sensor Tanah IoT:</b> Ditanam di area sawah untuk memantau kelembapan dan tingkat pupuk *real-time*.</li>
          <li><b>Drone Pemantau dengan CNN (AI):</b> Drone terbang di atas lahan pertanian. Kamera Drone menggunakan AI untuk mendeteksi daun yang mulai menguning akibat hama.</li>
          <li>AI kemudian memerintahkan sistem irigasi otomatis (IoT) untuk menyemprotkan air dan pestisida <b>hanya</b> di koordinat petak sawah yang berpenyakit, menghemat air dan obat hingga 80%!</li>
        </ul>
      </div>
    )
  },
  "s2-p12": {
    title: "Deployment AI: Membawa Model ke Dunia Nyata",
    content: (
      <div className="text-slate-900 prose prose-slate max-w-none prose-headings:text-slate-800 prose-headings:font-bold prose-p:text-slate-900 prose-p:text-lg prose-li:text-slate-900 prose-li:text-lg prose-p:leading-relaxed prose-a:text-fuchsia-500">
        <h2 className="text-3xl border-b-2 border-fuchsia-100 pb-2">Pengantar: Menjemput Pengguna (End-Users)</h2>
        <p className="text-lg">
          Anda sudah melatih AI berhari-hari, keakuratannya mencapai 99%, dan ia bisa membedakan Kucing dan Anjing dengan sempurna. Lalu apa selanjutnya? Jika model itu hanya diam di laptop Anda, maka ia tidak memiliki dampak sosial. Tahap pamungkas dari seorang AI Engineer adalah <b>Deployment</b>: Mengemas model AI dan menyajikannya ke dalam sebuah Aplikasi Web atau Mobile agar bisa digunakan jutaan orang di seluruh dunia.
        </p>

        <hr className="my-12 border-slate-200" />

        <h2 className="text-3xl text-fuchsia-700">Contoh Projek 1: Membangun Web App AI dengan Streamlit</h2>
        <p>
          <b>Streamlit</b> adalah perpustakaan Python ajaib yang memungkinkan Data Scientist menyulap *coding* AI mereka menjadi website interaktif hanya dengan beberapa baris kode (tanpa perlu belajar HTML atau CSS).
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li><b>Fitur Drag and Drop:</b> Pengguna (misal, dokter) tinggal menarik dan melepaskan foto Rontgen Pasien ke dalam kotak *upload* di *website*.</li>
          <li><b>Inference:</b> Gambar tersebut masuk ke *Server* Python Anda, diproses oleh Model Prediksi Paru-paru Anda.</li>
          <li><b>Hasil Visual:</b> Website langsung memunculkan hasil persentase diagnosis (contoh: "85% Normal") dalam hitungan detik. Aplikasi ini bisa di-host gratis di *Cloud* seperti Streamlit Community Cloud atau Vercel.</li>
        </ul>

        <hr className="my-12 border-slate-200" />

        <h2 className="text-3xl text-fuchsia-700">Contoh Projek 2: Menyiapkan API Model (Backend Server)</h2>
        <p>
          Bagaimana jika sistem *Face Recognition* (Pengenal Wajah) yang Anda buat harus ditanamkan ke Mesin Absensi kantor atau Aplikasi Android *Startup* Anda? Kita tidak bisa memakai Streamlit, karena itu berbentuk tampilan web. Solusinya adalah membuat <b>REST API</b> (menggunakan FastAPI atau Flask).
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li><b>Konsep API (Application Programming Interface):</b> Jembatan tak terlihat penghubung *front-end* dan *back-end*.</li>
          <li>Kamera absen di kantor akan memotret wajah karyawan, lalu aplikasi *mobile* mengirim foto itu lewat koneksi HTTP (JSON) menuju ke *Server AI* (API) Anda di *Cloud* (seperti Google Cloud atau AWS).</li>
          <li>Server AI memproses foto, membandingkan struktur wajah, lalu mengembalikan data JSON sederhana: <code>&#123; "nama": "Budi", "status": "Dikenali" &#125;</code>. Mesin absen langsung membukakan pintu untuk Budi!</li>
        </ul>
      </div>
    )
  },

"default": {
    title: "Materi Sedang Disusun",
    content: (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🚧</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Materi dalam Tahap Penyempurnaan</h2>
        <p className="text-slate-800">Guru sedang menyesuaikan materi ini dengan Silabus Kurikulum Merdeka terbaru.</p>
      </div>
    )
  }
};

export default async function MateriPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const materi = materiData[id] || materiData["default"];

  // Menentukan warna tema berdasarkan semester dari ID (s1 = sky, s2 = fuchsia)
  const isSemester1 = id.startsWith("s1");
  const themeColor = isSemester1 ? "sky" : "fuchsia";

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Dynamic Navbar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/dashboard/siswa" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Kembali ke Ruang Belajar
          </Link>
          <span className={`bg-${themeColor}-100 text-${themeColor}-700 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider`}>
            Modul Pembelajaran
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-12">
        {/* Header Materi */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">{materi.title}</h1>
          <p className="text-slate-800">Baca dan pahami materi di bawah ini dengan saksama.</p>
        </div>

        {/* Kotak Konten Materi */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
          {materi.content}
        </div>

        {/* Footer Navigasi Modul */}
        <div className="mt-12 flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <button className="text-slate-400 font-semibold px-4 py-2 hover:bg-slate-50 rounded-lg transition-colors cursor-not-allowed">
            &larr; Modul Sebelumnya
          </button>
          
          <Link href={`/dashboard/siswa/latihan/${id}`} className={`bg-${themeColor}-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-${themeColor}-600 transition-colors shadow-lg hover:-translate-y-0.5 inline-block`}>
            Lanjut ke Latihan Soal &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
