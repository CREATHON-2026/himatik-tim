### 📐 Rahasia Ukuran Layar (*Fluid Responsive Sizing*) di Landing Page Bicket

Di landing page Bicket, kita **tidak menggunakan ukuran statis (`px` atau `rem` saja)** karena ukuran statis akan membuat tampilan tampak kekecilan di layar monitor besar (27"-34" 4K) atau berantakan meluap di layar laptop kecil (13"-14") dan HP.

Teknik yang kita gunakan adalah **Modern Fluid Responsive Engine** berbasis **3 Unit Utama**:

---

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🌟 FORMULA UTAMA YANG KITA GUNAKAN:                                         │
│                                                                             │
│   clamp( Batas_Minimum , Nilai_Dinamis_Layar , Batas_Maksimum )             │
│                                                                             │
│   Contoh: clamp( 96px , 18.5vw , 290px )                                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 🔍 3 Komponen Pengukur di Bicket:

#### 1. Fungsi `clamp(MIN, IDEAL_VIEWPORT, MAX)`
* **Fungsi**: Sebagai *rem & gas otomatis*.
* **Cara Kerja**: 
  * Di layar kecil (Mobile), ukuran tidak akan pernah lebih kecil dari nilai **MIN** (`96px`).
  * Di layar sedang (Laptop/Desktop), ukurannya elastis mengikuti nilai **IDEAL** (`18.5vw`).
  * Di layar ultra-lebar (Monitor 4K/Ultrawide), ukurannya terkunci agar tidak membesar berlebihan di nilai **MAX** (`290px`).

#### 2. Unit Viewport: `vw` *(Viewport Width)* & `vh / dvh` *(Viewport Height)*
* **`1vw`** = $1\%$ dari total lebar layar browser pengguna.
* **`1vh` / `1dvh`** = $1\%$ dari tinggi layar (menggunakan `dvh` agar di HP tidak terpotong oleh address bar browser).
* **Di Landing Page Bicket**:
  * **Teks `B I C K E T .`**: `text-[clamp(96px, 18.5vw, 290px)]` $\rightarrow$ Teks otomatis membesar menyapu layar saat jendela browser ditarik melebar.
  * **Aset Diorama**: `w-[clamp(440px, 52vw, 740px)]` $\rightarrow$ Ukuran gambar selalu mengambil $\pm 50\%$ dari lebar layar, tetapi tetap proporsional.

#### 3. Kombinasi `calc()` untuk Margin & Padding
* **Formula**: `pt-[calc(64px + clamp(6px, 1.5vh, 16px))]`
* **Tujuan**: Menghitung tinggi Navbar tetap ($64\text{px}$) ditambah celah dinamis ($1.5\text{vh}$), sehingga isi konten di bawah Navbar tidak akan pernah bertabrakan di resolusi layar berapapun.

---

### 📊 Perbandingan Singkat:

| Tipe Unit | Karakteristik | Masalah Jika Dipakai Sendiri |
| :--- | :--- | :--- |
| **`px` (Pixel)** | Statis / Kaku | Ketinggalan zaman, tidak bisa mengecil di mobile dan terlihat kecil di 4K. |
| **`rem`** | Relatif terhadap font root | Bagus untuk keterbacaan artikel, tapi tidak responsif terhadap dimensi visual layar. |
| **`clamp() + vw/vh`** *(Dipakai Bicket)* | **Fluid & Adaptive** | **Otomatis elastis mengikuti ukuran layar monitor, tablet, maupun HP tanpa patahan *breakpoint* yang kaku.** |