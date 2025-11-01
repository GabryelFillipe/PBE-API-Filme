/*******************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL, para o CRUDE de estudios
 * Data: 01/11/2025
 * Autor: Gabryel Fillipe Cavalcanti da Silva
 * Versão: 1.0
 ******************************************************************************************************************/

// Import da model do DAO do estudio
const estudioDAO = require('../../model/DAO/estudio.js')

// Import do arquivo de mensagens
const DEFAUL_MESSAGES = require('../modulo/config_messages.js')


// Retorna uma lista de todos os estudios
const listarEstudios = async function () {

    // Criando um objeto novo para que um não interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {
        // Chama a função do DAO para retornar a lista de estudios do BD
        let resultEstudios = await estudioDAO.getSelectAllEstudios()
        if (resultEstudios) {
            if (resultEstudios.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.estudios = resultEstudios

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// Retorna um estudio filtrando pelo id
const buscarEstudioId = async function (id) {

    // Criando um objeto novo para que um não interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        // Validação da chegada do ID
        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let resultEstudios = await estudioDAO.getSelectByIdEstudio(Number(id))

            if (resultEstudios) {

                if (resultEstudios.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.estudio = resultEstudios

                    return MESSAGES.DEFAULT_HEADER// 200
                } else {
                    return MESSAGES.ERROR_NOT_FOUND //404
                }

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }


        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS // 400 referente a validação do ID
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

// Insere um estudio
const inserirEstudio = async function (estudio, contentType) {

    // Criando um objeto novo para que um nõo interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        // Validação do tipo de conteudo da requisição. (Obrigatorio ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validar todos os dados do estudio 
            let validar = await validarDadosEstudio(estudio)

            if (!validar) {

                // Processamento
                // Chama a função para inserir um novo estudio no BD
                let resultEstudios = await estudioDAO.setInsertEstudio(estudio)

                if (resultEstudios) {

                    // Chama a função para recerber o ID gerado no BD
                    let lastID = await estudioDAO.getSelectLastID()

                    if (lastID) {

                        // Adiciona o ID no JSON com os dados do estudio
                        estudio.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = estudio

                        return MESSAGES.DEFAULT_HEADER // 201

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                }

            } else {
                return validar // 400
            }
        } else {
            return MESSAGES.ERRO_CONTENT_TYPE // 415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Atualiza um estudio buscando pelo id
const atualizarEstudio = async function (estudio, id, contentType) {

    // Criando um objeto novo para que um nõo interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        // Validação do tipo de conteudo da requisição. (Obrigatorio ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validar todos os dados do estudio 
            let validar = await validarDadosEstudio(estudio)

            if (!validar) {

                // Validação de ID válido, chama a função da controller que verifica no BD se o ID existe
                let validarID = await buscarEstudioId(id)

                if (validarID.status_code == 200) {

                    // Adiciona o ID do estudio no JSON de dados para ser encaminhados ao DAO
                    estudio.id = Number(id)

                    // Processamento
                    // Chama a função para atualizar um estudio no BD
                    let resultEstudios = await estudioDAO.setUpdateEstudio(estudio)

                    if (resultEstudios) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.estudio = estudio

                        return MESSAGES.DEFAULT_HEADER // 201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                } else {
                    return validarID // A função buscarEstudioId poderá retornar (400 ou 404 ou 500)
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

// Exclui um estudio buscando pelo id
const excluirEstudio = async function (id) {

    // Criando um objeto novo para que um nõo interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        let validarID = await buscarEstudioId(id)


        if (validarID.status_code == 200) {

            // Processamento
            // Chama a função para excluir um estudio no BD
            let resultEstudios = await estudioDAO.setDeleteEstudio(id)

            if (resultEstudios) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_DELETED_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_DELETED_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_DELETED_ITEM.message

                return MESSAGES.DEFAULT_HEADER // 200
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return validarID // A função buscarEstudioId poderá retornar (400 ou 404 ou 500)
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

// Validação dos dados de cadastro e atualização do estudio
const validarDadosEstudio = async function (estudio) {

    // Criando um objeto novo para que um nõo interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    // Validação de todas as entradas de dados
    if (estudio.nome == '' || estudio.nome == undefined || estudio.nome == null || estudio.nome.length > 100) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (estudio.pais_origem == undefined || estudio.pais_origem.length > 100) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [País de Origem Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (estudio.data_fundacao == undefined || estudio.data_fundacao.length != 10) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data de Fundação Incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (estudio.site_oficial == undefined || estudio.site_oficial.length > 200) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Site Oficial Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }

}

module.exports = {
    listarEstudios,
    buscarEstudioId,
    inserirEstudio,
    atualizarEstudio,
    excluirEstudio
}