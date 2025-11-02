/*******************************************************************************************************************
 * Objetivo: Arquivo de rotas para os endpoints de Filmes
 * Autor: Gabryel Fillipe Cavalcanti da Silva
 * Data: 01/11/2025
 * Versão: 1.0
 ******************************************************************************************************************/

const express = require('express');
const router = express.Router();
const cors = require('cors');


// Importa o controller de filme
const controllerFilme = require('../controller/filme/controller_filme.js');

// Retorna a lista com todos os filmes
// ( /v1/locadora/filme )
router.get('/', cors(), async function (request, response) {
    let filmes = await controllerFilme.listarFilmes()
    response.status(filmes.status_code).json(filmes)
})

// Retorna o filme filtrando pelo ID
// ( /v1/locadora/filme/:id )
router.get('/:id', cors(), async function (request, response) {
    let idFilme = request.params.id
    let filme = await controllerFilme.buscarFilmeId(idFilme)
    response.status(filme.status_code).json(filme)
})

// Adiciona um filme ao BD
// ( /v1/locadora/filme )
router.post('/', cors(),  async function (request, response) {
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let filme = await controllerFilme.inserirFilme(dadosBody, contentType)
    response.status(filme.status_code).json(filme)
})

// Atualiza um filme do BD
// ( /v1/locadora/filme/:id )
router.put('/:id', cors(),  async function (request, response) {
    let idFilme = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let filme = await controllerFilme.atualizarFilme(dadosBody, idFilme, contentType)
    response.status(filme.status_code).json(filme)
})

// Exclui um filme
// ( /v1/locadora/filme/:id )
router.delete('/:id', cors(), async function (request, response) {
    let idFilme = request.params.id
    let filme = await controllerFilme.excluirFilme(idFilme)
    response.status(filme.status_code).json(filme)
})

module.exports = router;