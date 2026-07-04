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

**Kancil Uangku** adalah web app edukasi keuangan untuk anak Indonesia yang membantu orang tua membimbing anak belajar mengelola uang melalui tugas mingguan, target tabungan, reward, badge, streak, dan konsep **3 Kantong: Tabung–Belanja–Berbagi**.

Produk ini merupakan rebuild dari existing app dan diarahkan menjadi aplikasi yang lebih:

1. Clean dan data-dense untuk orang tua.
2. Sederhana, colorful, dan mudah dipahami untuk anak.
3. Mobile-first karena mayoritas akses diasumsikan dari HP.
4. Kuat secara identitas visual melalui maskot **Kancil**.
5. Terstruktur sebagai Source of Truth agar mudah dieksekusi oleh Codex/agent secara bertahap.

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
5. Melihat progress tabungan dan perilaku finansial anak.
6. Menghasilkan rekap bulanan atau sertifikat pencapaian.
7. Melakukan export/import data.

### 4.2 Secondary User — Child

Anak yang ingin:

1. Melihat tugas minggu ini.
2. Mengetahui progress tabungan.
3. Mendapat badge atau apresiasi.
4. Melihat target tabungan secara visual.
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
4. Memperkuat value edukasi melalui konsep **Tabung–Belanja–Berbagi**.
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
6. Melihat visualisasi tabungan dan pencapaian.
7. Export/import data.
8. Mencetak atau menghasilkan preview sertifikat.

### 5.3 Child Goals

Anak dapat:

1. Melihat tugas minggu ini.
2. Melihat progress tabungan.
3. Melihat tiga kantong uang.
4. Melihat badge dan streak.
5. Mendapat pesan apresiasi dari Kancil.

---

## 6. Scope

### 6.1 In Scope — Frontend Phase

1. Parent Dashboard.
2. Child View.
3. Goal & Savings Module.
4. Three Pockets Concept: Tabung, Belanja, Berbagi.
5. Badge & Achievement System.
6. Streak System.
7. Weekly Task Tracker.
8. Monthly Recap.
9. Basic Data Visualization.
10. Certificate Preview.
11. Export / Import UI.
12. Empty State with Kancil Mascot.
13. Responsive Mobile-First Layout.
14. Static Demo Data / Local Data Simulation.
15. Tailwind CSS Play CDN Native Implementation Plan.

### 6.2 Out of Scope — Current Phase

1. Backend development.
2. Authentication system.
3. Database integration.
4. Payment gateway.
5. Real user account system.
6. Native mobile app.
7. Production deployment automation.
8. AI recommendation engine.
9. Parent-child permission system with real authentication.
10. Real-time sync across devices.

---

## 7. Core Modules

## 7.1 Module 1 — Parent Dashboard

### Purpose

Memberikan orang tua kendali penuh terhadap setup, tracking, reward, rekap, dan evaluasi kebiasaan finansial anak.

### Main Features

#### 7.1.1 Overview Summary

- Jumlah anak aktif.
- Total tugas minggu ini.
- Completion rate.
- Total tabungan.
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
- Total tabungan.
- Rasio Tabung–Belanja–Berbagi.
- Jumlah tugas selesai.
- Badge didapat.
- Streak terbaik.

#### 7.1.6 Visualization

- Bar chart tugas mingguan.
- Trend tabungan bulanan.
- Progress per anak.
- Pocket distribution chart.

#### 7.1.7 Certificate

- Preview sertifikat.
- Nama anak.
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

Memberikan pengalaman sederhana untuk anak agar mereka bisa melihat progress, tugas, tabungan, dan badge tanpa merasa seperti menggunakan dashboard orang dewasa.

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

#### 7.2.3 Savings Goal

- Nama target.
- Nominal target.
- Nominal terkumpul.
- Progress visual toples koin / balon terisi.
- Pesan Kancil ketika progress naik.

#### 7.2.4 Three Pockets

- Tabung.
- Belanja.
- Berbagi.
- Visual warna berbeda.
- Bahasa sederhana.

#### 7.2.5 Badge Collection

- Badge aktif.
- Badge terkunci.
- Badge baru.
- Keterangan pendek.

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

## 7.3 Module 3 — Goal & Savings Module

### Purpose

Membantu anak memahami bahwa uang bisa diarahkan menuju tujuan tertentu, bukan hanya dikumpulkan atau dibelanjakan.

### Main Features

1. Set Target Tabungan.
2. Nama tujuan.
3. Nominal target.
4. Estimasi waktu.
5. Ikon tujuan.
6. Current amount.
7. Target amount.
8. Percentage progress.
9. Remaining amount.
10. Progress milestone: 25%, 50%, 75%, 100%.

### Visual Metaphor Options

1. Toples koin terisi.
2. Balon naik ke target.
3. Jejak Kancil menuju harta.
4. Gunung target dengan checkpoint.

