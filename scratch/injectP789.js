const fs = require('fs');
let content = fs.readFileSync('src/app/dashboard/siswa/materi/[id]/page.tsx', 'utf8');

const s1p7 = `
      case 's1-p7':
        return (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-3xl font-black text-slate-800 mb-6">1. Perulangan (For & While)</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Komputer tidak pernah bosan! Jika Anda butuh melakukan sesuatu berulang-ulang, jangan tulis kode berkali-kali. Gunakan <em>Looping</em> (Perulangan).
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-teal-50 border border-teal-100 p-6 rounded-2xl">
                  <h3 className="font-bold text-teal-900 mb-3 text-lg">🔁 FOR Loop</h3>
                  <p className="text-teal-800 text-sm mb-2">Digunakan saat kita <strong>sudah tahu pasti</strong> berapa kali perulangan akan dilakukan.</p>
                  <pre className="bg-white p-3 rounded-lg text-xs font-mono text-slate-700">
for i in range(5):\n
    print("Halo ke-", i)
                  </pre>
                </div>
                
                <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl">
                  <h3 className="font-bold text-orange-900 mb-3 text-lg">♾️ WHILE Loop</h3>
                  <p className="text-orange-800 text-sm mb-2">Terus berjalan berulang-ulang <strong>selama</strong> kondisinya masih bernilai True.</p>
                  <pre className="bg-white p-3 rounded-lg text-xs font-mono text-slate-700">
baterai = 100\n
while baterai &gt; 0:\n
    print("Main Game")\n
    baterai -= 10
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-100 border-2 border-indigo-200 p-8 rounded-3xl mt-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg animate-pulse">
                  🤖
                </div>
                <div>
                  <h3 className="text-2xl font-black text-indigo-900">Proyek: Robot Pengepel Lantai</h3>
                  <p className="text-indigo-700 font-semibold">Menerapkan WHILE Loop</p>
                </div>
              </div>
              <div className="space-y-4 text-indigo-900/80">
                <p><strong>Skenario:</strong> Buat program untuk robot vacuum. Robot akan terus mengepel maju (1 langkah) selama daya baterai belum habis (0%). Setiap 1 langkah menghabiskan 20% baterai.</p>
                <div className="bg-white/70 p-6 rounded-2xl border border-indigo-200 shadow-sm mt-4">
                  <h4 className="font-bold text-indigo-950 text-lg mb-3 flex items-center gap-2"><span>✅</span> Solusi Python</h4>
                  <div className="bg-slate-900 p-4 rounded-xl font-mono text-emerald-300 text-sm">
<pre><code>
baterai = 100\n
langkah = 0\n
\n
while baterai &gt; 0:\n
    langkah += 1\n
    baterai -= 20\n
    print("Langkah", langkah, "- Sisa Baterai:", baterai, "%")\n
\n
print("Baterai habis. Kembali ke stasiun daya.")\n
</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
`;

const s1p8 = `
      case 's1-p8':
        return (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-3xl font-black text-slate-800 mb-6">1. Fungsi & Prosedur</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Untuk mencegah kode program menjadi terlalu panjang dan sulit dibaca, kita bisa membungkus sebuah tugas ke dalam kotak kecil yang disebut <strong>Fungsi</strong> <code>def</code>.
              </p>
              
              <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
                <h3 className="font-bold text-blue-900 mb-3 text-lg">📦 Komponen Fungsi</h3>
                <ul className="space-y-2 text-blue-800">
                  <li><strong>def</strong> : Kata kunci untuk memulai pembuatan fungsi.</li>
                  <li><strong>Parameter</strong> : Variabel sementara yang ditaruh di dalam tanda kurung untuk menerima data.</li>
                  <li><strong>return</strong> : Mengembalikan hasil perhitungan ke luar fungsi.</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl shadow-xl text-white">
              <h3 className="text-xl font-bold mb-4 text-blue-300">💻 Contoh Pembuatan Fungsi</h3>
              <pre className="bg-black/50 p-6 rounded-2xl overflow-x-auto text-green-400 font-mono text-sm leading-relaxed">
                <code>
def sapa_murid(nama):\n
    teks = "Halo selamat pagi, " + nama\n
    return teks\n
\n
print(sapa_murid("Andi"))\n
print(sapa_murid("Budi"))\n
                </code>
              </pre>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-100 border-2 border-indigo-200 p-8 rounded-3xl mt-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg animate-pulse">
                  🌡️
                </div>
                <div>
                  <h3 className="text-2xl font-black text-indigo-900">Proyek: Mesin Konversi Suhu Otomatis</h3>
                  <p className="text-indigo-700 font-semibold">Membuat Fungsi Konversi Celcius ke Fahrenheit</p>
                </div>
              </div>
              <div className="space-y-4 text-indigo-900/80">
                <p><strong>Skenario:</strong> Pihak rumah sakit membutuhkan alat untuk merubah suhu badan pasien (Celcius) menjadi skala Internasional (Fahrenheit). Rumusnya: <code>(C * 9/5) + 32</code>. Buatlah fungsinya!</p>
                <div className="bg-white/70 p-6 rounded-2xl border border-indigo-200 shadow-sm mt-4">
                  <h4 className="font-bold text-indigo-950 text-lg mb-3 flex items-center gap-2"><span>✅</span> Solusi Python</h4>
                  <div className="bg-slate-900 p-4 rounded-xl font-mono text-emerald-300 text-sm">
<pre><code>
def konversi_c_ke_f(celcius):\n
    fahrenheit = (celcius * 9/5) + 32\n
    return fahrenheit\n
\n
suhu_pasien = 38\n
hasil = konversi_c_ke_f(suhu_pasien)\n
print("Suhu dalam Fahrenheit adalah:", hasil)\n
</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
`;

