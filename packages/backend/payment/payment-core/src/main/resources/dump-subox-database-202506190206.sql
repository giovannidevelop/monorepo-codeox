-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: subox-database
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `provincia`
--

DROP TABLE IF EXISTS `provincia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provincia` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `region_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhphylnams6qjc4n5ai5jsadpt` (`region_id`),
  CONSTRAINT `FKhphylnams6qjc4n5ai5jsadpt` FOREIGN KEY (`region_id`) REFERENCES `region` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provincia`
--

LOCK TABLES `provincia` WRITE;
/*!40000 ALTER TABLE `provincia` DISABLE KEYS */;
INSERT INTO `provincia` VALUES (1,'Arica',1),(2,'Parinacota',1),(3,'Iquique',2),(4,'El Tamarugal',2),(5,'Tocopilla',3),(6,'El Loa',3),(7,'Antofagasta',3),(8,'Chañaral',4),(9,'Copiapó',4),(10,'Huasco',4),(11,'Elqui',5),(12,'Limarí',5),(13,'Choapa',5),(14,'Petorca',6),(15,'Los Andes',6),(16,'San Felipe de Aconcagua',6),(17,'Quillota',6),(18,'Valparaiso',6),(19,'San Antonio',6),(20,'Isla de Pascua',6),(21,'Marga Marga',6),(22,'Chacabuco',7),(23,'Santiago',7),(24,'Cordillera',7),(25,'Maipo',7),(26,'Melipilla',7),(27,'Talagante',7),(28,'Cachapoal',8),(29,'Colchagua',8),(30,'Cardenal Caro',8),(31,'Curicó',9),(32,'Talca',9),(33,'Linares',9),(34,'Cauquenes',9),(35,'Diguillín',10),(36,'Itata',10),(37,'Punilla',10),(38,'Bio Bío',11),(39,'Concepción',11),(40,'Arauco',11),(41,'Malleco',12),(42,'Cautín',12),(43,'Valdivia',13),(44,'Ranco',13),(45,'Osorno',14),(46,'Llanquihue',14),(47,'Chiloé',14),(48,'Palena',14),(49,'Coyhaique',15),(50,'Aysén',15),(51,'General Carrera',15),(52,'Capitán Prat',15),(53,'Última Esperanza',16),(54,'Magallanes',16),(55,'Tierra del Fuego',16),(56,'Antártica Chilena',16);
/*!40000 ALTER TABLE `provincia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `region`
--

DROP TABLE IF EXISTS `region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `region` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `region`
--

LOCK TABLES `region` WRITE;
/*!40000 ALTER TABLE `region` DISABLE KEYS */;
INSERT INTO `region` VALUES (1,'Arica y Parinacota'),(2,'Tarapacá'),(3,'Antofagasta'),(4,'Atacama'),(5,'Coquimbo'),(6,'Valparaiso'),(7,'Metropolitana de Santiago'),(8,'Libertador General Bernardo O\'Higgins'),(9,'Maule'),(10,'Ñuble'),(11,'Biobío'),(12,'La Araucanía'),(13,'Los Ríos'),(14,'Los Lagos'),(15,'Aysén del General Carlos Ibáñez del Campo'),(16,'Magallanes y de la Antártica Chilena');
/*!40000 ALTER TABLE `region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ubicacion`
--

DROP TABLE IF EXISTS `ubicacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ubicacion` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `calle` varchar(255) DEFAULT NULL,
  `codigo_postal` varchar(255) DEFAULT NULL,
  `complemento` varchar(255) DEFAULT NULL,
  `direccion_completa` varchar(255) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `numero` varchar(255) DEFAULT NULL,
  `referencia` varchar(255) DEFAULT NULL,
  `validada` bit(1) NOT NULL,
  `comuna_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKq5ryrepnj677opqp968s8xmkl` (`comuna_id`),
  CONSTRAINT `FKq5ryrepnj677opqp968s8xmkl` FOREIGN KEY (`comuna_id`) REFERENCES `comuna` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ubicacion`
--

