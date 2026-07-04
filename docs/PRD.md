# PRD — Product Requirements Document
## Kancil Uangku — Source of Truth Frontend Rebuild

**Version:** 1.0 Draft  
**Status:** For Review & Approval  
**Project Type:** Frontend-first rebuild documentation  
**Technology Target:** HTML responsive + Tailwind CSS Play CDN native  
**Execution Rule:** Do not execute application code before explicit approval  
**Product:** Kancil Uangku — web app edukasi keuangan anak Indonesia  
**Baseline Reference:** Existing app: `smartmoneytraininganak.netlify.app`

---

## 1. Product Overview

**Kancil Uangku** adalah web app edukasi keuangan untuk anak Indonesia yang membantu orang tua membimbing anak belajar mengelola uang melalui tugas mingguan, goal anak, reward, badge, streak, dan konsep **2 Kantong: Tabungan–Belanja**.

Produk ini merupakan rebuild dari existing app dan diarahkan menjadi aplikasi yang lebih:

1. Clean dan data-dense untuk orang tua.
2. Sederhana, colorful, dan mudah dipahami untuk anak.
3. Mobile-first karena mayoritas akses diasumsikan dari HP.
4. Kuat secara identitas visual melalui maskot **Kancil**.
5. Terstruktur sebagai Source of Truth agar mudah dieksekusi oleh Codex/agent secara bertahap.
6. Memiliki landing page yang menjelaskan value produk sebelum masuk ke area aplikasi.
7. Memiliki flow akun awal berbasis frontend-only untuk signup dan login demo.

---

## 2. Brand Context

Kancil Uangku mengambil maskot **Kancil**, tokoh cerita rakyat Indonesia yang cerdik, sebagai karakter pendamping anak dalam belajar mengelola uang.

Maskot Kancil digunakan pada:

1. Badge pencapaian.
2. Notifikasi apresiasi.
3. Empty state.
4. Mini-lesson.
5. Child View hero section.
6. Sertifikat pencapaian.
7. Progress milestone.
8. Landing page hero illustration.
9. CTA banner dark section.
10. Login dan signup support illustration.

Kancil harus terasa:

- Cerdik.
- Hangat.
- Ramah anak.
- Tidak menggurui.
- Aman dan tepercaya di mata orang tua.

---

## 3. Product Vision

Menjadi web app edukasi keuangan anak Indonesia yang membuat proses belajar uang terasa menyenangkan bagi anak, namun tetap terukur, aman, dan tepercaya bagi orang tua.

**Positioning statement:**

> Teman belajar uang pertama untuk anak Indonesia — dipandu Kancil yang cerdik, dibimbing orang tua, dan dibangun dari kebiasaan kecil setiap minggu.

---

## 4. Target Users

### 4.1 Primary User — Parent / Guardian

Orang tua yang ingin:

1. Mengajarkan anak tentang uang secara praktis.
2. Melacak tugas mingguan anak.
3. Memberikan reward yang sehat dan terarah.
4. Mengelola lebih dari satu anak.
5. Melihat progress goal anak, tabungan aman, dan perilaku finansial anak.
6. Menghasilkan rekap bulanan atau sertifikat pencapaian.
7. Melakukan export/import data.

### 4.2 Secondary User — Child

Anak yang ingin:

1. Melihat tugas minggu ini.
2. Mengetahui progress goal yang sedang dikejar.
3. Mendapat badge atau apresiasi.
4. Melihat target goal secara visual.
5. Merasa ditemani oleh maskot Kancil.

### 4.3 Supporting User — Educator / Facilitator

Opsional pada fase lanjutan:

1. Guru.
2. Trainer literasi keuangan anak.
3. Konsultan parenting.
4. Komunitas edukasi anak.

---

## 5. Product Goals

### 5.1 Product Goals

1. Mengubah existing app menjadi produk frontend yang lebih modern, scalable, dan mudah dikembangkan.
2. Memisahkan pengalaman orang tua dan anak agar masing-masing sesuai kebutuhan.
3. Menjadikan aplikasi lebih kuat secara brand melalui maskot Kancil.
4. Memperkuat value edukasi melalui konsep **Tabungan–Belanja**.
5. Menyediakan dashboard orang tua yang data-dense, namun tetap mudah digunakan.
6. Menyediakan Child View yang sangat sederhana, colorful, dan menyenangkan.
7. Menyiapkan struktur frontend yang bisa dieksekusi oleh agent/codex secara bertahap.

