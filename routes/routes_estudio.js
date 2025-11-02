/*******************************************************************************************************************
 * Objetivo: Arquivo de rotas para os endpoints de Estúdio
 * Autor: Gabryel Fillipe Cavalcanti da Silva
 * Data: 01/11/2025
 * Versão: 1.0
 ******************************************************************************************************************/

const express = require('express');
const router = express.Router();
const cors = require('cors');

// Importa o controller
const controllerEstudio = require('../controller/estudio/controller_estudio.js');

// Retorna a lista de todos os estudios
router.get('/', cors(), async function (request, response) {
    let estudio = await controllerEstudio.listarEstudios()
    response.status(estudio.status_code).json(estudio)
})

// Retorna um estudio filtrando pelo ID
router.get('/:id', cors(), async function (request, response) {
    let idEstudio = request.params.id
    let estudio = await controllerEstudio.buscarEstudioId(idEstudio)
    response.status(estudio.status_code).json(estudio)
})

// Adiciona um estudio ao BD 
router.post('/', cors(),  async function (request, response) {
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let estudio = await controllerEstudio.inserirEstudio(dadosBody, contentType)
    response.status(estudio.status_code).json(estudio)
})

//Atualiza um estudio do BD
router.put('/:id', cors, async function (request, response) {
    let idEstudio = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let estudio = await controllerEstudio.atualizarEstudio(dadosBody, idEstudio, contentType)
    response.status(estudio.status_code).json(estudio)
})

// Excluir um estudio do BD
router.delete('/:id', cors(), async function (request, response) {
    let idEstudio = request.params.id
    let estudio = await controllerEstudio.excluirEstudio(idEstudio)
    response.status(estudio.status_code).json(estudio)
})

module.exports = router;