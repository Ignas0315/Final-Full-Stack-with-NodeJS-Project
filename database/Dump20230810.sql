CREATE DATABASE  IF NOT EXISTS `final` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `final`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: final
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (4,'ignaszakaitis@testing.com','$2b$10$OywUNasyMc.4VKLt682epegVSjXRwNyxzI88/lzbTSvGuY6eJ6JxW','Ignas','Žakaitis','2023-08-09 12:29:01'),(47,'ignas@mail.com','$2b$10$1rKrHIUiAi7.N.f2cnd.je0/urAiTimhSv8tiZA2IlZ55suYiFqwa','Ignas','Zakaitis','2023-08-09 20:22:32'),(51,'albinas@mail.com','$2b$10$3iHOy0lDse0hsbWxFoJ7sO1F6mSxUMdpq4CcTf9ykP4cJNNB.LB1G','Albinas','Vyzentlis','2023-08-10 14:13:44'),(52,'iggyz@gmail.com','$2b$10$fH6jY4lur5Qzpl8O8ge9zuNYQlzol7o7iqqnmXwbT1V0AJZ/W4E5a','Ignas','Žakaitis','2023-08-10 15:53:17');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `description` varchar(255) NOT NULL,
  `city` varchar(45) NOT NULL,
  `country` varchar(45) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Helium Portraits','2023-09-07','Art performance','Vilnius','Lithuania','https://cdn-az.allevents.in/events1/banners/5baafa04f21c267a500edc275f2cda47c2f43fb829d43dec1ee3c26195aef948-rimg-w960-h503-gmir.jpg?v=1690563335'),(3,'Rothko Art Exhibition Opening','2023-10-08','Art Exhibition Opening','New York','United States','https://images.artnet.com/gallery-images/425937006/3050dd4f-55e8-4b63-beb9-e05ac20c0533.jpg?x=550%40%211320xaD01NTAmdz0xMzIwJmY9Y292ZXImdD1s'),(4,'Helicon Metal Fest','2024-03-15','Music festival','Warsaw','Poland','https://assets.prod.bandsintown.com/images/homeIcon/festivalPlaceHolderImage/02.png'),(5,'Echo and the Bunnymen','2023-09-18','Concert','London','England','https://d1xqvg77ekojio.cloudfront.net/file/24/5IoMm.I5IYVp3xE5IhRR5IK392H/width=480/height=270/format=-1/fit=crop/rev=0/echo.png'),(6,'Slipknot Concert','2023-09-07','Music concert','Danville','United States','https://images.sk-static.com/images/media/profile_images/artists/1012485/huge_avatar'),(7,'Swans + Norman Westberg','2023-10-28','Music concert','Vilnius','Lithuania','https://tickets.paysera.com/public/images/cli0de87p000b356tthn0x1t1/swans-sv-jonu-baznycia_lt__1684918819.jpeg?bcc3be3a2f701e8e02d3bddd3ec12f68'),(15,'Weeping Willows','2023-08-19','Music Concert','Stockholm','Sweden','https://media.bandsintown.com/300x300/242899.webp'),(18,'Jeudis Jazzy','2023-08-24','Music Concert','Paris','France','https://applications-media.feverup.com/image/upload/f_auto,w_320,h_320/fever2/plan/photo/83502ba8-71b1-11ed-bfc2-b217f655af5f.jpg'),(25,'PGL CS2 Major 2024','2024-03-17','E-Sports Tournament','Copenhagen','Denmark','https://egamersworld.com/cache/p/pg/406/pgl-cs2-major-copenhagen-1679997846595-image.jpg'),(26,'Rugby World Cup','2023-09-08','Sports Event','Saint-Denis','France','https://guidetourism.net/wp-content/uploads/2023/03/0.France-at-the-Rugby-World-Cup-2023.jpg'),(27,'Swiss MedTech Expo','2023-09-12','Medical Devices Expo','Lucerne','Switzerland','https://www.linkinstinct.com/GBN%20Systems/Bildschirmfoto%202021-10-11%20um%2012.31.34%20Cropped.png'),(28,'Berlin Marathon','2023-09-24','Marathon Race','Berlin','Germany','https://www.bmw-berlin-marathon.com/fileadmin/_processed_/d/3/csm_Kipchoge_Website_7993fa76f8.jpg');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participants`
--

DROP TABLE IF EXISTS `participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `age` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_participants_events_idx` (`event_id`),
  CONSTRAINT `fk_participants_events` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participants`
--

LOCK TABLES `participants` WRITE;
/*!40000 ALTER TABLE `participants` DISABLE KEYS */;
INSERT INTO `participants` VALUES (1,3,'Katinas','Lūškis','katinaslus@mail.com','2011-03-24','12'),(16,3,'Rain','Lūškis','rainboxcaat@mail.com','2010-03-24','13'),(41,3,'Ignas','Žakaitis','ignaszakaitis@gmail.com','1996-03-15','27'),(42,5,'Katinas','Lūškis','katinaslus@mail.com','2011-03-24','12'),(46,28,'Eliud','Kipchoge','eliud@kipchoges.com','1984-11-05','38'),(48,6,'Christoph','Schneider','christoph@schneider.de','1966-05-11','57'),(49,6,'Richard Z.','Kruspe','richard@kruspe.de','1967-06-24','56'),(50,6,'Slavoj','Žižek','slavoj@zizek.com','1949-03-31','74'),(51,28,'Haruki','Murakami','haruki@murakami.com','1949-01-12','74'),(52,28,'Ignas','Žakaitis','ignaszakaitis@gmail.com','1996-03-15','27'),(53,4,'Corey','Taylor','corey@slipknot.com','1973-12-08','49'),(54,27,'Ignas','Žakaitis','ignaszakaitis@gmail.com','1996-03-15','27'),(55,4,'Katinas','Herkulis','herkulis@cat.com','2012-03-22','11');
/*!40000 ALTER TABLE `participants` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-10 20:57:55
