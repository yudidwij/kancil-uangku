# Implementation Plan
## Kancil Uangku — Frontend-First Build Plan

**Version:** 1.0 Draft  
**Status:** Awaiting Approval  
**Execution Rule:** No application code before approval  
**Technology Target:** HTML responsive + Tailwind CSS Play CDN native

---

## 1. Implementation Objective

Membangun frontend rebuild **Kancil Uangku** secara bertahap, terkontrol, dan berbasis Source of Truth, dimulai dari dokumentasi, struktur UI, komponen, layout, dummy data, hingga prototype frontend yang bisa divalidasi sebelum backend atau logic lanjutan dikembangkan.

---

## 2. Technology Scope

### 2.1 Approved Frontend Stack

1. HTML native.
2. Tailwind CSS Play CDN.
3. Vanilla JavaScript ringan bila diperlukan pada fase setelah approval.
4. LocalStorage simulation bila diperlukan pada fase prototype.
5. No build tools.
6. No frontend framework pada fase awal.
7. No backend.
8. No authentication.

### 2.2 Why This Stack

1. Cepat untuk prototype.
2. Mudah dieksekusi oleh coding agent.
3. Tidak memerlukan setup kompleks.
4. Cocok untuk validasi UI/UX.
5. Mudah dipindahkan ke framework di fase berikutnya.

---

## 3. Execution Principles

1. Dokumentasi disetujui terlebih dahulu.
2. UI tidak langsung di-code sebelum approval.
3. Setiap fase memiliki output jelas.
4. Setiap fase harus bisa direview.
5. Tidak membuat fitur di luar scope.
6. Parent Dashboard dan Child View dikembangkan sebagai dua experience berbeda.
7. Semua komponen mengacu pada PRD dan UI Guidelines.
8. Dummy data harus mengikuti data model SOT.
9. Rebuild harus mempertahankan baseline fitur penting existing app.
10. Setiap perubahan besar harus dicatat sebagai decision log.

---

## 4. Recommended Folder Structure

```text
kancil-uangku/
├── index.html
├── parent-dashboard.html
├── child-view.html
├── assets/
│   ├── icons/
│   ├── mascot/
│   └── illustrations/
├── data/
│   └── demo-data.js
├── js/
│   ├── app.js
│   ├── dashboard.js
│   ├── child-view.js
│   └── storage.js
├── docs/
│   ├── PRD.md
│   ├── UI-Guidelines.md
│   ├── Implementation-Plan.md
│   └── Decision-Log.md
└── README.md
```

Catatan: struktur ini adalah rencana. Jangan membuat file aplikasi sebelum fase coding disetujui.

---

## 5. Phase-by-Phase Plan

## Phase 0 — Documentation & Approval

### Objective

Mengunci Source of Truth sebelum eksekusi frontend.

### Activities

1. Review PRD.
2. Review UI Guidelines.
3. Review Implementation Plan.
4. Validasi scope MVP.
5. Validasi visual direction.
6. Validasi batasan frontend-only.
7. Buat approval gate.

### Output

1. PRD approved.
2. UI Guidelines approved.
3. Implementation Plan approved.
4. MVP scope locked.
5. No code yet.

### Approval Criteria

Fase ini selesai bila user menyetujui:

1. Modul utama.
2. Struktur dashboard.
3. Child View.
4. Konsep tiga kantong.
5. Badge/streak.
6. Visual direction.
7. Rencana fase implementasi.

---

## Phase 1 — Information Architecture & Wireframe Text Blueprint

### Objective

Membuat blueprint struktur halaman sebelum coding.

### Activities

1. Menentukan section final Parent Dashboard.
2. Menentukan section final Child View.
3. Menentukan urutan konten mobile.
4. Menentukan urutan konten desktop.
5. Membuat wireframe berbasis teks.
6. Menentukan komponen reusable.

### Output

1. Parent Dashboard wireframe text.
2. Child View wireframe text.
3. Component inventory.
4. Mobile layout order.
5. Desktop layout order.

### Approval Gate

User menyetujui struktur halaman sebelum masuk ke visual HTML.

---

## Phase 2 — Visual System Setup

### Objective

Menerjemahkan UI Guidelines ke sistem visual Tailwind CDN.

### Activities

1. Menentukan token warna dalam Tailwind arbitrary values.
2. Menentukan font import.
3. Menentukan radius system.
4. Menentukan shadow system.
5. Menentukan spacing pattern.
6. Menentukan card style.
7. Menentukan button style.
8. Menentukan badge style.
9. Menentukan chart style dasar.

### Output

1. UI token map.
2. Component style map.
3. Tailwind class convention.
4. Visual consistency checklist.

### Approval Gate

User menyetujui style direction sebelum pembuatan halaman.

---

## Phase 3 — Parent Dashboard Static Layout

### Objective

Membangun tampilan statis Parent Dashboard berdasarkan PRD dan UI Guidelines.

### Sections to Build

