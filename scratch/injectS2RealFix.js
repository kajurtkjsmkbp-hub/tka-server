const fs = require('fs');
let content = fs.readFileSync('src/app/dashboard/siswa/materi/[id]/page.tsx', 'utf8');

const s2p1 = `
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
                <p><strong>Skenario:</strong> Jauh sebelum ChatGPT ada, AI pertama bernama ELIZA mengelabui orang dengan meniru gaya bicara psikolog. ELIZA tidak cerdas, ia hanya menggunakan <code>if-else</code> dan menangkap kata kunci.</p>
                <div className="bg-slate-900 p-4 rounded-xl font-mono text-emerald-300 text-sm overflow-x-auto">
<pre><code>
print("Halo, saya Robot Psikolog. Ceritakan masalahmu!")\n
while True:\n
    pesan = input("Kamu: ").lower()\n
    if "sedih" in pesan:\n
        print("Robot: Mengapa kamu merasa sedih?")\n
    elif "marah" in pesan:\n
        print("Robot: Tarik napas dalam-dalam. Apa yang membuatmu marah?")\n
    elif "keluar" in pesan:\n
        print("Robot: Sampai jumpa!")\n
        break\n
    else:\n
        print("Robot: Hmm, ceritakan lebih lanjut tentang itu.")\n
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
                <p><strong>Skenario:</strong> Buat program di mana komputer akan memberikan jawaban acak. Pengguna harus menebak apakah jawaban tersebut hasil ketikan manusia atau mesin acak.</p>
                <div className="bg-slate-900 p-4 rounded-xl font-mono text-amber-300 text-sm overflow-x-auto">
<pre><code>
import random\n
\n
jawaban_mesin = ["Tentu saja!", "Saya tidak tahu.", "Bisa diulangi?", "Error 404"]\n
\n
print("=== UJIAN TURING ===")\n
print("Tebak siapa yang membalas pesanamu!\\n")\n
\n
pertanyaan = input("Tanya sesuatu: ")\n
balasan = random.choice(jawaban_mesin)\n
\n
print("\\nBalasan Misterius:", balasan)\n
tebakan = input("Apakah ini Mesin (M) atau Manusia (H)? ")\n
\n
if tebakan.upper() == "M":\n
    print("Tepat! Kamu tidak tertipu oleh mesin.")\n
else:\n
    print("Salah! Kamu baru saja ditipu oleh mesin sederhana.")\n
</code></pre>
                </div>
              </div>
            </div>

          </div>
      )
    },
`;

const s2p2 = `
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
                <p><strong>Skenario:</strong> Buat filter spam email menggunakan cara tradisional. Anda harus menulis manual kata kunci apa saja yang dianggap spam. Semakin pintar *spammer*, semakin panjang kode Anda (tidak efisien).</p>
                <div className="bg-slate-900 p-4 rounded-xl font-mono text-emerald-300 text-sm overflow-x-auto">
<pre><code>
email = "Dapatkan hadiah HADIAH uang tunai sekarang juga! klik link ini."\n
\n
# Cara Tradisional: Programmer mendikte kata kunci spam\n
kata_spam = ["hadiah", "uang tunai", "gratis", "klik link"]\n
status = "Aman"\n
\n
for kata in kata_spam:\n
    if kata in email.lower():\n
        status = "SPAM DETECTED!"\n
        break\n
\n
print("Status Email:", status)\n
# Kekurangan: Bagaimana jika Spammer menulis 'h4d!ah'? Aturan ini akan gagal!\n
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
                <p><strong>Skenario:</strong> Agar mesin bisa belajar membedakan kalimat Spam dan Non-Spam, mesin tidak bisa membaca teks secara langsung. Teks harus diubah menjadi angka (Fitur). Hitung panjang karakter dan jumlah huruf besar dari kalimat.</p>
                <div className="bg-slate-900 p-4 rounded-xl font-mono text-emerald-300 text-sm overflow-x-auto">
<pre><code>
kalimat = "SELAMAT!!! ANDA MENANG MOBIL!"\n
\n
# Ekstraksi Fitur 1: Panjang Kalimat\n
panjang = len(kalimat)\n
\n
# Ekstraksi Fitur 2: Hitung Huruf Besar (Spam biasanya banyak huruf besar)\n
jumlah_kapital = sum(1 for huruf in kalimat if huruf.isupper())\n
\n
print("Data Kalimat diubah menjadi format angka untuk ML:")\n
print("Fitur [Panjang, Jml_Kapital] =&gt; [", panjang, ",", jumlah_kapital, "]")\n
# Angka [29, 23] ini yang nantinya disuapkan ke algoritma ML!\n
</code></pre>
                </div>
              </div>
            </div>

          </div>
      )
    },
`;

const replaceTarget = `"default": {`;
content = content.replace(replaceTarget, s2p1 + s2p2 + '\n  "default": {');
fs.writeFileSync('src/app/dashboard/siswa/materi/[id]/page.tsx', content);
console.log('Successfully injected s2-p1 and s2-p2!');
