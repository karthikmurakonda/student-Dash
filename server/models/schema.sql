-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 30, 2022 at 12:48 AM
-- Server version: 8.0.30-0ubuntu0.22.04.1
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `studash`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `code` varchar(7) NOT NULL,
  `name` varchar(50) NOT NULL,
  `credit` int NOT NULL,
  `time_slot` varchar(20) NOT NULL,
  `venue` varchar(50) NOT NULL,
  `instructor` varchar(50) NOT NULL,
  `link` varchar(100) NOT NULL,
  `capacity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` varchar(36) NOT NULL,
  `author` varchar(50) NOT NULL,
  `content` varchar(500) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `author_id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `author`, `content`, `created_at`, `author_id`) VALUES
('0d7b9922785534013959', 'karthik', 'jackllksfl;ksajdf;lksjdfl;ksjdfl;kj', '2022-10-30 00:30:03', '635d59baa466d9baca906f31'),
('1dd2a64e4d7d1f48ce64', 'karthik', 'second post!', '2022-10-30 00:01:30', '635d59baa466d9baca906f31'),
('621b9b5f39d1e05eb489', 'karthik', 'lllllllsdfffffffkj', '2022-10-30 00:30:16', '635d59baa466d9baca906f31'),
('7ce16b4e3496023d8576', 'karthik', 'lkjl;kjgl;kgjl;skdjfglkjsdgjs;ldfkjgs;ldkfj', '2022-10-30 00:30:10', '635d59baa466d9baca906f31'),
('7f75091c71fc25d02a54', 'karthik', 'second post!', '2022-10-29 23:47:39', '635d59baa466d9baca906f31'),
('8251d28ac5a4a090a29e', 'karthik', 'second post!', '2022-10-29 23:59:47', '635d59baa466d9baca906f31');

-- --------------------------------------------------------

--
-- Table structure for table `time_slots`
--

CREATE TABLE `time_slots` (
  `id` varchar(20) NOT NULL,
  `day` varchar(15) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`code`),
  ADD KEY `time_slot` (`time_slot`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `time_slots`
--
ALTER TABLE `time_slots`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`time_slot`) REFERENCES `time_slots` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
