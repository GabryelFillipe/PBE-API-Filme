--
-- Tabela: tbl_classificacao
--
CREATE TABLE tbl_classificacao (
    classificacao_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(250) NULL,
    icone_url VARCHAR(200) NULL
);

--
-- Tabela: tbl_estudio
--
CREATE TABLE tbl_estudio (
    estudio_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    pais_origem VARCHAR(100) NULL,
    data_fundacao DATE NULL,
    site_oficial VARCHAR(200) NULL
);

--
-- Tabela: tbl_tipo_distribuidor
--
CREATE TABLE tbl_tipo_distribuidor (
    tipo_distribuidor_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL
);

--
-- Tabela: tbl_distribuidor
-- (Esta tabela depende de 'tbl_tipo_distribuidor')
--
CREATE TABLE tbl_distribuidor (
    distribuidor_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    site VARCHAR(200) NULL,
    telefone VARCHAR(20) NULL,
    email VARCHAR(200) NULL,
    tipo_distribuidor_id INT NULL, -- 'NULL' para permitir cadastro independente
    FOREIGN KEY (tipo_distribuidor_id) REFERENCES tbl_tipo_distribuidor(tipo_distribuidor_id)
);

--
-- Tabela: tbl_genero
--
CREATE TABLE tbl_genero (
    genero_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(200) NULL
);

--
-- Tabela: tbl_ator
--
CREATE TABLE tbl_ator (
    ator_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE NULL,
    nacionalidade VARCHAR(100) NULL,
    foto_url VARCHAR(200) NULL,
    biografia TEXT NULL
);

--
-- Tabela: tbl_diretor
--
CREATE TABLE tbl_diretor (
    diretor_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    nome_artistico VARCHAR(100) NULL,
    data_nascimento DATE NULL,
    nacionalidade VARCHAR(50) NULL,
    biografia TEXT NULL,
    foto VARCHAR(200) NULL
);

--
-- Tabela: tbl_produtor
--
CREATE TABLE tbl_produtor (
    produtor_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    foto_url VARCHAR(200) NULL,
    data_nascimento DATE NULL,
    nacionalidade VARCHAR(100) NULL,
    biografia TEXT NULL
);

--
-- Tabela: tbl_filme_genero
-- (Conecta filme e genero)
--
CREATE TABLE tbl_filme_genero (
    filme_genero_id INT PRIMARY KEY AUTO_INCREMENT,
    filme_id INT NOT NULL,
    genero_id INT NOT NULL,
    FOREIGN KEY (filme_id) REFERENCES tbl_filme(filme_id),
    FOREIGN KEY (genero_id) REFERENCES tbl_genero(genero_id)
);

--
-- Tabela: elenco
-- (Conecta filme e ator)
--
CREATE TABLE elenco (
    elenco_id INT PRIMARY KEY AUTO_INCREMENT,
    nome_personagem VARCHAR(100) NOT NULL,
    ordem_importancia VARCHAR(100) NULL,
    filme_id INT NOT NULL,
    ator_id INT NOT NULL,
    FOREIGN KEY (filme_id) REFERENCES tbl_filme(filme_id),
    FOREIGN KEY (ator_id) REFERENCES tbl_ator(ator_id)
);

--
-- Tabela: tbl_filme_direcao
-- (Conecta filme e diretor)
--
CREATE TABLE tbl_filme_direcao (
    filme_direcao_id INT PRIMARY KEY AUTO_INCREMENT,
    filme_id INT NOT NULL,
    diretor_id INT NOT NULL,
    FOREIGN KEY (filme_id) REFERENCES tbl_filme(filme_id),
    FOREIGN KEY (diretor_id) REFERENCES tbl_diretor(diretor_id)
);

--
-- Tabela: tbl_filme_producao
-- (Conecta filme e produtor)
--
CREATE TABLE tbl_filme_producao (
    filme_producao_id INT PRIMARY KEY AUTO_INCREMENT,
    funcao VARCHAR(100) NOT NULL,
    filme_id INT NOT NULL,
    produtor_id INT NOT NULL,
    FOREIGN KEY (filme_id) REFERENCES tbl_filme(filme_id),
    FOREIGN KEY (produtor_id) REFERENCES tbl_produtor(produtor_id)
);

ALTER TABLE tbl_filme
    ADD CONSTRAINT fk_filme_classificacao
        FOREIGN KEY (cassificacao_id)
        REFERENCES tbl_classificacao(classificacao_id),
    
    ADD CONSTRAINT fk_filme_estudio
        FOREIGN KEY (estudio_id)
        REFERENCES tbl_estudio(estudio_id),
        
    ADD CONSTRAINT fk_filme_distribuidor
        FOREIGN KEY (distribuidor_id)
        REFERENCES tbl_distribuidor(distribuidor_id);


INSERT INTO tbl_genero (
    nome
) 
VALUES

    ('Ação'),
    ('Comédia'),
    ('Comédia Romântica'),
    ('Crime'),
    ('Documentário'),
    ('Drama'),
    ('Esporte'),
    ('Família'),
    ('Fantasia'),
    ('Faroeste'),
    ('Ficção Científica'),
    ('Guerra'),
    ('História'),
    ('Mistério'),
    ('Musical'),
    ('Policial'),
    ('Romance'),
    ('Suspense'),
    ('Biografia');


