const fs = require('fs');
let content = fs.readFileSync('src/app/dashboard/siswa/materi/[id]/page.tsx', 'utf8');

const s1p5 = `
      case 's1-p5':
        return (
          <div className="space-y-8">
            {/* Pertemuan 5 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-3xl font-black text-slate-800 mb-6">1. Operator Logika & Aritmatika</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Komputer pada dasarnya adalah kalkulator raksasa. Di Python, kita memiliki operator matematika dasar (Aritmatika) dan operator perbandingan (Logika).
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-sky-50 border border-sky-100 p-6 rounded-2xl">
                  <h3 className="font-bold text-sky-900 mb-3 text-lg">🧮 Aritmatika (Matematika)</h3>
                  <ul className="space-y-2 text-sky-800">
                    <li><code className="bg-white px-2 py-0.5 rounded font-bold">+</code> Penjumlahan</li>
                    <li><code className="bg-white px-2 py-0.5 rounded font-bold">-</code> Pengurangan</li>
                    <li><code className="bg-white px-2 py-0.5 rounded font-bold">*</code> Perkalian</li>
                    <li><code className="bg-white px-2 py-0.5 rounded font-bold">/</code> Pembagian</li>
                    <li><code className="bg-white px-2 py-0.5 rounded font-bold">%</code> Modulus (Sisa Bagi)</li>
                  </ul>
                </div>
                
                <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl">
                  <h3 className="font-bold text-amber-900 mb-3 text-lg">⚖️ Logika & Perbandingan</h3>
                  <ul className="space-y-2 text-amber-800">
                    <li><code className="bg-white px-2 py-0.5 rounded font-bold">==</code> Sama dengan</li>
                    <li><code className="bg-white px-2 py-0.5 rounded font-bold">!=</code> Tidak sama dengan</li>
                    <li><code className="bg-white px-2 py-0.5 rounded font-bold">&gt;</code> Lebih besar dari</li>
                    <li><code className="bg-white px-2 py-0.5 rounded font-bold">and</code> Semuanya harus benar</li>
                    <li><code className="bg-white px-2 py-0.5 rounded font-bold">or</code> Salah satu saja benar</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl shadow-xl text-white">
              <h3 className="text-xl font-bold mb-4 text-sky-300">💻 Contoh Kode Python</h3>
              <pre className="bg-black/50 p-6 rounded-2xl overflow-x-auto text-green-400 font-mono text-sm leading-relaxed">
                <code>
# 1. Modulus (Menentukan Bilangan Genap/Ganjil)\n
angka = 10\n
sisa_bagi = angka % 2\n
print("Sisa bagi 10 dibagi 2 adalah:", sisa_bagi)\n
\n
# 2. Logika AND\n
nilai_ujian = 80\n
sikap = "Baik"\n
\n
lulus = (nilai_ujian &gt;= 75) and (sikap == "Baik")\n
print("Apakah siswa lulus?", lulus) # Output: True\n
                </code>
              </pre>
            </div>

            {/* Proyek P5 */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-100 border-2 border-indigo-200 p-8 rounded-3xl mt-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg animate-pulse">
                  🛍️
                </div>
                <div>
                  <h3 className="text-2xl font-black text-indigo-900">Proyek: Kalkulator Diskon Toko Pintar</h3>
                  <p className="text-indigo-700 font-semibold">Menerapkan Operator Matematika & Logika</p>
                </div>
              </div>
              <div className="space-y-4 text-indigo-900/80">
                <p><strong>Skenario:</strong> Sebuah toko baju mengadakan diskon besar-besaran. Syarat diskon: Pelanggan berbelanja lebih dari Rp 100.000 <strong>DAN</strong> memiliki kartu member.</p>
                <div className="bg-white/70 p-6 rounded-2xl border border-indigo-200 shadow-sm mt-4">
                  <h4 className="font-bold text-indigo-950 text-lg mb-3 flex items-center gap-2"><span>✅</span> Pembahasan & Solusi</h4>
                  <div className="bg-slate-900 p-4 rounded-xl font-mono text-emerald-300 text-sm">
<pre><code>
total_belanja = 150000\n
punya_member = True\n
\n
# Cek syarat diskon dengan AND\n
dapat_diskon = (total_belanja &gt; 100000) and (punya_member == True)\n
\n
print("Pelanggan dapat diskon:", dapat_diskon)\n
</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
`;

