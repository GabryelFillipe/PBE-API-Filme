/*******************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL, para o CRUDE de filmes
 * Data: 07/10/2025
 * Autor: Gabryel Fillipe Cavalcanti da Silva
 * Versão: 1.0
 ******************************************************************************************************************/

// Import da model do DAO do filme
const filmeDAO = require('../../model/DAO/filme.js')

// Import do arquivo de mensagens
const DEFAUL_MESSAGES = require('../modulo/config_messages.js')


// Retorna uma lista de todos os filmes
const listarFilmes = async function () {

    // Criando um objeto novo para que um não interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {
        // Chama a função do DAO para retornar a lista de filmes do BD
        let resultFilmes = await filmeDAO.getSelectAllMovies()

        if (resultFilmes) {
            if (resultFilmes.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.filmes = resultFilmes

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //404
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// Retorna um filme filtrando pelo id
const buscarFilmeId = async function (id) {

    // Criando um objeto novo para que um não interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {



        // Validação da chegada do ID
        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let resultFilmes = await filmeDAO.getSelectByIdMovies(Number(id))

            if (resultFilmes) {

                if (resultFilmes.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filme = resultFilmes

                    return MESSAGES.DEFAULT_HEADER// 200
                } else {
                    return MESSAGES.ERROR_NOT_FOUND //404
                }

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }


        } else {
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

// Insere um filme
const inserirFilme = async function (filme, contentType) {

    // Criando um objeto novo para que um nõo interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        // Validação do tipo de conteudo da requisição. (Obrigatorio ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            // Validação de todas as entradas de dados
            if (filme.nome == '' || filme.nome == undefined || filme.nome == null || filme.nome.length > 100) {

                MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome Incorreto]'
                return MESSAGES.ERROR_REQUIRED_FIELDS

            } else if (filme.sinopse != undefined) {

                MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Sinopse Incorreto]'
                return MESSAGES.ERROR_REQUIRED_FIELDS

            } else if (filme.data_lancamento != undefined || filme.data_lancamento.length != 10) {

                MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data Lançamento Incorreto]'
                return MESSAGES.ERROR_REQUIRED_FIELDS

            } else if (filme.duracao != '' || filme.duracao != undefined || filme.duracao != null || filme.duracao.length > 8) {

                MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Duração Incorreto]'
                return MESSAGES.ERROR_REQUIRED_FIELDS

            } else if (filme.orcamento != '' || filme.orcamento != undefined || filme.orcamento != null || filme.orcamento.length > 12 || typeof (filme.orcamento) != 'number') {

                MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Orçamento Incorreto]'
                return MESSAGES.ERROR_REQUIRED_FIELDS

            } else if (filme.trailer != undefined || filme.trailer.length > 200) {

                MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Trailer Incorreto]'
                return MESSAGES.ERROR_REQUIRED_FIELDS

            } else if (filme.capa != '' || filme.capa != undefined || filme.capa != null || filme.capa.length > 200) {

                MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Capa Incorreto]'
                return MESSAGES.ERROR_REQUIRED_FIELDS

            } else {

                // Processamento
                // Chama a função para inserir um novo filme no BD
                let resultFilmes = await filmeDAO.setInsertMovies(filme)

                if (resultFilmes) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_CREATED_ITEM.message

                    return MESSAGES.DEFAULT_HEADER // 201
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                }

            }
        } else{
            return MESSAGES.ERRO_CONTENT_TYPE // 415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Atualiza um filme buscando pelo id
const atualizarFilme = async function (filme, id) {

}

// Eclui um filme buscando pelo id
const excluirFilme = async function (id) {

}
module.exports = {
    listarFilmes,
    buscarFilmeId
}