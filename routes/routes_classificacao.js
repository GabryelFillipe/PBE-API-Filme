/*******************************************************************************************************************
 * Objetivo: Arquivo de rotas para os endpoints de Classificação
 * Autor: Gabryel Fillipe Cavalcanti da Silva
 * Data: 01/11/2025
 * Versão: 1.0
 ******************************************************************************************************************/

const express = require('express');
const router = express.Router();
const cors = require('cors');


// Importa o controller
const controllerClassificacao = require('../controller/classificacao/controller_classificacao.js');

// Retorna a lista de todos as classificações
router.get('/', cors(), async function (request, response) {
    let classificacoes = await controllerClassificacao.listarClassificacoes()
    response.status(classificacoes.status_code).json(classificacoes)
})

// Retorna uma classificação filtrando pelo ID
router.get('/:id', cors(), async function (request, response) {
    let idClassificacao = request.params.id
    let classificacao = await controllerClassificacao.buscarClassificacaoID(idClassificacao)
    response.status(classificacao.status_code).json(classificacao)
})

// Adiciona uma classificacao ao BD 
router.post('/', cors(),  async function (request, response) {
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let classificacao = await controllerClassificacao.inserirClassificacao(dadosBody, contentType)
    response.status(classificacao.status_code).json(classificacao)
})

//Atualiza uma classificação do BD
router.put('/:id', cors(),  async function (request, response) {
    let idClassificacao = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let classificacao = await controllerClassificacao.atualizarClassificacao(idClassificacao, dadosBody, contentType)
    response.status(classificacao.status_code).json(classificacao)
})

// Excluir um classificação do BD
router.delete('/:id', cors(), async function (request, response) {
    let idClassificacao = request.params.id
    let classificacao = await controllerClassificacao.excluirClassificacao(idClassificacao)
    response.status(classificacao.status_code).json(classificacao)
})

module.exports = router;