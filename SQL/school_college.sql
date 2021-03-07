-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: sql211.byetcluster.com
-- Generation Time: Sep 24, 2020 at 12:49 PM
-- Server version: 5.6.48-88.0
-- PHP Version: 7.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `epiz_26217239_Saif_Academy`
--

-- --------------------------------------------------------

--
-- Table structure for table `school/college`
--

CREATE TABLE `school/college` (
  `Serial` int(11) NOT NULL,
  `S&C` varchar(110) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `school/college`
--

INSERT INTO `school/college` (`Serial`, `S&C`) VALUES
(4, 'St. Joseph Higher Secondary School (sjs)'),
(5, 'Monipur Uchcha Vidyalaya and College'),
(3, 'Bangladesh Chemical Industries Corporation(BCIC)');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `school/college`
--
ALTER TABLE `school/college`
  ADD PRIMARY KEY (`Serial`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `school/college`
--
ALTER TABLE `school/college`
  MODIFY `Serial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
