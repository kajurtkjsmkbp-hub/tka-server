const fs = require('fs');
let content = fs.readFileSync('src/app/dashboard/siswa/materi/[id]/page.tsx', 'utf8');

const newS1P1 = `"s1-p1": {
      title: "Pengantar Berpikir Komputasional",
      content: (
        <div className="space-y-8 text-slate-700 leading-relaxed text-lg">
          
          <div className="prose prose-lg max-w-none text-slate-700">
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
              <p><strong>Skenario:</strong> Anda diminta memprogram sebuah robot lengan untuk membuat secangkir kopi instan panas. Robot ini sangat bodoh, jika Anda tidak merincikan langkahnya, ia akan menuang air panas ke lantai!</p>
              
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
              <p><strong>Skenario:</strong> Anda lupa kata sandi koper Anda yang terdiri dari 3 digit angka (000 - 999). Mencoba menebaknya secara acak akan memakan waktu lama. Bagaimana cara Berpikir Komputasional menyelesaikannya?</p>
              
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
    },`;

const newS1P2 = `"s1-p2": {
      title: "Algoritma dan Pseudocode",
      content: (
        <div className="space-y-8 text-slate-700 leading-relaxed text-lg">
          
          <div className="prose prose-lg max-w-none text-slate-700">
            <p className="text-xl font-medium text-slate-900 leading-normal">
              Setelah memahami cara berpikir komputasional, langkah selanjutnya adalah menuliskannya sebelum di-coding. <strong>Pseudocode</strong> adalah "kode palsu" atau rancangan logika yang ditulis dalam bahasa manusia biasa agar mudah dipahami, sebelum diterjemahkan ke bahasa pemrograman sungguhan seperti Python atau Java.
            </p>
          </div>
  
          <h3 className="text-3xl font-extrabold text-sky-800 mt-12 mb-6 border-b-2 border-sky-100 pb-4">Struktur Dasar Pseudocode</h3>
          
          <div className="bg-slate-900 p-8 rounded-3xl shadow-xl text-emerald-300 font-mono text-sm leading-loose">
            <p className="text-slate-400"># Mulai Program</p>
            <p><span className="text-fuchsia-400">START</span></p>
            <br/>
            <p className="text-slate-400"># Deklarasi Variabel (Wadah Penyimpanan)</p>
            <p><span className="text-sky-400">DECLARE</span> NilaiUjian <span className="text-fuchsia-400">AS NUMBER</span></p>
            <br/>
            <p className="text-slate-400"># Input Data</p>
            <p><span className="text-sky-400">READ</span> NilaiUjian</p>
            <br/>
            <p className="text-slate-400"># Logika Pengambilan Keputusan (Percabangan)</p>
            <p><span className="text-fuchsia-400">IF</span> NilaiUjian >= 75 <span className="text-fuchsia-400">THEN</span></p>
            <p className="pl-6"><span className="text-amber-300">PRINT</span> "Selamat, Anda Lulus!"</p>
            <p><span className="text-fuchsia-400">ELSE</span></p>
            <p className="pl-6"><span className="text-amber-300">PRINT</span> "Mohon Maaf, Anda Remidial."</p>
            <p><span className="text-fuchsia-400">END IF</span></p>
            <br/>
            <p className="text-slate-400"># Akhiri Program</p>
            <p><span className="text-fuchsia-400">END</span></p>
          </div>
  
          <h3 className="text-3xl font-extrabold text-sky-800 mt-12 mb-6 border-b-2 border-sky-100 pb-4">Daftar Proyek Pertemuan 2</h3>
          
          {/* Proyek 1 */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 p-8 rounded-3xl mb-8">
            <h4 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-3">
              <span className="text-3xl">🎫</span> Proyek 1: Mesin Tiket Bioskop Otomatis
            </h4>
            <div className="space-y-4 text-slate-700">
              <p><strong>Skenario:</strong> Sebuah bioskop membutuhkan program untuk menentukan apakah seorang pelanggan diizinkan menonton film horor (Kategori Usia 18+) berdasarkan umur yang dimasukkan.</p>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h5 className="font-bold text-slate-800 mb-3 border-b pb-2">Alur Logika (Bahasa Biasa):</h5>
                  <p className="text-sm">Tanyakan umur penonton. Jika umurnya 18 tahun atau lebih, maka cetak "Silakan masuk". Jika kurang dari 18 tahun, cetak "Dilarang masuk".</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-sm">
                  <h5 className="font-bold text-slate-300 mb-3 border-b border-slate-600 pb-2">Pseudocode:</h5>
                  <pre className="text-xs text-sky-300 font-mono">
{"START\\n  READ Umur\\n  IF Umur >= 18 THEN\\n    PRINT \\"Silakan masuk\\"\\n  ELSE\\n    PRINT \\"Dilarang masuk\\"\\n  END IF\\nEND"}
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
              <p><strong>Skenario:</strong> Supermarket mengadakan promo. Jika total belanjaan pelanggan di atas Rp 100.000, pelanggan mendapat diskon Rp 20.000. Jika tidak, tidak ada diskon.</p>
              
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-sm mt-4">
                  <h5 className="font-bold text-slate-300 mb-3 border-b border-slate-600 pb-2">Pseudocode:</h5>
                  <pre className="text-xs text-amber-300 font-mono leading-relaxed">
{"START\\n  DECLARE TotalBelanja AS NUMBER\\n  DECLARE Diskon AS NUMBER = 0\\n  \\n  READ TotalBelanja\\n  \\n  IF TotalBelanja > 100000 THEN\\n    Diskon = 20000\\n  END IF\\n  \\n  TotalBayar = TotalBelanja - Diskon\\n  PRINT \\"Total yang harus dibayar: Rp\\", TotalBayar\\nEND"}
                  </pre>
              </div>
              <p className="text-sm mt-4 bg-fuchsia-100 p-4 rounded-lg text-fuchsia-900">
                <strong>Pembahasan:</strong> Kita menggunakan variabel bantu <code>Diskon</code> yang nilainya 0 di awal. Nilainya hanya akan berubah menjadi 20000 jika syarat kondisinya terpenuhi! Ini adalah konsep fundamental pemograman.
              </p>
            </div>
          </div>

        </div>
      )
    },`;

// We need to replace the old "s1-p1" and "s1-p2"
// I will use regex to find the blocks. Since the blocks are huge React fragments, 
// a simpler approach is to split the string or use precise start/end markers.

const inject = () => {
   // Split by the exact keys
   const parts = content.split('"s1-p1": {');
   if(parts.length < 2) return console.log("Could not find s1-p1");
   
   const beforeS1P1 = parts[0];
   const afterS1P1 = parts[1].substring(parts[1].indexOf('"s1-p2": {'));
   
   const parts2 = afterS1P1.split('"s1-p2": {');
   if(parts2.length < 2) return console.log("Could not find s1-p2");
   
   const afterS1P2 = parts2[1].substring(parts2[1].indexOf('"s1-p3": {'));
   
   const newContent = beforeS1P1 + newS1P1 + '\\n    ' + newS1P2 + '\\n    ' + afterS1P2;
   
   fs.writeFileSync('src/app/dashboard/siswa/materi/[id]/page.tsx', newContent);
   console.log('Successfully updated s1-p1 and s1-p2 with deep projects!');
}

inject();
