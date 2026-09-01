#!/usr/bin/env python3
"""
Bicket · Layer 1 — Dummy Transaction Data Generator

Menghasilkan data transaksi dummy yang bentuknya menyerupai tabel transaksi
Bicket, supaya layer insight bisa dibangun & diuji tanpa menunggu data produksi.
Deterministik lewat --seed.

    python dummy_data.py --creators 6 --days 120 --seed 42 --out ./data
"""
from __future__ import annotations

import argparse
import csv
import json
import os
import random
from datetime import datetime, timedelta, timezone

TZ = timezone(timedelta(hours=8))  # Asia/Makassar (WITA)

STORE_NAMES = [
    "Rasa Manis Gift", "Kado Kita", "Bloom & Box", "Sekotak Cerita",
    "Pelukan Kecil", "Hadiah Sore", "Ruang Bunga", "Titik Hangat",
]

# name, category, price_min, price_max, popularity_weight
CATALOG = [
    ("Gift Box Birthday Classic",   "Gift Box",     150_000, 250_000, 10),
    ("Gift Box Anniversary Deluxe", "Gift Box",     250_000, 450_000,  7),
    ("Gift Box Graduation",         "Gift Box",     180_000, 300_000,  6),
    ("Bouquet Snack Mix",           "Bouquet",       90_000, 160_000,  5),
    ("Bouquet Bunga Artificial",    "Bouquet",      120_000, 220_000,  4),
    ("Bouquet Uang Custom",         "Bouquet",      200_000, 500_000,  3),
    ("Snack Box Sharing",           "Snack Box",     60_000, 120_000,  3),
    ("Kartu Ucapan Handwritten",    "Kartu Ucapan",  15_000,  35_000,  3),
    ("Hampers Spesial",             "Hampers",      300_000, 750_000,  2),
]

# Status mengikuti alur escrow
STATUS_WEIGHTS = [
    ("COMPLETED",       60),   # dana sudah dirilis ke creator
    ("PAID_ESCROW",     18),   # sudah dibayar, dana masih ditahan
    ("PENDING_PAYMENT", 10),   # belum dibayar
    ("CANCELLED",        8),
    ("REFUNDED",         4),
]

CHANNEL_WEIGHTS = [("katalog", 45), ("share_link", 30),
                   ("instagram_bio", 18), ("whatsapp", 7)]

# Mon..Sun — akhir pekan lebih ramai untuk produk hadiah
DAY_WEIGHT = {0: 8, 1: 8, 2: 9, 3: 10, 4: 13, 5: 16, 6: 12}
HOUR_WEIGHT = [(9, 3), (10, 5), (11, 6), (12, 6), (13, 5), (14, 5), (15, 6),
               (16, 7), (17, 8), (18, 9), (19, 11), (20, 12), (21, 9), (22, 5)]

# Sengaja ada creator sepi & kosong untuk menguji guardrail di layer insight
VOLUME_PROFILES = [
    ("healthy", (45, 80)),
    ("healthy", (45, 80)),
    ("medium",  (16, 35)),
    ("medium",  (16, 35)),
    ("tiny",    (2, 4)),
    ("empty",   (0, 0)),
]

CSV_FIELDS = [
    "transaction_id", "creator_id", "buyer_id", "product_id", "product_name",
    "category", "quantity", "unit_price", "gross_amount", "status", "channel",
    "created_at",
]

def pick(rng, pairs):
    return rng.choices([p[0] for p in pairs], weights=[p[1] for p in pairs], k=1)[0]

def make_creators(rng, n):
    names = STORE_NAMES[:]
    rng.shuffle(names)
    creators = []
    for i in range(n):
        label, volume = VOLUME_PROFILES[i % len(VOLUME_PROFILES)]
        creators.append({
            "creator_id": "cr_%03d" % (i + 1),
            "store_name": names[i % len(names)],
            "volume_profile": label,
            "_volume_range": volume,
        })
    return creators

