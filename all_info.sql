-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 21, 2020 at 06:36 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `all info`
--

-- --------------------------------------------------------

--
-- Table structure for table `all info`
--

CREATE TABLE `all info` (
  `Roll` int(250) NOT NULL,
  `Full Name` varchar(100) NOT NULL,
  `Phone` text NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `School / College` varchar(100) NOT NULL,
  `Batch` varchar(100) NOT NULL,
  `Gender` varchar(100) NOT NULL,
  `Joining Date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `all info`
--

INSERT INTO `all info` (`Roll`, `Full Name`, `Phone`, `Email`, `Password`, `School / College`, `Batch`, `Gender`, `Joining Date`) VALUES
(1, 'Khan', '1778302948', 'kasherm2@gamil.com', 'lkaoegldk', 'BCIC', 'SSC_1', 'Male', '2020-09-17 18:23:11'),
(2, 'Manik', '1916885044', 'as11df@gmail.com', 'ladseoeegh', 'St Josef Higher Secondary School', 'HSC First Year New 2', 'Male', '2020-09-20 06:12:26'),
(3, 'Md. Nur', '8801712493574', 'md.nur@yahoo.com', 'abcd', 'MUVC', 'HSC', 'Male', '2020-08-02 07:05:55'),
(4, 'Nur', '01928348', 'maldkoa@gmail.com', 'akjsdjfor3', 'Sjs', 'HSC 1', 'Male', '2020-09-21 15:00:36'),
(5, 'Nur', '01829384728', 'mdeikm@gmail.com', 'hayre', 'St. Joseph Higher Secondary School', 'HSC First Year New 2', 'Male', '2020-09-21 15:12:56');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `Batch` varchar(100) NOT NULL,
  `Notice` text NOT NULL,
  `Exam` text NOT NULL,
  `About` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`Batch`, `Notice`, `Exam`, `About`) VALUES
('Home', 'The next class will be held on 7th August 2020 at 8 pm.', '', ''),
('HSC First Year 1', 'Amar Shonar Bangla', '<iframe src=\"https://docs.google.com/forms/d/e/1FAIpQLSdA8DhiGyd87LzSAo8ffm2CkKcg8ilv93OYhpyiAN6-t205eQ/viewform?embedded=true\" width=\"640\" height=\"1518\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\">Loading…</iframe>', 'This is HSC 1'),
('HSC First Year 2', 'sdfewf', '<iframe src=\"https://docs.google.com/forms/d/e/1FAIpQLSdA8DhiGyd87LzSAo8ffm2CkKcg8ilv93OYhpyiAN6-t205eQ/viewform?embedded=true\" width=\"640\" height=\"1518\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\">Loading…</iframe>', 'Abal marka'),
('HSC First Year 3', 'adfef dfa', '<iframe src=\"https://docs.google.com/forms/d/e/1FAIpQLSdA8DhiGyd87LzSAo8ffm2CkKcg8ilv93OYhpyiAN6-t205eQ/viewform?embedded=true\" width=\"640\" height=\"1518\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\">Loading…</iframe>', 'fapor bazz'),
('HSC First Year New 1', 'adfecvsad', '<iframe src=\"https://docs.google.com/forms/d/e/1FAIpQLSdA8DhiGyd87LzSAo8ffm2CkKcg8ilv93OYhpyiAN6-t205eQ/viewform?embedded=true\" width=\"640\" height=\"1518\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\">Loading…</iframe>', 'Dip er story'),
('HSC First Year New 2', 'Sami', '<iframe src=\"https://docs.google.com/forms/d/e/1FAIpQLSdA8DhiGyd87LzSAo8ffm2CkKcg8ilv93OYhpyiAN6-t205eQ/viewform?embedded=true\" width=\"640\" height=\"1518\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\">Loading…</iframe>', 'pak boy'),
('HSC First Year New 3', 'aldkfowelf', '<iframe src=\"https://docs.google.com/forms/d/e/1FAIpQLSdA8DhiGyd87LzSAo8ffm2CkKcg8ilv93OYhpyiAN6-t205eQ/viewform?embedded=true\" width=\"640\" height=\"1518\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\">Loading…</iframe>', 'ban vs zim'),
('HSC Second Year 1', 'alsdkfjoe', '<iframe src=\"https://docs.google.com/forms/d/e/1FAIpQLSdA8DhiGyd87LzSAo8ffm2CkKcg8ilv93OYhpyiAN6-t205eQ/viewform?embedded=true\" width=\"640\" height=\"1518\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\">Loading…</iframe>', 'Everything is possible'),
('HSC Second Year 2', 'lkajdoigjwe', '<iframe src=\"https://docs.google.com/forms/d/e/1FAIpQLSdA8DhiGyd87LzSAo8ffm2CkKcg8ilv93OYhpyiAN6-t205eQ/viewform?embedded=true\" width=\"640\" height=\"1518\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\">Loading…</iframe>', 'OMG'),
('HSC Second Year 3', 'lkasfgpwqrg', '<iframe src=\"https://docs.google.com/forms/d/e/1FAIpQLSdA8DhiGyd87LzSAo8ffm2CkKcg8ilv93OYhpyiAN6-t205eQ/viewform?embedded=true\" width=\"640\" height=\"1518\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\">Loading…</iframe>', 'Baby doll'),
('HSC Second Year New 1', 'alkdsfjow', '<iframe src=\"https://docs.google.com/forms/d/e/1FAIpQLSdA8DhiGyd87LzSAo8ffm2CkKcg8ilv93OYhpyiAN6-t205eQ/viewform?embedded=true\" width=\"640\" height=\"1518\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\">Loading…</iframe>', 'Khela hobe'),
('HSC Second Year New 2', 'aklsdjfowe', '<iframe src=\"https://docs.google.com/forms/d/e/1FAIpQLSdA8DhiGyd87LzSAo8ffm2CkKcg8ilv93OYhpyiAN6-t205eQ/viewform?embedded=true\" width=\"640\" height=\"1518\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\">Loading…</iframe>', 'Amar keho nai re'),
('HSC Second Year New 3', 'lakdjfoe', '<iframe src=\"https://docs.google.com/forms/d/e/1FAIpQLSdA8DhiGyd87LzSAo8ffm2CkKcg8ilv93OYhpyiAN6-t205eQ/viewform?embedded=true\" width=\"640\" height=\"1518\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\">Loading…</iframe>', 'DDCianz'),
('Other', 'alksdjfoe', '<iframe src=\"https://docs.google.com/forms/d/e/1FAIpQLSdA8DhiGyd87LzSAo8ffm2CkKcg8ilv93OYhpyiAN6-t205eQ/viewform?embedded=true\" width=\"640\" height=\"1518\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\">Loading…</iframe>', 'City clg'),
('SSC 1', 'This batch name is SSC 1', '<iframe src=\"https://docs.google.com/forms/d/e/1FAIpQLSdPpVUGU33SMuF36uDh2AXTjc9eNAtIJT9UnrRJ4p5HJIvRqQ/viewform?embedded=true\" width=\"640\" height=\"1564\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\">Loading…</iframe>', 'This is SSC 1. Time is sunday 8 am.'),
('SSC 2', '123', '<iframe src=\"https://docs.google.com/forms/d/e/1FAIpQLSdA8DhiGyd87LzSAo8ffm2CkKcg8ilv93OYhpyiAN6-t205eQ/viewform?embedded=true\" width=\"640\" height=\"1518\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\">Loading…</iframe>', 'are beta'),
('SSC 3', 'ASDF', '<iframe src=\"https://docs.google.com/forms/d/e/1FAIpQLSdA8DhiGyd87LzSAo8ffm2CkKcg8ilv93OYhpyiAN6-t205eQ/viewform?embedded=true\" width=\"640\" height=\"1518\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\">Loading…</iframe>', 'aso khelbo'),
('SSC New 1', 'sdf ad', '<iframe src=\"https://docs.google.com/forms/d/e/1FAIpQLSdA8DhiGyd87LzSAo8ffm2CkKcg8ilv93OYhpyiAN6-t205eQ/viewform?embedded=true\" width=\"640\" height=\"1518\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\">Loading…</iframe>', 'are bal'),
('SSC New 2', 'asdfffefds', '<iframe src=\"https://docs.google.com/forms/d/e/1FAIpQLSdA8DhiGyd87LzSAo8ffm2CkKcg8ilv93OYhpyiAN6-t205eQ/viewform?embedded=true\" width=\"640\" height=\"1518\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\">Loading…</iframe>', 'napoli'),
('SSC New 3', 'ladoie', '<iframe src=\"https://docs.google.com/forms/d/e/1FAIpQLSdA8DhiGyd87LzSAo8ffm2CkKcg8ilv93OYhpyiAN6-t205eQ/viewform?embedded=true\" width=\"640\" height=\"1518\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\">Loading…</iframe>', 'Liverpool');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `Name` varchar(200) NOT NULL,
  `Id/Number` bigint(15) NOT NULL,
  `Batch` varchar(50) NOT NULL,
  `Payment Number` bigint(15) NOT NULL,
  `Payment Method` varchar(25) NOT NULL,
  `Payment Month` varchar(25) NOT NULL,
  `Amount` int(10) NOT NULL,
  `Payment time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`Name`, `Id/Number`, `Batch`, `Payment Number`, `Payment Method`, `Payment Month`, `Amount`, `Payment time`) VALUES
