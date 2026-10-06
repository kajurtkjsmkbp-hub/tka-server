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
12. **Edit Username / ID Login & Reset Password Siswa oleh Guru:**
    - Pada dasbor guru di tab "Data Siswa" (`StudentTable.tsx`), tombol aksi "Edit Siswa" kini memungkinkan guru mengubah **Username / ID Login** siswa dan melakukan **Reset Password**.
    - Dilengkapi fitur validasi keunikan username, toggle lihat/sembunyikan password, serta tombol bantuan preset cepat (`siswa123`, `123456`, atau 6-digit acak) untuk memudahkan guru saat siswa lupa kredensial akun.
    - Pada API backend (`/api/users/[username]`), perubahan username secara otomatis dan atomik memperbarui seluruh riwayat nilai kuis & lab siswa di `data/scores.json` dan aktivitas di `data/ping.json` ke username baru, menjamin progres belajar siswa tetap utuh dan aman.
13. **Penguatan Validasi Virtual Lab S1 (60 Soal):**
    - Memperbaiki celah validasi di mana sebelumnya seluruh tantangan lab Semester 1 (S1-P1 s.d. S1-P12) hanya mengecek `['print']`.
    - Kini seluruh 60 tantangan lab Semester 1 memiliki `checks` keyword spesifik (variabel, operator, syntax fungsi, teks output, dll.) sehingga siswa wajib menyelesaikan soal sesuai instruksi.
14. **Identitas Guru & Notifikasi Selamat Datang (`TeacherHeader.tsx`):**
    - Pada Dasbor Guru (`/dashboard/guru`), ditambahkan kartu identitas profil guru yang sedang aktif login (menampilkan Nama Lengkap, `@username`, badge Pengajar, status online).
    - Dilengkapi banner notifikasi interaktif "Selamat Datang, [Nama Guru]!" dengan tanggal sesi aktif dan tombol tutup, serta tombol keluar (logout) yang aman dan bersih.
15. **Sistem Multi-Guru & Pembagian Kelas Terintegrasi (Multi-Teacher & Multi-Class Architecture):**
    - Mendukung banyak guru (hingga 10+ guru) di mana masing-masing guru dapat mengampu kelas yang berbeda-beda (misal: Guru A mengajar X TE 3 dan X TE 4). Dikonfigurasi dinamis melalui menu "Manajemen Guru & Pembagian Kelas".
    - Pada halaman pendaftaran siswa (`/`), tersedia pilihan Guru Pengampu dan dropdown Kelas yang otomatis menyesuaikan kelas yang diajar oleh guru yang dipilih.
    - Dasbor Guru (`/dashboard/guru`) dan Buku Nilai (`/dashboard/guru/raport`) secara otomatis menyaring data siswa, 4 kartu statistik (total siswa, siswa aktif, rata-rata kelas), filter rombel, dan ekspor PDF khusus untuk kelas yang diampu oleh guru yang sedang login.
    - Dasbor Siswa (`/dashboard/siswa`) secara otomatis menampilkan identitas Guru Pengampu yang membimbing kelas siswa tersebut.
    - Guru juga dapat mengubah kelas dan memindahkan penugasan Guru Pengampu siswa sewaktu-waktu melalui modal edit siswa di dasbor guru.
16. **Leaderboard Eksklusif Per-Kelas & Top 3 Saja (`/dashboard/leaderboard`):**
    - Papan peringkat (`Hall of Fame`) dipisah secara ketat per rombel kelas, tidak lagi digabung lintas kelas sekolah.
    - **Siswa**: Otomatis terkunci dan hanya dapat melihat peringkat kelasnya sendiri demi menjaga kerahasiaan nilai antarkelas.
    - **Guru**: Disediakan pemilih kelas yang otomatis menyesuaikan kelas-kelas yang diajar guru bersangkutan (misal: Guru Andi hanya melihat pilihan X TE 3 dan X TE 4).
    - **Hanya Peringkat 1, 2, dan 3 (Top 3)**: Menampilkan podium juara 1 (Emas 👑), juara 2 (Perak 🥈), dan juara 3 (Perunggu 🥉). Seluruh daftar peringkat 4 ke bawah ditiadakan untuk kenyamanan dan privasi belajar siswa.
17. **Proteksi Mutlak Akun Super Administrator (`admin` / Adiningtyas Yuli Purwanto):**
    - Akun login `admin` (Adiningtyas Yuli Purwanto, S.Kom) diberi perlindungan mutlak baik di frontend maupun backend.
    - Pada tabel Manajemen Guru (`TeacherManager.tsx`), tombol "Nonaktifkan" dan "Hapus" ditiadakan untuk akun `admin`, digantikan dengan badge `👑 Super Admin (Permanen)` dan `🔒 Dilindungi`.
    - Pada API backend (`/api/users/[username]`), setiap upaya menonaktifkan (`isActive: false`) atau menghapus (`DELETE`) akun `admin` ditolak dengan status HTTP 403 Forbidden. Akun ini tidak dapat dinonaktifkan atau dihapus oleh guru lain.
