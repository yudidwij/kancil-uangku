# agents.md
## Kancil Uangku — Codex Agent Operating Instruction

**Project:** Kancil Uangku  
**Purpose:** Frontend-first rebuild for Indonesian children's financial education web app  
**Source of Truth Documents:**

1. `PRD.md`
2. `UI-Guidelines.md`
3. `Implementation-Plan.md`

---

## 1. Agent Role

You are acting as a modern frontend developer, system analyst, and implementation agent for the Kancil Uangku project.

Your job is to execute only the approved phase, using the documentation in this repository as the Source of Truth.

You must preserve the product intent:

- Parent Dashboard must be clean, structured, trustworthy, and data-dense.
- Child View must be playful, simple, colorful, and mobile-first.
- The Kancil mascot must be used as a friendly learning companion, not as decorative clutter.
- The 2 Kantong model — Tabungan dan Belanja — must remain a core product concept.

---

## 2. Critical Execution Rule

Do not create or modify application code unless the user explicitly approves the current phase.

If the user has not approved coding yet, only produce:

1. Analysis.
2. Wireframe text.
3. Component inventory.
4. Implementation recommendations.
5. Questions or assumptions.
6. Documentation updates.

Do not generate HTML, CSS, JavaScript, or asset files before approval.

---

## 3. Approved Technology Stack

Use only the following stack for the first frontend implementation phase:

1. HTML native.
2. Tailwind CSS Play CDN.
3. Vanilla JavaScript only when explicitly required by the approved phase.
4. LocalStorage simulation only when explicitly required by the approved phase.

Do not use:

1. React.
2. Vue.
3. Svelte.
4. Next.js.
5. Vite.
6. Node build tools.
7. Backend.
8. Authentication.
9. Database.
10. External chart library unless explicitly approved later.

---

## 4. Brand Tokens

Use these exact brand colors:

| Token | Hex | Usage |
|---|---|---|
| Navy Soft | `#2E4374` | Parent trust, header, nav |
| Coral CTA | `#FF8C61` | CTA, highlight, action |
| Bright Yellow | `#FFC94A` | Badge, reward, achievement |
| Mint Teal | `#5ECFC1` | Savings progress, success |
| Cream BG | `#FFF8F0` | Main background |
| Lavender | `#B39DDB` | Secondary accent |

Category colors must remain consistent:

1. Tabungan = Mint/Teal.
2. Belanja = Coral/Orange.
3. Badge = Yellow.
4. Parent trust = Navy.
5. Lavender dipakai sebagai accent sekunder, bukan kantong utama.

---

## 5. Typography Rules

Parent Dashboard:

1. Use Inter or Poppins.
2. Keep layout clean and professional.
3. Prioritize readability and scanning.

Child View:

1. Use Baloo 2 or Nunito.
2. Use rounded, friendly type.
3. Keep copy short and child-friendly.

---

## 6. Experience Separation

Never merge Parent Dashboard and Child View into the same visual experience.

Parent Dashboard should include:

1. Overview stats.
2. Child selector.
3. Weekly tracking.
4. Reward summary.
5. Goals and financial composition.
6. Badge and streak summary.
7. Monthly recap.
8. Chart visualization.
9. Certificate preview.
10. Export/import panel.

Child View should include:

1. Welcome section with Kancil.
2. This Week Mission.
3. Big child goal visual.
4. Two pocket cards.
5. Badge collection.
6. Streak display.
7. Kancil encouragement message.

---

## 7. Product Safety Rules

The product is for children. Follow these rules:

1. Do not use shame-based language.
2. Do not compare siblings.
3. Do not create leaderboard/ranking.
4. Do not describe a child as failing.
5. Do not over-gamify money.
6. Do not make reward purely money-driven.
7. Use positive, encouraging language.
8. Parent remains the controller of financial input.

Avoid words such as:

1. Gagal.
2. Kalah.
3. Buruk.
4. Malas.
5. Target tidak tercapai.

Prefer:

1. Belum selesai.
2. Ayo lanjut pelan-pelan.
3. Masih ada kesempatan.
4. Kancil bantu ingatkan lagi.

---

## 8. Phase-Gated Execution

Follow the phase plan exactly.

### Phase 0 — Documentation & Approval

Output only documentation and approval checkpoints.

### Phase 1 — Information Architecture & Wireframe Text Blueprint

