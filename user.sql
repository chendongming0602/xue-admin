-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2020-06-09 11:48:09
-- 服务器版本： 10.1.28-MariaDB
-- PHP Version: 5.6.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user`
--
CREATE DATABASE IF NOT EXISTS `user` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `user`;

-- --------------------------------------------------------

--
-- 表的结构 `cou`
--

DROP TABLE IF EXISTS `cou`;
CREATE TABLE IF NOT EXISTS `cou` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `time` varchar(255) NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `cou`
--

INSERT INTO `cou` (`id`, `userid`, `time`, `content`) VALUES
(1, 14, '1591688259942', '{\"one0\":\"语文\",\"one1\":\"数学\",\"one3\":\"语文\",\"one2\":\"化学\",\"one5\":\"物理\",\"one4\":\"物理\",\"two2\":\"语文\",\"two1\":\"体育\",\"two0\":\"计算机\",\"two3\":\"数学\",\"two5\":\"数学\",\"two4\":\"地理\",\"three3\":\"数学\",\"three2\":\"地理\",\"three1\":\"政治\",\"three0\":\"化学\",\"three4\":\"英语\",\"three5\":\"化学\",\"four4\":\"物理\",\"four5\":\"物理\",\"four2\":\"政治\",\"four3\":\"政治\",\"four1\":\"数学\",\"four0\":\"地理\",\"five2\":\"英语\",\"five1\":\"英语\",\"five0\":\"数学\",\"five3\":\"数学\",\"five5\":\"物理\",\"five4\":\"化学\"}');

-- --------------------------------------------------------

--
-- 表的结构 `per`
--

DROP TABLE IF EXISTS `per`;
CREATE TABLE IF NOT EXISTS `per` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sid` int(11) DEFAULT NULL,
  `minute` varchar(255) NOT NULL,
  `remark` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `per`
--

INSERT INTO `per` (`id`, `sid`, `minute`, `remark`, `img`) VALUES
(4, 4, '98', '本次数学成绩', '[\"09020891142934737-1.jpg\"]');

-- --------------------------------------------------------

--
-- 表的结构 `student`
--

DROP TABLE IF EXISTS `student`;
CREATE TABLE IF NOT EXISTS `student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `sex` varchar(255) NOT NULL,
  `class` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `student`
--

INSERT INTO `student` (`id`, `name`, `sex`, `class`, `img`) VALUES
(4, '小程', '男', '3班', '06585344629933516-3.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `name`, `pwd`, `img`) VALUES
(13, '小陈老师', '111111', '08288249892940631-詹姆斯.jpeg'),
(14, '小薇老师', '111111', '07614797155211179-啊首付第三方.jpg');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
