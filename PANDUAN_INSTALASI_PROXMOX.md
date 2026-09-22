# Panduan Instalasi LMS KKA di LXC Proxmox

Dokumen ini berisi panduan komprehensif langkah demi langkah dari nol untuk melakukan instalasi dan *deploy* LMS KKA (Koding dan Kecerdasan Artifisial) di dalam *LXC (Linux Container)* pada sistem **Proxmox**.

Panduan ini disusun menggunakan standar server produksi (menggunakan PM2) agar web Anda menyala stabil 24/7 dan otomatis hidup sendiri saat server Proxmox mengalami *restart* atau mati listrik.

---

## Tahap 1: Pembuatan LXC di Proxmox

1. Buka Dasbor (Web GUI) Proxmox Anda.
2. Klik tombol **Create CT** (Create Container) di sudut kanan atas.
3. **General**: Isi *Hostname* (misal: `lms-kka`) dan masukkan *Password* untuk akses root.
4. **Template**: Sangat disarankan memilih **Ubuntu 22.04 LTS** atau **Debian 12**.
5. **Disk**: Berikan alokasi penyimpanan minimal **8 GB**.
6. **CPU**: Alokasikan minimal **1 - 2 Core**.
7. **Memory**: Alokasikan RAM minimal **1024 MB (1 GB)** hingga 2048 MB (2 GB).
8. **Network**: 
   - Pilih *Bridge* (umumnya `vmbr0`).
   - Atur IPv4 ke **DHCP** atau **Static** (Sangat disarankan Static agar IP tidak berubah-ubah, misal `192.168.1.50/24` dengan Gateway router Anda).
9. Selesaikan pembuatan CT. Setelah selesai, klik CT tersebut, klik tombol **Start**, lalu masuk ke menu **Console**.

---

## Tahap 2: Persiapan Sistem & Instalasi Node.js

Di dalam layar hitam **Console** LXC, masuk/login menggunakan *username*: `root` dan password yang Anda buat di Tahap 1. 

Jalankan perintah berikut baris demi baris (tekan Enter setiap selesai satu baris):

```bash
# 1. Update dan Upgrade sistem dasar ke versi terbaru
apt update && apt upgrade -y

# 2. Instal aplikasi Git dan Curl
apt install curl git -y

# 3. Tambahkan Repositori Node.js versi 20 (Versi LTS Paling Stabil)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

# 4. Instal Node.js
apt install nodejs -y

# 5. Instal PM2 (Aplikasi manajer server agar Next.js berjalan 24 jam)
npm install -g pm2
```

---

## Tahap 3: Unduh & Konfigurasi LMS KKA

Masih di dalam Console LXC, jalankan perintah berikut:

```bash
# 1. Pindah ke direktori utama (root) atau folder opt
cd /opt

# 2. Unduh kode LMS KKA dari GitHub
git clone https://github.com/kajurtkjsmkbp-hub/tka-server.git

# 3. Masuk ke dalam folder proyek
cd tka-server

# 4. Instal semua library/dependensi Next.js
npm install

# 5. Build aplikasi (Proses ini mengompres web agar super cepat saat diakses siswa)
# Catatan: Proses ini butuh waktu sekitar 1-3 menit, tunggu hingga selesai.
npm run build
```

---

## Tahap 4: Menjalankan Server secara Permanen (24/7)

Kini aplikasinya sudah siap. Kita akan menjalankannya menggunakan **PM2** agar tidak mati meskipun Anda menutup layar Console.

```bash
# 1. Jalankan aplikasi menggunakan PM2 di Port bawaan (3000)
pm2 start npm --name "lms-kka" -- run start

# 2. Agar aplikasi otomatis menyala saat Proxmox/LXC direstart
pm2 startup
```

> **Catatan Penting:**
> Setelah perintah `pm2 startup`, biasanya akan muncul sebuah instruksi perintah panjang di layar yang diawali dengan `sudo env PATH...`. **Salin (copy) dan jalankan (paste)** perintah tersebut lalu tekan Enter.

```bash
# 3. Simpan konfigurasi PM2
pm2 save
```

---

## 🎉 Selesai! Cara Mengakses LMS

Aplikasi LMS KKA kini sudah *online* secara lokal di jaringan sekolah/server Anda. 

Silakan buka *browser* (Chrome/Firefox) di laptop yang terhubung ke jaringan yang sama dengan server Proxmox, lalu ketikkan IP dari LXC tersebut beserta *port* 3000:
👉 **`http://<IP_LXC_ANDA>:3000`**  
*(Contoh: `http://192.168.1.50:3000`)*

---

### 💡 Pemeliharaan (Maintenance / Update)

Jika di kemudian hari ada pembaruan kode di GitHub, cara untuk memperbaruinya di server Proxmox sangat mudah:

Buka Console LXC, lalu ketik:
```bash
cd /opt/tka-server
git pull origin main
npm run build
pm2 restart lms-kka
```
