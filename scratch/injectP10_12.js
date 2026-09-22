const fs = require('fs');
let content = fs.readFileSync('src/app/dashboard/siswa/materi/[id]/page.tsx', 'utf8');

const s1p10 = `
      case 's1-p10':
        return (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-3xl font-black text-slate-800 mb-6">1. Penanganan Error (Debugging)</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Tidak ada programmer yang kodenya langsung benar 100%. Error atau <em>Bug</em> adalah hal biasa. Yang membedakan programmer hebat adalah kemampuannya dalam melakukan <strong>Debugging</strong> (mencari dan memperbaiki error).
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 border border-red-100 p-6 rounded-2xl">
                  <h3 className="font-bold text-red-900 mb-3 text-lg">⚠️ Jenis-jenis Error</h3>
                  <ul className="space-y-2 text-red-800 text-sm">
                    <li><strong>Syntax Error:</strong> Salah ketik (misal lupa tanda kutip). Program tidak bisa dijalankan sama sekali.</li>
                    <li><strong>Runtime Error:</strong> Program berjalan, lalu tiba-tiba crash (misal membagi angka dengan nol).</li>
                    <li><strong>Logic Error:</strong> Program jalan, tidak ada pesan error, tapi hasilnya salah (rumusnya yang keliru).</li>
                  </ul>
                </div>
                
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl">
                  <h3 className="font-bold text-emerald-900 mb-3 text-lg">🛡️ Try & Except</h3>
                  <p className="text-emerald-800 text-sm mb-2">Kita bisa memakai pelindung (Try-Except) agar program tidak crash jika terjadi Runtime Error.</p>
                  <pre className="bg-white p-3 rounded-lg text-xs font-mono text-slate-700">
try:\n
    angka = int(input("Masukkan angka: "))\n
except ValueError:\n
    print("Yang dimasukkan bukan angka!")
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-100 border-2 border-indigo-200 p-8 rounded-3xl mt-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg animate-pulse">
                  🕵️
                </div>
                <div>
                  <h3 className="text-2xl font-black text-indigo-900">Proyek: Mesin Pembagi Kebahagiaan</h3>
                  <p className="text-indigo-700 font-semibold">Berburu Bug & Menangani Error Pembagian</p>
                </div>
              </div>
              <div className="space-y-4 text-indigo-900/80">
                <p><strong>Skenario:</strong> Buat program untuk membagi rata sejumlah permen ke anak-anak. Pastikan program tidak *crash* jika anak-anaknya 0 (karena membagi dengan nol itu mustahil) atau jika pengguna mengetik huruf, bukan angka.</p>
                <div className="bg-white/70 p-6 rounded-2xl border border-indigo-200 shadow-sm mt-4">
                  <h4 className="font-bold text-indigo-950 text-lg mb-3 flex items-center gap-2"><span>✅</span> Solusi Python (Try-Except)</h4>
                  <div className="bg-slate-900 p-4 rounded-xl font-mono text-emerald-300 text-sm">
<pre><code>
try:\n
    jumlah_permen = int(input("Berapa banyak permen? "))\n
    jumlah_anak = int(input("Berapa anak? "))\n
    \n
    per_anak = jumlah_permen / jumlah_anak\n
    print("Setiap anak mendapat", per_anak, "permen.")\n
\n
except ZeroDivisionError:\n
    print("Error: Tidak bisa membagi dengan nol anak!")\n
except ValueError:\n
    print("Error: Harap ketikkan angka, bukan teks!")\n
</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
`;

const s1p11 = `
      case 's1-p11':
        return (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-3xl font-black text-slate-800 mb-6">1. Studi Kasus Algoritma Terapan</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Kita telah mempelajari variabel, perulangan, percabangan, dan *array*. Sekarang saatnya menggunakan semuanya secara bersamaan untuk memecahkan <strong>kasus di dunia nyata</strong>.
              </p>
              
              <div className="bg-sky-50 border border-sky-100 p-6 rounded-2xl">
                <h3 className="font-bold text-sky-900 mb-3 text-lg">🔍 Pencarian (Searching)</h3>
                <p className="text-sky-800 text-sm mb-4">Bagaimana cara komputer mencari nama Anda di kontak yang berisi 10.000 nama? Konsep paling dasar adalah <em>Linear Search</em> (mencari satu per satu dari atas ke bawah).</p>
                <pre className="bg-white p-4 rounded-lg text-sm font-mono text-slate-700 overflow-x-auto">
data_absen = ["Andi", "Budi", "Citra"]\n
nama_dicari = "Citra"\n
\n
for nama in data_absen:\n
    if nama == nama_dicari:\n
        print("Siswa ditemukan!")\n
        break # Hentikan pencarian
                </pre>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-100 border-2 border-indigo-200 p-8 rounded-3xl mt-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg animate-pulse">
                  📚
                </div>
                <div>
                  <h3 className="text-2xl font-black text-indigo-900">Proyek: Mesin Pencari Buku Perpustakaan</h3>
                  <p className="text-indigo-700 font-semibold">Menggabungkan List, Looping, dan If-Else</p>
                </div>
              </div>
              <div className="space-y-4 text-indigo-900/80">
                <p><strong>Skenario:</strong> Buat program di perpustakaan sekolah. Pustakawan akan mengetikkan judul buku. Jika buku ada di dalam list rak buku, maka program mencetak "Buku Tersedia". Jika sampai rak terakhir tidak ditemukan, cetak "Buku Habis".</p>
                <div className="bg-white/70 p-6 rounded-2xl border border-indigo-200 shadow-sm mt-4">
                  <h4 className="font-bold text-indigo-950 text-lg mb-3 flex items-center gap-2"><span>✅</span> Solusi Python (Linear Search)</h4>
                  <div className="bg-slate-900 p-4 rounded-xl font-mono text-emerald-300 text-sm">
<pre><code>
rak_buku = ["Buku Sejarah", "Buku Matematika", "Buku Fisika"]\n
buku_dicari = "Buku Matematika"\n
ketemu = False\n
\n
for buku in rak_buku:\n
    if buku == buku_dicari:\n
        ketemu = True\n
        break\n
\n
if ketemu:\n
    print("Buku", buku_dicari, "TERSEDIA di rak.")\n
else:\n
    print("Maaf, buku", buku_dicari, "TIDAK DITEMUKAN.")\n
</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
`;

