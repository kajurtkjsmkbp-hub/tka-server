const fs = require('fs');
let content = fs.readFileSync('src/app/dashboard/siswa/materi/[id]/page.tsx', 'utf8');

const s2p3 = `
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
                <p><strong>Skenario:</strong> Daripada memproses gambar yang rumit, kita akan mensimulasikan bagaimana model klasifikasi sederhana (Decision Tree) membedakan hewan berdasarkan ciri fisiknya.</p>
                <div className="bg-slate-900 p-4 rounded-xl font-mono text-emerald-300 text-sm overflow-x-auto">
<pre><code>
def klasifikasi_hewan(suara, suka_air):\n
    if suara == "meong":\n
        return "Kucing"\n
    elif suara == "guk":\n
        return "Anjing"\n
    else:\n
        if suka_air == "ya":\n
            return "Anjing (Mungkin Golden Retriever)"\n
        else:\n
            return "Tidak Teridentifikasi"\n
\n
print("=== MESIN KLASIFIKASI HEWAN ===")\n
suara_input = input("Suara hewan (meong/guk/lainnya): ").lower()\n
air_input = input("Apakah suka air? (ya/tidak): ").lower()\n
\n
hasil = klasifikasi_hewan(suara_input, air_input)\n
print("\\nHasil Klasifikasi: Ini adalah", hasil)\n
</code></pre>
                </div>
              </div>
            </div>

            {/* VIRTUAL LAB */}
            <div className="mt-12 bg-slate-900 rounded-3xl overflow-hidden border-2 border-slate-700 shadow-2xl">
              <div className="bg-slate-800 px-6 py-4 flex items-center justify-between border-b border-slate-700">
                <h4 className="font-bold text-white flex items-center gap-2">
                  <span className="text-xl">💻</span> Virtual Lab Python
                </h4>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
              </div>
              <div className="p-4 bg-slate-900">
                <p className="text-sm text-slate-400 mb-4">Salin kode dari proyek di atas, tempel (Paste) ke dalam editor di bawah ini, lalu klik tombol ▶️ (Run) untuk melihat hasilnya!</p>
                <iframe src="https://trinket.io/embed/python3" width="100%" height="400" frameBorder="0" className="rounded-xl border border-slate-700"></iframe>
              </div>
            </div>

          </div>
      )
    },
`;

const s2p4 = `
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
                <p><strong>Skenario:</strong> Pada dasarnya, Regresi Linear hanyalah mencari rumus kemiringan garis matematika (<code>Y = m * X + C</code>). Mari kita simulasikan prediksi harga tanah berdasarkan luas tanah.</p>
                <div className="bg-slate-900 p-4 rounded-xl font-mono text-amber-300 text-sm overflow-x-auto">
<pre><code>
print("=== PREDIKSI HARGA TANAH (REGRESI) ===")\n
\n
# Di Machine Learning, Nilai M (Kemiringan) dan C (Titik Awal) dicari otomatis oleh komputer.\n
# Dalam simulasi ini, kita anggap komputer sudah menemukan nilainya:\n
# Harga = 2 Juta * LuasTanah + 10 Juta\n
\n
M = 2000000\n
C = 10000000\n
\n
luas = float(input("Masukkan luas tanah (meter persegi): "))\n
\n
# Melakukan prediksi regresi\n
prediksi_harga = (M * luas) + C\n
\n
# Format angka agar lebih rapi\n
print(f"\\nPrediksi Harga Tanah: Rp {prediksi_harga:,.0f}")\n
</code></pre>
                </div>
              </div>
            </div>

            {/* VIRTUAL LAB */}
            <div className="mt-12 bg-slate-900 rounded-3xl overflow-hidden border-2 border-slate-700 shadow-2xl">
              <div className="bg-slate-800 px-6 py-4 flex items-center justify-between border-b border-slate-700">
                <h4 className="font-bold text-white flex items-center gap-2">
                  <span className="text-xl">💻</span> Virtual Lab Python
                </h4>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
              </div>
              <div className="p-4 bg-slate-900">
                <p className="text-sm text-slate-400 mb-4">Salin kode dari proyek di atas, tempel (Paste) ke dalam editor di bawah ini, lalu klik tombol ▶️ (Run) untuk melihat hasilnya!</p>
                <iframe src="https://trinket.io/embed/python3" width="100%" height="400" frameBorder="0" className="rounded-xl border border-slate-700"></iframe>
              </div>
            </div>

          </div>
      )
    },
`;

const replaceTarget = `"default": {`;
content = content.replace(replaceTarget, s2p3 + s2p4 + '\\n    "default": {');
fs.writeFileSync('src/app/dashboard/siswa/materi/[id]/page.tsx', content);
console.log('Successfully injected s2-p3 and s2-p4!');
