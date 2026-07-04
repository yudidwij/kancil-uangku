# UI Guidelines
## Kancil Uangku — Frontend Visual & Interaction System

**Version:** 1.0 Draft  
**Status:** For Review & Approval  
**Scope:** UI system for HTML responsive + Tailwind CSS Play CDN native  
**Execution Rule:** Do not create application code before approval

---

## 1. Design Philosophy

Kancil Uangku harus menggabungkan dua rasa visual:

1. **Trustworthy for Parents** — rapi, clean, data-dense, profesional, dan mudah dipahami.
2. **Playful for Children** — ceria, visual besar, rounded, colorful, dan terasa seperti ditemani karakter Kancil.

Aplikasi tidak boleh terlihat seperti aplikasi keuangan orang dewasa yang kaku, tetapi juga tidak boleh terlihat seperti game anak yang terlalu ramai.

**Design principle:**

> Playful financial learning with parent-grade clarity.

---

## 2. Brand Personality

### 2.1 Core Traits

1. Cerdik.
2. Hangat.
3. Aman.
4. Edukatif.
5. Ramah anak.
6. Tepercaya untuk orang tua.
7. Optimistis.
8. Tidak menggurui.

### 2.2 Visual Personality

1. Rounded.
2. Flat illustration.
3. Soft shadows.
4. Warm background.
5. Friendly mascot.
6. Large touch targets.
7. Clear hierarchy.
8. Soft but vibrant colors.

---

## 3. Color System

### 3.1 Primary Colors

| Token | Color | Hex | Usage |
|---|---:|---:|---|
| Navy Soft | Navy lembut | `#2E4374` | Header, sidebar, parent trust elements |
| Coral CTA | Coral/orange hangat | `#FF8C61` | CTA, highlight, active state |
| Bright Yellow | Kuning cerah | `#FFC94A` | Badge, reward, stars |
| Mint Teal | Mint/teal muda | `#5ECFC1` | Savings progress, success state |
| Cream BG | Krem/off-white | `#FFF8F0` | Main background |
| Lavender | Ungu lavender lembut | `#B39DDB` | Soft accent, secondary highlight |

### 3.2 Semantic Color Usage

| Meaning | Recommended Color |
|---|---|
| Trust / Parent control | Navy Soft |
| Action / CTA | Coral CTA |
| Achievement / Badge | Bright Yellow |
| Savings / Success | Mint Teal |
| Secondary accent | Lavender |
| Background | Cream BG |
| Warning gentle | Coral with light background |
| Neutral card | White / Cream |

### 3.3 Category Mapping

| Category | Color |
|---|---|
| Tabungan | Mint/Teal `#5ECFC1` |
| Belanja | Coral/Orange `#FF8C61` |
| Badge | Yellow `#FFC94A` |
| Parent trust | Navy `#2E4374` |

### 3.4 Color Rules

1. Parent Dashboard harus dominan Navy, Cream, White, dan Coral.
2. Child View boleh lebih banyak memakai Yellow, Mint, Coral, dan Lavender.
3. Jangan gunakan warna merah agresif untuk error anak.
4. Jangan terlalu banyak warna dalam satu card.
5. Setiap kategori harus konsisten.

---

## 4. Typography

### 4.1 Parent Dashboard

Recommended fonts:

1. Inter.
2. Poppins.

Usage:

1. Heading: Poppins SemiBold.
2. Body: Inter Regular.
3. Data/Number: Inter Medium/SemiBold.

Tone:

1. Clean.
2. Professional.
3. Efficient.
4. Easy to scan.

### 4.1.a Landing Page, Login, Signup

Recommended fonts:

1. Inter.
2. Poppins.

Tone:

1. Warm.
2. Professional.
3. Friendly.
4. Marketing-friendly.

### 4.2 Child View

Recommended fonts:

1. Baloo 2.
2. Nunito.

Usage:

1. Heading: Baloo 2 Bold.
2. Body: Nunito Regular.
3. Button: Nunito Bold.

Tone:

1. Rounded.
2. Friendly.
3. Soft.
4. Playful.

### 4.3 Type Scale