def make_products(rng, creators):
    products = []
    for creator in creators:
        chosen = rng.sample(CATALOG, rng.randint(3, 6))
        for j, (name, category, pmin, pmax, weight) in enumerate(chosen):
            products.append({
                "product_id": "pr_%s_%02d" % (creator["creator_id"][3:], j + 1),
                "creator_id": creator["creator_id"],
                "name": name,
                "category": category,
                "price": round(rng.randint(pmin, pmax), -3),
                "_weight": weight,
            })
    return products

def make_transactions(rng, creators, products, start, days):
    by_creator = {}
    for product in products:
        by_creator.setdefault(product["creator_id"], []).append(product)

    day_pool = [start + timedelta(days=d) for d in range(days)]
    day_weights = [DAY_WEIGHT[d.weekday()] for d in day_pool]

    rows = []
    for creator in creators:
        low, high = creator["_volume_range"]
        catalog = by_creator.get(creator["creator_id"], [])
        if not catalog or high == 0:
            continue
        weights = [p["_weight"] for p in catalog]
        for _ in range(rng.randint(low, high)):
            product = rng.choices(catalog, weights=weights, k=1)[0]
            qty = rng.choices([1, 2, 3], weights=[80, 15, 5], k=1)[0]
            day = rng.choices(day_pool, weights=day_weights, k=1)[0]
            created_at = day.replace(
                hour=pick(rng, HOUR_WEIGHT),
                minute=rng.randrange(60),
                second=rng.randrange(60),
            )
            rows.append({
                "creator_id": creator["creator_id"],
                "buyer_id": "by_%04d" % rng.randrange(1, 400),
                "product_id": product["product_id"],
                "product_name": product["name"],
                "category": product["category"],
                "quantity": qty,
                "unit_price": product["price"],
                "gross_amount": product["price"] * qty,
                "status": pick(rng, STATUS_WEIGHTS),
                "channel": pick(rng, CHANNEL_WEIGHTS),
                "created_at": created_at.isoformat(),
            })

    rows.sort(key=lambda r: r["created_at"])
    for i, row in enumerate(rows, start=1):
        row["transaction_id"] = "trx_%06d" % i
    return [{key: row[key] for key in CSV_FIELDS} for row in rows]

def strip_private(items):
    return [{k: v for k, v in item.items() if not k.startswith("_")} for item in items]

def write_json(path, payload):
    with open(path, "w", encoding="utf-8") as handle:
        json.dump(payload, handle, ensure_ascii=False, indent=2)

def main():
    parser = argparse.ArgumentParser(description="Generate dummy Bicket transaction data")
    parser.add_argument("--creators", type=int, default=6)
    parser.add_argument("--days", type=int, default=120)
    parser.add_argument("--seed", type=int, default=42)
    parser.add_argument("--out", default="./data")
    args = parser.parse_args()

    rng = random.Random(args.seed)
    today = datetime.now(TZ).replace(hour=0, minute=0, second=0, microsecond=0)
    start = today - timedelta(days=args.days - 1)

    creators = make_creators(rng, args.creators)
    products = make_products(rng, creators)
    transactions = make_transactions(rng, creators, products, start, args.days)

    os.makedirs(args.out, exist_ok=True)
    write_json(os.path.join(args.out, "creators.json"), strip_private(creators))
    write_json(os.path.join(args.out, "products.json"), strip_private(products))
    write_json(os.path.join(args.out, "transactions.json"), transactions)

    with open(os.path.join(args.out, "transactions.csv"), "w",
              newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=CSV_FIELDS)
        writer.writeheader()
        writer.writerows(transactions)

    print("seed=%d  periode=%s .. %s" % (args.seed, start.date(), today.date()))
    print("%d creator, %d produk, %d transaksi"
          % (len(creators), len(products), len(transactions)))
    for creator in creators:
        count = sum(1 for t in transactions if t["creator_id"] == creator["creator_id"])
        print("  %s  %-18s %-8s %d transaksi"
              % (creator["creator_id"], creator["store_name"],
                 creator["volume_profile"], count))
    print("tersimpan di %s" % os.path.abspath(args.out))

if __name__ == "__main__":
    main()
