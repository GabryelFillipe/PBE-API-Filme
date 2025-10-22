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

const controllerDiretor = require('./controller/diretor/controller_diretor.js')

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
app.post('/v1/locadora/filme', cors(), bodyParserJSON, async function (request, response) {

    // Recebe os dados do Body da Requisição (Se utililar o bodyParser, é obrigatorio ter no endPoint)
    let dadosBody = request.body

    // Recebe o tipo de dados da requisição (JSON ou XML ou ...)
    let contentType = request.headers['content-type']

    // Chama a função da controller para inserir um novo filme, encaminha os dados e o content-type
    let filme = await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(filme.status_code).json(filme)

})

// Atualiza um filme do BD
app.put('/v1/locadora/filme/:id', cors(), bodyParserJSON, async function (request, response) {

    // Recebe o ID via parametro da requisição
    let idFilme = request.params.id

    // Recebe os dados a serem atualizados
    let dadosBody = request.body

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    let filme = await controllerFilme.atualizarFilme(dadosBody, idFilme, contentType)

    response.status(filme.status_code).json(filme)
})

app.delete('/v1/locadora/filme/:id', cors(),  async function (request, response) {

    // Recebe o ID via parametro da requisição
    let idFilme = request.params.id

    let filme = await controllerFilme.excluirFilme(idFilme)
    //console.log(filme)
    response.status(filme.status_code).json(filme)
})

// Retorna a lista de todos os diretores
app.get('/v1/locadora/diretor', cors(), async function (request, response) {
    let diretores = await controllerDiretor.listarDiretores()

    console.log(diretores)
    response.status(diretores.status_code).json(diretores)
})

// Retorna um diretor filtrando pelo ID
app.get('/v1/locadora/diretor/:id', cors(), async function (request, response) {

    let idDiretor = request.params.id

    let diretor = await controllerDiretor.buscarDiretorID(idDiretor)

    response.status(diretor.status_code).json(diretor)

})

// Adiciona um diretor ao BD 
app.post('/v1/locadora/diretor', cors(), bodyParserJSON, async function (request, response) {

    // Recebe os dados do Body da Requisição (Se utililar o bodyParser, é obrigatorio ter no endPoint)
    let dadosBody = request.body

    // Recebe o tipo de dados da requisição (JSON ou XML ou ...)
    let contentType = request.headers['content-type']
 
    // Chama a função para inserir um diretor ao BD
    let diretor = await controllerDiretor.inserirDiretor(dadosBody, contentType)

    
    response.status(diretor.status_code).json(diretor)

})

//Atualiza um diretor do BD
app.put('/v1/locadora/diretor/:id', cors(), bodyParserJSON, async function(request, response) {
    
    // Recebe o ID via parametro da requisição
    let idDiretor = request.params.id

    // Recebe os dados a serem atualizados
    let dadosBody = request.body

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    let diretor = await controllerDiretor.atualizarDiretor(dadosBody, idDiretor, contentType)

    response.status(diretor.status_code).json(diretor)

})

// Excluir um diretor do BD
app.delete('/v1/locadore/diretor/:id', cors(), async function (request, response) {
    
    let idDiretor = request.params.id

    let diretor = await controllerDiretor.excluirDiretor(idDiretor)
    console.log(diretor)
    response.status(diretor.status_code).json(diretor)

})


app.listen(PORT, function () {
    console.log('API Aguardando Requisições!!!')
})