-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 30, 2022 at 10:38 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.11

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
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `code` varchar(7) NOT NULL,
  `name` varchar(50) NOT NULL,
  `credits` int NOT NULL,
  `time_slot` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `venue` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `instructor` varchar(50) NOT NULL,
  `capacity` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`code`, `name`, `credits`, `time_slot`, `venue`, `instructor`, `capacity`) VALUES
('CS303', 'Data Bases and Information Systems', 6, '5', '117', 'Prof. Siba Narayan Swain', NULL),
('CS311', 'Computer Architecture Lab', 3, 'L2', NULL, 'Prof. Rajshekar K', NULL),
('CS313', 'Databases and information systems laboratory', 3, 'L3', '117', 'Prof. Siba Narayan Swain', 100),
('CS601', 'Software Development for Scientific Computing', 6, '1', '117', 'Prof. Nikhil Hegde', NULL),
('EE409', 'Speech Processing', 6, '9', 'Online', 'Prof. Prasanna', NULL),
('HS301', 'Philosophy', 6, '7', '117', 'Prof. Jolly Thomos', 75),
('HS304', 'Intellectual Property Management', 6, '7', NULL, 'Prof. Hirwani', NULL),
('HS403', 'Happiness and Well-being', 6, '7', NULL, 'Prof. BL Tembe', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int NOT NULL,
  `author` varchar(50) NOT NULL,
  `content` varchar(500) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `author`, `content`, `created_at`) VALUES
(3, 'om', 'h', '2022-10-30 14:28:03'),
(5, 'ModernOctave', 'Test', '2022-10-30 17:16:18');

-- --------------------------------------------------------

--
-- Table structure for table `time_slots`
--

CREATE TABLE `time_slots` (
  `id` varchar(20) NOT NULL,
  `day` int NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `time_slots`
--

INSERT INTO `time_slots` (`id`, `day`, `start_time`, `end_time`) VALUES
('1', 1, '08:30:00', '09:30:00'),
('1', 2, '09:30:00', '10:30:00'),
('1', 4, '10:30:00', '11:30:00'),
('10', 1, '15:00:00', '16:00:00'),
('10', 3, '15:00:00', '16:00:00'),
('10', 5, '16:00:00', '17:00:00'),
('5', 2, '10:30:00', '11:30:00'),
('5', 3, '08:30:00', '09:30:00'),
('5', 4, '09:30:00', '10:30:00'),
('7', 1, '14:00:00', '15:00:00'),
('7', 2, '17:00:00', '18:00:00'),
('7', 4, '19:00:00', '20:00:00'),
('9', 1, '18:00:00', '19:00:00'),
('9', 2, '19:00:00', '20:00:00'),
('9', 4, '14:00:00', '15:00:00'),
('L2', 3, '10:30:00', '13:30:00'),
('L3', 1, '09:30:00', '12:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `fname` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lname` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(35) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` int NOT NULL DEFAULT '0',
  `salt` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `hash` char(64) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`fname`, `lname`, `email`, `username`, `role`, `salt`, `hash`) VALUES
('Admin', 'Admin', 'admin@studentdash.com', 'admin', 1, 'ff8efc08f9649352f0be27538ec4c574', '013026706a7b882461a26399e3b2401600b3574fe07591811810f2ac17d55239'),
('Om', 'Patil', '200010036@iitdh.ac.in', 'ModernOctave', 0, 'f6e31da6089c06892248009622e06b71', 'f200d555b137c5db6a93e006c732eb028ebdf2b8677012b4b636dc0dc5785243');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
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
  ADD PRIMARY KEY (`id`,`day`,`start_time`,`end_time`),
  ADD KEY `ID` (`id`) USING BTREE;

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`time_slot`) REFERENCES `time_slots` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`author`) REFERENCES `users` (`username`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
