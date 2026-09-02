# 🧪 Manual Testing Checklist: Halaman Beranda Interaktif (`/`)
## QA Test Plan — Story CREAT-22: Halaman Beranda (Still Landing Page)

**Task ID**: `CREAT-22`\
**Target URL**: `http://localhost:3000/`\
**Tipe Pengujian**: Manual Functional, Responsive, Interaction & Animation QA\
**Standar SOP**: [`docs/sop/06-sop-qa-manual-testing-checklist.md`](file:///d:/2-Project/Gifteria/docs/sop/06-sop-qa-manual-testing-checklist.md)

---

### 📋 Ringkasan Fitur yang Diuji
1. **Hero Section dengan Interactive 3D Sphere Portal & Wordmark Reveal**.
2. **Ultra-Luxury Momentum Smooth Scrolling (Lenis + GSAP Ticker)**.
3. **Section 2: Formulations / Flavors (Pinned GSAP Color Scrub)**.
4. **Section 3: Functional Craftsmanship / Inside (Pinned 4-Step Scrub)**.
5. **Section 4: Story Archive Timeline (Pinned 5-Year Scrub 2021 ➔ 2025)**.
6. **Section 5: Press Marquee & Quotes Ticker**.
7. **Section 6: Where Available / Direct Purchase, Cart Counter & Footer**.

---

## 🔴 1. MUST-HAVE TEST CASES (Fungsionalitas Kritis & Interaksi Utama)
*Kriteria: Jika ada salah satu yang gagal, rilis beranda dinyatakan FAILED / BLOCKER.*

- [ ] **TC-M01: [Hero Interactive] 3D Sphere Lens Mouse Tracking & Dark Iris Reveal**
  - **Langkah**:
    1. Buka `http://localhost:3000/`.
    2. Gerakkan kursor mouse di sekitar hero section.
  - **Expected**:
    - Lensa 3D Sphere mengikuti pergerakan kursor mouse secara mulus.
    - Dark Iris portal membuka pemandangan ke dalam layer formulasi/busana di balik teks bone base.
    - Wordmark teks animatif bereaksi dinamis terhadap posisi lensa.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M02: [Smooth Scroll] Inisialisasi Lenis Momentum Scroll & GSAP Sync**
  - **Langkah**:
    1. Lakukan scroll roda mouse (*mouse wheel*) ke bawah.
  - **Expected**:
    - Perpindahan halaman terasa sangat mulus dengan *exponential momentum ease* tanpa stutter/jank (60 FPS).
    - ScrollTrigger GSAP tersinkronisasi presisi tanpa loncatan visual.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M03: [Pinned Scroll] Section Flavors / Formulations Multi-Step Scrub**
  - **Langkah**:
    1. Scroll hingga memasuki Section Flavors.
  - **Expected**:
    - Section ter-pin (*terkunci pada viewport*).
    - Scroll progress mengubah state produk, warna latar belakang dinamis, dan detail formulasi secara berurutan dengan magnetic snap.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M04: [Pinned Scroll] Section Inside / Craftsmanship (4-Step Scrub)**
  - **Langkah**:
    1. Lanjutkan scroll memasuki Section Inside.
  - **Expected**:
    - Section ter-pin mulus.
    - Tab pil aktif berganti (1 s.d. 4) seiring scroll, menampilkan info spesifikasi bahan & keunggulan secara bertahap.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M05: [Pinned Scroll] Section Story Archive (5-Year Timeline 2021–2025)**
  - **Langkah**:
    1. Scroll memasuki Section Story.
  - **Expected**:
    - Timeline tahun (2021 ➔ 2025) berganti otomatis saat scroll.
    - Kartu narasi dan foto figur berganti secara sinematik.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M06: [E-Commerce Interaction] Tombol Add to Cart & Counter Navbar**
  - **Langkah**:
    1. Scroll ke Section Where Available / Product Card.
    2. Klik tombol **"Add to Cart"** pada produk.
  - **Expected**:
    - Counter keranjang pada `HeroNavbar` bertambah secara real-time (`Cart: 1`, `Cart: 2`).
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M07: [Smooth Navigation] Navigasi Tautan Navbar (Programmatic Scroll)**
  - **Langkah**:
    1. Klik salah satu menu navigasi di header (misal: *Formulations*, *Inside*, *Story*, *Stockists*).
  - **Expected**:
    - Layar melakukan *smooth auto-scroll* dengan deselerasi sinematik menuju section target tanpa reload halaman.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

---

## 🟡 2. SHOULD-HAVE TEST CASES (Responsivitas Mobile & Visual Polish)
*Kriteria: Verifikasi kenyamanan pengguna pada berbagai perangkat & resolusi.*

- [ ] **TC-S01: [Mobile Responsive] Tampilan pada Layar HP (375px / iPhone SE)**
  - **Langkah**:
    1. Buka DevTools (F12) ➔ Pilih Responsive Mobile Mode (375px).
    2. Scroll halaman dari atas ke bawah.
  - **Expected**:
    - Hero section menyesuaikan ukuran layar tanpa horizontal overflow.
    - Pinned sections tetap nyaman dibaca pada layar vertikal.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-S02: [Infinite Marquee] Ticker Press & Testimonial Teks Berjalan**
  - **Langkah**:
    1. Amati Section Press.
  - **Expected**:
    - Teks ulasan media/kurator bergerak horizontal secara terus menerus (*infinite loop*) dengan kecepatan yang stabil.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-S03: [Footer Navigation] Tautan Eksternal & Copyright**
  - **Langkah**:
    1. Scroll ke bagian paling bawah (Landing Footer).
    2. Periksa navigasi dan tombol interaktif footer.
  - **Expected**:
    - Seluruh link aktif dan footer tampil rapi.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

---

## ✍️ 3. Verifikasi & Sign-Off QA

- **Ringkasan Hasil QA**:
  - `[ ]` Seluruh 7 Must-Have Test Cases Lolos Uji (100% Passed).
  - `[ ]` Seluruh 3 Should-Have Test Cases Lolos Uji.
- **Catatan / Evaluasi Tambahan**: __________________________________
- **Status Keputusan**: `[  ] READY TO MERGE TO DEVELOP` / `[  ] REVISION NEEDED`
- **Tester / QA Lead**: _______________________ (Tanggal: _____________)
