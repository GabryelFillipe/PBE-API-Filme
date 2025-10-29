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

                MESSAGES.DEFAUL_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAUL_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAUL_HEADER.itens.produtores = resultProdutores

                return MESSAGES.DEFAUL_HEADER //500

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

                    MESSAGES.DEFAUL_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAUL_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAUL_HEADER.produtor = resultProdutores


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

                if (resultProdutores){

                    // Chama a função para procurar o ultimo ID de produtor adicionado no BD
                    let lastId = await produtorDAO.getSelectLastID()

                    if (lastId){

                        produtor.id = lastId
                        MESSAGES.DEFAUL_HEADER.status           =   MESSAGES.SUCESS_REQUEST.status
                        MESSAGES.DEFAUL_HEADER.status_code      =   MESSAGES.SUCESS_REQUEST.status_code
                        MESSAGES.DEFAUL_HEADER.produtor         =   resultProdutores

                        return MESSAGES.DEFAUL_HEADER //200

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
    
}

const excluirProdutor = async function (id) {
    
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