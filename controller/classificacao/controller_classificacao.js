/*******************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL, para o CRUDE de Ator
 * Data: 29/10/2025
 * Autor: Gabryel Fillipe Cavalcanti da Silva
 * Versão: 1.0
 ******************************************************************************************************************/

const classificacaoDAO = require('../../model/DAO/classificacao.js')

const DEFAUL_MESSAGES = require('../modulo/config_messages')

const listarClassificacoes = async function () {

    // Criando um objeto novo para que um não interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        let resultClassificacao = await classificacaoDAO.getSelectAllClassificacao()

        if (resultClassificacao) {

            if (resultClassificacao.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.atores = resultClassificacao

                return MESSAGES.DEFAULT_HEADER //200

            } else {
                return MESSAGES.ERROR_NOT_FOUND //404
            }

        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

const buscarClassificacaoID = async function (id) {

    // Criando um objeto novo para que um não interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {
        
        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let resultClassificacao = await classificacaoDAO.getSelectByIdClassificacao(Number(id))
            if (resultClassificacao) {
                
                if (resultClassificacao.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.atores = resultClassificacao

                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    return MESSAGES.ERROR_NOT_FOUND //404
                }

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS // 400 referente a validação do ID
        }


    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

const inserirClassificacao = async function (classificacao, contentType) {

    // Criando um objeto novo para que um não interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == "APPLICATION/JSON") {


            let validar = await validarDadosClassificacao(classificacao)

            if (!validar) {

                let resultClassificacao = await classificacaoDAO.setInsertclassificacao(classificacao)

                if (resultClassificacao) {

                    let lastID = await classificacaoDAO.getSelectLastID()
                 
                    if (lastID) {

                        // Adiciona o ID no JSON com os dados do filme
                        classificacao.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = classificacao
                      
                        return MESSAGES.DEFAULT_HEADER // 201

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }

            } else {
                return validar
            }

        } else {
            return MESSAGES.ERRO_CONTENT_TYPE // 415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const atualizarClassificacao = async function (id, classificacao, contentType) {

    // Criando um objeto novo para que um não interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        // Validação do tipo de conteudo da requisição. (Obrigatorio ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validar todos os dados do filme 
            let validar = await validarDadosClassificacao(classificacao)
            if (!validar) {

                // Validação de ID válido, chama a função da controller que verifica no BD se o ID existe
                let validarID = await buscarClassificacaoID(id)

                if (validarID.status_code == 200) {

                    // Adiciona o ID do filme no JSON de dados para ser encaminhados ao DA
                    classificacao.id = Number(id)

                    // Processamento
                    // Chama a função para atualizar uma classificacao no BD
                    let resultClassificacao = await classificacaoDAO.setUpdateClassificacao(classificacao)

                    if (resultClassificacao) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.classificacao = classificacao

                        return MESSAGES.DEFAULT_HEADER // 201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                } else {
                    return validarID // A função poderá retornar (400 ou 404 ou 500)
                }

            } else {
                return validar // 400 referente a validação dos dados
            }

        } else {
            return MESSAGES.ERRO_CONTENT_TYPE // 415
        }

    } catch (error) {
        
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

const excluirClassificacao = async function (id) {

    // Criando um objeto novo para que um nõo interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {
        
        let validarId = await buscarClassificacaoID(id)

    if (validarId.status_code == 200) {

        let resultClassificacao = await classificacaoDAO.setDeleteClassificacao(id)

        if (resultClassificacao) {

            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_DELETED_ITEM.status
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_DELETED_ITEM.status_code
            MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_DELETED_ITEM.message

            return MESSAGES.DEFAULT_HEADER // 200

        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }

    } else {
        return validarId // A função buscarClassificacaoID poderá retornar (400 ou 404 ou 500)
    }


    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

    
}
const validarDadosClassificacao = async function (classificacao) {

    // Criando um objeto novo para que um nõo interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    // Validação de todas as entradas de dados
    if (classificacao.nome == '' || classificacao.nome == undefined || classificacao.nome == null || classificacao.nome.length > 100) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (classificacao.descricao == undefined || classificacao.descricao.length > 250) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Descricao Incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (classificacao.icone_url == undefined || classificacao.icone_url.length > 200) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [URL do Icone Incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false

    }
}
module.exports = {
    listarClassificacoes,
    buscarClassificacaoID,
    inserirClassificacao,
    atualizarClassificacao,
    excluirClassificacao
}