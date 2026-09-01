import Link from "next/link";
import { Sparkles, Search, Filter, ShoppingBag, Star, ShieldCheck, Heart } from "lucide-react";

// Mock data katalog baju & gift kreatif untuk initial view
const CATALOG_ITEMS = [
  {
    id: "1",
    name: "Baju Bodo Sutera Bugis Modern",
    category: "Pakaian Adat",
    city: "Makassar",
    pricePerDay: 150000,
    rating: 4.9,
    rentCount: 38,
    tag: "Terpopuler",
    imageBg: "from-amber-900/40 to-emerald-950/60",
  },
  {
    id: "2",
    name: "Kebaya Encim Betawi Bordir Halus",
    category: "Pakaian Adat",
    city: "Jakarta Pusat",
    pricePerDay: 120000,
    rating: 4.8,
    rentCount: 52,
    tag: "Ready Stock",
    imageBg: "from-rose-900/40 to-neutral-900/60",
  },
  {
    id: "3",
    name: "Beskap Jawa Solo Sutera Hitam Gold",
    category: "Pakaian Adat",
    city: "Surakarta",
    pricePerDay: 175000,
    rating: 5.0,
    rentCount: 29,
    tag: "Premium",
    imageBg: "from-yellow-950/40 to-neutral-950/60",
  },
  {
    id: "4",
    name: "Kostum Wayang Gatotkaca Full Aksesoris",
    category: "Kostum Kreatif",
    city: "Yogyakarta",
    pricePerDay: 250000,
    rating: 4.9,
    rentCount: 17,
    tag: "Eksklusif",
    imageBg: "from-blue-900/40 to-indigo-950/60",
  },
  {
    id: "5",
    name: "Ulos Batak Toba Tenun Asli & Jas Songket",
    category: "Pakaian Adat",
    city: "Medan",
    pricePerDay: 200000,
    rating: 4.8,
    rentCount: 22,
    tag: "Tenun Asli",
    imageBg: "from-red-900/40 to-neutral-900/60",
  },
  {
    id: "6",
    name: "Gift Box Aksesoris & Bros Etnik Nusantara",
    category: "Gift & Kriya",
    city: "Denpasar",
    pricePerDay: 65000,
    rating: 4.7,
    rentCount: 44,
    tag: "Best Value",
    imageBg: "from-emerald-900/40 to-teal-950/60",
  },
];

export default function KatalogPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased selection:bg-emerald-500 selection:text-black">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <span>Creathon<span className="text-emerald-400">.</span></span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Cari baju adat (Bodo, Kebaya, Ulos, Wayang, Gift)..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-neutral-900/80 border border-neutral-800 focus:border-emerald-500 text-xs text-white placeholder:text-neutral-500 outline-none transition"
            />
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* User Nav */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-1.5 rounded-full text-xs font-medium text-neutral-300 hover:text-white transition"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="px-4 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition shadow-md shadow-emerald-500/20"
            >
              Buka Rental (Creator)
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Banner Section */}
        <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-950/40 via-neutral-900/80 to-neutral-950 p-6 sm:p-8">
          <div className="max-w-xl space-y-3 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> Escrow Payment Protection Aktif
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Katalog Sewa Busana Adat & Karya Kreatif Nusantara
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Temukan dan sewa ribuan pakaian tradisional, busana karnaval, kostum cosplay, dan gift etnik langsung dari kreator terpercaya di seluruh Indonesia.
            </p>
          </div>
          <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2">
          <div className="flex items-center gap-2">
            <button className="px-3.5 py-1.5 rounded-full bg-emerald-500 text-black font-semibold text-xs flex items-center gap-1.5 cursor-pointer">
              <span>Semua Kategori</span>
            </button>
            <button className="px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs transition border border-neutral-800 cursor-pointer">
              Pakaian Adat Jawa
            </button>
            <button className="px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs transition border border-neutral-800 cursor-pointer">
              Baju Adat Sulawesi
            </button>
            <button className="px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs transition border border-neutral-800 cursor-pointer">
              Kebaya & Beskap
            </button>
            <button className="px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs transition border border-neutral-800 cursor-pointer">
              Kostum Karnaval
            </button>
            <button className="px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs transition border border-neutral-800 cursor-pointer">
              Gift & Aksesoris
            </button>
          </div>

          <button className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs hover:border-neutral-700 transition">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter</span>
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATALOG_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl border border-neutral-800/80 bg-neutral-900/40 hover:bg-neutral-900/70 hover:border-neutral-700 transition-all duration-200 overflow-hidden flex flex-col justify-between"
            >
              {/* Product Visual Mock */}
              <div
                className={`h-48 w-full bg-gradient-to-br ${item.imageBg} relative p-4 flex flex-col justify-between border-b border-neutral-800/60`}
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-semibold text-emerald-400 border border-emerald-500/30">
                    {item.tag}
                  </span>
                  <button className="p-2 rounded-full bg-black/40 backdrop-blur-md text-neutral-400 hover:text-rose-400 transition cursor-pointer">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-neutral-950/80 text-neutral-300 border border-neutral-800">
                    {item.city}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-neutral-950/80 text-neutral-300 border border-neutral-800">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 space-y-4">
                <div className="space-y-1">
                  <h3 className="font-semibold text-base text-white group-hover:text-emerald-400 transition line-clamp-1">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <div className="flex items-center gap-1 text-amber-400 font-medium">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{item.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{item.rentCount}x disewa</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-neutral-800/80">
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">
                      Harga Sewa / Hari
                    </span>
                    <span className="text-base font-bold text-emerald-400">
                      Rp {item.pricePerDay.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <button className="px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black font-semibold text-xs transition-all duration-200 border border-emerald-500/30 hover:border-transparent flex items-center gap-1.5 cursor-pointer">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Sewa Sekarang</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
