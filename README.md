# Kancil Uangku — SOT Documentation Pack

This repository contains the Source of Truth documentation, static frontend prototype, and MariaDB starter schema for **Kancil Uangku**, a children's financial education web app for Indonesian families.

## Included Files

1. `PRD.md` — Product Requirements Document.
2. `UI-Guidelines.md` — Visual, interaction, mascot, and responsive design rules.
3. `Implementation-Plan.md` — Phase-by-phase frontend implementation plan.
4. `agents.md` — Codex/agent operating instruction.
5. `database.sql` — MariaDB schema draft + demo seed data that follows the current frontend model.

## Current Product Direction

1. Model keuangan memakai `2 kantong`: `Tabungan 30%` dan `Belanja 70%`.
2. Progress goal anak berasal dari dana `Belanja 70%`.
3. Badge ditrack per bulan aktif dan dapat dikejar lagi pada periode bulan berikutnya.
4. Sertifikat menampilkan nama parent dari session demo yang aktif.
5. Landing page, signup, dan login sudah menjadi bagian resmi flow prototype.
6. Draft database MariaDB tersedia untuk memetakan data frontend ke struktur CRUD backend.

## Current Repo Artifacts

1. `index.html` — landing page.
2. `signup.html` — create account demo.
3. `login.html` — login demo.
4. `parent-dashboard.html` — parent dashboard prototype.
5. `child-view.html` — child view prototype.
6. `data/demo-data.js` — frontend dummy data source.
7. `js/app.js` — shared data, session, export/import, and local interaction logic.
8. `js/dashboard.js` — parent dashboard rendering and interactions.
9. `js/child-view.js` — child view rendering and monthly badge behavior.
10. `database.sql` — MariaDB schema + dummy seed data aligned to the frontend.

## Important Rule

Do not execute application code before approval.

Recommended first Codex task:

> Read all documentation files and produce Phase 1 — Information Architecture & Wireframe Text Blueprint. Do not generate HTML/CSS/JS yet.
