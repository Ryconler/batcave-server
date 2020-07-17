/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50727
 Source Host           : localhost:3306
 Source Schema         : batcave

 Target Server Type    : MySQL
 Target Server Version : 50727
 File Encoding         : 65001

 Date: 16/07/2020 21:44:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `describe` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `private` varchar(1) COLLATE utf8mb4_bin DEFAULT NULL,
  `create_date` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for like
-- ----------------------------
DROP TABLE IF EXISTS `like`;
CREATE TABLE `like` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `rid` int(11) DEFAULT NULL,
  `fid` int(11) DEFAULT NULL,
  `like_date` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for record
-- ----------------------------
DROP TABLE IF EXISTS `record`;
CREATE TABLE `record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `create_date` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for url
-- ----------------------------
DROP TABLE IF EXISTS `url`;
CREATE TABLE `url` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `content` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `create_date` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `tmp_password` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `register_date` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

SET FOREIGN_KEY_CHECKS = 1;


INSERT INTO `batcave`.`file`(`id`, `uid`, `title`, `location`, `type`, `describe`, `private`, `create_date`) VALUES (1, 1, '历代蝙蝠侠头像', '1594999809416-IMG_0154.JPG', '图片', '', '0', '2020-07-17 23:30:09');
INSERT INTO `batcave`.`file`(`id`, `uid`, `title`, `location`, `type`, `describe`, `private`, `create_date`) VALUES (2, 1, '历代小丑头像', '1594999854764-IMG_0153.JPG', '图片', '', '0', '2020-07-17 23:30:54');

INSERT INTO `batcave`.`like`(`id`, `uid`, `rid`, `fid`, `like_date`) VALUES (1, 1, 1, NULL, '2020-07-17 23:22:04');
INSERT INTO `batcave`.`like`(`id`, `uid`, `rid`, `fid`, `like_date`) VALUES (2, 1, 2, NULL, '2020-07-17 23:22:30');
INSERT INTO `batcave`.`like`(`id`, `uid`, `rid`, `fid`, `like_date`) VALUES (3, 1, 3, NULL, '2020-07-17 23:22:55');
INSERT INTO `batcave`.`like`(`id`, `uid`, `rid`, `fid`, `like_date`) VALUES (4, 1, NULL, 1, '2020-07-17 23:30:11');
INSERT INTO `batcave`.`like`(`id`, `uid`, `rid`, `fid`, `like_date`) VALUES (5, 1, NULL, 2, '2020-07-17 23:31:19');


INSERT INTO `batcave`.`record`(`id`, `content`, `username`, `create_date`) VALUES (1, 'hello', 'zhuxingjie', '2020-07-17 23:11:51');


INSERT INTO `batcave`.`url`(`id`, `uid`, `title`, `content`, `type`, `create_date`) VALUES (1, 1, '个人Demo - 蝙蝠洞 Batcave网站', 'http://batcave.wzmxx.com', '官网', '2020-07-17 23:22:02');
INSERT INTO `batcave`.`url`(`id`, `uid`, `title`, `content`, `type`, `create_date`) VALUES (2, 1, '个人首页 - JesseZhu', 'http://www.wzmxx.com', '官网', '2020-07-17 23:22:29');
INSERT INTO `batcave`.`url`(`id`, `uid`, `title`, `content`, `type`, `create_date`) VALUES (3, 1, '毕设作品 - 用户行为分析平台', 'http://analytics.wzmxx.com', '官网', '2020-07-17 23:22:54');


INSERT INTO `batcave`.`user`(`id`, `username`, `password`, `tmp_password`, `email`, `register_date`) VALUES (1, 'zhuxingjie', '$2a$10$7rltTnVt1UXOJlYiMnsSluOwpNcrOwreYp7fsRJ8n5tWSxDRtiUbu', '', '123@qq.com', '2020-07-17 23:00:07');