### Parent Control

1. Orang tua menginput nominal.
2. Anak melihat progress.
3. Anak tidak mengubah data finansial utama tanpa persetujuan.

---

## 7.4 Module 4 — Three Pockets: Tabung–Belanja–Berbagi

### Purpose

Mengajarkan anak bahwa uang tidak hanya memiliki satu fungsi. Setiap uang masuk dapat dialokasikan ke tiga kantong:

1. **Tabung** — untuk tujuan masa depan.
2. **Belanja** — untuk kebutuhan/keinginan kecil.
3. **Berbagi** — untuk membantu orang lain.

### Main Features

1. Input uang masuk.
2. Alokasi ke tiga kantong.
3. Visual pocket cards.
4. Total per kantong.
5. Rasio alokasi.
6. Monthly summary.
7. Parent explanation note.
8. Child-friendly explanation.

### Default Allocation Suggestion

Default awal:

- Tabung: 50%.
- Belanja: 30%.
- Berbagi: 20%.

Angka ini harus bisa disesuaikan oleh orang tua pada fase interaktif.

---

## 7.5 Module 5 — Badge, Achievement & Streak System

### Purpose

Mendorong kebiasaan baik tanpa menjadikan uang sebagai satu-satunya motivasi.

### Badge Examples

1. **7 Hari Beruntun** — anak menyelesaikan aktivitas selama 7 hari berturut-turut.
2. **Penabung Konsisten** — anak menabung secara rutin selama beberapa minggu.
3. **Sahabat Berbagi** — anak mengalokasikan uang ke kantong Berbagi.
4. **Misi Mingguan Selesai** — semua tugas minggu ini selesai.
5. **Kancil Cerdik** — anak menyelesaikan mini-lesson.
6. **Jago Pilih Prioritas** — anak berhasil membedakan kebutuhan dan keinginan.

### Badge Rules

1. Badge harus positif.
2. Tidak mempermalukan anak.
3. Tidak menggunakan ranking antar-anak.
4. Tidak membandingkan anak satu dengan yang lain.
5. Fokus pada progress personal.

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
4. Anak melihat progress tabungan.
5. Anak melihat badge.
6. Anak membaca pesan motivasi.

### Flow 4 — Savings Goal

1. Parent membuat target tabungan.
2. Parent menentukan nominal target.
3. Parent input uang masuk.
4. Sistem membagi ke tiga kantong.
5. Anak melihat progress visual.
6. Badge muncul saat milestone tercapai.

### Flow 5 — Monthly Recap

1. Parent memilih bulan.
2. Sistem menampilkan ringkasan.
3. Parent melihat chart tugas dan tabungan.
4. Parent melihat badge dan streak.
5. Parent dapat preview sertifikat.
6. Parent export data bila diperlukan.

---

## 9. Information Architecture

### 9.1 Parent Dashboard

1. Header.
2. Quick Stats.
3. Child Selector.
4. Weekly Task Tracker.
5. Savings & Pockets.
6. Badge & Streak.
7. Monthly Recap.
8. Certificate.
9. Export / Import.
10. Settings.

### 9.2 Child View

1. Welcome.
2. Mission This Week.
3. Savings Goal.
4. Three Pockets.
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
  shareAmount
  allocationSavePercent
  allocationSpendPercent
  allocationSharePercent
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
  totalShared
  badgesUnlocked
  bestStreak
}
```

---

## 11. Functional Requirements

| ID | Requirement | Description |
|---|---|---|
| FR-001 | Manage children | Parent can manage up to 10 children. |
| FR-002 | Create weekly tasks | Parent can create weekly tasks with reward and status. |
| FR-003 | Track task completion | Parent can mark tasks as completed and see weekly progress. |
| FR-004 | Create savings goal | Parent can create savings goals for each child. |
| FR-005 | Child savings view | Child can view savings progress visually. |
| FR-006 | Three pockets | System supports Tabung, Belanja, Berbagi allocation. |
| FR-007 | Badge display | System displays unlocked and locked badges. |
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
2. Anak dapat melihat target tabungan secara visual.
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
7. Konsep tiga kantong menjadi core financial model.
8. Frontend fase pertama menggunakan HTML responsive + Tailwind Play CDN native.
9. Tidak ada backend sampai approval fase lanjutan.
10. Semua fitur disusun sebagai Source of Truth agar mudah dieksekusi bertahap.

---

## 15. Approval Gate

Sebelum masuk ke coding, dokumen ini perlu disetujui pada aspek:

1. Scope fitur.
2. Nama modul.
3. Struktur Parent Dashboard.
4. Struktur Child View.
5. Konsep tiga kantong.
6. Badge/streak logic.
7. Visual direction.
8. Fase implementasi.
9. Batasan frontend-only.
10. Prioritas MVP.