| Element | Mobile | Desktop |
|---|---:|---:|
| Page Title | 24–28px | 32–40px |
| Section Title | 18–22px | 24–28px |
| Card Title | 16–18px | 18–20px |
| Body Text | 14–16px | 15–16px |
| Small Label | 11–13px | 12–13px |
| Big Child Number | 32–44px | 48–64px |

---

## 5. Layout System

### 5.1 General Layout

1. Mobile-first.
2. Card-based.
3. Large rounded corners.
4. Clear spacing.
5. Sticky or visible key actions.
6. Parent Dashboard can use denser grid.
7. Child View must use single-column dominant layout.

### 5.1.a Public Page Layout

Landing Page:

1. Hero-first.
2. Illustration-led.
3. Strong CTA hierarchy.
4. Section spacing lebih lega dibanding dashboard.

Login / Signup:

1. Centered form card.
2. Single focus action.
3. Supporting illustration boleh ada, tapi tidak boleh mengganggu form.

### 5.2 Parent Dashboard Layout

Recommended sections:

1. Top Header.
2. Quick Stats Cards.
3. Child Selector.
4. Weekly Progress.
5. Task Table/Card List.
6. Goals & Financial Composition.
7. Badge/Streak Summary.
8. Monthly Analytics.
9. Certificate / Export Tools.

Desktop layout:

1. 12-column grid.
2. Dashboard cards in 3–4 columns.
3. Task tracker as table or dense cards.
4. Analytics side-by-side.

Mobile layout:

1. Single column.
2. Sticky child selector optional.
3. Stats as horizontal scroll cards.
4. Task list as compact cards.

### 5.3 Child View Layout

Recommended sections:

1. Hero with Kancil.
2. This Week Mission.
3. Big Child Goal Visual.
4. Two Pockets.
5. Badge Carousel.
6. Kancil Encouragement.

Mobile layout:

1. One main action per section.
2. Large visual blocks.
3. Horizontal badge carousel.
4. No dense table.

---

## 6. Component Guidelines

## 6.1 Buttons

### Primary Button

Usage:

1. Simpan.
2. Tambah Tugas.
3. Tambah Anak.
4. Buat Target.
5. Lihat Child View.

Style:

1. Coral background.
2. White text.
3. Rounded 16–20px.
4. Medium shadow.
5. Large tap area.

### Secondary Button

Usage:

1. Export.
2. Import.
3. Preview Sertifikat.
4. Edit.

Style:

1. White background.
2. Navy border/text.
3. Rounded 14–18px.

### Outline / Auth Button

Usage:

1. Masuk.
2. Kembali ke landing.
3. Secondary auth action.

Style:

1. White atau transparent background.
2. Navy border/text.
3. Rounded 16–20px.
4. Light shadow.

### Child Button

Usage:

1. Lihat Misiku.
2. Aku Selesai.
3. Lihat Badge.

Style:

1. Bright color.
2. Larger height.
3. Rounded pill.
4. Optional icon.

---

## 6.2 Cards

### Parent Cards

Style:

1. White or light cream.
2. Radius 16px.
3. Soft shadow.
4. Compact content.
5. Clear label and number.
6. Small icon.

Usage:

1. Summary metrics.
2. Child summary.
3. Monthly recap.
4. Pocket breakdown.

### Marketing / Form Cards

Style:

1. White background.
2. Radius 24–32px.
3. Soft shadow lebih terasa.
4. Spacing lega.
5. Cocok untuk landing support block, login, dan signup.

### Child Cards

Style:

1. Larger radius 20px.
2. More color fill.
3. Big icons.
4. Friendly illustration.
5. Minimal text.

Usage:

1. Task mission.
2. Goal progress.
3. Badge.
4. Pocket explanation.

---

## 6.3 Progress Bars

### Safe Savings Progress Bar

Style:

1. Mint/teal fill.
2. Rounded full.
3. Animated width.
4. Label percentage.
5. Optional coin icon.

### Goal Progress Bar

Style:

1. Coral fill.
2. Rounded full.
3. Animated width or jar-fill height.
4. Label percentage.
5. Harus konsisten dengan dana belanja sebagai sumber goal.

### Goal Visual Alternatives

1. Toples koin terisi.
2. Balon naik ke target.
3. Jejak Kancil menuju harta.
4. Gunung target dengan checkpoint.

### Rules