const s1p12 = `
      case 's1-p12':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-8 rounded-3xl shadow-xl border border-slate-800 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl">🎓</div>
              <h2 className="text-3xl font-black text-sky-400 mb-4">Ujian Akhir Semester 1</h2>
              <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">
                Selamat! Anda telah tiba di modul puncak (Pertemuan 12). Anda telah belajar fondasi Python mulai dari Variabel, Perulangan, Percabangan, Fungsi, List, hingga Penanganan Error.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-100 border-2 border-indigo-300 p-8 rounded-3xl mt-12 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-fuchsia-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl shadow-fuchsia-200 animate-pulse">
                  🚀
                </div>
                <div>
                  <h3 className="text-2xl font-black text-indigo-900">Final Projek: Kalkulator Pintar Interaktif</h3>
                  <p className="text-indigo-700 font-semibold text-lg">Membangun Aplikasi Python Utuh</p>
                </div>
              </div>
              <div className="space-y-4 text-indigo-900/80">
                <p className="text-lg"><strong>Misi Anda:</strong> Anda harus menggabungkan seluruh ilmu dari Pertemuan 1 - 11 untuk membangun sebuah aplikasi Kalkulator yang terus menyala (menggunakan <code>While</code> loop), memiliki menu, dan aman dari error.</p>
                
                <div className="bg-white/80 p-6 rounded-2xl border border-indigo-200 shadow-sm mt-4">
                  <h4 className="font-bold text-indigo-950 text-xl mb-4 flex items-center gap-2"><span>🌟</span> Blueprint (Cetak Biru) Aplikasi</h4>
                  <ul className="list-disc pl-5 space-y-2 font-medium text-indigo-900">
                    <li>Buat fungsi modular untuk <code>tambah()</code>, <code>kurang()</code>, <code>kali()</code>, <code>bagi()</code>.</li>
                    <li>Gunakan <code>While True:</code> agar menu kalkulator muncul berulang-ulang sampai pengguna mengetik angka '5' untuk keluar.</li>
                    <li>Gunakan <code>try-except</code> agar saat pengguna mengetik angka sembarangan, program tidak *crash*.</li>
                  </ul>
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl shadow-xl mt-6">
                  <h4 className="font-bold text-sky-300 text-lg mb-4 flex items-center gap-2"><span>👨‍💻</span> Kode Solusi Akhir (Kalkulator Pintar)</h4>
                  <div className="font-mono text-emerald-400 text-xs sm:text-sm overflow-x-auto leading-relaxed">
<pre><code>
def tambah(x, y): return x + y\n
def kurang(x, y): return x - y\n
def bagi(x, y):\n
    if y == 0: return "Error: Dibagi nol!"\n
    return x / y\n
\n
while True:\n
    print("\\n=== KALKULATOR PINTAR ===")\n
    print("1. Tambah   2. Kurang")\n
    print("3. Bagi     4. Keluar")\n
    \n
    pilihan = input("Pilih menu (1-4): ")\n
    \n
    if pilihan == '4':\n
        print("Terima kasih sudah menggunakan kalkulator!")\n
        break\n
        \n
    if pilihan in ('1', '2', '3'):\n
        try:\n
            num1 = float(input("Angka pertama: "))\n
            num2 = float(input("Angka kedua: "))\n
            \n
            if pilihan == '1':\n
                print("Hasil:", tambah(num1, num2))\n
            elif pilihan == '2':\n
                print("Hasil:", kurang(num1, num2))\n
            elif pilihan == '3':\n
                print("Hasil:", bagi(num1, num2))\n
        except ValueError:\n
            print("❌ Input tidak valid! Harap masukkan angka.")\n
    else:\n
        print("❌ Menu tidak dikenali.")\n
</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
`;

content = content.replace(/default:/g, s1p10 + s1p11 + s1p12 + '      default:');
fs.writeFileSync('src/app/dashboard/siswa/materi/[id]/page.tsx', content);
console.log('Added s1-p10, p11, p12!');
