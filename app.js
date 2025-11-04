/*******************************************************************************************************************
 * Objetivo: Arquivo respossavel pels requisições da API da locadora de filmes
 * Autor: Gabryel Fillipe Cavalcanti da Silva
 * Data: 01/11/2025
 * Versão: 1.0.1
 ******************************************************************************************************************/

// Importando dependencias da API
const express   = require('express')
const cors      = require('cors')

// Retorna a porta do servidor atual ou coloca uma porta local
const PORT = process.PORT || 8080

// Criando uma Instancia de uma classe do express
const app = express()

//Configuração de permissões
app.use((request, response, next) => {
    response.header('Acess-Control-Allow-Origin', '*')    //Servidor de origem da API
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') //Verbos permitidos na API
    // Carrega as configurações no CORS da API
    app.use(cors())
    next() // Próximo, carregar os proximos endPoints
})

// Usado para substituir a variavel bodyParserJSON
//  assim fazendo com que não seja necessario passa-la toda vez que for usar o endPoint que precise de dados via JSON
app.use(express.json())

// --- Importação dos Arquivos de Rota ---
const filmeRoutes           = require('./routes/routes_filme.js');
const diretorRoutes         = require('./routes/routes_diretor.js');
const atorRoutes            = require('./routes/routes_ator.js');
const classificacaoRoutes   = require('./routes/routes_classificacao.js');
const produtorRoutes        = require('./routes/routes_produtor.js');
const generoRoutes          = require('./routes/routes_genero.js');
const estudioRoutes         = require('./routes/routes_estudio.js');

// EndPoints da API
app.use('/v1/locadora/filme', filmeRoutes);
app.use('/v1/locadora/diretor', diretorRoutes);
app.use('/v1/locadora/ator', atorRoutes);
app.use('/v1/locadora/classificacao', classificacaoRoutes);
app.use('/v1/locadora/produtor', produtorRoutes);
app.use('/v1/locadora/genero', generoRoutes);
app.use('/v1/locadora/estudio', estudioRoutes);

// --- Iniciar Servidor ---
app.listen(PORT, function () {
    console.log('API Aguardando Requisições!!!')
})