### 5.2 Parent Goals

Parent dapat:

1. Menambahkan hingga 10 anak.
2. Membuat daftar tugas mingguan.
3. Menentukan reward.
4. Memantau progress anak.
5. Melihat rekap bulanan.
6. Melihat visualisasi tabungan aman, goal, dan pencapaian.
7. Export/import data.
8. Mencetak atau menghasilkan preview sertifikat.

### 5.3 Child Goals

Anak dapat:

1. Melihat tugas minggu ini.
2. Melihat progress goal.
3. Melihat dua kantong uang.
4. Melihat badge dan streak.
5. Mendapat pesan apresiasi dari Kancil.

---

## 6. Scope

### 6.1 In Scope — Frontend Phase

1. Parent Dashboard.
2. Child View.
3. Landing Page.
4. Create Account Page.
5. Login Page.
6. Child Goal & Financial Composition Module.
7. Two Pockets Concept: Tabungan dan Belanja.
8. Badge & Achievement System.
9. Streak System.
10. Weekly Task Tracker.
11. Monthly Recap.
12. Basic Data Visualization.
13. Certificate Preview.
14. Export / Import UI.
15. Empty State with Kancil Mascot.
16. Responsive Mobile-First Layout.
17. Static Demo Data / Local Data Simulation.
18. Tailwind CSS Play CDN Native Implementation Plan.
19. Frontend-only auth flow simulation for signup/login.

### 6.2 Out of Scope — Current Phase

1. Backend development.
2. Authentication system dengan backend nyata.
3. Database integration.
4. Payment gateway.
5. Real user account system.
6. Native mobile app.
7. Production deployment automation.
8. AI recommendation engine.
9. Parent-child permission system with real authentication.
10. Real-time sync across devices.

Catatan:

1. `signup.html` dan `login.html` saat ini hanya frontend-only.
2. Data akun dan session disimulasikan melalui browser storage.
3. Belum ada API, verifikasi akun, atau server-side protection.

---

## 7. Core Modules

## 7.0 Module 0 — Entry & Account Flow

### Purpose

Menyediakan pintu masuk produk yang jelas sebelum user masuk ke Parent Dashboard, sekaligus memberi flow akun awal yang ringan untuk prototype frontend.

### Main Features

#### 7.0.1 Landing Page

- Navigation bar.
- Hero section dengan ilustrasi Kancil.
- Section cara kerja.
- Section keunggulan.
- FAQ yang menjelaskan program edukasi dan manfaat untuk parent/child.
- CTA banner.
- Footer.

#### 7.0.2 Create Account

- Nama orang tua.
- Email.
- Password.
- Konfirmasi password.
- Persetujuan syarat.
- Validasi dasar frontend.

#### 7.0.3 Login Demo

- Email.
- Password.
- Toggle show/hide password.
- Validasi dasar frontend.
- Session demo sebelum redirect ke dashboard.

### UX Principle

Flow awal harus:

1. Ramah dan jelas.
2. Menjelaskan manfaat produk sebelum meminta aksi.
3. Jujur bahwa auth saat ini masih simulasi frontend-only.

## 7.1 Module 1 — Parent Dashboard

### Purpose

Memberikan orang tua kendali penuh terhadap setup, tracking, reward, rekap, dan evaluasi kebiasaan finansial anak.

### Main Features

#### 7.1.1 Overview Summary

- Jumlah anak aktif.
- Total tugas minggu ini.
- Completion rate.
- Total tabungan aman.
- Badge terbaru.
- Streak aktif.

#### 7.1.2 Child Selector

- Pilih anak aktif.
- Tambah anak.
- Maksimal 10 anak.
- Ringkasan mini per anak.

#### 7.1.3 Weekly Task Tracking

- Week 1–4.
- Status tugas: belum mulai, berjalan, selesai.
- Reward per tugas.
- Checklist tugas.
- Completion percentage.

#### 7.1.4 Reward Management

- Reward uang.
- Reward non-uang.
- Reward badge.
- Catatan orang tua.

#### 7.1.5 Monthly Recap

- Total reward.
- Total tabungan aman.
- Total dana belanja/goal.
- Rasio Tabungan–Belanja.
- Jumlah tugas selesai.
- Badge didapat.
- Streak terbaik.

#### 7.1.6 Visualization

- Bar chart tugas mingguan.
- Trend tabungan aman bulanan.
- Progress goal per anak.
- Financial composition distribution chart.

