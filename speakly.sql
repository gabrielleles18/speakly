-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Nov 10, 2025 at 01:36 AM
-- Server version: 5.7.22
-- PHP Version: 8.2.8

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
(1, 'Business', '#FFFF00', '2025-11-07 17:00:07', '2025-11-07 17:00:07'),
(2, 'Trip', '#00FFFF', '2025-11-07 17:00:07', '2025-11-07 17:00:07'),
(3, 'Education', '#EE0000', '2025-11-07 17:00:07', '2025-11-07 17:00:07');

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
(1, 1, 1, '2025-11-07 17:00:07', '2025-11-07 17:00:07'),
(2, 1, 2, '2025-11-07 17:00:07', '2025-11-07 17:00:07'),
(3, 1, 3, '2025-11-07 17:00:07', '2025-11-07 17:00:07'),
(4, 1, 4, '2025-11-07 17:00:07', '2025-11-07 17:00:07'),
(5, 1, 5, '2025-11-07 17:00:07', '2025-11-07 17:00:07');

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
(9, '2025_11_07_125404_create_user_activities_table', 1),
(10, '2025_11_07_133244_create_spaced_repetitions_table', 1);

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
(1, 'App\\Models\\User', 1, 'auth_token', '4d6e6a0ddf0b59d59560c1b2aa7e522042e1a97980ad516daf81ff30873a2498', '[\"*\"]', '2025-11-10 00:14:16', NULL, '2025-11-09 14:58:04', '2025-11-10 00:14:16'),
(2, 'App\\Models\\User', 1, 'auth_token', '2f5f49c34ecca4a53dcdb8afbaeb3958bdac0d9bdf0bd9b25fa20f801fc3e3eb', '[\"*\"]', '2025-11-10 01:33:39', NULL, '2025-11-10 00:30:49', '2025-11-10 01:33:39');

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
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sentences`
--

INSERT INTO `sentences` (`id`, `sentence`, `translation`, `time_video_start`, `video_id`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 'Esse sit inventore commodi earum id ut nam.', 'Quo sint vero repellat.', '01:58:00', 2, 1, '2025-11-07 17:00:07', '2025-11-07 17:00:07'),
(2, 'Esse sit inventore commodi earum id ut nam.', 'Quo sint vero repellat.', '01:58:00', 2, 1, '2025-11-07 17:00:07', '2025-11-07 17:00:07'),
(3, 'Esse sit inventore commodi earum id ut nam.', 'Quo sint vero repellat.', '01:58:00', 2, 1, '2025-11-07 17:00:07', '2025-11-07 17:00:07'),
(4, 'Esse sit inventore commodi earum id ut nam.', 'Quo sint vero repellat.', '01:58:00', 2, 1, '2025-11-07 17:00:07', '2025-11-07 17:00:07'),
(5, 'Esse sit inventore commodi earum id ut nam.', 'Quo sint vero repellat.', '01:58:00', 2, 1, '2025-11-07 17:00:07', '2025-11-07 17:00:07');

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
-- Table structure for table `spaced_repetitions`
--

CREATE TABLE `spaced_repetitions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sentence_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `next_review_date` datetime NOT NULL,
  `quality` int(11) NOT NULL DEFAULT '0',
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `spaced_repetitions`
--