const s1p6 = `
      case 's1-p6':
        return (
          <div className="space-y-8">
            {/* Pertemuan 6 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-3xl font-black text-slate-800 mb-6">1. Percabangan (If / Else)</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Sekarang kita akan membuat program yang bisa <strong>berpikir dan mengambil keputusan</strong>. Ini disebut <em>Control Flow</em> atau struktur percabangan.
              </p>
              
              <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl">
                <h3 className="font-bold text-rose-900 mb-3 text-lg">Struktur Keputusan (If-Elif-Else)</h3>
                <ul className="space-y-2 text-rose-800">
                  <li><strong>if</strong> : "JIKA kondisi ini benar, lakukan A."</li>
                  <li><strong>elif</strong> : "JIKA kondisi pertama salah, TAPI kondisi kedua ini benar, lakukan B." (Singkatan dari Else-If)</li>
                  <li><strong>else</strong> : "JIKA semuanya salah, lakukan C sebagai jalan terakhir."</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl shadow-xl text-white">
              <h3 className="text-xl font-bold mb-4 text-rose-300">💻 Contoh Kode Python</h3>
              <pre className="bg-black/50 p-6 rounded-2xl overflow-x-auto text-green-400 font-mono text-sm leading-relaxed">
                <code>
suhu = 30\n
\n
if suhu &gt; 35:\n
    print("Sangat Panas! Nyalakan AC.")\n
elif suhu &gt; 25:\n
    print("Cuaca Hangat. Nyalakan Kipas Angin.")\n
else:\n
    print("Cuaca Dingin. Pakai Jaket.")\n
\n
# Output yang akan dicetak adalah: "Cuaca Hangat. Nyalakan Kipas Angin."
                </code>
              </pre>
            </div>

            {/* Proyek P6 */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-100 border-2 border-indigo-200 p-8 rounded-3xl mt-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg animate-pulse">
                  🔐
                </div>
                <div>
                  <h3 className="text-2xl font-black text-indigo-900">Proyek: Sistem Validasi Password</h3>
                  <p className="text-indigo-700 font-semibold">Menerapkan Percabangan If-Else</p>
                </div>
              </div>
              <div className="space-y-4 text-indigo-900/80">
                <p><strong>Skenario:</strong> Buat program gerbang login rahasia. Jika password yang dimasukkan adalah <strong>"smkbisa123"</strong>, tampilkan "Akses Diterima". Jika salah, tampilkan "Akses Ditolak!".</p>
                <div className="bg-white/70 p-6 rounded-2xl border border-indigo-200 shadow-sm mt-4">
                  <h4 className="font-bold text-indigo-950 text-lg mb-3 flex items-center gap-2"><span>✅</span> Pembahasan & Solusi</h4>
                  <div className="bg-slate-900 p-4 rounded-xl font-mono text-emerald-300 text-sm">
<pre><code>
password_asli = "smkbisa123"\n
password_input = "admin123"  # Anggap ini yang diketik user\n
\n
if password_input == password_asli:\n
    print("✅ Akses Diterima! Selamat Datang.")\n
else:\n
    print("🚨 Akses Ditolak! Password salah.")\n
</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
`;

content = content.replace(/default:/g, s1p5 + s1p6 + '      default:');
fs.writeFileSync('src/app/dashboard/siswa/materi/[id]/page.tsx', content);
console.log('Added s1-p5 and s1-p6 cases!');
