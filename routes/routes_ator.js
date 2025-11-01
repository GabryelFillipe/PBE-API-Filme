/*******************************************************************************************************************
 * Objetivo: Arquivo de rotas para os endpoints de Atores
 * Autor: Gabryel Fillipe Cavalcanti da Silva
 * Data: 01/11/2025
 * Versão: 1.0
 ******************************************************************************************************************/

const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');

// Cria um objeto especialista no formato JSON para receber dados via post e put
const bodyParserJSON = bodyParser.json();

// Importa o controller
const controllerAtor = require('../controller/ator/controller_ator.js');

// Retorna a lista de todos os atores
router.get('/', cors(), async function (request, response) {
    let atores = await controllerAtor.listarAtores()
    response.status(atores.status_code).json(atores)
})

// Retorna um ator filtrando pelo ID
router.get('/:id', cors(), async function (request, response) {
    let idAtor = request.params.id
    let ator = await controllerAtor.buscarAtorID(idAtor)
    response.status(ator.status_code).json(ator)
})

// Adiciona um ator ao BD 
router.post('/', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let ator = await controllerAtor.inserirAtor(dadosBody, contentType)
    response.status(ator.status_code).json(ator)
})

//Atualiza um ator do BD
router.put('/:id', cors(), bodyParserJSON, async function (request, response) {
    let idAtor = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let ator = await controllerAtor.atualizarAtor(dadosBody, idAtor, contentType)
    response.status(ator.status_code).json(ator)
})

// Excluir um ator do BD
router.delete('/:id', cors(), async function (request, response) {
    let idAtor = request.params.id
    let ator = await controllerAtor.excluirAtor(idAtor)
    response.status(ator.status_code).json(ator)
})

module.exports = router;