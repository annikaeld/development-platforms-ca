CREATE DATABASE  IF NOT EXISTS `express_api_project` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `express_api_project`;
-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: express_api_project
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `submitted_by` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `submitted_by` (`submitted_by`),
  CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`submitted_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (10,'Ken Announces Official Beach Day','Hello Barbieland, Ken here. I’m excited to officially announce something very important: National Beach Day (Ken Edition).\n\nThe idea came to me while I was standing on the beach, looking heroic, holding a surfboard, and thinking about how great beaches are. Naturally, I realized Barbieland deserved a full day dedicated to beach activities, confidence, and excellent hair in the ocean breeze.\n\nThe celebration will include surfing, volleyball, guitar playing, and a special event called “Best Beach Pose.” All Kens are encouraged to participate. Barbies are also welcome, of course, especially if they bring snacks.\n\nI believe this will be one of the most important events in Barbieland history. Possibly the most important. I’ll confirm that after the posing competition.\n\nStay beachy,\n\n— Ken','Events',7,'2026-03-10 21:58:23'),(11,'Ken opens Kenergy gym','Ken surprised residents of Barbieland this week by opening a brand-new fitness center called the Kenergy Gym. According to Ken, the gym is designed to help everyone build confidence, strength, and what he proudly calls “ultimate beach energy.” \n\nThe gym features surfboard balance training, beach push-ups, and a special posing room where members can practice their best dramatic beach stances.\n\nKen says the idea came to him while “thinking really hard about muscles and leadership.” Some Barbies have already visited the gym out of curiosity. While a few admitted the workouts were actually fun, others said the posing room was Ken’s favorite part of the entire building.\n\nKen says he plans to expand the gym soon and may even start offering classes called “Intro to Kenergy.”','Lifestyle',7,'2026-03-10 22:17:16'),(12,'Ken Strikes Again','Barbieland is once again buzzing after Ken made headlines for yet another dramatic attempt to prove he’s more than just “Barbie’s accessory.” \n\nEarlier this week, Ken organized what he called the first-ever “Beach Leadership Summit,” gathering dozens of Kens to discuss important topics like surfboard strategy, horse appreciation, and the future of beach-based governance. Witnesses say the event started smoothly, with Ken delivering a passionate speech about “Kenergy” and the importance of confidence. However, things quickly turned chaotic when several Kens began competing to show off their best beach poses, turning the summit into what one Barbie described as “a surprisingly intense flexing contest.” Despite the confusion, Ken later addressed the media outside Dreamhouse Plaza. “This isn’t about chaos,” he said confidently. “It’s about leadership, vibes, and maybe a little bit of beach.” \n\nBarbie herself appeared amused by the situation, stating that Ken’s enthusiasm is “very on-brand” and that Barbieland always has room for a little extra drama. \n\nWhether the Beach Leadership Summit becomes a new tradition or just another unforgettable Ken moment, one thing is certain: when Ken takes action, Barbieland definitely notices.','Events',7,'2026-03-10 22:19:19'),(13,'Allan Reports: Life Between Barbies and Kens','Hello again, Allan here. Living in Barbieland is interesting when you’re the only Allan around. On one side you’ve got the Barbies running important jobs and building amazing things. On the other side, you’ve got the Kens having intense discussions about beach strategy.\n\nYesterday I tried to help organize a neighborhood meeting. Unfortunately, it somehow turned into a Ken guitar jam session within five minutes. I’m still not sure how that happened. Still, someone has to keep things balanced around here. So if you need help finding a lost surfboard, setting up chairs for a meeting, or just escaping another Ken speech about “Kenergy,” you know where to find me. \n\n— Allan, doing his best.','Community',8,'2026-03-10 22:21:05'),(14,'Allan Finally Gets a Turn','Hi, it’s Allan. Yes, that Allan. The one who lives in Barbieland but somehow isn’t a Barbie or a Ken. It’s a little confusing, but I’ve learned to roll with it. \n\nLately, Ken has been very busy starting new clubs, gyms, and beach meetings. Every time I walk by, there’s another group of Kens practicing dramatic poses and talking about “Kenergy.” I tried joining once, but they said the meeting was “Ken-only.” Fair enough, I guess. So I’ve decided to start my own thing: the Allan Relaxation Club. No posing, no competitions—just snacks, comfy chairs, and maybe a board game or two. \n\nIf anyone’s interested, I’ll be in the corner house. The quiet one. Finally enjoying some peace while the Kens argue about surfboards again.','Opinion',8,'2026-03-10 22:22:16'),(15,'A Perfectly Imperfect Day in Barbieland','Hi everyone, Barbie here! Today in Barbieland started the way most days do — bright sunshine, pink skies, and about twenty Barbies waving good morning at the same time. I love mornings like that. \n\nAfter breakfast I spent some time designing a new dreamhouse room, helped another Barbie test a science experiment, and then went rollerblading down the main street just because it felt like a great day to do it. That’s one of my favorite things about Barbieland — everyone gets to try things, learn things, and be exactly who they want to be. Sometimes things here get a little chaotic (especially when the Kens start a new project), but that’s part of what makes it fun. \n\nEvery day is a chance to try something new, help a friend, and maybe discover a talent you didn’t know you had. And honestly? That sounds like a pretty perfect day to me. — Barbie ?','Lifestyle',5,'2026-03-10 22:24:09'),(16,'Trying Something New','Hi Barbieland! Barbie here. Today I decided to try something completely new — pottery! I’ve tried a lot of careers over the years, but shaping clay on a spinning wheel was a first for me.\n\nAt first it was a little messy. Clay got on my hands, my outfit, and somehow even my hair. But after a while I started to get the hang of it, and I made a small pink bowl that I’m actually really proud of.\n\nThat’s one of my favorite things about life here: you can always learn something new. Whether it’s building a rocket, designing a dress, or trying pottery for the first time, every day is another chance to discover what you love.\n\nTomorrow I might try painting… or maybe surfing. Barbieland is full of possibilities!\n\n— Barbie','Lifestyle',5,'2026-03-10 22:25:26');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,'barbie@barbiegirl.com','$2b$10$s0/SrjlXc/atn.V0mDHgWuH15EI25GQq0A3khnIR6kf50V88fyJ3.','2026-03-09 21:41:46'),(7,'ken@barbiegirl.com','$2b$10$TuQP0ZAmbEeqxF1wZAJ5sOy3tQL1i1.fDHNrFgqw3lct74QXqa3xm','2026-03-09 21:56:53'),(8,'allan@barbieland.com','$2b$10$M..kjIh23.H5CZ74Utc.Ne/TYTtMsoEBHkiOjJTfRpFzpS0tA9wfe','2026-03-10 13:45:01');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-11 19:34:27
