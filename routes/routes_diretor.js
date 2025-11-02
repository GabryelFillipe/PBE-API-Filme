/*******************************************************************************************************************
 * Objetivo: Arquivo de rotas para os endpoints de Diretores
 * Autor: Gabryel Fillipe Cavalcanti da Silva
 * Data: 01/11/2025
 * Versão: 1.0
 ******************************************************************************************************************/

const express = require('express');
const router = express.Router();
const cors = require('cors');

// Importa o controller
const controllerDiretor = require('../controller/diretor/controller_diretor.js');

// Retorna a lista de todos os diretores
router.get('/', cors(), async function (request, response) {
    let diretores = await controllerDiretor.listarDiretores()
    response.status(diretores.status_code).json(diretores)
})

// Retorna um diretor filtrando pelo ID
router.get('/:id', cors(), async function (request, response) {
    let idDiretor = request.params.id
    let diretor = await controllerDiretor.buscarDiretorID(idDiretor)
    response.status(diretor.status_code).json(diretor)
})

// Adiciona um diretor ao BD 
router.post('/', cors(),  async function (request, response) {
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let diretor = await controllerDiretor.inserirDiretor(dadosBody, contentType)
    response.status(diretor.status_code).json(diretor)
})

//Atualiza um diretor do BD
router.put('/:id', cors(), async function (request, response) {
    let idDiretor = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let diretor = await controllerDiretor.atualizarDiretor(dadosBody, idDiretor, contentType)
    response.status(diretor.status_code).json(diretor)
})

// Excluir um diretor do BD
router.delete('/:id', cors(), async function (request, response) {
    let idDiretor = request.params.id
    let diretor = await controllerDiretor.excluirDiretor(idDiretor)
    response.status(diretor.status_code).json(diretor)
})

module.exports = router;