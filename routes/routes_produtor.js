/*******************************************************************************************************************
 * Objetivo: Arquivo de rotas para os endpoints de Produtor
 * Autor: Gabryel Fillipe Cavalcanti da Silva
 * Data: 01/11/2025
 * Versão: 1.0
 ******************************************************************************************************************/

const express = require('express');
const router = express.Router();
const cors = require('cors');

// Importa o controller
const controllerProdutor = require('../controller/produtor/controller_produtor.js');

// Retorna a lista de todos as produtor
router.get('/', cors(), async function (request, response) {
    let produtor = await controllerProdutor.listarProdutores()
    response.status(produtor.status_code).json(produtor)
})

// Retorna uma produtor filtrando pelo ID
router.get('/:id', cors(), async function (request, response) {
    let idProdutor = request.params.id
    let produtor = await controllerProdutor.buscarProdutorID(idProdutor)
    response.status(produtor.status_code).json(produtor)
})

// Adiciona um produtor ao BD 
router.post('/', cors(),  async function (request, response) {
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let produtor = await controllerProdutor.inserirProdutor(dadosBody, contentType)
    response.status(produtor.status_code).json(produtor)
})

//Atualiza uma produtor do BD
router.put('/:id', cors(),  async function (request, response) {
    let idProdutor = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let produtor = await controllerProdutor.atualizarProdutor(dadosBody, idProdutor, contentType)
    response.status(produtor.status_code).json(produtor)
})

// Excluir um produtor do BD
router.delete('/:id', cors(), async function (request, response) {
    let idProdutor = request.params.id
    let produtor = await controllerProdutor.excluirProdutor(idProdutor)
    response.status(produtor.status_code).json(produtor)
})

module.exports = router;