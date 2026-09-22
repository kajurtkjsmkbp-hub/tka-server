# INGATAN PROYEK - LMS KKA (Koding dan Kecerdasan Artifisial)

## 1. Ikhtisar Proyek
- **Deskripsi:** Sistem Manajemen Pembelajaran (LMS) modern untuk mata pelajaran "Koding dan Kecerdasan Artifisial" (KKA) untuk siswa Sekolah Menengah Kejuruan (SMK).
- **Tech Stack:** Next.js 16.3.5 (App Router, Turbopack), React, Tailwind CSS, TypeScript.
- **Autentikasi:** Menggunakan `localStorage` (Sistem satu login: peran Guru dan Siswa dibedakan otomatis melalui parameter `username`).

## 2. Fitur Utama
1. **Dasbor Multi-Peran:**
   - **Guru:** Dapat memantau progres siswa, rata-rata kelas, dan melihat nilai siswa secara real-time (`/dashboard/guru/page.tsx`).
   - **Siswa:** Peta jalan pembelajaran interaktif (roadmap) yang menampilkan modul per semester, terbagi ke dalam Pertemuan (P1-P12).
2. **Sistem Gamifikasi & Modul Terkunci:**
   - Pertemuan akan terbuka secara sekuensial (modul selanjutnya terkunci sampai modul sebelumnya diselesaikan dan mendapatkan EXP).
   - Pengumpulan Poin (EXP) didapat melalui Latihan Soal dan Virtual Lab.
3. **Materi & Latihan Soal:**
   - Tersedia materi terstruktur dan Latihan Soal (Pilihan ganda dan interaktif).
   - Semester 1 telah selesai 100% dengan total 50+ latihan soal.
4. **Virtual Lab (Simulasi Python):**
   - Area khusus (`/dashboard/siswa/lab/[id]/page.tsx`) tempat siswa menulis dan menjalankan kode Python secara simulasi (frontend).
   - Menggunakan sistem tantangan (*challenges*) yang divalidasi dengan pencocokan _string/regex_.
   - **Fitur Kunci Jawaban:** Siswa dapat melihat bocoran jawaban dengan penalti pengurangan EXP.

## 3. Status Saat Ini
- **Semester 1:** Telah terisi penuh (Pertemuan 1 sampai 12).
- **Semester 2:**
  - Pertemuan 1 - 4 (Materi sudah diisi, bertema Pengantar AI, Machine Learning, dan Proyek AI).
  - **Virtual Lab S2-P1 & S2-P2:** Masing-masing sudah dilengkapi 5 soal berbobot (Sejarah AI, Konsep IF, Rule-Based, List, Dictionary, Kalkulasi Fitur ML).
- **Backend/API:** `src/app/api/scores/route.ts` berjalan baik untuk menyimpan log poin Siswa.

## 4. Pelajaran Teknis & Aturan Koding yang Harus Diingat
1. **Aturan Next.js / Turbopack Strictness:**
   - Saat menyisipkan kode, sangat rawan _syntax error_ khususnya terkait karakter kutip (backticks), apostrof, tanda kutip (quotes), dan JSX String Interpolation (seperti `${variable}`).
   - *Solusi/Aturan:* Gunakan `replace_file_content` secara akurat atau modifikasi variabel dengan penggabungan *string literal* (misal: `"string " + variabel` alih-alih templat `` `string ${variabel}` ``) jika menulis langsung via `CodeContent`.
2. **Kecocokan File UI:**
   - Menambahkan menu/tombol harus dicek sinkronisasi *props* komponennya agar build tidak *crash* (contoh: prop `hasLab` pada mapping array materi Dasbor Siswa).
3. **Database Skor/Lab:**
   - API skor mengenali ID yang berakhiran `-lab` atau `-lab-chal[id]` agar Dasbor bisa menjumlahkan seluruh EXP menjadi satu skor total yang menaikkan level siswa.

## 5. Pekerjaan Selanjutnya (Next Steps)
- Melanjutkan penyusunan materi, Latihan Soal, dan *Virtual Lab* untuk sisa pertemuan Semester 2 (Pertemuan 3 hingga 12).
- Pembuatan projek AI akhir (Pertemuan 11 & 12).
- Refinasi UI/UX bilamana ada permintaan lebih lanjut dari pengguna.
