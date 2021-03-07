-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: sql211.byetcluster.com
-- Generation Time: Sep 24, 2020 at 12:46 PM
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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`Batch`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
