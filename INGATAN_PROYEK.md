# 🧠 Ingatan Proyek: LMS KKA (Koding & Kecerdasan Artifisial)

Dokumen ini berfungsi sebagai memori permanen proyek untuk AI dan Pengembang. Berisi informasi teknis, arsitektur, dan riwayat fitur yang telah diimplementasikan agar konteks pengembangan tidak hilang.

## 📌 Informasi Dasar
- **Nama Proyek:** LMS KKA (Koding & Kecerdasan Artifisial)
- **Desainer/Kreator Asli:** Adiningtyas Yuli Purwanto, S.Kom
- **Tech Stack:** Next.js 16 (App Router, Turbopack), React, TypeScript, Tailwind CSS.
- **Server Deployment:** Proxmox LXC (Ubuntu/Debian) menggunakan **PM2** untuk manajemen proses 24/7.

## 🗄️ Arsitektur Database (Sangat Penting)
- **Sistem Database:** Flat JSON (`data/db.json` dan `data/scores.json`).
- **Mekanisme Keamanan Tulis (Write Safety):** 
  Untuk mencegah file JSON korup saat banyak siswa ujian bersamaan atau saat server mati mendadak (mati listrik), sistem menggunakan mekanisme **Atomic Renames** pada Node.js. 
  Data pertama-tama ditulis ke file *sementara* (`.tmp`), kemudian ditimpa ke file utama menggunakan `fs.renameSync()`. Mekanisme ini menjamin integritas data (tidak perlu pindah ke SQLite/Prisma).

## 🚀 Deployment & Pembaruan
- Proyek ini terhubung dengan GitHub (`kajurtkjsmkbp-hub/tka-server`).
- **Otomatisasi Push:** Akses Git sudah dikonfigurasi menggunakan GitHub Personal Access Token (PAT) sehingga AI atau sistem dapat melakukan `git push` tanpa terhalang *prompt* otentikasi.
- **Prosedur Pembaruan Standar di Proxmox (Wajib):**
  Jika ada pembaruan dari GitHub, gunakan 4 baris perintah ini di console Proxmox:
  ```bash
  git fetch --all
  git reset --hard origin/main
  npm run build
  pm2 restart lms-kka
  ```

## ✨ Riwayat Fitur Kunci yang Telah Diimplementasikan
1. **Responsivitas Mobile (Mobile-Friendly):** 
   - Dasbor Siswa (Statistik Hero stack ke bawah di layar HP).
   - Banner Pengumuman (Teks tidak memotong tombol silang di HP).
   - Tabel Nilai & Tabel Siswa (Bisa digeser ke samping / `overflow-x-auto`).
2. **Keamanan Data JSON:** Implementasi *Atomic Write* di seluruh *API Route* (`scores`, `users`, `announcement`).
3. **Penyesuaian Next.js 16:** Memperbaiki *TypeScript Strict Mode* di mana `params` pada rute dinamis (*Dynamic Routes*) diwajibkan berupa `Promise`.
4. **Catatan Kaki (Footer):** Penambahan footer kustom "Design by Adiningtyas Yuli Purwanto, S.Kom" di halaman Login, Dasbor Guru, dan Dasbor Siswa.
5. **Manajemen Guru (CRUD):** 
   - Fitur baru di Dasbor Guru (`TeacherManager.tsx`).
   - Memungkinkan penambahan guru baru, edit nama, mengaktifkan/menonaktifkan (suspend) akses login guru, dan hapus data guru.
6. **Panduan Proxmox:** Tersedia file `PANDUAN_INSTALASI_PROXMOX.md` sebagai panduan mandiri untuk instalasi server dari nol.
7. **Rekap Nilai Siswa SMT 1 & SMT 2:** Penambahan kolom khusus "Raport SMT 1", "Raport SMT 2", dan "Nilai Akhir" pada tabel Rekap Nilai dasbor Guru.
8. **Sinkronisasi Algoritma Kalkulasi Nilai:** Sinkronisasi rumus perhitungan nilai pada tabel Guru agar selaras 100% dengan Raport Siswa (rata-rata 50% Latihan + 50% Virtual Lab). Sebelumnya terdapat bug di mana Guru hanya melihat rata-rata Latihan saja.
9. **Standarisasi Bank Soal Resmi (1.200 Soal Unik):**
   - Mengaudit dan merekonstruksi total 24 modul (Semester 1 P1-P12 dan Semester 2 P1-P12).
   - Setiap pertemuan memiliki tepat 50 soal pilihan ganda yang 100% UNIK dan berbeda (tanpa duplikasi template), mencakup materi koding Python, rekayasa Machine Learning, Deep Learning, NLP, AIoT, dan Deployment AI.
10. **Sistem Remedial & Pembatasan Ketuntasan KKM (Batas 75):**
    - Kriteria Ketuntasan Minimal (KKM) ditetapkan bernilai **75**.
    - Siswa yang memperoleh skor < 75 **tidak diperbolehkan melangkah ke pertemuan berikutnya**. Modul selanjutnya otomatis berstatus 'Terkunci' sampai KKM tercapai.
    - Pada dasbor siswa, modul yang belum tuntas KKM menampilkan kartu peringatan khusus berstatus 'Remidi' dengan animasi dan instruksi untuk mempelajari ulang materi.
    - Halaman kuis menyediakan tombol **"Mulai Remedial"** dan **"Pelajari Ulang Materi"**. Saat mode remidi diaktifkan, 50 soal diacak urutannya (*shuffle*) agar siswa tidak menghafal letak jawaban.
    - API `/api/scores` menyimpan riwayat jumlah percobaan (`attemptCount`), histori skor terakhir (`lastScore`), status remidi (`isRemidi`), dan secara aman mempertahankan nilai tertinggi siswa. Siswa yang sudah tuntas (>= 75) tidak dapat mengambil remidi.
11. **Portal Bank Soal & Kunci Jawaban Guru (`/dashboard/guru/soal-kuis`):**
    - Fitur khusus dasbor guru untuk memantau dan memverifikasi seluruh 1.200 butir soal kuis (Semester 1 P1-P12 dan Semester 2 P1-P12).
    - Memungkinkan guru memilih semester dan pertemuan dengan cepat melalui panel interaktif.
    - Menampilkan nomor soal, pertanyaan, 4 pilihan opsi (A, B, C, D), penyorotan visual kunci jawaban yang benar, serta kotak pembahasan pedagogis dan analisis ilmiah untuk setiap soal.
    - Dilengkapi filter pencarian teks/keyword instan, navigator nomor soal (1 s.d. 50), toggle buka/tutup pembahasan, dan tombol cetak/ekspor PDF.

## 🛠️ Catatan Khusus
- Server Proxmox LXC harus disetel **"Start at boot: Yes"** pada menu Options agar web otomatis menyala setelah listrik mati.
- File `db.ts` dan migrasi Prisma telah dihapus karena proyek berkomitmen menggunakan JSON Atomic Write demi kelancaran dan kemudahan portabilitas.

## ??? Keamanan Database (Git Ignore)
- File JSON di dalam folder `data/` (seperti `db.json`, `scores.json`, `announcement.json`) **telah dikeluarkan dari pelacakan Git (untracked) dan dimasukkan ke `.gitignore`**. 
- Tujuannya agar saat melakukan `git reset --hard` di server Proxmox, file database *live* tidak akan tertimpa/terhapus oleh database dari repo lokal.
