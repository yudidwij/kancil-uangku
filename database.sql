-- Kancil Uangku
-- MariaDB 10.4 compatible schema + demo seed data
-- Charset: utf8mb4
-- Assumption:
-- 1. Seluruh data demo frontend saat ini dimiliki oleh satu parent account demo.
-- 2. Progress goal berasal dari pocket belanja 70%.
-- 3. Tabungan = 30% reward uang yang selesai.

CREATE DATABASE IF NOT EXISTS `kancil_uangku`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `kancil_uangku`;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `parent_sessions`;
DROP TABLE IF EXISTS `child_savings_trends`;
DROP TABLE IF EXISTS `child_monthly_task_stats`;
DROP TABLE IF EXISTS `monthly_recaps`;
DROP TABLE IF EXISTS `streaks`;
DROP TABLE IF EXISTS `badges`;
DROP TABLE IF EXISTS `pockets`;
DROP TABLE IF EXISTS `goals`;
DROP TABLE IF EXISTS `tasks`;
DROP TABLE IF EXISTS `children`;
DROP TABLE IF EXISTS `parent_users`;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE `parent_users` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `parent_code` VARCHAR(50) NOT NULL,
  `parent_name` VARCHAR(120) NOT NULL,
  `email` VARCHAR(190) NOT NULL,
  `password_hash` VARCHAR(255) DEFAULT NULL,
  `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_parent_users_parent_code` (`parent_code`),
  UNIQUE KEY `uq_parent_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `children` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `child_code` VARCHAR(50) NOT NULL,
  `parent_user_id` BIGINT UNSIGNED NOT NULL,
  `name` VARCHAR(120) NOT NULL,
  `avatar_color` CHAR(7) NOT NULL,
  `active_status` TINYINT(1) NOT NULL DEFAULT 0,
  `focus_text` VARCHAR(255) DEFAULT NULL,
  `child_intro` TEXT DEFAULT NULL,
  `hero_praise` VARCHAR(255) DEFAULT NULL,
  `child_message` TEXT DEFAULT NULL,
  `week_label` VARCHAR(50) DEFAULT NULL,
  `created_at` DATE NOT NULL,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_children_child_code` (`child_code`),
  KEY `idx_children_parent_user_id` (`parent_user_id`),
  CONSTRAINT `fk_children_parent_user`
    FOREIGN KEY (`parent_user_id`) REFERENCES `parent_users` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `tasks` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `task_code` VARCHAR(50) NOT NULL,
  `child_id` BIGINT UNSIGNED NOT NULL,
  `week_number` TINYINT UNSIGNED NOT NULL,
  `title` VARCHAR(150) NOT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  `reward_type` ENUM('uang', 'non-uang', 'badge', 'badge+uang') NOT NULL,
  `reward_amount` INT UNSIGNED NOT NULL DEFAULT 0,
  `reward_label` VARCHAR(150) DEFAULT NULL,
  `note` VARCHAR(255) DEFAULT NULL,
  `status` ENUM('belum selesai', 'berjalan', 'selesai') NOT NULL DEFAULT 'belum selesai',
  `completed_at` DATE DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_tasks_task_code` (`task_code`),
  KEY `idx_tasks_child_id_week_number` (`child_id`, `week_number`),
  CONSTRAINT `fk_tasks_child`
    FOREIGN KEY (`child_id`) REFERENCES `children` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `goals` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `goal_code` VARCHAR(50) NOT NULL,
  `child_id` BIGINT UNSIGNED NOT NULL,
  `goal_name` VARCHAR(150) NOT NULL,
  `target_amount` INT UNSIGNED NOT NULL,
  `current_amount` INT UNSIGNED NOT NULL DEFAULT 0,
  `base_current_amount` INT UNSIGNED NOT NULL DEFAULT 0,
  `start_date` DATE NOT NULL,
  `target_date` DATE DEFAULT NULL,
  `icon` VARCHAR(50) DEFAULT NULL,
  `status` ENUM('aktif', 'selesai', 'ditunda') NOT NULL DEFAULT 'aktif',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_goals_goal_code` (`goal_code`),
  UNIQUE KEY `uq_goals_child_id` (`child_id`),
  CONSTRAINT `fk_goals_child`
    FOREIGN KEY (`child_id`) REFERENCES `children` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `pockets` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `child_id` BIGINT UNSIGNED NOT NULL,
  `save_amount` INT UNSIGNED NOT NULL DEFAULT 0,
  `spend_amount` INT UNSIGNED NOT NULL DEFAULT 0,
  `allocation_save_percent` DECIMAL(5,2) NOT NULL DEFAULT 30.00,
  `allocation_spend_percent` DECIMAL(5,2) NOT NULL DEFAULT 70.00,
  `base_save_amount` INT UNSIGNED NOT NULL DEFAULT 0,
  `base_spend_amount` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_pockets_child_id` (`child_id`),
  CONSTRAINT `fk_pockets_child`
    FOREIGN KEY (`child_id`) REFERENCES `children` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `badges` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `badge_code` VARCHAR(50) NOT NULL,
  `child_id` BIGINT UNSIGNED NOT NULL,
  `badge_name` VARCHAR(120) NOT NULL,
  `badge_type` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  `unlocked_at` DATE DEFAULT NULL,
  `status` ENUM('locked', 'unlocked') NOT NULL DEFAULT 'locked',
  `period_month_label` VARCHAR(30) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_badges_badge_code` (`badge_code`),
  KEY `idx_badges_child_period` (`child_id`, `period_month_label`),
  CONSTRAINT `fk_badges_child`
    FOREIGN KEY (`child_id`) REFERENCES `children` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `streaks` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `child_id` BIGINT UNSIGNED NOT NULL,
  `current_streak` INT UNSIGNED NOT NULL DEFAULT 0,
  `best_streak` INT UNSIGNED NOT NULL DEFAULT 0,
  `last_activity_date` DATE DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_streaks_child_id` (`child_id`),
  CONSTRAINT `fk_streaks_child`
    FOREIGN KEY (`child_id`) REFERENCES `children` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `monthly_recaps` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `child_id` BIGINT UNSIGNED NOT NULL,
  `period_month_label` VARCHAR(30) NOT NULL,
  `total_tasks` INT UNSIGNED NOT NULL DEFAULT 0,
  `completed_tasks` INT UNSIGNED NOT NULL DEFAULT 0,
  `total_reward` INT UNSIGNED NOT NULL DEFAULT 0,
  `total_saved` INT UNSIGNED NOT NULL DEFAULT 0,
  `total_spent` INT UNSIGNED NOT NULL DEFAULT 0,
  `badges_unlocked` INT UNSIGNED NOT NULL DEFAULT 0,
  `best_streak` INT UNSIGNED NOT NULL DEFAULT 0,
  `base_total_reward` INT UNSIGNED NOT NULL DEFAULT 0,
  `base_total_saved` INT UNSIGNED NOT NULL DEFAULT 0,
  `base_total_spent` INT UNSIGNED NOT NULL DEFAULT 0,
  `base_total_tasks` INT UNSIGNED NOT NULL DEFAULT 0,
  `base_completed_tasks` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_monthly_recaps_child_period` (`child_id`, `period_month_label`),
  CONSTRAINT `fk_monthly_recaps_child`
    FOREIGN KEY (`child_id`) REFERENCES `children` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `child_monthly_task_stats` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `child_id` BIGINT UNSIGNED NOT NULL,
  `period_label` VARCHAR(30) NOT NULL,
  `week_1_tasks` INT UNSIGNED NOT NULL DEFAULT 0,
  `week_2_tasks` INT UNSIGNED NOT NULL DEFAULT 0,
  `week_3_tasks` INT UNSIGNED NOT NULL DEFAULT 0,
  `week_4_tasks` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_child_monthly_task_stats_child_period` (`child_id`, `period_label`),
  CONSTRAINT `fk_child_monthly_task_stats_child`
    FOREIGN KEY (`child_id`) REFERENCES `children` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `child_savings_trends` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `child_id` BIGINT UNSIGNED NOT NULL,
  `period_label` VARCHAR(30) NOT NULL,
  `sort_order` TINYINT UNSIGNED NOT NULL,
  `amount` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_child_savings_trends_child_period` (`child_id`, `period_label`),
  KEY `idx_child_savings_trends_child_order` (`child_id`, `sort_order`),
  CONSTRAINT `fk_child_savings_trends_child`
    FOREIGN KEY (`child_id`) REFERENCES `children` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `parent_sessions` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `parent_user_id` BIGINT UNSIGNED NOT NULL,
  `session_token` VARCHAR(128) NOT NULL,
  `remember_login` TINYINT(1) NOT NULL DEFAULT 0,
  `last_login_at` DATETIME DEFAULT NULL,
  `expires_at` DATETIME DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_parent_sessions_session_token` (`session_token`),
  KEY `idx_parent_sessions_parent_user_id` (`parent_user_id`),
  CONSTRAINT `fk_parent_sessions_parent_user`
    FOREIGN KEY (`parent_user_id`) REFERENCES `parent_users` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `parent_users`
  (`id`, `parent_code`, `parent_name`, `email`, `password_hash`, `status`, `created_at`)
VALUES
  (1, 'parent-demo-wijaya', 'Ayu Wijaya', 'ayu.wijaya@kanciluangku.local', '$2y$10$demo.frontend.only.seed.hash', 'active', '2026-07-05 09:00:00');

INSERT INTO `children`
  (`id`, `child_code`, `parent_user_id`, `name`, `avatar_color`, `active_status`, `focus_text`, `child_intro`, `hero_praise`, `child_message`, `week_label`, `created_at`)
VALUES
  (1, 'nala', 1, 'Nala Wijaya', '#5ECFC1', 1, 'Fokus goal sepeda baru', 'Sedikit demi sedikit tetap berarti. Yuk lihat misi minggu ini dan dana goal-mu yang makin dekat ke sepeda baru.', 'Kancil bangga sama kamu!', 'Tabunganmu bertambah dan dana belanjamu mulai rapi. Yuk lanjut lagi besok.', 'Minggu 2', '2026-05-01'),
  (2, 'rafi', 1, 'Rafi Wijaya', '#FF8C61', 0, 'Goal buku komik edukasi', 'Hari ini tetap seru. Yuk cek misi kecilmu dan lihat dana goal buku komik yang terus bertambah.', 'Kancil senang kamu terus mencoba!', 'Beberapa misi sudah selesai, tabunganmu juga bergerak. Pelan-pelan tetap hebat, ya.', 'Minggu 2', '2026-05-15'),
  (3, 'asha', 1, 'Asha Wijaya', '#B39DDB', 0, 'Mulai kebiasaan menabung kecil', 'Kancil senang lihat kamu mulai belajar menabung. Yuk lanjutkan misi kecilmu hari ini.', 'Langkah kecilmu sudah berarti!', 'Misinya belum semua selesai, tapi kamu sudah mulai dengan baik. Masih ada kesempatan besok.', 'Minggu 2', '2026-06-01');

INSERT INTO `tasks`
  (`task_code`, `child_id`, `week_number`, `title`, `description`, `reward_type`, `reward_amount`, `reward_label`, `note`, `status`, `completed_at`)
VALUES
  ('t-nala-1', 1, 2, 'Rapikan meja belajar', 'Rutinitas pagi sebelum sekolah', 'badge+uang', 5000, 'Badge + Rp5.000', 'Konsisten 4 hari', 'selesai', '2026-07-02'),
  ('t-nala-2', 1, 2, 'Catat uang saku harian', 'Belajar membedakan tabung dan belanja', 'non-uang', 0, 'Waktu bermain ekstra', 'Masih ada kesempatan', 'berjalan', NULL),
  ('t-nala-3', 1, 2, 'Sisihkan untuk tabungan', 'Masukkan sebagian reward ke tabungan masa depan', 'badge', 0, 'Sticker badge empati', 'Kancil bantu ingatkan lagi', 'belum selesai', NULL),
  ('t-nala-4', 1, 2, 'Bawa botol minum sendiri', 'Belajar hemat sambil menjaga kebiasaan baik', 'non-uang', 0, 'Pilih cerita malam', 'Selesai 2 kali minggu ini', 'selesai', '2026-07-03'),
  ('t-rafi-1', 2, 2, 'Catat belanja kecil', 'Supaya tahu mana kebutuhan dan keinginan', 'badge', 0, 'Badge teliti', 'Sudah 3 hari dicatat', 'berjalan', NULL),
  ('t-rafi-2', 2, 2, 'Simpan uang kembalian', 'Masukkan sebagian ke tabungan', 'uang', 4000, 'Rp4.000', 'Selesai kemarin', 'selesai', '2026-07-03'),
  ('t-rafi-3', 2, 2, 'Pilih satu barang yang ditunda', 'Latihan prioritas sederhana', 'non-uang', 0, 'Main keluarga ekstra', 'Masih dipikirkan', 'belum selesai', NULL),
  ('t-asha-1', 3, 2, 'Masukkan uang ke tabungan', 'Belajar menyimpan uang untuk tujuan kecilmu', 'badge', 0, 'Badge hati hangat', 'Masih ada kesempatan', 'belum selesai', NULL),
  ('t-asha-2', 3, 2, 'Rapikan dompet kecil', 'Biar uang tersusun rapi', 'non-uang', 0, 'Pilih lagu favorit', 'Selesai pagi ini', 'selesai', '2026-07-04'),
  ('t-asha-3', 3, 2, 'Hitung tabungan bersama orang tua', 'Belajar melihat progres pelan-pelan', 'uang', 3000, 'Rp3.000', 'Berjalan bersama ayah', 'berjalan', NULL);

INSERT INTO `goals`
  (`goal_code`, `child_id`, `goal_name`, `target_amount`, `current_amount`, `base_current_amount`, `start_date`, `target_date`, `icon`, `status`)
VALUES
  ('g-nala', 1, 'Sepeda Baru', 500000, 168000, 164500, '2026-05-05', '2026-08-30', 'sepeda', 'aktif'),
  ('g-rafi', 2, 'Buku Komik Edukasi', 500000, 140000, 137200, '2026-05-20', '2026-09-15', 'buku', 'aktif'),
  ('g-asha', 3, 'Kotak Alat Gambar', 400000, 84000, 84000, '2026-06-05', '2026-10-01', 'gambar', 'aktif');

INSERT INTO `pockets`
  (`child_id`, `save_amount`, `spend_amount`, `allocation_save_percent`, `allocation_spend_percent`, `base_save_amount`, `base_spend_amount`)
VALUES
  (1, 72000, 168000, 30.00, 70.00, 70500, 164500),
  (2, 60000, 140000, 30.00, 70.00, 58800, 137200),
  (3, 36000, 84000, 30.00, 70.00, 36000, 84000);

INSERT INTO `badges`
  (`badge_code`, `child_id`, `badge_name`, `badge_type`, `description`, `unlocked_at`, `status`, `period_month_label`)
VALUES
  ('b-nala-1', 1, 'Penabung Konsisten', 'featured', 'Rutin menabung beberapa minggu.', '2026-07-02', 'unlocked', 'Juli 2026'),
  ('b-nala-2', 1, '7 Hari Beruntun', 'streak', 'Konsisten satu minggu penuh.', '2026-07-01', 'unlocked', 'Juli 2026'),
  ('b-nala-3', 1, 'Belanja Bijak', 'spending', 'Mulai memakai dana belanja dengan rencana.', '2026-06-25', 'unlocked', 'Juli 2026'),
  ('b-nala-4', 1, 'Misi Mingguan', 'mission', 'Menunggu semua misi utama selesai.', NULL, 'locked', 'Juli 2026'),
  ('b-rafi-1', 2, 'Jago Pilih Prioritas', 'priority', 'Mulai membedakan kebutuhan dan keinginan.', '2026-06-30', 'unlocked', 'Juli 2026'),
  ('b-rafi-2', 2, 'Penabung Pemula', 'saving', 'Tabungan sudah mulai tumbuh.', '2026-06-10', 'unlocked', 'Juli 2026'),
  ('b-rafi-3', 2, 'Misi Mingguan', 'mission', 'Menunggu tiga misi utama selesai.', NULL, 'locked', 'Juli 2026'),
  ('b-asha-1', 3, 'Kancil Cerdik', 'lesson', 'Selesai belajar mini lesson kecil.', '2026-07-01', 'unlocked', 'Juli 2026'),
  ('b-asha-2', 3, 'Belanja Bijak', 'spending', 'Masih menunggu dana belanja pertamamu dipakai dengan rencana.', NULL, 'locked', 'Juli 2026');

INSERT INTO `streaks`
  (`child_id`, `current_streak`, `best_streak`, `last_activity_date`)
VALUES
  (1, 7, 12, '2026-07-04'),
  (2, 4, 8, '2026-07-03'),
  (3, 2, 5, '2026-07-04');

INSERT INTO `monthly_recaps`
  (`child_id`, `period_month_label`, `total_tasks`, `completed_tasks`, `total_reward`, `total_saved`, `total_spent`, `badges_unlocked`, `best_streak`, `base_total_reward`, `base_total_saved`, `base_total_spent`, `base_total_tasks`, `base_completed_tasks`)
VALUES
  (1, 'Juli 2026', 28, 22, 240000, 72000, 168000, 5, 12, 235000, 70500, 164500, 24, 20),
  (2, 'Juli 2026', 24, 16, 200000, 60000, 140000, 3, 8, 196000, 58800, 137200, 21, 15),
  (3, 'Juli 2026', 17, 10, 120000, 36000, 84000, 1, 5, 120000, 36000, 84000, 17, 10);

INSERT INTO `child_monthly_task_stats`
  (`child_id`, `period_label`, `week_1_tasks`, `week_2_tasks`, `week_3_tasks`, `week_4_tasks`)
VALUES
  (1, 'Juli 2026', 5, 6, 5, 6),
  (2, 'Juli 2026', 4, 5, 4, 5),
  (3, 'Juli 2026', 3, 4, 3, 4);

INSERT INTO `child_savings_trends`
  (`child_id`, `period_label`, `sort_order`, `amount`)
VALUES
  (1, 'April', 1, 28000),
  (1, 'Mei', 2, 42000),
  (1, 'Juni', 3, 57000),
  (1, 'Juli', 4, 72000),
  (2, 'April', 1, 18000),
  (2, 'Mei', 2, 30000),
  (2, 'Juni', 3, 45000),
  (2, 'Juli', 4, 60000),
  (3, 'April', 1, 0),
  (3, 'Mei', 2, 12000),
  (3, 'Juni', 3, 24000),
  (3, 'Juli', 4, 36000);

INSERT INTO `parent_sessions`
  (`parent_user_id`, `session_token`, `remember_login`, `last_login_at`, `expires_at`)
VALUES
  (1, 'demo-session-token-ayu-wijaya', 1, '2026-07-05 09:30:00', '2026-08-05 09:30:00');

