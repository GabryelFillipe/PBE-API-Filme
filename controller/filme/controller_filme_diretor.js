/*******************************************************************************************************************
 * Objetivo: Controller para a relação N:N de Filme e Diretor
 ******************************************************************************************************************/

const filmeDiretorDAO = require('../../model/DAO/filme_diretor.js')
const DEFAUL_MESSAGES = require('../modulo/config_messages.js')

const inserirFilmeDiretor = async function (dados, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            if (dados.filme_id && dados.diretor_id) {
                let result = await filmeDiretorDAO.setInsertFilmeDiretor(dados)
                if (result) {
                    MESSAGES.DEFAULT_HEADER.status = true
                    MESSAGES.DEFAULT_HEADER.status_code = 201
                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                }
            } else {
                return MESSAGES.ERROR_REQUIRED_FIELDS
            }
        } else {
            return MESSAGES.ERRO_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirDiretoresFilme = async function (filmeId) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))
    try {
        await filmeDiretorDAO.setDeleteDiretorByFilmeId(filmeId)
        MESSAGES.DEFAULT_HEADER.status = true
        MESSAGES.DEFAULT_HEADER.status_code = 200
        return MESSAGES.DEFAULT_HEADER
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarDiretoresFilme = async function (filmeId) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))
    try {
        let dados = await filmeDiretorDAO.getSelectDiretoresByFilmeId(filmeId)
        if (dados) {
            MESSAGES.DEFAULT_HEADER.status = true
            MESSAGES.DEFAULT_HEADER.status_code = 200
            MESSAGES.DEFAULT_HEADER.items = dados
            return MESSAGES.DEFAULT_HEADER
        } else {
            return MESSAGES.ERROR_NOT_FOUND
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirFilmeDiretor,
    excluirDiretoresFilme,
    listarDiretoresFilme
}