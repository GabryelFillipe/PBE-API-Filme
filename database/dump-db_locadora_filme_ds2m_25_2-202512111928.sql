-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: db_locadora_filme_ds2m_25_2
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `tbl_ator`
--

DROP TABLE IF EXISTS `tbl_ator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_ator` (
  `ator_id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `data_nascimento` date DEFAULT NULL,
  `nacionalidade` varchar(100) DEFAULT NULL,
  `foto_url` varchar(200) DEFAULT NULL,
  `biografia` text,
  PRIMARY KEY (`ator_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_ator`
--

LOCK TABLES `tbl_ator` WRITE;
/*!40000 ALTER TABLE `tbl_ator` DISABLE KEYS */;
INSERT INTO `tbl_ator` VALUES (1,'Cillian Murphy','1976-05-25','Irlandês','https://br.web.img3.acsta.net/c_310_420/pictures/14/08/21/14/19/220229.jpg','Cillian Murphy é um ator e músico irlandês. Ele começou sua carreira como músico de rock antes de atuar em teatros e curtas-metragens no final dos anos 1990.'),(2,'Robert Downey Jr.','1965-04-04','Americano','https://br.web.img3.acsta.net/c_310_420/pictures/19/04/24/20/35/0513904.jpg','Robert John Downey Jr. é um ator, produtor e cantor norte-americano. Estreou como ator em 1970 aos 5 anos, no filme Pound, dirigido por seu pai.'),(3,'Mason Thames','2007-07-10','Americano','https://br.web.img2.acsta.net/c_310_420/pictures/22/06/21/16/09/4939223.jpg','Mason Thames é um ator americano, conhecido por seu papel principal no filme de terror O Telefone Preto e como Soluço no live-action de Como Treinar o Seu Dragão.'),(4,'Gerard Butler','1969-11-13','Escocês','https://br.web.img3.acsta.net/c_310_420/pictures/16/02/10/16/27/533904.jpg','Gerard James Butler é um ator e produtor escocês. Conhecido por trabalhos como o Rei Leônidas em 300 e Stoico em Como Treinar o Seu Dragão.'),(5,'Margot Robbie','1990-07-02','Australiana','https://br.web.img2.acsta.net/c_310_420/pictures/19/07/22/16/25/3273673.jpg','Margot Elise Robbie é uma atriz e produtora australiana. Conhecida por seu papel como Arlequina no Universo Estendido DC e como Barbie.');
/*!40000 ALTER TABLE `tbl_ator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_classificacao`
--

DROP TABLE IF EXISTS `tbl_classificacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_classificacao` (
  `classificacao_id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(250) DEFAULT NULL,
  `icone_url` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`classificacao_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_classificacao`
--

LOCK TABLES `tbl_classificacao` WRITE;
/*!40000 ALTER TABLE `tbl_classificacao` DISABLE KEYS */;
INSERT INTO `tbl_classificacao` VALUES (1,'Livre','Exibição em qualquer horário.','https://icones.com/livre.png'),(2,'10 anos','Não recomendado para menores de 10 anos.','https://icones.com/10.png'),(3,'12 anos','Não recomendado para menores de 12 anos.','https://icones.com/12.png'),(4,'14 anos','Não recomendado para menores de 14 anos.','https://icones.com/14.png'),(5,'16 anos','Não recomendado para menores de 16 anos.','https://icones.com/16.png'),(6,'18 anos','Não recomendado para menores de 18 anos.','https://icones.com/18.png');
/*!40000 ALTER TABLE `tbl_classificacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_diretor`
--

DROP TABLE IF EXISTS `tbl_diretor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_diretor` (
  `diretor_id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `nome_artistico` varchar(100) DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  `nacionalidade` varchar(50) DEFAULT NULL,
  `biografia` text,
  `foto` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`diretor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_diretor`
--

LOCK TABLES `tbl_diretor` WRITE;
/*!40000 ALTER TABLE `tbl_diretor` DISABLE KEYS */;
INSERT INTO `tbl_diretor` VALUES (1,'Christopher Edward Nolan','Christopher Nolan','1970-07-30','Reino Unido','Diretor conhecido por narrativas complexas e visuais grandiosos, como em A Origem e Interestelar.','https://image.tmdb.org/t/p/original/xuAIuYSmsUzKlUMBFGVZaKgYZuz.jpg'),(2,'Quentin Jerome Tarantino','Quentin Tarantino','1963-03-27','Estados Unidos','Famoso por diálogos rápidos, violência estilizada e referências à cultura pop.','https://image.tmdb.org/t/p/original/1gjcpAa99FAjHuC67lo78OyPST1.jpg'),(3,'Greta Celeste Gerwig','Greta Gerwig','1983-08-04','Estados Unidos','Começou como atriz e se consagrou diretora com filmes como Lady Bird e Barbie.','https://image.tmdb.org/t/p/original/hntVFO20ZtC17fQ5hC8u3b0jR8.jpg'),(4,'Steven Allan Spielberg','Steven Spielberg','1946-12-18','Estados Unidos','Um dos cineastas mais populares da história, pioneiro da era dos blockbusters.','https://image.tmdb.org/t/p/original/tZxcg19YQ3e8fJ0pOs7hjlnmmr6.jpg'),(5,'Hayao Miyazaki','Hayao Miyazaki','1941-01-05','Japão','Mestre da animação japonesa e co-fundador do Studio Ghibli.','https://image.tmdb.org/t/p/original/5p2SaF06pU0h1E1vH4Z3Q7jX1j.jpg'),(6,'Martin Charles Scorsese','Martin Scorsese','1942-11-17','Estados Unidos','Conhecido por retratar a vida ítalo-americana e o crime organizado.','https://image.tmdb.org/t/p/original/9U9Y5GQuWX3EZy39B8nkk4NY01S.jpg'),(7,'Denis Villeneuve','Denis Villeneuve','1967-10-03','Canadá','Diretor aclamado por filmes de ficção científica visualmente impressionantes como Duna.','https://image.tmdb.org/t/p/original/pG8j0yAdt17c6R5Nl5J0Jg0jX1j.jpg'),(8,'Bong Joon-ho','Bong Joon-ho','1969-09-14','Coreia do Sul','Diretor conhecido por misturar gêneros e crítica social, vencedor do Oscar por Parasita.','https://image.tmdb.org/t/p/original/pG8j0yAdt17c6R5Nl5J0Jg0jX1j.jpg'),(9,'Sofia Carmina Coppola','Sofia Coppola','1971-05-14','Estados Unidos','Cineasta conhecida por filmes atmosféricos e foco em protagonistas femininas.','https://image.tmdb.org/t/p/original/pG8j0yAdt17c6R5Nl5J0Jg0jX1j.jpg'),(10,'Guillermo del Toro','Guillermo del Toro','1964-10-09','México','Famoso por sua fantasia sombria e design de monstros únicos.','https://image.tmdb.org/t/p/original/pG8j0yAdt17c6R5Nl5J0Jg0jX1j.jpg');
/*!40000 ALTER TABLE `tbl_diretor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_elenco`
--

DROP TABLE IF EXISTS `tbl_elenco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_elenco` (
  `elenco_id` int NOT NULL AUTO_INCREMENT,
  `nome_personagem` varchar(100) NOT NULL,
  `ordem_importancia` varchar(100) DEFAULT NULL,
  `filme_id` int NOT NULL,
  `ator_id` int NOT NULL,
  PRIMARY KEY (`elenco_id`),
  KEY `filme_id` (`filme_id`),
  KEY `ator_id` (`ator_id`),
  CONSTRAINT `tbl_elenco_ibfk_1` FOREIGN KEY (`filme_id`) REFERENCES `tbl_filme` (`id`),
  CONSTRAINT `tbl_elenco_ibfk_2` FOREIGN KEY (`ator_id`) REFERENCES `tbl_ator` (`ator_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_elenco`
--

LOCK TABLES `tbl_elenco` WRITE;
/*!40000 ALTER TABLE `tbl_elenco` DISABLE KEYS */;
INSERT INTO `tbl_elenco` VALUES (3,'J. Robert Oppenheimer','Protagonista',10,1),(4,'Lewis Strauss','Antagonista',10,2),(5,'Paul Atreides (Teste)','Protagonista',11,1),(6,'Barão Harkonnen (Teste)','Antagonista',11,4),(7,'Haku (Voz Teste)','Coadjuvante',12,3),(8,'Sharon Tate','Coadjuvante',13,5),(9,'Rick Dalton (Teste)','Protagonista',13,2);
/*!40000 ALTER TABLE `tbl_elenco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_estudio`
--

DROP TABLE IF EXISTS `tbl_estudio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_estudio` (
  `estudio_id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `pais_origem` varchar(100) DEFAULT NULL,
  `data_fundacao` date DEFAULT NULL,
  `site_oficial` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`estudio_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_estudio`
--

LOCK TABLES `tbl_estudio` WRITE;
/*!40000 ALTER TABLE `tbl_estudio` DISABLE KEYS */;
INSERT INTO `tbl_estudio` VALUES (1,'DreamWorks Animation','Estados Unidos','1994-10-12','https://www.dreamworks.com/'),(2,'Universal Pictures','Estados Unidos','1912-04-30','https://www.universalpictures.com/');
/*!40000 ALTER TABLE `tbl_estudio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_filme`
--

DROP TABLE IF EXISTS `tbl_filme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_filme` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `sinopse` text,
  `data_lancamento` date DEFAULT NULL,
  `duracao` time NOT NULL,
  `orcamento` decimal(11,3) NOT NULL,
  `trailer` varchar(200) DEFAULT NULL,
  `capa` varchar(200) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `classificacao_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_filme_classificacao` (`classificacao_id`),
  CONSTRAINT `fk_filme_classificacao` FOREIGN KEY (`classificacao_id`) REFERENCES `tbl_classificacao` (`classificacao_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_filme`
--

LOCK TABLES `tbl_filme` WRITE;
/*!40000 ALTER TABLE `tbl_filme` DISABLE KEYS */;
INSERT INTO `tbl_filme` VALUES (1,'Demon Slayer: Kimetsu no Yaiba - Castelo Infinito','Em Demon Slayer: Kimetsu no Yaiba - Castelo Infinito, a vida do jovem Tanjiro muda por completo quando descobre que sua família foi assassinada por uma raça demoníaca conhecida como Onis. A única sobrevivente deste massacre foi Nezuko, irmã de Tanjiro, que não saiu ilesa desse confronto e foi transformada em um demônio. Diante dessa trágica e sombria circunstância, ele parte numa jornada em busca de uma cura para Nezuko. Para isso, decide se juntar a uma organização dedicada a caçar demônios, pronto para também matar o responsável pela morte de seus pais. Enquanto se fortalece e aprofunda seus laços com outros membros da tropa de caçadores, Tanjiro enfrenta diferentes inimigos em parceria com seus companheiros Zenitsu Agatsuma e Inosuke Hashibira. Ao lado também dos espadachins mais poderosos da organização, tudo precisará valer a pena. No rigoroso programa de fortalecimento coletivo, suas habilidades serão precisas para fazê-lo escapar de um espaço misterioso onde ocorrerá a batalha final.','2025-09-11','02:36:00',20000000.000,'https://youtu.be/x7uLutVRBfI?si=QEriBVAF7--nQTpC','https://br.web.img3.acsta.net/r_1280_720/img/9c/0f/9c0f6e33b4fafe1a3490b3fe4b4d7cce.jpg',1,NULL),(2,'Invocação do Mal 4: O Último Ritual','Invocação do Mal 4: O Último Ritual marca o desfecho da franquia de terror iniciada em 2013 por James Wan. Os filmes são inspirados nas investigações sobrenaturais do famoso casal de paranormais norte-americanos Ed e Lorraine Warren, interpretados por Vera Farmiga e Patrick Wilson. Neste último capítulo, os Warren enfrentam mais um caso aterrorizante, desta vez envolvendo entidades misteriosas que desafiam sua experiência. Ed e Lorraine se veem obrigados a encarar seus maiores medos, colocando suas vidas em risco em uma batalha final contra forças malignas. O filme promete encerrar a história dos investigadores com suspense e momentos de tensão, consolidando a franquia como uma das mais populares do gênero. Além dos sustos, o longa também explora o relacionamento do casal, mostrando sua força emocional diante das adversidades.','2025-09-04','02:15:00',55000000.000,'https://youtu.be/PK36Lr7dJU8?si=dzQHrpK7U-DMH4HB','https://br.web.img2.acsta.net/r_1280_720/img/28/7d/287dbd3c843903f3519952c0af589baf.jpg',1,NULL),(3,'Como Treinar o seu Dragão','Na acidentada ilha de Berk, onde vikings e dragões convivem em constante conflito, vive Soluço (Mason Thames), um jovem imaginativo e subestimado pelo pai, o Chefe Stoico (Gerard Butler). Diferente de seus conterrâneos, Soluço não possui habilidade para caçar dragões, mas busca provar seu valor. Tudo muda quando ele derruba um temido Fúria da Noite, mas, em vez de matá-lo, forma uma improvável amizade com o dragão, a quem chama de Banguela. Esse laço revela a verdadeira natureza dos dragões, desafiando séculos de tradições e crenças da sociedade viking. Com a corajosa Astrid (Nico Parker) e o excêntrico ferreiro Bocão Bonarroto (Nick Frost), Soluço lidera uma jornada de transformação, questionando o medo que separa os dois mundos. Quando uma antiga ameaça ressurge, colocando em risco tanto os vikings quanto os dragões, a amizade de Soluço e Banguela se torna a única esperança de unir os dois lados. A história aborda coragem, liderança e a busca pela paz, enquanto redefine o significado de heroísmo. Baseado na animação da DreamWorks, Como Treinar o Seu Dragão, este live-action traz ação, emoção e um olhar renovado sobre a clássica jornada do jovem viking que ousou mudar o destino de sua vila.','2025-06-12','02:05:00',15000000.000,'https://youtu.be/M7YuVLjEB_U?si=FaGxpBtvVH9uTxPK','https://br.web.img3.acsta.net/r_1280_720/img/2c/59/2c5907be8f52c06b3cba679cd43d2ed7.jpg',1,NULL),(5,'Interestelar','Uma equipe de exploradores viaja através de um buraco de minhoca no espaço, na tentativa de garantir a sobrevivência da humanidade.','2014-11-06','02:49:00',1650000.000,'https://www.youtube.com/watch?v=frD_dDRnDQM','https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',1,3),(6,'Pulp Fiction: Tempo de Violência','As vidas de dois assassinos da máfia, um boxeador, a esposa de um gângster e dois bandidos de lanchonete se entrelaçam em quatro histórias de violência e redenção.','1994-10-14','02:34:00',8000000.000,'https://www.youtube.com/watch?v=s7EdQ4FqbhY','https://image.tmdb.org/t/p/original/tptXRS75yKNOxYk6N74jXT39S5h.jpg',1,5),(7,'Barbie','Barbie sofre uma crise existencial e decide deixar a Barbieland para viajar ao mundo real e descobrir a verdade sobre o universo.','2023-07-20','01:54:00',1450000.000,'https://www.youtube.com/watch?v=U7eL6ZJc1aU','https://image.tmdb.org/t/p/original/yRRuLt7sayEQszaGHP7W8F32mJ.jpg',1,3),(8,'Oppenheimer','A história do físico J. Robert Oppenheimer...','2023-07-20','03:00:00',1000000.000,'https://youtube.com/trailer','https://imagem.com/capa.jpg',1,1),(9,'Oppenheimer','A história do físico J. Robert Oppenheimer...','2023-07-20','03:00:00',1000000.000,'https://youtube.com/trailer','https://imagem.com/capa.jpg',1,1),(10,'Oppenheimer','A história do físico J. Robert Oppenheimer...','2023-07-20','03:00:00',1000000.000,'https://youtube.com/trailer','https://imagem.com/capa.jpg',1,1),(11,'Duna: Parte 2','Paul Atreides se une a Chani e aos Fremen enquanto busca vingança contra os conspiradores que destruíram sua família.','2024-02-29','02:46:00',1900000.000,'https://www.youtube.com/watch?v=Way9Dexny3w','https://br.web.img3.acsta.net/pictures/24/02/28/21/03/4936305.jpg',1,3),(12,'A Viagem de Chihiro','Chihiro chega a um mundo mágico dominado por uma bruxa. Aqueles que a desobedecem são transformados em animais.','2001-07-20','02:05:00',19000000.000,'https://www.youtube.com/watch?v=ByXuk9QqQkk','https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/90/53/72/20101763.jpg',1,1),(13,'Era Uma Vez em... Hollywood','Um ator de televisão e seu dublê embarcam em uma odisseia para se fazerem nomes na indústria cinematográfica durante os assassinatos de Charles Manson em 1969.','2019-08-15','02:41:00',90000000.000,'https://www.youtube.com/watch?v=ELe11xdSwXA','https://br.web.img2.acsta.net/pictures/19/06/05/09/22/3429302.jpg',1,4);
/*!40000 ALTER TABLE `tbl_filme` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_filme_direcao`
--

DROP TABLE IF EXISTS `tbl_filme_direcao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_filme_direcao` (
  `filme_direcao_id` int NOT NULL AUTO_INCREMENT,
  `filme_id` int NOT NULL,
  `diretor_id` int NOT NULL,
  PRIMARY KEY (`filme_direcao_id`),
  KEY `filme_id` (`filme_id`),
  KEY `diretor_id` (`diretor_id`),
  CONSTRAINT `tbl_filme_direcao_ibfk_1` FOREIGN KEY (`filme_id`) REFERENCES `tbl_filme` (`id`),
  CONSTRAINT `tbl_filme_direcao_ibfk_2` FOREIGN KEY (`diretor_id`) REFERENCES `tbl_diretor` (`diretor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_filme_direcao`
--

LOCK TABLES `tbl_filme_direcao` WRITE;
/*!40000 ALTER TABLE `tbl_filme_direcao` DISABLE KEYS */;
INSERT INTO `tbl_filme_direcao` VALUES (1,5,1),(2,6,2),(3,7,3),(4,10,1),(5,11,7),(6,12,5),(7,13,2);
/*!40000 ALTER TABLE `tbl_filme_direcao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_filme_genero`
--

DROP TABLE IF EXISTS `tbl_filme_genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_filme_genero` (
  `filme_genero_id` int NOT NULL AUTO_INCREMENT,
  `filme_id` int NOT NULL,
  `genero_id` int NOT NULL,
  PRIMARY KEY (`filme_genero_id`),
  KEY `filme_id` (`filme_id`),
  KEY `genero_id` (`genero_id`),
  CONSTRAINT `tbl_filme_genero_ibfk_1` FOREIGN KEY (`filme_id`) REFERENCES `tbl_filme` (`id`),
  CONSTRAINT `tbl_filme_genero_ibfk_2` FOREIGN KEY (`genero_id`) REFERENCES `tbl_genero` (`genero_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_filme_genero`
--

LOCK TABLES `tbl_filme_genero` WRITE;
/*!40000 ALTER TABLE `tbl_filme_genero` DISABLE KEYS */;
INSERT INTO `tbl_filme_genero` VALUES (1,5,6),(3,5,13),(4,6,5),(5,6,13),(6,7,8),(8,8,1),(9,9,1),(10,10,1),(11,11,12),(12,11,4),(13,12,13),(14,12,2),(15,13,6),(16,13,5);
/*!40000 ALTER TABLE `tbl_filme_genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_genero`
--

DROP TABLE IF EXISTS `tbl_genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_genero` (
  `genero_id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`genero_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_genero`
--

LOCK TABLES `tbl_genero` WRITE;
/*!40000 ALTER TABLE `tbl_genero` DISABLE KEYS */;
INSERT INTO `tbl_genero` VALUES (1,'Aventura','Filmes que envolvem jornadas, perigos e exploração, geralmente em cenários excitantes ou exóticos.'),(2,'Fantasia','Filmes que incluem elementos mágicos, criaturas míticas e mundos imaginários.'),(4,'Ação',NULL),(5,'Comédia',NULL),(6,'Drama',NULL),(7,'Fantasia',NULL),(8,'Terror',NULL),(9,'Mistério',NULL),(10,'Romance',NULL),(11,'Suspense',NULL),(12,'Ficção Científica',NULL),(13,'Animação',NULL);
/*!40000 ALTER TABLE `tbl_genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_produtor`
--

DROP TABLE IF EXISTS `tbl_produtor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_produtor` (
  `produtor_id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `foto_url` varchar(200) DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  `nacionalidade` varchar(100) DEFAULT NULL,
  `biografia` text,
  PRIMARY KEY (`produtor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_produtor`
--

LOCK TABLES `tbl_produtor` WRITE;
/*!40000 ALTER TABLE `tbl_produtor` DISABLE KEYS */;
INSERT INTO `tbl_produtor` VALUES (1,'Dean DeBlois','','1970-06-07','Canadense','Cineasta e animador canadense. É mais conhecido por escrever e dirigir a trilogia de animação Como Treinar o Seu Dragão, além do filme Lilo & Stitch. Retornou para dirigir e produzir a adaptação live-action de Como Treinar o Seu Dragão.'),(3,'Chris Sanders','','1962-03-12','Americano','Diretor, animador e roteirista americano. É mais conhecido por co-dirigir e co-escrever Lilo & Stitch e o filme de animação original Como Treinar o Seu Dragão. Atua como produtor executivo na adaptação live-action.');
/*!40000 ALTER TABLE `tbl_produtor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'db_locadora_filme_ds2m_25_2'
--

--
-- Dumping routines for database 'db_locadora_filme_ds2m_25_2'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-11 19:28:41