('Khan', 0, 'HSC First Year 2', 191628847292, 'Bkash', 'June', 1200, '2020-09-19 00:49:02'),
('Nur', 0, 'bh', 17183938499, 'Bkash', 'October', 1000, '2020-09-19 00:59:36'),
('Nur', 193845758, 'HSC_First_Year_New_1', 19384792948, 'Bkash', 'Ferbruary', 1200, '2020-09-19 01:10:47'),
('Malik', 1029384775, 'HSC_First_Year_1', 182746728292, 'Bkash', 'October', 1200, '2020-09-20 06:08:46');

-- --------------------------------------------------------

--
-- Table structure for table `school/college`
--

CREATE TABLE `school/college` (
  `Serial` int(11) NOT NULL,
  `S&C` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school/college`
--

INSERT INTO `school/college` (`Serial`, `S&C`) VALUES
(14, 'BCIC'),
(15, 'Dhaka College'),
(5, 'MUBC'),
(17, 'Notrdem College'),
(3, 'Rajuk Uattra Model High School & College'),
(13, 'Rupnagar'),
(18, 'St. Joseph Higher Secondary School');

-- --------------------------------------------------------

--
-- Table structure for table `youtube videos`
--

CREATE TABLE `youtube videos` (
  `Serial` int(255) NOT NULL,
  `Link` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `youtube videos`
--

INSERT INTO `youtube videos` (`Serial`, `Link`) VALUES
(22, '9iSEvys7TCA'),
(3, 'b0j3C_GPMWY'),
(15, 'JnX7Oc8LqD8'),
(30, 'M8QJdXaYHGY');

-- --------------------------------------------------------

--
-- Table structure for table `z_hsc_first_year_1`
--

CREATE TABLE `z_hsc_first_year_1` (
  `COL 1` varchar(17) DEFAULT NULL,
  `COL 2` varchar(16) DEFAULT NULL,
  `COL 3` varchar(5) DEFAULT NULL,
  `COL 4` varchar(21) DEFAULT NULL,
  `COL 5` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `z_hsc_first_year_1`
--

INSERT INTO `z_hsc_first_year_1` (`COL 1`, `COL 2`, `COL 3`, `COL 4`, `COL 5`) VALUES
('Timestamp', 'Email Address', 'Score', 'Name', 'Roll'),
('9/21/2020 6:29:39', 'betaus@gmail.com', '2 / 4', 'sheikh halim siddique', '1'),
('9/21/2020 6:32:29', 'Aree@yahoo.com', '3 / 4', 'Miky', '4');

-- --------------------------------------------------------

--
-- Table structure for table `z_hsc_first_year_2`
--

CREATE TABLE `z_hsc_first_year_2` (
  `COL 1` varchar(17) DEFAULT NULL,
  `COL 2` varchar(16) DEFAULT NULL,
  `COL 3` varchar(5) DEFAULT NULL,
  `COL 4` varchar(24) DEFAULT NULL,
  `COL 5` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `z_hsc_first_year_2`
--

INSERT INTO `z_hsc_first_year_2` (`COL 1`, `COL 2`, `COL 3`, `COL 4`, `COL 5`) VALUES
('Timestamp', 'Email Address', 'Score', 'Name', 'Roll'),
('9/21/2020 6:29:39', 'betaus@gmail.com', '2 / 4', 'sheiksakh halim siddique', '1'),
('9/21/2020 6:32:29', 'Aree@yahoo.com', '3 / 4', 'Miakjsdofeky', '3');

-- --------------------------------------------------------

--
-- Table structure for table `z_hsc_first_year_3`
--

CREATE TABLE `z_hsc_first_year_3` (
  `COL 1` varchar(17) DEFAULT NULL,
  `COL 2` varchar(16) DEFAULT NULL,
  `COL 3` varchar(5) DEFAULT NULL,
  `COL 4` varchar(24) DEFAULT NULL,
  `COL 5` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `z_hsc_first_year_3`
--

INSERT INTO `z_hsc_first_year_3` (`COL 1`, `COL 2`, `COL 3`, `COL 4`, `COL 5`) VALUES
('Timestamp', 'Email Address', 'Score', 'Name', 'Roll'),
('9/21/2020 6:29:39', 'betaus@gmail.com', '2 / 4', 'sheiksakh halim siddique', '1'),
('9/21/2020 6:32:29', 'Aree@yahoo.com', '3 / 4', 'Miakjsdofeky', '3');

-- --------------------------------------------------------

--
-- Table structure for table `z_hsc_first_year_new_1`
--

CREATE TABLE `z_hsc_first_year_new_1` (
  `COL 1` varchar(17) DEFAULT NULL,
  `COL 2` varchar(16) DEFAULT NULL,
  `COL 3` varchar(5) DEFAULT NULL,
  `COL 4` varchar(24) DEFAULT NULL,
  `COL 5` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `z_hsc_first_year_new_1`
--

INSERT INTO `z_hsc_first_year_new_1` (`COL 1`, `COL 2`, `COL 3`, `COL 4`, `COL 5`) VALUES
('Timestamp', 'Email Address', 'Score', 'Name', 'Roll'),
('9/21/2020 6:29:39', 'betaus@gmail.com', '2 / 4', 'sheiksakh halim siddique', '1'),
('9/21/2020 6:32:29', 'Aree@yahoo.com', '3 / 4', 'Miakjsdofeky', '3');

-- --------------------------------------------------------

--
-- Table structure for table `z_hsc_first_year_new_2`
--

CREATE TABLE `z_hsc_first_year_new_2` (
  `COL 1` varchar(17) DEFAULT NULL,
  `COL 2` varchar(16) DEFAULT NULL,
  `COL 3` varchar(5) DEFAULT NULL,
  `COL 4` varchar(24) DEFAULT NULL,
  `COL 5` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `z_hsc_first_year_new_2`
--

INSERT INTO `z_hsc_first_year_new_2` (`COL 1`, `COL 2`, `COL 3`, `COL 4`, `COL 5`) VALUES
('Timestamp', 'Email Address', 'Score', 'Name', 'Roll'),
('9/21/2020 6:29:39', 'betaus@gmail.com', '2 / 4', 'sheiksakh halim siddique', '1'),
('9/21/2020 6:32:29', 'Aree@yahoo.com', '3 / 4', 'Miakjsdofeky', '3');

-- --------------------------------------------------------

--
-- Table structure for table `z_hsc_first_year_new_3`
--

CREATE TABLE `z_hsc_first_year_new_3` (
  `COL 1` varchar(17) DEFAULT NULL,
  `COL 2` varchar(16) DEFAULT NULL,
  `COL 3` varchar(5) DEFAULT NULL,
  `COL 4` varchar(24) DEFAULT NULL,
  `COL 5` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `z_hsc_first_year_new_3`
--

INSERT INTO `z_hsc_first_year_new_3` (`COL 1`, `COL 2`, `COL 3`, `COL 4`, `COL 5`) VALUES
('Timestamp', 'Email Address', 'Score', 'Name', 'Roll'),
('9/21/2020 6:29:39', 'betaus@gmail.com', '2 / 4', 'sheiksakh halim siddique', '1'),
('9/21/2020 6:32:29', 'Aree@yahoo.com', '3 / 4', 'Miakjsdofeky', '3');

-- --------------------------------------------------------

--
-- Table structure for table `z_hsc_second_year_1`
--

CREATE TABLE `z_hsc_second_year_1` (
  `COL 1` varchar(17) DEFAULT NULL,
  `COL 2` varchar(16) DEFAULT NULL,
  `COL 3` varchar(5) DEFAULT NULL,
  `COL 4` varchar(24) DEFAULT NULL,
  `COL 5` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `z_hsc_second_year_1`
--

INSERT INTO `z_hsc_second_year_1` (`COL 1`, `COL 2`, `COL 3`, `COL 4`, `COL 5`) VALUES
('Timestamp', 'Email Address', 'Score', 'Name', 'Roll'),
('9/21/2020 6:29:39', 'betaus@gmail.com', '2 / 4', 'sheiksakh halim siddique', '1'),
('9/21/2020 6:32:29', 'Aree@yahoo.com', '3 / 4', 'Miakjsdofeky', '3');

-- --------------------------------------------------------

--
-- Table structure for table `z_hsc_second_year_2`
--

CREATE TABLE `z_hsc_second_year_2` (
  `COL 1` varchar(17) DEFAULT NULL,
  `COL 2` varchar(16) DEFAULT NULL,
  `COL 3` varchar(5) DEFAULT NULL,
  `COL 4` varchar(24) DEFAULT NULL,
  `COL 5` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `z_hsc_second_year_2`
--

INSERT INTO `z_hsc_second_year_2` (`COL 1`, `COL 2`, `COL 3`, `COL 4`, `COL 5`) VALUES
('Timestamp', 'Email Address', 'Score', 'Name', 'Roll'),
('9/21/2020 6:29:39', 'betaus@gmail.com', '2 / 4', 'sheiksakh halim siddique', '1'),
('9/21/2020 6:32:29', 'Aree@yahoo.com', '3 / 4', 'Miakjsdofeky', '3');

-- --------------------------------------------------------

--
-- Table structure for table `z_hsc_second_year_3`
--

CREATE TABLE `z_hsc_second_year_3` (
  `COL 1` varchar(17) DEFAULT NULL,
  `COL 2` varchar(16) DEFAULT NULL,
  `COL 3` varchar(5) DEFAULT NULL,
  `COL 4` varchar(24) DEFAULT NULL,
  `COL 5` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `z_hsc_second_year_3`
--

INSERT INTO `z_hsc_second_year_3` (`COL 1`, `COL 2`, `COL 3`, `COL 4`, `COL 5`) VALUES
('Timestamp', 'Email Address', 'Score', 'Name', 'Roll'),
('9/21/2020 6:29:39', 'betaus@gmail.com', '2 / 4', 'sheiksakh halim siddique', '1'),
('9/21/2020 6:32:29', 'Aree@yahoo.com', '3 / 4', 'Miakjsdofeky', '3');

-- --------------------------------------------------------

--
-- Table structure for table `z_hsc_second_year_new_1`
--

CREATE TABLE `z_hsc_second_year_new_1` (
  `COL 1` varchar(17) DEFAULT NULL,
  `COL 2` varchar(16) DEFAULT NULL,
  `COL 3` varchar(5) DEFAULT NULL,
  `COL 4` varchar(24) DEFAULT NULL,
  `COL 5` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `z_hsc_second_year_new_1`
--

INSERT INTO `z_hsc_second_year_new_1` (`COL 1`, `COL 2`, `COL 3`, `COL 4`, `COL 5`) VALUES
('Timestamp', 'Email Address', 'Score', 'Name', 'Roll'),
('9/21/2020 6:29:39', 'betaus@gmail.com', '2 / 4', 'sheiksakh halim siddique', '1'),
('9/21/2020 6:32:29', 'Aree@yahoo.com', '3 / 4', 'Miakjsdofeky', '3');

-- --------------------------------------------------------

--
-- Table structure for table `z_hsc_second_year_new_2`
--

CREATE TABLE `z_hsc_second_year_new_2` (
  `COL 1` varchar(17) DEFAULT NULL,
  `COL 2` varchar(16) DEFAULT NULL,
  `COL 3` varchar(5) DEFAULT NULL,
  `COL 4` varchar(24) DEFAULT NULL,
  `COL 5` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `z_hsc_second_year_new_2`
--

INSERT INTO `z_hsc_second_year_new_2` (`COL 1`, `COL 2`, `COL 3`, `COL 4`, `COL 5`) VALUES
('Timestamp', 'Email Address', 'Score', 'Name', 'Roll'),
('9/21/2020 6:29:39', 'betaus@gmail.com', '2 / 4', 'sheiksakh halim siddique', '1'),
('9/21/2020 6:32:29', 'Aree@yahoo.com', '3 / 4', 'Miakjsdofeky', '3');

-- --------------------------------------------------------

--
-- Table structure for table `z_hsc_second_year_new_3`
--

CREATE TABLE `z_hsc_second_year_new_3` (
  `COL 1` varchar(17) DEFAULT NULL,
  `COL 2` varchar(16) DEFAULT NULL,
  `COL 3` varchar(5) DEFAULT NULL,
  `COL 4` varchar(24) DEFAULT NULL,
  `COL 5` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `z_hsc_second_year_new_3`
--

INSERT INTO `z_hsc_second_year_new_3` (`COL 1`, `COL 2`, `COL 3`, `COL 4`, `COL 5`) VALUES
('Timestamp', 'Email Address', 'Score', 'Name', 'Roll'),
('9/21/2020 6:29:39', 'betaus@gmail.com', '2 / 4', 'sheiksakh halim siddique', '1'),
('9/21/2020 6:32:29', 'Aree@yahoo.com', '3 / 4', 'Miakjsdofeky', '3');

-- --------------------------------------------------------

--
-- Table structure for table `z_other`
--

CREATE TABLE `z_other` (
  `COL 1` varchar(17) DEFAULT NULL,
  `COL 2` varchar(16) DEFAULT NULL,
  `COL 3` varchar(5) DEFAULT NULL,
  `COL 4` varchar(12) DEFAULT NULL,
  `COL 5` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `z_other`
--

INSERT INTO `z_other` (`COL 1`, `COL 2`, `COL 3`, `COL 4`, `COL 5`) VALUES
('Timestamp', 'Email Address', 'Score', 'Name', 'Roll'),
('9/21/2020 6:29:39', 'betaus@gmail.com', '2 / 4', 'Nur siddique', '1'),
('9/21/2020 6:32:29', 'Aree@yahoo.com', '3 / 4', 'Miakjsdofeky', '3');

-- --------------------------------------------------------

--
-- Table structure for table `z_ssc_1`
--

CREATE TABLE `z_ssc_1` (
  `COL 1` varchar(170) DEFAULT NULL,
  `COL 2` varchar(160) DEFAULT NULL,
  `COL 3` varchar(200) DEFAULT NULL,
  `COL 4` varchar(200) DEFAULT NULL,
  `COL 5` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `z_ssc_1`
--

INSERT INTO `z_ssc_1` (`COL 1`, `COL 2`, `COL 3`, `COL 4`, `COL 5`) VALUES
('Timestamp', 'Email Address', 'Score', 'Name', 'Roll'),
('9/21/2020 6:29:39', 'betaus@gmail.com', '2 / 4', 'Kuddus', '3'),
('9/21/2020 6:32:29', 'Aree@yahoo.com', '3 / 4', 'Miky', '5'),
('Timestamp', 'Email Address', 'Score', 'Name', 'Roll'),
('9/21/2020 6:29:39', 'betaus@gmail.com', '2 / 4', 'Kuddus', '1'),
('9/21/2020 6:32:29', 'Aree@yahoo.com', '3 / 4', 'Miky', '4'),
('Timestamp', 'Email Address', 'Score', 'Name', 'Roll'),
('9/21/2020 6:29:39', 'betaus@gmail.com', '2 / 4', 'Kuddus ali abkbar uddin sheikh halim siddique', '1'),
('9/21/2020 6:32:29', 'Aree@yahoo.com', '3 / 4', 'Miky', '4');

-- --------------------------------------------------------

--
-- Table structure for table `z_ssc_2`
--

CREATE TABLE `z_ssc_2` (
  `COL 1` varchar(17) DEFAULT NULL,
  `COL 2` varchar(16) DEFAULT NULL,
  `COL 3` varchar(5) DEFAULT NULL,
  `COL 4` varchar(45) DEFAULT NULL,
  `COL 5` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `z_ssc_2`
--

INSERT INTO `z_ssc_2` (`COL 1`, `COL 2`, `COL 3`, `COL 4`, `COL 5`) VALUES
('Timestamp', 'Email Address', 'Score', 'Name', 'Roll'),
('9/21/2020 6:29:39', 'betaus@gmail.com', '2 / 4', 'Kuddus ali abkbar uddin sheikh halim siddique', '1'),
('9/21/2020 6:32:29', 'Aree@yahoo.com', '3 / 4', 'Miky', '4');

-- --------------------------------------------------------

--
-- Table structure for table `z_ssc_3`
--

CREATE TABLE `z_ssc_3` (
  `COL 1` varchar(17) DEFAULT NULL,
  `COL 2` varchar(16) DEFAULT NULL,
  `COL 3` varchar(5) DEFAULT NULL,
  `COL 4` varchar(45) DEFAULT NULL,
  `COL 5` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `z_ssc_3`
--

INSERT INTO `z_ssc_3` (`COL 1`, `COL 2`, `COL 3`, `COL 4`, `COL 5`) VALUES
('Timestamp', 'Email Address', 'Score', 'Name', 'Roll'),
('9/21/2020 6:29:39', 'betaus@gmail.com', '2 / 4', 'Kuddus ali abkbar uddin sheikh halim siddique', '1'),
('9/21/2020 6:32:29', 'Aree@yahoo.com', '3 / 4', 'Miky', '4');

-- --------------------------------------------------------

--
-- Table structure for table `z_ssc_new_1`
--

CREATE TABLE `z_ssc_new_1` (
  `COL 1` varchar(17) DEFAULT NULL,
  `COL 2` varchar(16) DEFAULT NULL,
  `COL 3` varchar(5) DEFAULT NULL,
  `COL 4` varchar(45) DEFAULT NULL,
  `COL 5` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `z_ssc_new_1`
--

INSERT INTO `z_ssc_new_1` (`COL 1`, `COL 2`, `COL 3`, `COL 4`, `COL 5`) VALUES
('Timestamp', 'Email Address', 'Score', 'Name', 'Roll'),
('9/21/2020 6:29:39', 'betaus@gmail.com', '2 / 4', 'Kuddus ali abkbar uddin sheikh halim siddique', '1'),
('9/21/2020 6:32:29', 'Aree@yahoo.com', '3 / 4', 'Miky', '4');

-- --------------------------------------------------------

--
-- Table structure for table `z_ssc_new_2`
--

CREATE TABLE `z_ssc_new_2` (
  `COL 1` varchar(17) DEFAULT NULL,
  `COL 2` varchar(16) DEFAULT NULL,
  `COL 3` varchar(5) DEFAULT NULL,
  `COL 4` varchar(21) DEFAULT NULL,
  `COL 5` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `z_ssc_new_2`
--

INSERT INTO `z_ssc_new_2` (`COL 1`, `COL 2`, `COL 3`, `COL 4`, `COL 5`) VALUES
('Timestamp', 'Email Address', 'Score', 'Name', 'Roll'),
('9/21/2020 6:29:39', 'betaus@gmail.com', '2 / 4', 'sheikh halim siddique', '1'),
('9/21/2020 6:32:29', 'Aree@yahoo.com', '3 / 4', 'Miky', '4');

-- --------------------------------------------------------

--
-- Table structure for table `z_ssc_new_3`
--

CREATE TABLE `z_ssc_new_3` (
  `COL 1` varchar(17) DEFAULT NULL,
  `COL 2` varchar(16) DEFAULT NULL,
  `COL 3` varchar(5) DEFAULT NULL,
  `COL 4` varchar(21) DEFAULT NULL,
  `COL 5` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `z_ssc_new_3`
--

INSERT INTO `z_ssc_new_3` (`COL 1`, `COL 2`, `COL 3`, `COL 4`, `COL 5`) VALUES
('Timestamp', 'Email Address', 'Score', 'Name', 'Roll'),
('9/21/2020 6:29:39', 'betaus@gmail.com', '2 / 4', 'sheikh halim siddique', '1'),
('9/21/2020 6:32:29', 'Aree@yahoo.com', '3 / 4', 'Miky', '4');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `all info`
--
ALTER TABLE `all info`
  ADD PRIMARY KEY (`Roll`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `Roll` (`Roll`),
  ADD UNIQUE KEY `Phone` (`Phone`) USING HASH;

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`Batch`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`Payment time`);

--
-- Indexes for table `school/college`
--
ALTER TABLE `school/college`
  ADD PRIMARY KEY (`Serial`),
  ADD UNIQUE KEY `School/College` (`S&C`);

--
-- Indexes for table `youtube videos`
--
ALTER TABLE `youtube videos`
  ADD PRIMARY KEY (`Serial`),
  ADD UNIQUE KEY `Link` (`Link`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `all info`
--
ALTER TABLE `all info`
  MODIFY `Roll` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `school/college`
--
ALTER TABLE `school/college`
  MODIFY `Serial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `youtube videos`
--
ALTER TABLE `youtube videos`
  MODIFY `Serial` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
