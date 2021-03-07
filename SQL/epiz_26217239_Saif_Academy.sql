-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: sql211.byetcluster.com
-- Generation Time: Sep 24, 2020 at 12:43 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `Batch` varchar(100) NOT NULL,
  `Notice` text NOT NULL,
  `Exam` text NOT NULL,
  `About` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`Batch`, `Notice`, `Exam`, `About`) VALUES
('Home', 'This is Home page', '', ''),
('HSC First Year 1', 'Amar Shonar Bangla', '<iframe src=\"https://docs.google.com/forms/d/e/1FAIpQLSdA8DhiGyd87LzSAo8ffm2CkKcg8ilv93OYhpyiAN6-t205eQ/viewform?embedded=true\" width=\"640\" height=\"1518\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\">Loading…</iframe>', 'This is HSC 1'),
('HSC First Year 2', 'This is HSC Frist Year 2', 'There have no xm yet', 'Abal marka'),
('HSC First Year 3', 'adfef dfa', '<iframe src=\"https://docs.google.com/forms/d/e/1FAIpQLSdA8DhiGyd87LzSAo8ffm2CkKcg8ilv93OYhpyiAN6-t205eQ/viewform?embedded=true\" width=\"640\" height=\"1518\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\">Loadingâ€¦</iframe>', 'fapor bazz'),
('HSC First Year New 1', 'adfecvsad', '<iframe src=\"https://docs.google.com/forms/d/e/1FAIpQLSdA8DhiGyd87LzSAo8ffm2CkKcg8ilv93OYhpyiAN6-t205eQ/viewform?embedded=true\" width=\"640\" height=\"1518\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\">Loading…</iframe>', 'This is HSC first year new 1'),
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
  `Name` varchar(100) NOT NULL,
  `Roll` int(160) NOT NULL,
  `Batch` varchar(160) NOT NULL,
  `Payment Number` varchar(160) NOT NULL,
  `Payment Method` varchar(160) NOT NULL,
  `Payment Month` varchar(100) NOT NULL,
  `Amount` int(100) NOT NULL,
  `Payment time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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

-- --------------------------------------------------------

--
-- Table structure for table `youtube videos`
--

CREATE TABLE `youtube videos` (
  `Serial` int(250) NOT NULL,
  `Link` varchar(250) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `youtube videos`
--

INSERT INTO `youtube videos` (`Serial`, `Link`) VALUES
(3, 'M8QJdXaYHGY');

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
  ADD UNIQUE KEY `Phone` (`Phone`),
  ADD UNIQUE KEY `Email` (`Email`);

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
  ADD PRIMARY KEY (`Serial`);

--
-- Indexes for table `youtube videos`
--
ALTER TABLE `youtube videos`
  ADD PRIMARY KEY (`Serial`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `all info`
--
ALTER TABLE `all info`
  MODIFY `Roll` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `school/college`
--
ALTER TABLE `school/college`
  MODIFY `Serial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `youtube videos`
--
ALTER TABLE `youtube videos`
  MODIFY `Serial` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
