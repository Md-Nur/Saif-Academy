-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: sql211.byetcluster.com
-- Generation Time: Sep 24, 2020 at 12:45 PM
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
-- Table structure for table `all info`
--

CREATE TABLE `all info` (
  `Roll` int(100) NOT NULL,
  `Full Name` varchar(160) NOT NULL,
  `Phone` varchar(160) NOT NULL,
  `Email` varchar(160) NOT NULL,
  `Password` varchar(160) NOT NULL,
  `School / College` varchar(160) NOT NULL,
  `Batch` varchar(160) NOT NULL,
  `Gender` varchar(160) NOT NULL,
  `Joining Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `all info`
--

INSERT INTO `all info` (`Roll`, `Full Name`, `Phone`, `Email`, `Password`, `School / College`, `Batch`, `Gender`, `Joining Date`) VALUES
(1, 'Md Saazid Bin Saif', '01793467138', 'shiulye@gmail.com', 'amerdesh', 'Bangladesh Chemical Industries Corporation(BCIC)', 'HSC First Year 2', 'Male', '2020-09-21 18:38:07'),
(2, 'nnn', '4546', '564juio@gmail.com', 'kjnkljnjhb', 'Monipur High School', 'HSC Second Year New 1', 'Male', '2020-09-23 03:49:11'),
(3, 'Mosha', '0249023475', 'alkesdedo@gmail.com', '12345', 'Monipur High School', 'SSC New 3', 'Male', '2020-09-23 05:25:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `all info`
--
ALTER TABLE `all info`
  ADD PRIMARY KEY (`Roll`),
  ADD UNIQUE KEY `Phone` (`Phone`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `all info`
--
ALTER TABLE `all info`
  MODIFY `Roll` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
