/*******************************************************************************************************************
 * Objetivo: Arquivo de rotas para os endpoints de Gênero
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
const controllerGenero = require('../controller/genero/controller_genero.js');

// Retorna a lista de todos os generos
router.get('/', cors(), async function (request, response) {
    let genero = await controllerGenero.listarGeneros()
    response.status(genero.status_code).json(genero)
})

// Retorna um genero filtrando pelo ID
router.get('/:id', cors(), async function (request, response) {
    let idGenero = request.params.id
    let genero = await controllerGenero.buscarGeneroId(idGenero)
    response.status(genero.status_code).json(genero)
})

// Adiciona um genero ao BD 
router.post('/', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let genero = await controllerGenero.inserirGenero(dadosBody, contentType)
    response.status(genero.status_code).json(genero)
})

//Atualiza um genero do BD
router.put('/:id', cors(), bodyParserJSON, async function (request, response) {
    let idGenero = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let genero = await controllerGenero.atualizarGenero(dadosBody, idGenero, contentType)
    response.status(genero.status_code).json(genero)
})

// Excluir um genero do BD
router.delete('/:id', cors(), async function (request, response) {
    let idGenero = request.params.id
    let genero = await controllerGenero.excluirGenero(idGenero)
    response.status(genero.status_code).json(genero)
})

module.exports = router;