18. **Privasi Nilai Siswa & Penggantian Raport Menjadi Status Progres Pembelajaran:**
    - Seluruh tampilan angka nilai kuantitatif (skor kuis, poin lab, dan nilai raport semester) di sisi akun siswa telah **ditiadakan/dihilangkan**.
    - Siswa diarahkan untuk berkoordinasi dan mengecek nilai angka resmi secara langsung kepada Guru Pengampu masing-masing (banner nama guru pengampu ditampilkan jelas).
    - Pada Beranda Siswa (`/dashboard/siswa`) dan Halaman Progres (`/dashboard/siswa/raport`), tampilan angka digantikan dengan **Status Ketuntasan Kualitatif**:
      - **Status Modul**: `✅ Tuntas` / `⏳ Belum Tuntas`
      - **Soal Kuis**: `✅ Tuntas` (jika ≥ KKM 75), `⚠️ Belum Tuntas (Remidi)` (jika < KKM), atau `⏳ Belum Dikerjakan`
      - **Virtual Lab**: `✅ Tuntas (x/x)` atau `⏳ Belum Tuntas (x/x)`
    - Tombol navigasi di dasbor siswa disesuaikan menjadi **"📋 Progres Belajar"**.
19. **Optimasi Tata Letak Formulir Pendaftaran Siswa (`/`):**
    - Menyusun ulang hierarki input pada form pendaftaran siswa agar lebih estetik dan ergonomis:
      - **Nama Lengkap** berada di atas.
      - **Username / ID Login** dan **Kata Sandi** kini diletakkan berdampingan secara proporsional dalam grid 2 kolom (satu kesatuan kredensial akun).
      - Kotak penugasan sekolah (**Guru Pengampu, Kelas, dan Jurusan**) berada di bawahnya sebagai data akademik pelengkap sebelum tombol konfirmasi pendaftaran.
20. **Pemberitahuan Bantuan Lupa Akun Login & Kata Sandi (`/`):**
    - Di formulir pendaftaran siswa maupun formulir masuk/login, disematkan informasi bantuan praktis:
      > *"Jika siswa lupa dengan login dan kata sandi, silakan hubungi: **Adiningtyas Yuli Purwanto, S.Kom**"*
    - Memudahkan siswa saat mengalami kendala lupa password atau lupa ID login sehingga dapat langsung menghubungi Super Admin.

## 🔄 Mekanisme Transisi Nilai Eksisting (Pembaruan Bank Soal & KKM 75)
Ketika bank soal dan sistem KKM diperbarui, sistem menangani nilai siswa lama tanpa merusak data:
1. **Siswa dengan Nilai Tuntas (Skor ≥ 75):**
   - Nilai lama di `data/scores.json` tetap utuh 100%.
   - Akses ke modul/pertemuan berikutnya tetap **Terbuka** (status: *Selesai*).
   - Di halaman kuis, sistem langsung menampilkan status lulus/tuntas beserta nilai yang diperoleh. Siswa tidak diwajibkan mengulang.
2. **Siswa dengan Nilai Belum Tuntas (Skor < 75):**
   - Nilai lama tetap tersimpan sebagai histori (`lastScore` / `score`).
   - Modul berikutnya **otomatis terkunci** demi menjaga standar kompetensi KKM 75.
   - Dasbor siswa menampilkan kartu peringatan khusus berstatus **Remidi**.
   - Saat siswa mengklik **"Mulai Remedial"**, sistem otomatis menyajikan bank soal baru (50 butir soal unik) dengan urutan nomor diacak (*shuffle*).
   - Sistem menerapkan prinsip **Best Score** (skor tertinggi diambil) sehingga nilai siswa tidak akan turun jika remidi lebih rendah, dan jika mencapai ≥ 75 modul berikutnya langsung terbuka.
3. **Data Rekap Guru & Raport:**
   - Rekap nilai di portal Guru dan Raport Siswa tetap utuh dan sinkron, tidak ada data nilai yang hilang (*zero data loss*).

## 🛠️ Catatan Khusus
- Server Proxmox LXC harus disetel **"Start at boot: Yes"** pada menu Options agar web otomatis menyala setelah listrik mati.
- File `db.ts` dan migrasi Prisma telah dihapus karena proyek berkomitmen menggunakan JSON Atomic Write demi kelancaran dan kemudahan portabilitas.

## 🛡️ Keamanan Database (Git Ignore)
- File JSON di dalam folder `data/` (seperti `db.json`, `scores.json`, `announcement.json`) **telah dikeluarkan dari pelacakan Git (untracked) dan dimasukkan ke `.gitignore`**. 
- Tujuannya agar saat melakukan `git reset --hard` di server Proxmox, file database *live* tidak akan tertimpa/terhapus oleh database dari repo lokal.