1. Animation should be subtle.
2. Do not overuse motion.
3. Progress must show actual percentage.
4. Always include text label, not only visual.
5. Goal anak dan tabungan aman harus dibedakan warnanya dengan jelas.

---

## 6.4 Badge Components

### Badge States

1. Unlocked.
2. Locked.
3. Newly Unlocked.
4. Featured Badge.

### Badge Visual

1. Circular or shield-like.
2. Yellow dominant.
3. Small Kancil accent.
4. Icon + title.
5. Short explanation.
6. Locked badge memakai gembok lucu atau chip terkunci yang ramah anak.
7. Setiap badge punya ikon sesuai tema.

### Badge Example

**7 Hari Beruntun**  
Icon: small flame/star.  
Color: Yellow + Coral.  
Message: “Kancil bangga! Kamu konsisten minggu ini.”

### Monthly Badge Rule

1. Child View menampilkan badge untuk bulan aktif.
2. Badge terkunci tetap tampil agar anak tahu target yang masih bisa dikejar.
3. Awal bulan baru, badge bulan berjalan dapat dikejar lagi sebagai target periode berikutnya.

---

## 6.5 Empty States

Empty state wajib menggunakan maskot Kancil.

### No Child Yet

“Kancil belum punya teman belajar. Tambahkan nama anak dulu, yuk.”

### No Task Yet

“Misi minggu ini masih kosong. Buat misi kecil pertama bersama Kancil.”

### No Child Goal Yet

“Kancil siap bantu menyusun goal pertama. Tentukan targetmu.”

### No Badge Yet

“Badge pertama masih menunggu. Selesaikan misi kecil minggu ini.”

Tone:

1. Positive.
2. Encouraging.
3. No blame.
4. Clear next action.

---

## 7. Mascot Guidelines — Kancil

### 7.1 Role of Mascot

Kancil berperan sebagai:

1. Pendamping anak.
2. Pemberi apresiasi.
3. Pemandu mini-lesson.
4. Karakter pada empty state.
5. Identitas visual badge.
6. Pembawa pesan positif.

### 7.2 Visual Style

1. Flat illustration.
2. Rounded form.
3. Expressive but simple.
4. Friendly eyes.
5. Warm smile.
6. Optional scarf/bag kecil sebagai identitas.
7. Tidak realistis.
8. Tidak terlalu kompleks.

### 7.3 Mascot Usage Rules

1. Gunakan Kancil lebih sering di Child View.
2. Gunakan Kancil secukupnya di Parent Dashboard.
3. Kancil tidak boleh menggantikan data penting.
4. Kancil tidak boleh menyampaikan pesan yang membuat anak merasa gagal.
5. Kancil dapat muncul sebagai avatar, badge icon, empty state, notification bubble, dan mini-lesson guide.

### 7.4 Public Illustration Rules

1. Landing hero menggunakan ilustrasi Kancil besar sebagai focal point.
2. CTA banner dark navy boleh memakai siluet atau maskot kecil.
3. Login/signup boleh memakai ilustrasi support ukuran medium.
4. Untuk landing page statis, inline SVG dianjurkan agar scalable dan tanpa asset eksternal.
5. Gaya visual: flat, kawaii, bentuk sederhana, outline ringan.

---

## 8. Iconography

### 8.1 Style

1. Rounded line icons.
2. Flat filled icons for Child View.
3. Consistent stroke width.
4. Friendly, not corporate-heavy.

### 8.2 Suggested Icon Mapping

| Concept | Icon |
|---|---|
| Tabungan | Jar / coin |
| Belanja | Small basket |
| Accent edukasi | Heart / sparkle |
| Badge | Star / medal |
| Streak | Flame / footprints |
| Task | Checklist |
| Reward | Gift |
| Certificate | Ribbon |
| Parent Settings | Gear |
| Export | Download |
| Import | Upload |

---

## 9. Data Visualization Guidelines

### 9.1 Parent Dashboard Charts

Required visuals:

1. Weekly task completion bar chart.
2. Monthly savings trend line/bar chart.
3. Pocket allocation distribution.
4. Badge count summary.

### 9.2 Chart Style

1. Simple.
2. No heavy chart library requirement in MVP.
3. Can be built with HTML/CSS bars first.
4. Use clear labels.
5. Avoid tiny legends.
6. Mobile readable.

