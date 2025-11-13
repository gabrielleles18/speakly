-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Nov 13, 2025 at 07:26 PM
-- Server version: 5.7.22
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `speakly`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `color`, `created_at`, `updated_at`) VALUES
(1, 'Business', '#FFFF00', '2025-11-13 17:22:30', '2025-11-13 17:22:30'),
(2, 'Trip', '#00FFFF', '2025-11-13 17:22:30', '2025-11-13 17:22:30'),
(3, 'Education', '#EE0000', '2025-11-13 17:22:30', '2025-11-13 17:22:30');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `video_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`id`, `user_id`, `video_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2025-11-13 17:22:30', '2025-11-13 17:22:30'),
(2, 1, 2, '2025-11-13 17:22:30', '2025-11-13 17:22:30'),
(3, 1, 3, '2025-11-13 17:22:30', '2025-11-13 17:22:30'),
(4, 1, 4, '2025-11-13 17:22:30', '2025-11-13 17:22:30'),
(5, 1, 5, '2025-11-13 17:22:30', '2025-11-13 17:22:30');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_11_06_163626_create_personal_access_tokens_table', 1),
(5, '2025_11_07_124607_create_categories_table', 1),
(6, '2025_11_07_124705_create_videos_table', 1),
(7, '2025_11_07_124945_create_favorites_table', 1),
(8, '2025_11_07_125401_create_sentences_table', 1),
(9, '2025_11_07_125404_create_user_activities_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', '766d953a4c54e18091ef485883a8e6c55150faf16760b9570df83aefb4655a7e', '[\"*\"]', '2025-11-13 18:04:15', NULL, '2025-11-13 17:23:01', '2025-11-13 18:04:15');

-- --------------------------------------------------------

--
-- Table structure for table `sentences`
--

CREATE TABLE `sentences` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sentence` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `translation` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `time_video_start` time NOT NULL,
  `video_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `next_review_date` datetime NOT NULL,
  `last_review_date` datetime DEFAULT NULL,
  `quality` int(11) NOT NULL DEFAULT '0',
  `ease_factor` decimal(5,2) NOT NULL DEFAULT '2.50',
  `interval` int(11) NOT NULL DEFAULT '0',
  `repetitions` int(11) NOT NULL DEFAULT '0',
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sentences`
--

INSERT INTO `sentences` (`id`, `sentence`, `translation`, `time_video_start`, `video_id`, `user_id`, `next_review_date`, `last_review_date`, `quality`, `ease_factor`, `interval`, `repetitions`, `enabled`, `created_at`, `updated_at`) VALUES
(1, 'Voluptas voluptatem inventore mollitia impedit blanditiis et ut.', 'Sint ex consequatur quos id et ut harum perspiciatis.', '04:57:35', 2, 1, '2024-09-19 03:36:47', '1997-03-01 16:00:46', 9, 2.05, 201, 3, 1, '2025-11-13 17:22:30', '2025-11-13 17:22:30'),
(2, 'Voluptas voluptatem inventore mollitia impedit blanditiis et ut.', 'Sint ex consequatur quos id et ut harum perspiciatis.', '04:57:35', 2, 1, '2024-09-19 03:36:47', '1997-03-01 16:00:46', 9, 2.05, 201, 18, 1, '2025-11-13 17:22:30', '2025-11-13 17:22:30'),
(3, 'Voluptas voluptatem inventore mollitia impedit blanditiis et ut.', 'Sint ex consequatur quos id et ut harum perspiciatis.', '04:57:35', 2, 1, '2024-09-19 03:36:47', '1997-03-01 16:00:46', 9, 2.05, 201, 18, 1, '2025-11-13 17:22:30', '2025-11-13 17:22:30'),
(4, 'Voluptas voluptatem inventore mollitia impedit blanditiis et ut.', 'Sint ex consequatur quos id et ut harum perspiciatis.', '04:57:35', 2, 1, '2024-09-19 03:36:47', '1997-03-01 16:00:46', 9, 2.05, 201, 18, 1, '2025-11-13 17:22:30', '2025-11-13 17:22:30'),
(5, 'Voluptas voluptatem inventore mollitia impedit blanditiis et ut.', 'Sint ex consequatur quos id et ut harum perspiciatis.', '04:57:35', 2, 1, '2024-09-19 03:36:47', '1997-03-01 16:00:46', 9, 2.05, 201, 18, 0, '2025-11-13 17:22:30', '2025-11-13 17:22:30');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Teste Silva', 'teste@gmail.com', '2025-11-13 17:22:30', '$2y$12$0mtOyotPudFtvzOmGgMcDONsjZxTtC62hQXSZolvBtCDVm0OS3ZH.', 'Bh1uGoJEJG', '2025-11-13 17:22:30', '2025-11-13 17:22:30');

-- --------------------------------------------------------

--
-- Table structure for table `user_activities`
--

CREATE TABLE `user_activities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `activity` enum('watched_video','practiced_sentence') COLLATE utf8mb4_unicode_ci NOT NULL,
  `video_id` bigint(20) UNSIGNED NOT NULL,
  `sentence_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_activities`
--