1. Header.
2. Quick Stats.
3. Child Selector.
4. Weekly Task Tracker.
5. Reward Summary.
6. Savings Goal Summary.
7. Three Pockets Overview.
8. Badge & Streak Summary.
9. Monthly Recap.
10. Chart Section.
11. Certificate Preview.
12. Export / Import Control.

### Output

1. Static Parent Dashboard HTML.
2. Mobile responsive layout.
3. Desktop responsive layout.
4. No advanced logic yet.

### Acceptance Criteria

1. Layout rapi di mobile.
2. Layout data-dense di desktop.
3. Semua modul utama tampil.
4. Visual sesuai brand.
5. Tidak ada fitur out of scope.

---

## Phase 4 — Child View Static Layout

### Objective

Membangun tampilan statis khusus anak.

### Sections to Build

1. Welcome Kancil.
2. This Week Mission.
3. Savings Goal Visual.
4. Three Pockets Cards.
5. Badge Collection.
6. Streak Display.
7. Kancil Encouragement Message.

### Output

1. Static Child View HTML.
2. Mobile-first child experience.
3. Visual playful.
4. Tidak menyerupai dashboard orang tua.

### Acceptance Criteria

1. Tampilan mudah dipahami anak.
2. Visual besar dan colorful.
3. Tidak terlalu banyak teks.
4. Maskot Kancil terasa hadir.
5. Progress tabungan mudah dilihat.

---

## Phase 5 — Demo Data & Local Interaction

### Objective

Menambahkan interaksi ringan berbasis dummy data.

### Activities

1. Membuat demo data anak.
2. Membuat demo data tugas.
3. Membuat demo data goal.
4. Membuat demo data kantong.
5. Membuat demo data badge.
6. Membuat demo data streak.
7. Render data ke Parent Dashboard.
8. Render data ke Child View.

### Output

1. Demo data object.
2. UI populated with realistic sample data.
3. Basic switching child.
4. Basic progress rendering.

### Acceptance Criteria

1. Data tampil konsisten.
2. Parent Dashboard berubah sesuai anak yang dipilih.
3. Child View menampilkan data anak terpilih.
4. Tidak perlu backend.
5. Tidak perlu database.

---

## Phase 6 — Progress Visualization & Chart Prototype

### Objective

Membuat visualisasi progress sederhana tanpa library berat.

### Activities

1. Weekly completion bar chart.
2. Monthly savings trend.
3. Three pockets distribution.
4. Goal progress animation.
5. Badge progress display.

### Output

1. CSS/HTML bar charts.
2. Animated progress bar.
3. Responsive chart cards.

### Acceptance Criteria

1. Chart terbaca di mobile.
2. Warna sesuai kategori.
3. Label jelas.
4. Tidak terlalu kompleks.
5. Tidak membebani browser.

---

## Phase 7 — Export / Import UI Simulation

### Objective

Menyiapkan UI dan flow export/import sebagai kelanjutan dari existing baseline.

### Activities

1. Export button UI.
2. Import button UI.
3. Reset data confirmation UI.
4. Saved status indicator.
5. Import success/failure state.

### Output

1. Export/import interface.
2. UI states.
3. Optional localStorage simulation after approval.

### Acceptance Criteria

1. User paham fungsi export/import.
2. Reset tidak mudah terklik tanpa sadar.
3. Ada feedback status.
4. Flow terasa aman untuk orang tua.

---

## Phase 8 — Certificate Preview

### Objective

Membuat preview sertifikat pencapaian anak.

### Activities

1. Certificate card layout.
2. Nama anak.
3. Bulan periode.
4. Badge utama.
5. Completion summary.
6. Kancil appreciation message.

### Output

1. Static certificate preview.
2. Print-friendly direction.
3. Mobile preview.

### Acceptance Criteria

1. Sertifikat terlihat layak dibagikan.
2. Tidak terlalu ramai.
3. Identitas Kancil terasa.
4. Informasi pencapaian jelas.

---

## Phase 9 — QA, Responsiveness & Refinement

### Objective

Memastikan UI stabil, rapi, dan siap dipresentasikan.

### Activities

1. Mobile QA.
2. Tablet QA.
3. Desktop QA.
4. Component consistency check.
5. Color consistency check.
6. Typography check.
7. Accessibility check.
8. Empty state check.
9. Data state check.

### Output

1. QA checklist.
2. Bug list.
3. UI refinement list.
4. Final frontend prototype candidate.

### Acceptance Criteria

1. Tidak ada layout pecah.
2. Semua komponen konsisten.
3. Mobile-first berhasil.
4. Parent dan Child View terasa berbeda.
5. Semua fitur MVP terwakili.

---

## Phase 10 — Final Review & Next Roadmap

### Objective

Menutup fase frontend prototype dan menentukan roadmap berikutnya.

### Activities

1. Review prototype.
2. Validasi fitur.
3. Catat feedback.
4. Tentukan backend readiness.
5. Tentukan fitur lanjutan.
6. Buat next-phase backlog.

### Output

1. Final prototype review.
2. Improvement backlog.
3. Backend-readiness notes.
4. Next development recommendation.

---

