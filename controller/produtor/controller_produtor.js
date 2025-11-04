/*******************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL, para o CRUDE de Ator
 * Data: 29/10/2025
 * Autor: Gabryel Fillipe Cavalcanti da Silva
 * Versão: 1.0
 ******************************************************************************************************************/

const produtorDAO = require('../../model/DAO/produtor.js')

const DEFAUL_MESSAGES = require('../modulo/config_messages')

const listarProdutores = async function () {

    // Criando um objeto novo para que um não interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        let resultProdutores = await produtorDAO.getSelectAllProducers()

        if (resultProdutores) {

            if (resultProdutores.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.produtores = resultProdutores

                return MESSAGES.DEFAULT_HEADER //500

            } else {
                return MESSAGES.ERROR_NOT_FOUND // 404
            }

        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

const buscarProdutorID = async function (id) {

    // Criando um objeto novo para que um não interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null) {

            let resultProdutores = await produtorDAO.getSelectByIdProducer(Number(id))

            if (resultProdutores) {

                if (resultProdutores.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.produtor = resultProdutores

                    return MESSAGES.DEFAULT_HEADER

                } else {
                    return MESSAGES.ERROR_NOT_FOUND // 404
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

const inserirProdutor = async function (produtor, contentType) {

    // Criando um objeto novo para que um não interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosProdutor(produtor)

            if (!validar) {

                // chama a função de inserir um novo produtor ao BD
                let resultProdutores = await produtorDAO.setInsertProducers(produtor)
                if (resultProdutores) {

                    // Chama a função para procurar o ultimo ID de produtor adicionado no BD
                    let lastId = await produtorDAO.getSelectLastID()
                    if (lastId) {

                        produtor.id = lastId
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                        MESSAGES.DEFAULT_HEADER.produtor = resultProdutores

                        return MESSAGES.DEFAULT_HEADER //200

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
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

const atualizarProdutor = async function (produtor, id, contentType) {

    // Criando um objeto novo para que um não interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        // Validação do tipo de conteudo da requisição. (Obrigatorio ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validar todos os dados do filme 
            let validar = await validarDadosProdutor(produtor)

            if (!validar) {

                // Validação de ID válido, chama a função da controller que verifica no BD se o ID existe
                let validarID = await buscarProdutorID(id)

                if (validarID.status_code == 200) {

                    // Adiciona o ID do filme no JSON de dados para ser encaminhados ao DA
                    produtor.id = Number(id)

                    // Processamento
                    // Chama a função para atualizar um produtor no BD
                    let resultProdutores = await produtorDAO.setUpdateProducer(produtor)
                    if (resultProdutores) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.produtor = produtor

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

const excluirProdutor = async function (id) {

    // Criando um objeto novo para que um nõo interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        let validarID = await buscarProdutorID(id)


        if (validarID.status_code == 200) {


            // Processamento
            // Chama a função para atualizar um filme no BD
            let resultProdutores = await produtorDAO.setDeleteProducer(id)

            if (resultProdutores) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_DELETED_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_DELETED_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_DELETED_ITEM.message

                return MESSAGES.DEFAULT_HEADER // 200
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return validarID // A função buscarAtorId poderá retornar (400 ou 404 ou 500)
        }

    } catch (error) {

        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

// Validação dos dados de cadastro e atualização do diretor
const validarDadosProdutor = async function (produtor) {

    // Criando um objeto novo para que um nõo interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    // Validação de todas as entradas de dados
    if (produtor.nome == '' || produtor.nome == undefined || produtor.nome == null || produtor.nome.length > 100) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (produtor.data_nascimento == undefined || produtor.data_nascimento.length != 10) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data De Nascimento Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (produtor.nacionalidade == undefined || produtor.nacionalidade.length > 100) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nacionalidade Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (produtor.biografia == undefined) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Biografia Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (produtor.foto_url == undefined || produtor.foto_url.length > 200) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Foto Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }

}

module.exports = {
    listarProdutores,
    buscarProdutorID,
    inserirProdutor,
    atualizarProdutor,
    excluirProdutor
}