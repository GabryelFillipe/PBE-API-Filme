/*******************************************************************************************************************
 * Objetivo: Arquivo respossavel pels requisições da API da locadora de filmes
 * Autor: Gabryel Fillipe Cavalcanti da Silva
 * Data: 07/10/2025
 * Versão: 1.0
 ******************************************************************************************************************/

// Importando dependencias da API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Cria um objeto especialista no formato JSON para receber dados via post e put
const bodyParserJSON = bodyParser.json()
// Importanto das controlers
const controllerFilme = require('./controller/filme/controller_filme.js')

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

// EndPoints para a rota de filmes

// Retorna a lista com todos os filmes
app.get('/v1/locadora/filme', cors(), async function (request, response) {
    // Chama a função para listar os filmes do BD
    let filmes = await controllerFilme.listarFilmes()


    response.status(filmes.status_code).json(filmes)
})

// Retorna o filme filtrando pelo ID
app.get('/v1/locadora/filme/:id', cors(), async function (request, response) {

    // Recebe o ID encaminhado via parametro na requisição
    let idFilme = request.params.id

    // Chama a função para listar os filmes do BD
    let filme = await controllerFilme.buscarFilmeId(idFilme)

    response.status(filme.status_code).json(filme)
})

// Adiciona um filme ao BD
app.post('/v1/locadora/filme', cors(), bodyParserJSON, async function(request, response){

    // Recebe os dados do Body da Requisição (Se utililar o bodyParser, é obrigatorio ter no endPoint)
    let dadosBody = request.body

    // Recebe o tipo de dados da requisição (JSON ou XML ou ...)
    let contentType = request.headers['content-type']

    // Chama a função da controller para inserir um novo filme, encaminha os dados e o content-type
    let filme = await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(filme.status_code).json(filme)

})
app.listen(PORT, function () {
    console.log('API Aguardando Requisições!!!')
})