### 9.3 Chart Colors

| Chart | Color |
|---|---|
| Weekly Tasks | Coral |
| Tabungan Trend | Mint |
| Spending | Coral |
| Badge | Yellow |

### 9.4 Public Page Content Direction

Landing page FAQ dan supporting copy harus:

1. Menjelaskan manfaat program edukasi finansial anak.
2. Menjelaskan logika reward 100% menjadi tabungan 30% dan dana belanja 70%.
3. Menghindari FAQ teknis seperti status backend pada area marketing utama.
4. Menjaga CTA tetap hangat, aktif, dan selaras dengan karakter Kancil.

---

## 10. Interaction Guidelines

### 10.1 Parent Dashboard

1. Dense but readable.
2. Clear edit actions.
3. Avoid hidden critical actions.
4. Use confirmation for reset.
5. Export/import should feel safe.
6. Monthly recap should be skimmable.

### 10.2 Child View

1. One primary action per screen/section.
2. Use encouraging microcopy.
3. Big touch targets.
4. Avoid too much text.
5. Use motion only for delight.
6. Make progress visually obvious.

---

## 11. Microcopy Guidelines

### 11.1 Voice

1. Hangat.
2. Cerdas.
3. Ringan.
4. Positif.
5. Tidak menghakimi.

### 11.2 Parent Dashboard Copy

Use clear professional labels:

1. “Progress Minggu Ini”.
2. “Rekap Bulanan”.
3. “Total Tabungan Aman”.
4. “Tugas Selesai”.
5. “Export Data”.
6. “Preview Sertifikat”.

### 11.3 Child View Copy

Use friendly child-facing language:

1. “Misi Minggu Ini”.
2. “Goal Belanjaku”.
3. “Dana Belanjaku”.
4. “Badge Hebatku”.
5. “Kancil bangga sama kamu!”.
6. “Sedikit lagi menuju target!”.
7. “Masih bisa dikejar bulan ini.”.

### 11.4 Avoid

Avoid:

1. “Gagal”.
2. “Kamu kalah”.
3. “Anak lain lebih baik”.
4. “Target tidak tercapai”.
5. “Buruk”.
6. “Malas”.

Preferred alternatives:

1. “Belum selesai”.
2. “Ayo lanjut pelan-pelan”.
3. “Masih ada kesempatan”.
4. “Kancil bantu ingatkan lagi”.

---

## 12. Responsive Rules

### 12.1 Mobile

1. Primary target.
2. Single-column layout.
3. Cards stacked vertically.
4. Horizontal scroll for summary cards.
5. Buttons full-width when important.
6. Child View optimized for thumb interaction.

### 12.2 Tablet

1. Two-column grid.
2. Parent dashboard starts becoming data-dense.
3. Child View remains visual.

### 12.3 Desktop

1. Parent dashboard can use sidebar/topbar.
2. 3–4 stat cards per row.
3. Charts side-by-side.
4. Task table can be shown.
5. Child View can remain centered with max width.

---

## 13. UI State Requirements

Every key component must define these states:

1. Default.
2. Hover.
3. Active.
4. Disabled.
5. Empty.
6. Loading placeholder.
7. Success.
8. Warning.
9. Error / invalid input.

For MVP static frontend, loading state can be represented as skeleton placeholder, even if no backend exists yet.

---

## 14. Accessibility Rules

1. Minimum touch target: 44px height.
2. Text must be readable on mobile.
3. Avoid color-only meaning.
4. Use labels with icons.
5. Maintain enough contrast.
6. Avoid fast animation.
7. Child-facing text should be simple.
8. Parent dashboard numbers should have labels.

---

## 15. Design Do & Don’t

### 15.1 Do

1. Use rounded cards.
2. Use warm cream background.
3. Use Kancil for emotional identity.
4. Use clear progress visualization.
5. Separate parent and child experience.
6. Keep mobile layout clean.
7. Use data-dense dashboard only for parent.

### 15.2 Don’t

1. Do not make Child View look like admin dashboard.
2. Do not use realistic animal photos.
3. Do not overuse gradients.
4. Do not make charts too complex.
5. Do not use harsh red failure states.
6. Do not compare siblings.
7. Do not gamify money in a risky way.
8. Do not hide export/import controls too deeply.
