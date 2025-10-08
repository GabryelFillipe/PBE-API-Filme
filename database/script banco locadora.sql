CREATE DATABASE db_locadora_filme_ds2m_25_2;

use db_locadora_filme_ds2m_25_2;

CREATE TABLE tbl_filme(
id int PRIMARY KEY  auto_increment not NULL,
nome varchar(100) not NULL,
sinopse text not null,
data_lancamento DATE not null,
duracao TIME not null,
orcamento DECIMAL(11,3) not null,
trailer varchar(100) not null,
capa varchar(200) not null
);

ALTER TABLE tbl_filme
MODIFY COLUMN sinopse text NULL;

ALTER TABLE tbl_filme
MODIFY COLUMN data_lancamento DATE NULL;

ALTER TABLE tbl_filme
MODIFY COLUMN trailer varchar(200) NULL;


INSERT into tbl_filme(nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa) 
VALUES(
"Demon Slayer: Kimetsu no Yaiba - Castelo Infinito", 
"Em Demon Slayer: Kimetsu no Yaiba - Castelo Infinito, a vida do jovem Tanjiro muda por completo quando descobre que sua família foi assassinada por uma raça demoníaca conhecida como Onis. A única sobrevivente deste massacre foi Nezuko, irmã de Tanjiro, que não saiu ilesa desse confronto e foi transformada em um demônio. Diante dessa trágica e sombria circunstância, ele parte numa jornada em busca de uma cura para Nezuko. Para isso, decide se juntar a uma organização dedicada a caçar demônios, pronto para também matar o responsável pela morte de seus pais. Enquanto se fortalece e aprofunda seus laços com outros membros da tropa de caçadores, Tanjiro enfrenta diferentes inimigos em parceria com seus companheiros Zenitsu Agatsuma e Inosuke Hashibira. Ao lado também dos espadachins mais poderosos da organização, tudo precisará valer a pena. No rigoroso programa de fortalecimento coletivo, suas habilidades serão precisas para fazê-lo escapar de um espaço misterioso onde ocorrerá a batalha final.",
'2025-09-11',
'02:36',
'20000000',
'https://youtu.be/x7uLutVRBfI?si=QEriBVAF7--nQTpC',
'https://br.web.img3.acsta.net/r_1280_720/img/9c/0f/9c0f6e33b4fafe1a3490b3fe4b4d7cce.jpg'
);


INSERT into tbl_filme(nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa) 
VALUES(
	"Invocação do Mal 4: O Último Ritual",
	"Invocação do Mal 4: O Último Ritual marca o desfecho da franquia de terror iniciada em 2013 por James Wan. Os filmes são inspirados nas investigações sobrenaturais do famoso casal de paranormais norte-americanos Ed e Lorraine Warren, interpretados por Vera Farmiga e Patrick Wilson. Neste último capítulo, os Warren enfrentam mais um caso aterrorizante, desta vez envolvendo entidades misteriosas que desafiam sua experiência. Ed e Lorraine se veem obrigados a encarar seus maiores medos, colocando suas vidas em risco em uma batalha final contra forças malignas. O filme promete encerrar a história dos investigadores com suspense e momentos de tensão, consolidando a franquia como uma das mais populares do gênero. Além dos sustos, o longa também explora o relacionamento do casal, mostrando sua força emocional diante das adversidades.",
	'2025-09-4',
	'02:15',
	'55000000',
	"https://youtu.be/PK36Lr7dJU8?si=dzQHrpK7U-DMH4HB",
	"https://br.web.img2.acsta.net/r_1280_720/img/28/7d/287dbd3c843903f3519952c0af589baf.jpg"
);

INSERT into tbl_filme(nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa) 
VALUES(
	"Como Treinar o seu Dragão",
	"Na acidentada ilha de Berk, onde vikings e dragões convivem em constante conflito, vive Soluço (Mason Thames), um jovem imaginativo e subestimado pelo pai, o Chefe Stoico (Gerard Butler). Diferente de seus conterrâneos, Soluço não possui habilidade para caçar dragões, mas busca provar seu valor. Tudo muda quando ele derruba um temido Fúria da Noite, mas, em vez de matá-lo, forma uma improvável amizade com o dragão, a quem chama de Banguela. Esse laço revela a verdadeira natureza dos dragões, desafiando séculos de tradições e crenças da sociedade viking. Com a corajosa Astrid (Nico Parker) e o excêntrico ferreiro Bocão Bonarroto (Nick Frost), Soluço lidera uma jornada de transformação, questionando o medo que separa os dois mundos. Quando uma antiga ameaça ressurge, colocando em risco tanto os vikings quanto os dragões, a amizade de Soluço e Banguela se torna a única esperança de unir os dois lados. A história aborda coragem, liderança e a busca pela paz, enquanto redefine o significado de heroísmo. Baseado na animação da DreamWorks, Como Treinar o Seu Dragão, este live-action traz ação, emoção e um olhar renovado sobre a clássica jornada do jovem viking que ousou mudar o destino de sua vila.",
	'2025-06-12',
	'02:05',
	'15000000',
	"https://youtu.be/M7YuVLjEB_U?si=FaGxpBtvVH9uTxPK",
	"https://br.web.img3.acsta.net/r_1280_720/img/2c/59/2c5907be8f52c06b3cba679cd43d2ed7.jpg"
);