#### 7.1.7 Certificate

- Preview sertifikat.
- Nama anak.
- Nama orang tua dari session demo/login aktif.
- Pencapaian utama.
- Badge utama.
- Bulan periode.
- Pesan apresiasi dari Kancil.

#### 7.1.8 Export / Import

- Export data lokal.
- Import data.
- Reset data.
- Status tersimpan.

### UX Principle

Parent Dashboard harus:

1. Lebih profesional.
2. Lebih rapi.
3. Lebih data-dense.
4. Tidak terlalu childish.
5. Tetap hangat karena produk untuk keluarga.

---

## 7.2 Module 2 — Child View

### Purpose

Memberikan pengalaman sederhana untuk anak agar mereka bisa melihat progress goal, tugas, tabungan aman, dan badge tanpa merasa seperti menggunakan dashboard orang dewasa.

### Main Features

#### 7.2.1 Welcome Area

- Sapaan personal.
- Maskot Kancil.
- Pesan motivasi pendek.

#### 7.2.2 This Week Mission

- 3–5 tugas utama minggu ini.
- Checklist besar.
- Ikon visual.
- Label sederhana.

#### 7.2.3 Child Goal

- Nama target.
- Nominal target.
- Nominal terkumpul.
- Progress visual toples koin / balon terisi.
- Pesan Kancil ketika progress naik.

#### 7.2.4 Two Pockets

- Tabungan.
- Belanja.
- Visual warna berbeda.
- Bahasa sederhana.

#### 7.2.5 Badge Collection

- Badge bulan aktif.
- Badge terkunci untuk bulan berjalan.
- Badge baru.
- Ikon badge sesuai tema.
- Keterangan pendek.
- Reset capaian per bulan melalui cycle rekap bulanan.

#### 7.2.6 Streak

- Hari berturut-turut.
- Visual api kecil / bintang / jejak Kancil.
- Tidak dibuat terlalu kompetitif.

### UX Principle

Child View harus:

1. Sangat sederhana.
2. Visual besar.
3. Warna lebih cerah.
4. Minim tabel.
5. Minim angka kompleks.
6. Banyak feedback positif.
7. Tidak membuat anak merasa diawasi.

---

## 7.3 Module 3 — Child Goal & Financial Composition Module

### Purpose

Membantu anak memahami bahwa reward uang perlu dibagi: sebagian disimpan aman, sebagian lagi diarahkan ke goal yang ingin dicapai.

### Main Features

1. Set Goal Anak.
2. Nama tujuan.
3. Nominal target.
4. Estimasi waktu.
5. Ikon tujuan.
6. Current amount dari dana belanja.
7. Target amount.
8. Percentage progress.
9. Remaining amount.
10. Progress milestone: 25%, 50%, 75%, 100%.
11. Komposisi keuangan: Total reward 100%, Tabungan 30%, Belanja 70%.

### Visual Metaphor Options

1. Toples koin terisi.
2. Balon naik ke target.
3. Jejak Kancil menuju harta.
4. Gunung target dengan checkpoint.

### Parent Control

1. Orang tua menginput nominal target.
2. Progress goal bertambah dari dana belanja 70%.
3. Tabungan 30% tetap disimpan sebagai dana aman.
4. Anak tidak mengubah data finansial utama tanpa persetujuan.

---

## 7.4 Module 4 — Two Pockets: Tabungan–Belanja

### Purpose

Mengajarkan anak bahwa uang masuk perlu dibagi dengan tujuan jelas. Setiap reward uang dialokasikan ke dua kantong:

1. **Tabungan** — 30% untuk tujuan masa depan, dana darurat, atau kebiasaan simpan jangka panjang.
2. **Belanja** — 70% untuk kebutuhan/keinginan kecil dan sumber dana menuju target belanja anak.

### Main Features

1. Input uang masuk.
2. Alokasi otomatis ke dua kantong.
3. Visual pocket cards.
4. Total per kantong.
5. Rasio alokasi.
6. Monthly summary.
7. Parent explanation note.
8. Child-friendly explanation.

### Default Allocation Suggestion

Default awal:

- Tabungan: 30%.
- Belanja: 70%.

Angka ini menjadi aturan default produk pada fase frontend saat ini.

---

## 7.5 Module 5 — Badge, Achievement & Streak System

### Purpose

Mendorong kebiasaan baik tanpa menjadikan uang sebagai satu-satunya motivasi.