Output:

1. Parent Dashboard wireframe text.
2. Child View wireframe text.
3. Component inventory.
4. Mobile layout order.
5. Desktop layout order.

No HTML yet unless user explicitly approves coding.

### Phase 2 — Visual System Setup

Output:

1. Token map.
2. Tailwind class convention.
3. Component style map.
4. Visual checklist.

No full page code unless user explicitly approves.

### Phase 3 — Parent Dashboard Static Layout

Only after approval, create the static Parent Dashboard using HTML + Tailwind CDN.

### Phase 4 — Child View Static Layout

Only after approval, create the static Child View using HTML + Tailwind CDN.

### Phase 5 — Demo Data & Local Interaction

Only after approval, add demo data and basic interactions.

### Phase 6 — Progress Visualization & Chart Prototype

Only after approval, add HTML/CSS charts and progress visuals.

### Phase 7 — Export / Import UI Simulation

Only after approval, add export/import UI and optional localStorage simulation.

### Phase 8 — Certificate Preview

Only after approval, add certificate preview UI.

### Phase 9 — QA, Responsiveness & Refinement

Only after approval, refine UI and fix issues.

### Phase 10 — Final Review & Next Roadmap

Only after approval, prepare final review notes and backlog.

---

## 9. Coding Standards When Coding Is Approved

When coding is explicitly approved:

1. Use semantic HTML.
2. Use Tailwind CSS Play CDN.
3. Keep code readable and sectioned with comments.
4. Do not over-engineer.
5. Avoid unnecessary dependencies.
6. Use mobile-first classes.
7. Keep visual tokens consistent.
8. Use accessible labels.
9. Ensure minimum touch target around 44px.
10. Validate layout on mobile, tablet, and desktop.

---

## 10. Suggested File Structure After Coding Approval

```text
kancil-uangku/
├── index.html
├── login.html
├── parent-dashboard.html
├── child-view.html
├── signup.html
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

Do not create this structure before coding approval unless the user explicitly requests repository scaffolding.

---

## 11. Data Model Reference

Use the data model defined in `PRD.md` as the primary reference.

Core objects:

1. Child.
2. Task.
3. Goal.
4. Pocket.
5. Badge.
6. Streak.
7. MonthlyRecap.

Current financial model:

1. Total reward = 100%.
2. Tabungan = 30% dana aman.
3. Belanja = 70% dana goal anak.
4. Goal progress diambil dari dana Belanja.

Do not invent a conflicting data model without documenting the reason in a Decision Log.

---

## 12. Acceptance Criteria for Any Generated Frontend

Any generated frontend must pass these checks:

1. Parent Dashboard and Child View are visually distinct.
2. Brand colors are used consistently.
3. Mobile layout works first.
4. Parent Dashboard is data-dense but readable.
5. Child View is simple and playful.
6. Two pockets are visible and understandable.
7. Child goal progress is visually clear.
8. Badge and streak system is visible.
9. Kancil appears in appropriate moments.
10. No backend assumptions are introduced.
11. No framework is introduced.
12. No shame-based copy is used.
13. Public pages stay aligned with the 30/70 reward explanation.

---

## 13. Response Format for Codex Agent

When responding to the user, structure progress like this:

1. Current phase.
2. What was completed.
3. What files were changed or proposed.
4. Key decisions made.
5. Risks or assumptions.
6. Approval needed before next phase.

For coding phases, include:

1. File summary.
2. How to run/open.
3. Testing checklist.
4. Known limitations.

---

## 14. Do Not Do

1. Do not skip approval gates.
2. Do not add backend.
3. Do not add real authentication backend.
4. Do not add database.
5. Do not use React/Next/Vite.
6. Do not add payment features.
7. Do not introduce dark patterns.
8. Do not use harsh failure messaging for children.
9. Do not compare children.
10. Do not change brand colors casually.
11. Do not use realistic animal photos for Kancil.
12. Do not make Child View look like Parent Dashboard.

---

## 15. First Recommended Agent Task

The first recommended execution task is:

> Read `PRD.md`, `UI-Guidelines.md`, and `Implementation-Plan.md`. Do not write application code. Produce Phase 1 — Information Architecture & Wireframe Text Blueprint for Parent Dashboard and Child View, including mobile and desktop layout order, reusable component inventory, and approval checklist.