## 6. MVP Priority

### 6.1 MVP Must-Have

1. Parent Dashboard.
2. Child View.
3. Multi-anak hingga 10.
4. Weekly task tracker.
5. Goal savings progress.
6. Three pockets.
7. Badge display.
8. Streak display.
9. Monthly recap.
10. Export/import UI.
11. Kancil mascot usage.
12. Mobile-first responsive layout.

### 6.2 Should-Have

1. Certificate preview.
2. Animated goal progress.
3. HTML/CSS chart.
4. Empty states.
5. LocalStorage simulation.
6. Child selector persistence.

### 6.3 Could-Have

1. Mini-lesson card.
2. Kancil notification bubble.
3. Printable certificate.
4. More badge types.
5. Parent notes.
6. Theme variation.

### 6.4 Not Now

1. Backend.
2. Login.
3. Cloud sync.
4. Payment.
5. AI coach.
6. Native app.
7. Multi-parent account.
8. Real-time notification.

---

## 7. Component Inventory

### 7.1 Parent Components

1. ParentHeader.
2. QuickStatCard.
3. ChildSelector.
4. WeekTabs.
5. TaskTrackerCard.
6. TaskTable.
7. RewardSummary.
8. SavingsGoalCard.
9. PocketDistributionCard.
10. BadgeSummaryCard.
11. StreakCard.
12. MonthlyRecapCard.
13. BarChartCard.
14. SavingsTrendCard.
15. CertificatePreview.
16. ExportImportPanel.
17. SettingsPanel.
18. EmptyStateKancil.

### 7.2 Child Components

1. ChildHeroKancil.
2. MissionCard.
3. BigGoalProgress.
4. CoinJarProgress.
5. PocketCard.
6. BadgeCard.
7. BadgeCarousel.
8. StreakVisual.
9. KancilMessageBubble.
10. ChildEmptyState.

---

## 8. Risk Register

| Risk | Impact | Mitigation |
|---|---|---|
| UI terlalu ramai untuk anak | Anak sulit memahami aplikasi | Pisahkan Child View dan Parent Dashboard |
| Dashboard terlalu childish untuk orang tua | Trust menurun | Parent Dashboard gunakan gaya clean profesional |
| Data model tidak konsisten | Sulit dikembangkan | Gunakan SOT data object dari awal |
| Fitur terlalu banyak di MVP | Development melebar | Gunakan prioritas Must/Should/Could |
| Export/import membingungkan | Risiko user salah reset data | Buat confirmation dan status indicator |
| Badge terlalu kompetitif | Anak merasa dibandingkan | Hindari leaderboard dan ranking |
| Mobile layout padat | UX buruk | Mobile-first, horizontal scroll terbatas, card stacking |
| Maskot terlalu dominan | Data penting terganggu | Kancil sebagai guide, bukan pengganti informasi |

---

## 9. Quality Checklist

### 9.1 Product Checklist

1. Parent Dashboard lengkap.
2. Child View terpisah.
3. Goal module tersedia.
4. Three pockets tersedia.
5. Badge tersedia.
6. Streak tersedia.
7. Monthly recap tersedia.
8. Export/import tersedia.
9. Certificate preview tersedia.
10. Empty state tersedia.

### 9.2 UI Checklist

1. Warna sesuai brand.
2. Radius konsisten.
3. Typography konsisten.
4. Mobile layout rapi.
5. Desktop layout data-dense.
6. Child View playful.
7. Parent View trustworthy.
8. Kancil digunakan tepat.

### 9.3 Technical Checklist

1. HTML valid.
2. Tailwind CDN digunakan konsisten.
3. Tidak ada framework berat.
4. Struktur file rapi.
5. Komponen reusable secara pola.
6. Dummy data terpisah.
7. Tidak ada backend dependency.

---

## 10. Decision Log Initial Draft

| Decision | Rationale |
|---|---|
| Parent dan Child View dipisah | Kebutuhan orang tua dan anak sangat berbeda |
| Three pockets menjadi core model | Mengajarkan fungsi uang secara lebih sehat |
| Badge non-materi diprioritaskan | Menghindari motivasi hanya karena uang |
| Kancil menjadi maskot utama | Menguatkan identitas lokal dan emotional engagement |
| Tailwind Play CDN dipakai di fase awal | Cepat, ringan, cocok untuk prototype |
| No backend di fase awal | Fokus validasi frontend dan UX terlebih dahulu |
| Mobile-first | Mayoritas akses diasumsikan dari HP |
| Chart sederhana berbasis HTML/CSS | Mengurangi dependency awal |

---

## 11. Approval Request

Sebelum masuk fase coding, perlu approval untuk:

1. PRD v1.
2. UI Guidelines v1.
3. Implementation Plan v1.
4. MVP scope.
5. Visual direction.
6. Phase-by-phase execution.
7. Batasan frontend-only.
8. Komitmen no code sebelum approval tiap fase.

Setelah approval, fase berikutnya yang disarankan adalah:

**Phase 1 — Information Architecture & Wireframe Text Blueprint**