### Badge Examples

1. **7 Hari Beruntun** — anak menyelesaikan aktivitas selama 7 hari berturut-turut.
2. **Penabung Konsisten** — anak menabung secara rutin selama beberapa minggu.
3. **Belanja Bijak** — anak memakai dana belanja dengan rencana.
4. **Misi Mingguan Selesai** — semua tugas minggu ini selesai.
5. **Kancil Cerdik** — anak menyelesaikan mini-lesson.
6. **Jago Pilih Prioritas** — anak berhasil membedakan kebutuhan dan keinginan.

### Badge Rules

1. Badge harus positif.
2. Tidak mempermalukan anak.
3. Tidak menggunakan ranking antar-anak.
4. Tidak membandingkan anak satu dengan yang lain.
5. Fokus pada progress personal.
6. Badge dipantau per bulan aktif.
7. Badge bulan baru dapat dikejar lagi pada periode bulanan berikutnya.

---

## 8. Key User Flows

### Flow 1 — Parent Setup First Use

1. Parent membuka aplikasi.
2. Melihat welcome screen.
3. Mengatur tanggal mulai.
4. Menambahkan nama anak.
5. Membuat tugas mingguan.
6. Menentukan reward.
7. Menyimpan konfigurasi.
8. Masuk ke dashboard utama.

### Flow 2 — Parent Weekly Tracking

1. Parent memilih anak.
2. Parent memilih minggu.
3. Parent melihat daftar tugas.
4. Parent update status tugas.
5. Parent input reward atau catatan.
6. Dashboard memperbarui progress.
7. Badge/streak diperbarui bila memenuhi rule.

### Flow 3 — Child View

1. Anak membuka Child View.
2. Anak melihat sapaan Kancil.
3. Anak melihat tugas minggu ini.
4. Anak melihat progress goal.
5. Anak melihat badge.
6. Anak membaca pesan motivasi.

### Flow 4 — Child Goal

1. Parent membuat goal anak.
2. Parent menentukan nominal target.
3. Parent input uang masuk.
4. Sistem membagi otomatis ke dua kantong.
5. Progress goal anak bertambah dari dana belanja 70%.
6. Badge muncul saat milestone tercapai.

### Flow 5 — Monthly Recap

1. Parent memilih bulan.
2. Sistem menampilkan ringkasan.
3. Parent melihat chart tugas dan tabungan aman.
4. Parent melihat badge dan streak.
5. Parent dapat preview sertifikat.
6. Parent export data bila diperlukan.

---

## 9. Information Architecture

### 9.0 Entry Flow

1. `index.html` sebagai landing page utama.
2. `signup.html` untuk create account frontend-only.
3. `login.html` untuk login frontend-only.
4. `parent-dashboard.html` untuk area orang tua setelah login demo.
5. `child-view.html` untuk area anak berdasarkan pilihan parent.

### 9.1 Parent Dashboard

1. Header.
2. Quick Stats.
3. Child Selector.
4. Weekly Task Tracker.
5. Goals & Financial Composition.
6. Badge & Streak.
7. Monthly Recap.
8. Certificate.
9. Export / Import.
10. Settings.

### 9.2 Child View

1. Welcome.
2. Mission This Week.
3. Child Goal.
4. Two Pockets.
5. Badge Collection.
6. Kancil Message.

---

## 10. Data Model — Frontend SOT Draft

### 10.1 Child Object

```text
child {
  id
  name
  avatarColor
  activeStatus
  createdAt
}
```

### 10.2 Task Object

```text
task {
  id
  childId
  weekNumber
  title
  description
  rewardType
  rewardAmount
  status
  completedAt
}
```

### 10.3 Goal Object

```text
goal {
  id
  childId
  goalName
  targetAmount
  currentAmount
  startDate
  targetDate
  icon
  status
}
```

### 10.4 Pocket Object

```text
pocket {
  childId
  saveAmount
  spendAmount
  allocationSavePercent
  allocationSpendPercent
  baseSaveAmount
  baseSpendAmount
}
```

### 10.5 Badge Object

```text
badge {
  id
  childId
  badgeName
  badgeType
  description
  unlockedAt
  status
  month
}
```

### 10.6 Streak Object

```text
streak {
  childId
  currentStreak
  bestStreak
  lastActivityDate
}
```

### 10.7 Monthly Recap Object