LOCK TABLES `ubicacion` WRITE;
/*!40000 ALTER TABLE `ubicacion` DISABLE KEYS */;
INSERT INTO `ubicacion` VALUES (1,'C. de Anacleto Rozas','02048','Piso 3','C. de Anacleto Rozas 65, Piso 3, 02048',-22.0394105,76.188234,'65','Temporibus nostrum odit sed.',_binary '\0',190),(2,'Ronda de Jesusa Zamora','71049','Puerta 3','Ronda de Jesusa Zamora 29, Puerta 3, 71049',-19.0011495,26.649639,'29','Consectetur tenetur neque.',_binary '',209),(3,'Alameda de Paulino Tamarit','73760','Piso 4','Alameda de Paulino Tamarit 8, Piso 4, 73760',-18.9413355,-116.909301,'8','Excepturi recusandae maxime.',_binary '',91),(4,'Pasadizo Gabriel Meléndez','43611','Apt. 95','Pasadizo Gabriel Meléndez 95, Apt. 95, 43611',-6.3454145,-148.195375,'95','Voluptates aspernatur ullam unde impedit repellendus.',_binary '',46),(5,'Cuesta de Tecla Guitart','37300','Piso 7','Cuesta de Tecla Guitart 15, Piso 7, 37300',15.046199,146.964724,'15','Minus perferendis cum labore quis aliquam.',_binary '\0',140),(6,'C. Trinidad Español','25965','Piso 7','C. Trinidad Español 85, Piso 7, 25965',-0.3620685,-22.816463,'85','Consequatur ea illum quo cum.',_binary '',329),(7,'Callejón Charo Castelló','77314','Puerta 5','Callejón Charo Castelló 699, Puerta 5, 77314',-1.282627,-151.808333,'699','Id maxime deleniti explicabo aut.',_binary '\0',314),(8,'Avenida Salvador Roma','46955','Puerta 1','Avenida Salvador Roma 95, Puerta 1, 46955',-43.1477295,-145.206415,'95','Ea est accusantium placeat.',_binary '',128),(9,'Calle de Berto Pagès','56650','Puerta 4','Calle de Berto Pagès 2, Puerta 4, 56650',32.0292675,161.586455,'2','Labore sapiente numquam.',_binary '\0',60),(10,'Urbanización Leyre Vigil','48492','Apt. 86','Urbanización Leyre Vigil 35, Apt. 86, 48492',-14.563872,-34.785709,'35','Provident esse dignissimos molestiae quam distinctio.',_binary '\0',139),(11,'Avenida de Palmira Benito','08228','Puerta 1','Avenida de Palmira Benito 5, Puerta 1, 08228',-62.8489075,-115.987127,'5','Officiis nobis eius ratione reiciendis non.',_binary '\0',214),(12,'Urbanización Adriana Fabra','79057','Piso 5','Urbanización Adriana Fabra 346, Piso 5, 79057',-75.826032,-26.296844,'346','Nulla tempore ipsa quam eum.',_binary '\0',164),(13,'Paseo de Cayetano Gámez','73171','Piso 9','Paseo de Cayetano Gámez 78, Piso 9, 73171',77.7277555,-3.342561,'78','Tempora nisi voluptatum.',_binary '\0',278),(14,'Cañada de Marcial Blasco','66623','Apt. 28','Cañada de Marcial Blasco 42, Apt. 28, 66623',-9.9949545,103.234985,'42','Aliquam esse vel voluptate dolorem.',_binary '',87),(15,'Pasadizo Marcial Reina','25620','Piso 9','Pasadizo Marcial Reina 66, Piso 9, 25620',-39.535258,-2.378759,'66','Modi a quam recusandae hic similique.',_binary '\0',231),(16,'Callejón de Alberto Benavides','32112','Apt. 11','Callejón de Alberto Benavides 23, Apt. 11, 32112',-34.1205665,124.713454,'23','Impedit repellat inventore dolores expedita.',_binary '\0',146),(17,'Avenida de Teodora Aguirre','34247','Apt. 94','Avenida de Teodora Aguirre 88, Apt. 94, 34247',89.192442,82.987246,'88','Maxime incidunt dolores fuga eum.',_binary '',90),(18,'Plaza de Sebastian Moles','53786','Apt. 40','Plaza de Sebastian Moles 78, Apt. 40, 53786',-42.974802,96.47928,'78','Nobis blanditiis quis.',_binary '\0',200),(19,'C. de Georgina Sarabia','95254','Puerta 6','C. de Georgina Sarabia 4, Puerta 6, 95254',-89.493341,-173.342164,'4','Accusantium eaque quaerat quasi sequi.',_binary '',346),(20,'C. de Amor Alemany','40733','Puerta 2','C. de Amor Alemany 78, Puerta 2, 40733',-47.558058,137.059249,'78','Laborum suscipit omnis vero nemo eligendi.',_binary '',184),(21,'Camino Álvaro Mir','48647','Puerta 1','Camino Álvaro Mir 14, Puerta 1, 48647',-26.042697,18.199128,'14','Ullam quod dolorem nisi voluptatum accusantium.',_binary '\0',98),(22,'Pasaje María Ángeles Quintero','31987','Piso 8','Pasaje María Ángeles Quintero 31, Piso 8, 31987',14.866367,36.728861,'31','Minus labore ratione odit.',_binary '',193),(23,'Cuesta de Isaías Arrieta','41120','Piso 2','Cuesta de Isaías Arrieta 1, Piso 2, 41120',39.008875,5.405055,'1','Dicta quas excepturi pariatur totam tempora.',_binary '\0',160),(24,'Glorieta de Quique Rebollo','18207','Puerta 3','Glorieta de Quique Rebollo 90, Puerta 3, 18207',-68.375737,82.893266,'90','Soluta harum minus provident.',_binary '\0',15),(25,'Ronda de Reynaldo Quevedo','68734','Puerta 2','Ronda de Reynaldo Quevedo 4, Puerta 2, 68734',-68.6535075,-69.384927,'4','Cumque illo distinctio nam itaque quas.',_binary '',212),(26,'Calle Chuy Uriarte','82759','Apt. 67','Calle Chuy Uriarte 72, Apt. 67, 82759',37.6910015,20.058048,'72','Molestiae iste voluptatem.',_binary '',33),(27,'Cañada Heliodoro Yáñez','80532','Piso 0','Cañada Heliodoro Yáñez 171, Piso 0, 80532',-69.479459,-144.698064,'171','Magnam numquam voluptas.',_binary '\0',269),(28,'Alameda Alberto Córdoba','28975','Apt. 48','Alameda Alberto Córdoba 479, Apt. 48, 28975',31.954312,-124.965845,'479','Et adipisci esse minima consequatur.',_binary '\0',8),(29,'Pasaje Samu Batlle','14780','Apt. 01','Pasaje Samu Batlle 78, Apt. 01, 14780',-51.1199315,157.423408,'78','Dolores maxime voluptatibus beatae at expedita.',_binary '\0',180),(30,'Via Omar Tamayo','98001','Piso 6','Via Omar Tamayo 4, Piso 6, 98001',4.491686,130.148489,'4','Tempore optio eius ipsa necessitatibus veniam.',_binary '',335);
/*!40000 ALTER TABLE `ubicacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comuna`
--

DROP TABLE IF EXISTS `comuna`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comuna` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `provincia_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKeskq277uf527hbrp9yk1ytj2p` (`provincia_id`),
  CONSTRAINT `FKeskq277uf527hbrp9yk1ytj2p` FOREIGN KEY (`provincia_id`) REFERENCES `provincia` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=347 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comuna`
--

LOCK TABLES `comuna` WRITE;
/*!40000 ALTER TABLE `comuna` DISABLE KEYS */;
INSERT INTO `comuna` VALUES (1,'Arica',1),(2,'Camarones',1),(3,'General Lagos',2),(4,'Putre',2),(5,'Alto Hospicio',3),(6,'Iquique',3),(7,'Camiña',4),(8,'Colchane',4),(9,'Huara',4),(10,'Pica',4),(11,'Pozo Almonte',4),(12,'Tocopilla',5),(13,'María Elena',5),(14,'Calama',6),(15,'Ollague',6),(16,'San Pedro de Atacama',6),(17,'Antofagasta',7),(18,'Mejillones',7),(19,'Sierra Gorda',7),(20,'Taltal',7),(21,'Chañaral',8),(22,'Diego de Almagro',8),(23,'Copiapó',9),(24,'Caldera',9),(25,'Tierra Amarilla',9),(26,'Vallenar',10),(27,'Alto del Carmen',10),(28,'Freirina',10),(29,'Huasco',10),(30,'La Serena',11),(31,'Coquimbo',11),(32,'Andacollo',11),(33,'La Higuera',11),(34,'Paihuano',11),(35,'Vicuña',11),(36,'Ovalle',12),(37,'Combarbalá',12),(38,'Monte Patria',12),(39,'Punitaqui',12),(40,'Río Hurtado',12),(41,'Illapel',13),(42,'Canela',13),(43,'Los Vilos',13),(44,'Salamanca',13),(45,'La Ligua',14),(46,'Cabildo',14),(47,'Zapallar',14),(48,'Papudo',14),(49,'Petorca',14),(50,'Los Andes',15),(51,'San Esteban',15),(52,'Calle Larga',15),(53,'Rinconada',15),(54,'San Felipe',16),(55,'Llaillay',16),(56,'Putaendo',16),(57,'Santa María',16),(58,'Catemu',16),(59,'Panquehue',16),(60,'Quillota',17),(61,'La Cruz',17),(62,'La Calera',17),(63,'Nogales',17),(64,'Hijuelas',17),(65,'Valparaíso',18),(66,'Viña del Mar',18),(67,'Concón',18),(68,'Quintero',18),(69,'Puchuncaví',18),(70,'Casablanca',18),(71,'Juan Fernández',18),(72,'San Antonio',19),(73,'Cartagena',19),(74,'El Tabo',19),(75,'El Quisco',19),(76,'Algarrobo',19),(77,'Santo Domingo',19),(78,'Isla de Pascua',20),(79,'Quilpué',21),(80,'Limache',21),(81,'Olmué',21),(82,'Villa Alemana',21),(83,'Colina',22),(84,'Lampa',22),(85,'Tiltil',22),(86,'Santiago',23),(87,'Vitacura',23),(88,'San Ramón',23),(89,'San Miguel',23),(90,'San Joaquín',23),(91,'Renca',23),(92,'Recoleta',23),(93,'Quinta Normal',23),(94,'Quilicura',23),(95,'Pudahuel',23),(96,'Providencia',23),(97,'Peñalolén',23),(98,'Pedro Aguirre Cerda',23),(99,'Ñuñoa',23),(100,'Maipú',23),(101,'Macul',23),(102,'Lo Prado',23),(103,'Lo Espejo',23),(104,'Lo Barnechea',23),(105,'Las Condes',23),(106,'La Reina',23),(107,'La Pintana',23),(108,'La Granja',23),(109,'La Florida',23),(110,'La Cisterna',23),(111,'Independencia',23),(112,'Huechuraba',23),(113,'Estación Central',23),(114,'El Bosque',23),(115,'Conchalí',23),(116,'Cerro Navia',23),(117,'Cerrillos',23),(118,'Puente Alto',24),(119,'San José de Maipo',24),(120,'Pirque',24),(121,'San Bernardo',25),(122,'Buin',25),(123,'Paine',25),(124,'Calera de Tango',25),(125,'Melipilla',26),(126,'Alhué',26),(127,'Curacaví',26),(128,'María Pinto',26),(129,'San Pedro',26),(130,'Isla de Maipo',27),(131,'El Monte',27),(132,'Padre Hurtado',27),(133,'Peñaflor',27),(134,'Talagante',27),(135,'Codegua',28),(136,'Coínco',28),(137,'Coltauco',28),(138,'Doñihue',28),(139,'Graneros',28),(140,'Las Cabras',28),(141,'Machalí',28),(142,'Malloa',28),(143,'Mostazal',28),(144,'Olivar',28),(145,'Peumo',28),(146,'Pichidegua',28),(147,'Quinta de Tilcoco',28),(148,'Rancagua',28),(149,'Rengo',28),(150,'Requínoa',28),(151,'San Vicente de Tagua Tagua',28),(152,'Chépica',29),(153,'Chimbarongo',29),(154,'Lolol',29),(155,'Nancagua',29),(156,'Palmilla',29),(157,'Peralillo',29),(158,'Placilla',29),(159,'Pumanque',29),(160,'San Fernando',29),(161,'Santa Cruz',29),(162,'La Estrella',30),(163,'Litueche',30),(164,'Marchigüe',30),(165,'Navidad',30),(166,'Paredones',30),(167,'Pichilemu',30),(168,'Curicó',31),(169,'Hualañé',31),(170,'Licantén',31),(171,'Molina',31),(172,'Rauco',31),(173,'Romeral',31),(174,'Sagrada Familia',31),(175,'Teno',31),(176,'Vichuquén',31),(177,'Talca',32),(178,'San Clemente',32),(179,'Pelarco',32),(180,'Pencahue',32),(181,'Maule',32),(182,'San Rafael',32),(183,'Curepto',33),(184,'Constitución',32),(185,'Empedrado',32),(186,'Río Claro',32),(187,'Linares',33),(188,'San Javier',33),(189,'Parral',33),(190,'Villa Alegre',33),(191,'Longaví',33),(192,'Colbún',33),(193,'Retiro',33),(194,'Yerbas Buenas',33),(195,'Cauquenes',34),(196,'Chanco',34),(197,'Pelluhue',34),(198,'Bulnes',35),(199,'Chillán',35),(200,'Chillán Viejo',35),(201,'El Carmen',35),(202,'Pemuco',35),(203,'Pinto',35),(204,'Quillón',35),(205,'San Ignacio',35),(206,'Yungay',35),(207,'Cobquecura',36),(208,'Coelemu',36),(209,'Ninhue',36),(210,'Portezuelo',36),(211,'Quirihue',36),(212,'Ránquil',36),(213,'Treguaco',36),(214,'San Carlos',37),(215,'Coihueco',37),(216,'San Nicolás',37),(217,'Ñiquén',37),(218,'San Fabián',37),(219,'Alto Biobío',38),(220,'Antuco',38),(221,'Cabrero',38),(222,'Laja',38),(223,'Los Ángeles',38),(224,'Mulchén',38),(225,'Nacimiento',38),(226,'Negrete',38),(227,'Quilaco',38),(228,'Quilleco',38),(229,'San Rosendo',38),(230,'Santa Bárbara',38),(231,'Tucapel',38),(232,'Yumbel',38),(233,'Concepción',39),(234,'Coronel',39),(235,'Chiguayante',39),(236,'Florida',39),(237,'Hualpén',39),(238,'Hualqui',39),(239,'Lota',39),(240,'Penco',39),(241,'San Pedro de La Paz',39),(242,'Santa Juana',39),(243,'Talcahuano',39),(244,'Tomé',39),(245,'Arauco',40),(246,'Cañete',40),(247,'Contulmo',40),(248,'Curanilahue',40),(249,'Lebu',40),(250,'Los Álamos',40),(251,'Tirúa',40),(252,'Angol',41),(253,'Collipulli',41),(254,'Curacautín',41),(255,'Ercilla',41),(256,'Lonquimay',41),(257,'Los Sauces',41),(258,'Lumaco',41),(259,'Purén',41),(260,'Renaico',41),(261,'Traiguén',41),(262,'Victoria',41),(263,'Temuco',42),(264,'Carahue',42),(265,'Cholchol',42),(266,'Cunco',42),(267,'Curarrehue',42),(268,'Freire',42),(269,'Galvarino',42),(270,'Gorbea',42),(271,'Lautaro',42),(272,'Loncoche',42),(273,'Melipeuco',42),(274,'Nueva Imperial',42),(275,'Padre Las Casas',42),(276,'Perquenco',42),(277,'Pitrufquén',42),(278,'Pucón',42),(279,'Saavedra',42),(280,'Teodoro Schmidt',42),(281,'Toltén',42),(282,'Vilcún',42),(283,'Villarrica',42),(284,'Valdivia',43),(285,'Corral',43),(286,'Lanco',43),(287,'Los Lagos',43),(288,'Máfil',43),(289,'Mariquina',43),(290,'Paillaco',43),(291,'Panguipulli',43),(292,'La Unión',44),(293,'Futrono',44),(294,'Lago Ranco',44),(295,'Río Bueno',44),(296,'Osorno',45),(297,'Puerto Octay',45),(298,'Purranque',45),(299,'Puyehue',45),(300,'Río Negro',45),(301,'San Juan de la Costa',45),(302,'San Pablo',45),(303,'Calbuco',46),(304,'Cochamó',46),(305,'Fresia',46),(306,'Frutillar',46),(307,'Llanquihue',46),(308,'Los Muermos',46),(309,'Maullín',46),(310,'Puerto Montt',46),(311,'Puerto Varas',46),(312,'Ancud',47),(313,'Castro',47),(314,'Chonchi',47),(315,'Curaco de Vélez',47),(316,'Dalcahue',47),(317,'Puqueldón',47),(318,'Queilén',47),(319,'Quellón',47),(320,'Quemchi',47),(321,'Quinchao',47),(322,'Chaitén',48),(323,'Futaleufú',48),(324,'Hualaihué',48),(325,'Palena',48),(326,'Lago Verde',49),(327,'Coihaique',49),(328,'Aysén',50),(329,'Cisnes',50),(330,'Guaitecas',50),(331,'Río Ibáñez',51),(332,'Chile Chico',51),(333,'Cochrane',52),(334,'O\'Higgins',52),(335,'Tortel',52),(336,'Natales',53),(337,'Torres del Paine',53),(338,'Laguna Blanca',54),(339,'Punta Arenas',54),(340,'Río Verde',54),(341,'San Gregorio',54),(342,'Porvenir',55),(343,'Primavera',55),(344,'Timaukel',55),(345,'Cabo de Hornos',56),(346,'Antártica',56);
/*!40000 ALTER TABLE `comuna` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-19  2:06:10