INSERT INTO `spaced_repetitions` (`id`, `sentence_id`, `user_id`, `next_review_date`, `quality`, `enabled`, `created_at`, `updated_at`) VALUES
(1, 5, 1, '1991-06-19 22:42:27', 0, 1, '2025-11-07 17:00:07', '2025-11-07 17:00:07'),
(2, 5, 1, '1991-06-19 22:42:27', 0, 1, '2025-11-07 17:00:07', '2025-11-07 17:00:07'),
(3, 5, 1, '1991-06-19 22:42:27', 0, 1, '2025-11-07 17:00:07', '2025-11-07 17:00:07'),
(4, 5, 1, '1991-06-19 22:42:27', 0, 1, '2025-11-07 17:00:07', '2025-11-07 17:00:07'),
(5, 5, 1, '1991-06-19 22:42:27', 0, 1, '2025-11-07 17:00:07', '2025-11-07 17:00:07');

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
(1, 'Teste Silva', 'teste@gmail.com', '2025-11-07 17:00:06', '$2y$12$SfvSCDZ/c5IZmUXoQS/zJ.ukRzuqTcEr42eMVXiQaViZeOSLlBjzi', 'W5lJVvl2jq', '2025-11-07 17:00:07', '2025-11-07 17:00:07');

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
(1, 1, 'watched_video', 5, 2, '2025-11-07 17:00:07', '2025-11-07 17:00:07'),
(2, 1, 'watched_video', 5, 2, '2025-11-07 17:00:07', '2025-11-07 17:00:07'),
(3, 1, 'watched_video', 5, 2, '2025-11-07 17:00:07', '2025-11-07 17:00:07'),
(4, 1, 'watched_video', 5, 2, '2025-11-07 17:00:07', '2025-11-07 17:00:07'),
(5, 1, 'watched_video', 5, 2, '2025-11-07 17:00:07', '2025-11-07 17:00:07');

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
(1, 'https://www.youtube.com/watch?v=Fkd9TWUtFm0', 'Thomas Suarez: A 12-year-old app developer.', 'TED', 'https://i.ytimg.com/vi/S_MAesZsnMk/hqdefault.jpg', '00:04:40', '1\n00:00:00,000 --> 00:00:07,000\nTranslator: Joseph Geni\nReviewer: Thu-Huong Ha\n\n2\n00:00:15,260 --> 00:00:19,606\nI\'ve always had a fascination\nfor computers and technology,\n\n3\n00:00:19,630 --> 00:00:23,330\nand I made a few apps for the iPhone,\niPod touch, and iPad.\n\n4\n00:00:23,354 --> 00:00:25,796\nI\'d like to share a couple with you today.\n\n5\n00:00:26,449 --> 00:00:30,520\nMy first app was a unique\nfortune teller called \"Earth Fortune\"\n\n6\n00:00:30,544 --> 00:00:32,933\nthat would display\ndifferent colors of Earth\n\n7\n00:00:32,957 --> 00:00:34,939\ndepending on what your fortune was.\n\n8\n00:00:35,530 --> 00:00:39,253\nMy favorite and most successful app\n\n9\n00:00:39,277 --> 00:00:41,138\nis \"Bustin Jieber,\" which is --\n\n10\n00:00:41,162 --> 00:00:42,385\n(Laughter)\n\n11\n00:00:42,409 --> 00:00:45,103\nwhich is a Justin Bieber whack-a-mole.\n\n12\n00:00:45,127 --> 00:00:46,436\n(Laughter)\n\n13\n00:00:46,460 --> 00:00:49,843\nI created it because\na lot of people at school\n\n14\n00:00:49,867 --> 00:00:52,184\ndisliked Justin Bieber a little bit,\n\n15\n00:00:52,208 --> 00:00:54,954\nso I decided to make the app.\n\n16\n00:00:54,978 --> 00:00:57,133\nSo I went to work programming it,\n\n17\n00:00:57,157 --> 00:01:00,823\nand I released it\njust before the holidays in 2010.\n\n18\n00:01:01,984 --> 00:01:05,736\nA lot of people ask me,\nhow did I make these?\n\n19\n00:01:05,760 --> 00:01:08,652\nA lot of times it\'s because\nthe person who asked the question\n\n20\n00:01:08,676 --> 00:01:10,698\nwants to make an app also.\n\n21\n00:01:10,722 --> 00:01:13,825\nA lot of kids these days\nlike to play games,\n\n22\n00:01:13,849 --> 00:01:17,379\nbut now they want to make them,\nand it\'s difficult,\n\n23\n00:01:17,403 --> 00:01:22,339\nbecause not many kids know where to go\nto find out how to make a program.\n\n24\n00:01:22,363 --> 00:01:24,858\nI mean, for soccer,\nyou could go to a soccer team.\n\n25\n00:01:24,882 --> 00:01:27,899\nFor violin, you could get\nlessons for a violin.\n\n26\n00:01:27,923 --> 00:01:29,910\nBut what if you want to make an app?\n\n27\n00:01:29,934 --> 00:01:33,941\nAnd the kid\'s parents might have done\nsome of these things when they were young,\n\n28\n00:01:33,965 --> 00:01:35,823\nbut not many parents have written apps.\n\n29\n00:01:35,847 --> 00:01:38,154\n(Laughter)\n\n30\n00:01:38,178 --> 00:01:40,727\nWhere do you go to find out\nhow to make an app?\n\n31\n00:01:40,751 --> 00:01:43,487\nWell, this is how I approached it,\nthis is what I did.\n\n32\n00:01:43,511 --> 00:01:48,685\nFirst of all, I\'ve been programming\nin multiple other programming languages\n\n33\n00:01:48,709 --> 00:01:50,719\nto get the basics down,\n\n34\n00:01:50,743 --> 00:01:54,338\nsuch as Python, C, Java, etc.\n\n35\n00:01:55,021 --> 00:01:57,494\nAnd then Apple released the iPhone,\n\n36\n00:01:57,518 --> 00:02:00,532\nand with it, the iPhone\nsoftware development kit,\n\n37\n00:02:00,556 --> 00:02:04,135\nand the software development kit\nis a suite of tools\n\n38\n00:02:04,159 --> 00:02:06,861\nfor creating and programming\nan iPhone app.\n\n39\n00:02:08,148 --> 00:02:11,476\nThis opened up a whole new world\nof possibilities for me,\n\n40\n00:02:11,500 --> 00:02:14,770\nand after playing with the software\ndevelopment kit a little bit,\n\n41\n00:02:14,794 --> 00:02:18,681\nI made a couple of apps,\nI made some test apps.\n\n42\n00:02:18,705 --> 00:02:20,848\nOne of them happened to be\n\"Earth Fortune,\"\n\n43\n00:02:20,872 --> 00:02:23,740\nand I was ready to put\n\"Earth Fortune\" on the App Store,\n\n44\n00:02:23,764 --> 00:02:28,139\nand so I persuaded my parents\nto pay the 99 dollar fee\n\n45\n00:02:28,163 --> 00:02:30,959\nto be able to put my apps\non the App Store.\n\n46\n00:02:30,983 --> 00:02:33,953\nThey agreed, and now I have\napps on the App Store.\n\n47\n00:02:35,340 --> 00:02:37,623\nI\'ve gotten a lot of interest\nand encouragement\n\n48\n00:02:37,647 --> 00:02:41,316\nfrom my family, friends, teachers\nand even people at the Apple Store,\n\n49\n00:02:41,340 --> 00:02:43,321\nand that\'s been a huge help to me.\n\n50\n00:02:44,376 --> 00:02:47,478\nI\'ve gotten a lot\nof inspiration from Steve Jobs,\n\n51\n00:02:47,502 --> 00:02:50,411\nand I\'ve started an app club at school,\n\n52\n00:02:50,435 --> 00:02:55,546\nand a teacher at my school\nis kindly sponsoring my app club.\n\n53\n00:02:56,081 --> 00:03:00,852\nAny student at my school can come\nand learn how to design an app.\n\n54\n00:03:02,534 --> 00:03:05,758\nThis is so I can share\nmy experiences with others.\n\n55\n00:03:06,664 --> 00:03:10,202\nThere\'s these programs\ncalled the iPad Pilot Program,\n\n56\n00:03:10,226 --> 00:03:12,796\nand some districts have them.\n\n57\n00:03:12,820 --> 00:03:15,033\nI\'m fortunate enough to be part of one.\n\n58\n00:03:15,503 --> 00:03:19,502\nA big challenge is,\nhow should the iPads be used,\n\n59\n00:03:19,526 --> 00:03:22,216\nand what apps should we put on the iPads?\n\n60\n00:03:22,974 --> 00:03:26,776\nSo we\'re getting feedback\nfrom teachers at the school\n\n61\n00:03:26,800 --> 00:03:28,868\nto see what kind of apps they\'d like.\n\n62\n00:03:28,892 --> 00:03:31,676\nWhen we design the app and we sell it,\n\n63\n00:03:31,700 --> 00:03:37,519\nit will be free to local districts;\nand other districts that we sell to --\n\n64\n00:03:38,143 --> 00:03:41,463\nall the money from that will go\ninto the local ed foundations.\n\n65\n00:03:43,036 --> 00:03:48,114\nThese days, students usually know\na little bit more than teachers\n\n66\n00:03:48,138 --> 00:03:49,698\nwith the technology.\n\n67\n00:03:49,722 --> 00:03:54,037\n(Laughter)\n\n68\n00:03:54,061 --> 00:03:55,285\nSo --\n\n69\n00:03:55,309 --> 00:03:58,248\n(Laughter)\n\n70\n00:03:58,272 --> 00:03:59,458\nSorry.\n\n71\n00:03:59,482 --> 00:04:02,145\n(Laughter)\n\n72\n00:04:02,796 --> 00:04:04,875\nSo this is a resource to teachers,\n\n73\n00:04:04,899 --> 00:04:08,994\nand educators should recognize\nthis resource and make good use of it.\n\n74\n00:04:09,018 --> 00:04:10,700\n(Laughter)\n\n75\n00:04:11,593 --> 00:04:15,304\nI\'d like to finish up by saying\nwhat I\'d like to do in the future.\n\n76\n00:04:16,333 --> 00:04:20,312\nFirst of all, I\'d like to create\nmore apps, more games.\n\n77\n00:04:20,336 --> 00:04:23,266\nI\'m working with a third party\ncompany to make an app.\n\n78\n00:04:24,001 --> 00:04:27,895\nI\'d like to get into Android\nprogramming and development,\n\n79\n00:04:27,919 --> 00:04:30,206\nand I\'d like to continue my app club,\n\n80\n00:04:30,230 --> 00:04:33,855\nand find other ways for students\nto share knowledge with others.\n\n81\n00:04:33,879 --> 00:04:35,038\nThank you.\n\n82\n00:04:35,062 --> 00:04:36,596\n(Applause)\n', 1, '2025-11-07 17:00:07', '2025-11-07 17:00:07'),
(2, 'https://www.youtube.com/watch?v=20e8459d-cbcb-3922-83f7-9a510d24e962', 'Et qui at quos dolorum est.', 'Galindo-Estrada', 'https://via.placeholder.com/640x480.png/0011cc?text=facere', '04:20:58', 'Sed amet nisi dolorem. Voluptates blanditiis ullam eveniet perferendis porro quia. Possimus magni recusandae unde ea. Molestias reprehenderit aut et nihil omnis.', 1, '2025-11-07 17:00:07', '2025-11-07 17:00:07'),
(3, 'https://www.youtube.com/watch?v=20e8459d-cbcb-3922-83f7-9a510d24e962', 'Et qui at quos dolorum est.', 'Galindo-Estrada', 'https://via.placeholder.com/640x480.png/0011cc?text=facere', '04:20:58', 'Sed amet nisi dolorem. Voluptates blanditiis ullam eveniet perferendis porro quia. Possimus magni recusandae unde ea. Molestias reprehenderit aut et nihil omnis.', 1, '2025-11-07 17:00:07', '2025-11-07 17:00:07'),
(4, 'https://www.youtube.com/watch?v=20e8459d-cbcb-3922-83f7-9a510d24e962', 'Et qui at quos dolorum est.', 'Galindo-Estrada', 'https://via.placeholder.com/640x480.png/0011cc?text=facere', '04:20:58', 'Sed amet nisi dolorem. Voluptates blanditiis ullam eveniet perferendis porro quia. Possimus magni recusandae unde ea. Molestias reprehenderit aut et nihil omnis.', 1, '2025-11-07 17:00:07', '2025-11-07 17:00:07'),
(5, 'https://www.youtube.com/watch?v=20e8459d-cbcb-3922-83f7-9a510d24e962', 'Et qui at quos dolorum est.', 'Galindo-Estrada', 'https://via.placeholder.com/640x480.png/0011cc?text=facere', '04:20:58', 'Sed amet nisi dolorem. Voluptates blanditiis ullam eveniet perferendis porro quia. Possimus magni recusandae unde ea. Molestias reprehenderit aut et nihil omnis.', 1, '2025-11-07 17:00:07', '2025-11-07 17:00:07');

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
-- Indexes for table `spaced_repetitions`
--
ALTER TABLE `spaced_repetitions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `spaced_repetitions_sentence_id_foreign` (`sentence_id`),
  ADD KEY `spaced_repetitions_user_id_foreign` (`user_id`);

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sentences`
--
ALTER TABLE `sentences`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `spaced_repetitions`
--
ALTER TABLE `spaced_repetitions`
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
-- Constraints for table `spaced_repetitions`
--
ALTER TABLE `spaced_repetitions`
  ADD CONSTRAINT `spaced_repetitions_sentence_id_foreign` FOREIGN KEY (`sentence_id`) REFERENCES `sentences` (`id`),
  ADD CONSTRAINT `spaced_repetitions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

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