```text
monthlyRecap {
  childId
  month
  totalTasks
  completedTasks
  totalReward
  totalSaved
  totalSpent
  badgesUnlocked
  bestStreak
  baseTotalReward
  baseTotalSaved
  baseTotalSpent
  baseTotalTasks
  baseCompletedTasks
}
```

---

## 11. Functional Requirements

| ID | Requirement | Description |
|---|---|---|
| FR-001 | Manage children | Parent can manage up to 10 children. |
| FR-002 | Create weekly tasks | Parent can create weekly tasks with reward and status. |
| FR-003 | Track task completion | Parent can mark tasks as completed and see weekly progress. |
| FR-004 | Create child goal | Parent can create purchase goals for each child. |
| FR-005 | Child goal view | Child can view goal progress visually. |
| FR-006 | Two pockets | System supports 30% Tabungan and 70% Belanja allocation. |
| FR-007 | Monthly badge display | System displays unlocked and locked badges for the active monthly period. |
| FR-008 | Streak display | System displays active and best streak. |
| FR-009 | Monthly recap | Parent can view monthly recap. |
| FR-010 | Export/import | Parent can access export/import UI. |
| FR-011 | Certificate preview | Parent can preview achievement certificate. |
| FR-012 | Empty states | System provides Kancil-based empty states. |

---

## 12. Non-Functional Requirements

### 12.1 Performance

1. Halaman harus ringan.
2. Tidak menggunakan framework JavaScript berat pada fase awal.
3. Optimized untuk mobile.
4. Chart sederhana dan tidak membebani browser.

### 12.2 Responsiveness

1. Mobile-first.
2. Breakpoint utama: mobile, tablet, desktop.
3. Parent Dashboard tetap nyaman di desktop dan tablet.
4. Child View optimal di mobile.

### 12.3 Accessibility

1. Kontras warna cukup.
2. Tombol besar.
3. Label jelas.
4. Tidak bergantung hanya pada warna.
5. Bahasa sederhana untuk anak.

### 12.4 Maintainability

1. Struktur komponen konsisten.
2. Naming class rapi.
3. Section modular.
4. Mudah dipindahkan ke framework di masa depan.

### 12.5 Trust & Safety

1. Tidak ada ranking antar-anak.
2. Tidak ada shame-based message.
3. Tidak ada pesan yang membuat anak merasa gagal.
4. Parent tetap menjadi pengendali data utama.

---

## 13. Success Metrics

### 13.1 Parent Dashboard Metrics

1. Parent dapat memahami status anak dalam kurang dari 30 detik.
2. Parent dapat menambah anak dan tugas tanpa kebingungan.
3. Parent dapat membaca rekap bulanan dengan jelas.
4. Parent dapat membedakan progress tiap anak.

### 13.2 Child View Metrics

1. Anak dapat memahami tugas minggu ini tanpa bantuan panjang.
2. Anak dapat melihat target goal secara visual.
3. Anak merasa mendapat apresiasi dari badge dan Kancil.
4. Tampilan tidak terlalu kompleks.

### 13.3 Product Quality Metrics

1. Mobile layout tidak pecah.
2. Semua state utama tersedia.
3. Komponen konsisten.
4. Tidak ada fitur utama yang tersembunyi.
5. UI siap dijadikan dasar coding agent.

---

## 14. Key Product Decisions

1. Parent Dashboard dan Child View dipisahkan.
2. Parent Dashboard memakai gaya lebih profesional.
3. Child View memakai gaya lebih playful.
4. Maskot Kancil digunakan sebagai emotional identity.
5. Reward tidak hanya berupa uang.
6. Badge digunakan untuk mendorong kebiasaan positif.
7. Konsep dua kantong menjadi core financial model.
8. Frontend fase pertama menggunakan HTML responsive + Tailwind Play CDN native.
9. Tidak ada backend sampai approval fase lanjutan.
10. Semua fitur disusun sebagai Source of Truth agar mudah dieksekusi bertahap.
11. Sertifikat menampilkan nama orang tua dari session demo aktif.

---

## 15. Approval Gate

Sebelum masuk ke coding, dokumen ini perlu disetujui pada aspek:

1. Scope fitur.
2. Nama modul.
3. Struktur Parent Dashboard.
4. Struktur Child View.
5. Konsep dua kantong.
6. Badge/streak logic.
7. Visual direction.
8. Fase implementasi.
9. Batasan frontend-only.
10. Prioritas MVP.