INSERT INTO `user_activities` (`id`, `user_id`, `activity`, `video_id`, `sentence_id`, `created_at`, `updated_at`) VALUES
(1, 1, 'practiced_sentence', 4, 2, '2025-11-13 17:22:30', '2025-11-13 17:22:30'),
(2, 1, 'practiced_sentence', 4, 2, '2025-11-13 17:22:30', '2025-11-13 17:22:30'),
(3, 1, 'practiced_sentence', 4, 2, '2025-11-13 17:22:30', '2025-11-13 17:22:30'),
(4, 1, 'practiced_sentence', 4, 2, '2025-11-13 17:22:30', '2025-11-13 17:22:30'),
(5, 1, 'practiced_sentence', 4, 2, '2025-11-13 17:22:30', '2025-11-13 17:22:30');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `youtube_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `channel` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` time NOT NULL,
  `transcription` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `youtube_url`, `title`, `channel`, `thumbnail`, `duration`, `transcription`, `category_id`, `created_at`, `updated_at`) VALUES
(1, 'https://www.youtube.com/watch?v=a90982ec-3183-3990-a804-88dd8de43f87', 'Sapiente quis sit non dolor voluptas.', 'Mendonça e Teles e Associados', 'https://via.placeholder.com/640x480.png/00ff22?text=porro', '09:15:06', 'Et cupiditate consequatur fugiat voluptate. Omnis assumenda temporibus enim. Ea harum sed neque amet dolorem facere voluptates natus. Qui nisi tempora dolore consequatur amet.', 2, '2025-11-13 17:22:30', '2025-11-13 17:22:30'),
(2, 'https://www.youtube.com/watch?v=a90982ec-3183-3990-a804-88dd8de43f87', 'Sapiente quis sit non dolor voluptas.', 'Mendonça e Teles e Associados', 'https://via.placeholder.com/640x480.png/00ff22?text=porro', '09:15:06', 'Et cupiditate consequatur fugiat voluptate. Omnis assumenda temporibus enim. Ea harum sed neque amet dolorem facere voluptates natus. Qui nisi tempora dolore consequatur amet.', 2, '2025-11-13 17:22:30', '2025-11-13 17:22:30'),
(3, 'https://www.youtube.com/watch?v=a90982ec-3183-3990-a804-88dd8de43f87', 'Sapiente quis sit non dolor voluptas.', 'Mendonça e Teles e Associados', 'https://via.placeholder.com/640x480.png/00ff22?text=porro', '09:15:06', 'Et cupiditate consequatur fugiat voluptate. Omnis assumenda temporibus enim. Ea harum sed neque amet dolorem facere voluptates natus. Qui nisi tempora dolore consequatur amet.', 2, '2025-11-13 17:22:30', '2025-11-13 17:22:30'),
(4, 'https://www.youtube.com/watch?v=a90982ec-3183-3990-a804-88dd8de43f87', 'Sapiente quis sit non dolor voluptas.', 'Mendonça e Teles e Associados', 'https://via.placeholder.com/640x480.png/00ff22?text=porro', '09:15:06', 'Et cupiditate consequatur fugiat voluptate. Omnis assumenda temporibus enim. Ea harum sed neque amet dolorem facere voluptates natus. Qui nisi tempora dolore consequatur amet.', 2, '2025-11-13 17:22:30', '2025-11-13 17:22:30'),
(5, 'https://www.youtube.com/watch?v=a90982ec-3183-3990-a804-88dd8de43f87', 'Sapiente quis sit non dolor voluptas.', 'Mendonça e Teles e Associados', 'https://via.placeholder.com/640x480.png/00ff22?text=porro', '09:15:06', 'Et cupiditate consequatur fugiat voluptate. Omnis assumenda temporibus enim. Ea harum sed neque amet dolorem facere voluptates natus. Qui nisi tempora dolore consequatur amet.', 2, '2025-11-13 17:22:30', '2025-11-13 17:22:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `favorites_user_id_video_id_unique` (`user_id`,`video_id`),
  ADD KEY `favorites_video_id_foreign` (`video_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `sentences`
--
ALTER TABLE `sentences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sentences_video_id_foreign` (`video_id`),
  ADD KEY `sentences_user_id_foreign` (`user_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_activities`
--
ALTER TABLE `user_activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_activities_user_id_foreign` (`user_id`),
  ADD KEY `user_activities_video_id_foreign` (`video_id`),
  ADD KEY `user_activities_sentence_id_foreign` (`sentence_id`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `videos_category_id_foreign` (`category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sentences`
--
ALTER TABLE `sentences`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_activities`
--
ALTER TABLE `user_activities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `favorites_video_id_foreign` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`);

--
-- Constraints for table `sentences`
--
ALTER TABLE `sentences`
  ADD CONSTRAINT `sentences_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `sentences_video_id_foreign` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`);

--
-- Constraints for table `user_activities`
--
ALTER TABLE `user_activities`
  ADD CONSTRAINT `user_activities_sentence_id_foreign` FOREIGN KEY (`sentence_id`) REFERENCES `sentences` (`id`),
  ADD CONSTRAINT `user_activities_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_activities_video_id_foreign` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`);

--
-- Constraints for table `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
