# 📚 Bicket Engineering SOP Portal
## Standard Operating Procedures (SOP) — Engineering Office

---

Selamat datang di **Engineering SOP Portal Bicket Marketplace**. Seluruh dokumen SOP di bawah ini merupakan standar resmi yang mengikat bagi seluruh anggota tim rekayasa perangkat lunak (Frontend, Backend, Fullstack, DevOps, dan QA).

---

## 🔴 Must-Have SOPs (Fondasi Utama & Wajib)

| No | Dokumen SOP | Kode Dokumen | Fokus & Tanggung Jawab | Status |
| :---: | :--- | :---: | :--- | :---: |
| **01** | [**SOP Git Workflow & Branching Strategy**](./01-sop-git-workflow.md) | `SOP-DEV-001` | Topologi 4-tier branch (`main`, `develop`, `feat/*`, `fix/*`, `hotfix/*`), Conventional Commits, Squash & Merge, Staging Auto-Deploy, Performance Check, & QA Gate. | ✅ **Active** |
| **02** | [**SOP Kontrak API & Kolaborasi FE–BE**](./02-sop-api-contract-fe-be.md) | `SOP-DEV-002` | Format JSON Envelope, Zod Schema & Types terpadu di `types.ts`, Alur kerja paralel (*Zero-Blocker Culture*), dan Status Code Semantik. | ✅ **Active** |
| **03** | [**SOP Integritas Transaksi, Escrow, & Midtrans**](./03-sop-transaksi-escrow-midtrans.md) | `SOP-DEV-003` | Penanganan Webhook Midtrans SHA512, Idempotensi, Alur Saldo Rekber (*Held* ➔ *Released*), Potongan Komisi (5% Buyer, 7% Kreator), & Payout. | ✅ **Active** |
| **04** | [**SOP Standarisasi UI & Registry Design System**](./04-sop-ui-design-system-registry.md) | `SOP-DEV-004` | Hirarki 3-Tingkat Komponen, Aturan "Rule of Two", Demo Registry interaktif di `/design-system`, dan larangan nilai CSS arbitrary. | ✅ **Active** |
| **05** | [**SOP Task Planning & Definition of Done (DoD)**](./05-sop-task-planning-dod.md) | `SOP-DEV-005` | Format terpadu RPK (`rpk-[id].md`), 5 Kriteria Mutlak Selesai (DoD), dan Format Laporan Hasil Kerja (`result-rpk-[id].md`). | ✅ **Active** |
| **06** | [**SOP Pengujian Manual QA & Staging Verification**](./06-sop-qa-manual-testing-checklist.md) | `SOP-DEV-006` | Standar dokumen `manual-test.md` (Must-Have & Should-Have cases), Handover Dev ➔ QA, & QA Sign-Off Gate sebelum merge ke `main`. | ✅ **Active** |

---

## 🟡 Should-Have SOPs (Tahap Pengembangan Selanjutnya)

- [ ] **SOP-07**: Manajemen Database Migration & Seeding (Prisma ORM)
- [ ] **SOP-08**: Code Review & Pull Request Checklist
- [ ] **SOP-09**: Incident Response & Bug Triaging
- [ ] **SOP-10**: Environment & Secret Key Management
- [ ] **SOP-11**: Change Tracking & Release Notes Delivery

---

*Disahkan oleh: Chief Technology Officer (CTO) — Bicket Marketplace*
