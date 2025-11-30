# ✒️ Chaos & Ink: Jurnal Hampa

<img width="1881" height="852" alt="Screenshot 2025-12-01 035645" src="https://github.com/user-attachments/assets/fc0c2612-e0b3-4461-b5fa-9d750d57c8ab" />
> *"Kita adalah reruntuhan indah yang lupa diperbaiki oleh dunia."*

**Chaos & Ink** adalah sebuah eksperimen web personal (*Personal Website*) yang mengusung tema **Monokrom & Hampa (Void)**. Website ini dirancang sebagai Jurnal Interaktif di mana pengunjung tidak hanya membaca, tetapi juga bisa meninggalkan jejak digital berupa coretan tinta.

Dibangun tanpa framework (Vanilla JS), proyek ini menggabungkan estetika seni sketsa kasar dengan logika pemrograman modern.

🔗 **Live Demo:** [https://wahyusyahbani.github.io/nama-repo-kamu](https://wahyusyahbani.github.io/chaos)
---

## 🌑 Fitur Utama (Manifesto)

### 1. 🖌️ Interactive Drawing Engine (Canvas API)
Fitur unggulan yang mengubah kursor pengguna menjadi pena tinta.
- **Desktop & Mobile Support:** Mendukung input mouse dan sentuhan jari.
- **Physics:** Ketebalan tinta bervariasi berdasarkan kecepatan gerak, menciptakan efek pena asli.
- **Toggle Mode:** Tombol khusus untuk beralih antara *Mode Scroll* dan *Mode Coret*.

### 2. 🕷️ Procedural Generative Background
Latar belakang bukanlah gambar statis, melainkan **Canvas HTML5** yang digambar secara *real-time* oleh algoritma. Garis-garis arsiran (*hatching*) digenerate secara acak setiap kali halaman dimuat atau ukuran layar berubah.

### 3. 📄 Single Page Application (SPA) Logic
Navigasi antar halaman (Mukadimah, Karya, Kanvas, Surat) dilakukan tanpa *reload* browser. Ini memastikan coretan tinta pengguna di layar tidak hilang saat berpindah menu.

### 4. 📩 Anonymous Messaging (Merpati Pos)
Terintegrasi dengan **Formspree** untuk pengiriman pesan anonim secara *serverless*. Pengunjung bisa mengirim pesan layaknya aplikasi NGL tanpa perlu backend database.

### 5. 🎞️ "Hampa" Aesthetic
- Palet warna monokrom (Hitam, Putih, Abu-abu).
- Efek kertas sobek (*Torn Paper*) menggunakan CSS `clip-path`.
- Tipografi bergaya mesin ketik (*Special Elite*) dan tulisan tangan (*Reenie Beanie*).
- Layout galeri "Polaroid Acak" menggunakan CSS Transform.

---

## 🛠️ Teknologi (The Stack)

Project ini dibuat murni menggunakan teknologi dasar web (*Vanilla*) untuk performa maksimal dan kontrol penuh atas animasi.

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

---

## 🚀 Cara Menjalankan (Local Development)

Jika ingin menjalankan project ini di komputer lokal:

1.  **Clone repository ini:**
    ```bash
    git clone [https://github.com/username-kamu/nama-repo.git](https://github.com/username-kamu/nama-repo.git)
    ```
2.  **Buka folder project:**
    ```bash
    cd nama-repo
    ```
3.  **Buka file `index.html`** langsung di browser (Chrome/Edge/Firefox).

> **Catatan:** Fitur pengiriman surat membutuhkan koneksi internet karena menggunakan API Formspree.

---

## ⚙️ Konfigurasi Formspree

Untuk mengaktifkan fitur kirim surat ke email kamu:

1.  Daftar di [Formspree.io](https://formspree.io/).
2.  Buat Form baru dan dapatkan **Endpoint URL** (contoh: `https://formspree.io/f/xnqoykxr`).
3.  Buka `index.html`, cari bagian script paling bawah, dan ganti variabel ini:
    ```javascript
    const FORMSPREE_ENDPOINT = "[https://formspree.io/f/KODE_UNIK_KAMU](https://formspree.io/f/KODE_UNIK_KAMU)";
    ```

  