const s1p9 = `
      case 's1-p9':
        return (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-3xl font-black text-slate-800 mb-6">1. Struktur Data (List / Array)</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Bayangkan Anda ingin menyimpan nama 100 orang murid. Jika menggunakan variabel biasa, Anda harus membuat 100 variabel (nama1, nama2, dll). Solusinya adalah menggunakan struktur data <strong>List</strong> (atau Array).
              </p>
              
              <div className="bg-violet-50 border border-violet-100 p-6 rounded-2xl">
                <h3 className="font-bold text-violet-900 mb-3 text-lg">🗄️ Aturan List di Python</h3>
                <ul className="space-y-2 text-violet-800">
                  <li>List dideklarasikan menggunakan tanda kurung siku <code>[ ]</code>.</li>
                  <li>Item di dalam List memiliki "Indeks" atau nomor urut.</li>
                  <li><strong>Penting:</strong> Indeks selalu dimulai dari angka <strong>0</strong>, bukan 1!</li>
                  <li>Gunakan <code>.append()</code> untuk menambah data baru ke bagian akhir List.</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl shadow-xl text-white">
              <h3 className="text-xl font-bold mb-4 text-violet-300">💻 Contoh Kode Python</h3>
              <pre className="bg-black/50 p-6 rounded-2xl overflow-x-auto text-green-400 font-mono text-sm leading-relaxed">
                <code>
# Membuat List yang berisi nama buah\n
keranjang = ["Apel", "Jeruk", "Mangga"]\n
\n
print("Buah pertama:", keranjang[0])  # Mencetak Apel\n
\n
# Menambah buah baru\n
keranjang.append("Pisang")\n
print(keranjang)\n
                </code>
              </pre>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-100 border-2 border-indigo-200 p-8 rounded-3xl mt-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg animate-pulse">
                  🛒
                </div>
                <div>
                  <h3 className="text-2xl font-black text-indigo-900">Proyek: Sistem Antrean Kasir</h3>
                  <p className="text-indigo-700 font-semibold">Mengelola Array Data Pelanggan</p>
                </div>
              </div>
              <div className="space-y-4 text-indigo-900/80">
                <p><strong>Skenario:</strong> Buat program sederhana yang mencatat pelanggan masuk ke dalam antrean. Saat ada pelanggan baru, masukkan ia ke dalam antrean (list), lalu cetak daftar antrean terbaru.</p>
                <div className="bg-white/70 p-6 rounded-2xl border border-indigo-200 shadow-sm mt-4">
                  <h4 className="font-bold text-indigo-950 text-lg mb-3 flex items-center gap-2"><span>✅</span> Solusi Python</h4>
                  <div className="bg-slate-900 p-4 rounded-xl font-mono text-emerald-300 text-sm">
<pre><code>
antrean_kasir = ["Budi", "Tono"]\n
print("Antrean saat ini:", antrean_kasir)\n
\n
# Pelanggan baru datang\n
pelanggan_baru = "Siti"\n
antrean_kasir.append(pelanggan_baru)\n
\n
print("Ada yang masuk! Antrean sekarang:", antrean_kasir)\n
</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
`;

content = content.replace(/default:/g, s1p7 + s1p8 + s1p9 + '      default:');
fs.writeFileSync('src/app/dashboard/siswa/materi/[id]/page.tsx', content);
console.log('Added s1-p7, p8, p9!');
