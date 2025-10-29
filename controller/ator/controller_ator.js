/*******************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL, para o CRUDE de Ator
 * Data: 29/10/2025
 * Autor: Gabryel Fillipe Cavalcanti da Silva
 * Versão: 1.0
 ******************************************************************************************************************/

const atorDAO = require('../../model/DAO/ator.js')

const DEFAUL_MESSAGES = require('../modulo/config_messages')

// Busca todos os ator
const listarAtores = async function () {

    // Criando um objeto novo para que um não interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        // Chama a função para inserir um novo filme no BD
        let resultAtores = await atorDAO.getSelectAllActors()

        if (resultAtores) {

            if (resultAtores.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.atores = resultAtores

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                return MESSAGES.ERROR_NOT_FOUND // 404
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //404
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// Busca um ator filtrando pelo id
const buscarAtorID = async function (id) {

    // Criando um objeto novo para que um não interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            // Chama a função para inserir um novo filme no BD
            let resultAtores = await atorDAO.getSelectByIdActor(Number(id))

            if (resultAtores) {

                if (resultAtores.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.itens.atores = resultAtores

                    return MESSAGES.DEFAULT_HEADER //200
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

// Insere um ator
const inserirAtor = async function (ator, contentType) {

    // Criando um objeto novo para que um não interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))
    try {

         // Validação do tipo de conteudo da requisição. (Obrigatorio ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            // Chama a função de validar dados do ator
            let validar = await validarDadosAtor(ator)

            if (!validar) {

                // Chama a função para inserir um novo filme no BD
                let resultAtores = await atorDAO.setInsertActors(ator)
                
                if (resultAtores) {

                    // Chama a função para procurar o ultimo ID de ator adicionado no BD
                    let lastID = await atorDAO.getSelectLastID()
                    
                    if (lastID) {
                        // Adiciona o ID no JSON com os dados do filme
                        ator.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = ator

                        return MESSAGES.DEFAULT_HEADER // 201

                    }else {
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
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

// Atualiza um ator
const atualizarAtor = async function (ator, id, contentType) {

    // Criando um objeto novo para que um não interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        // Validação do tipo de conteudo da requisição. (Obrigatorio ser um JSON)
                if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
        
                    // Chama a função de validar todos os dados do filme 
                    let validar = await validarDadosAtor(ator)
                    
                    if (!validar) {
        
                        // Validação de ID válido, chama a função da controller que verifica no BD se o ID existe
                        let validarID = await buscarAtorID(id)
        
                        if (validarID.status_code == 200) {
        
                            // Adiciona o ID do filme no JSON de dados para ser encaminhados ao DA
                            ator.id = Number(id)
        
                            // Processamento
                            // Chama a função para atualizar um ator no BD
                            let resultAtores = await atorDAO.setUpdateActors(ator)

                            if (resultAtores) {
                                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_UPDATED_ITEM.status
                                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_UPDATED_ITEM.status_code
                                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_UPDATED_ITEM.message
                                MESSAGES.DEFAULT_HEADER.items.ator = ator
        
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

// Exclui um ator
const excluirAtor = async function (id) {
// Criando um objeto novo para que um nõo interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        let validarID = await buscarAtorID(id)
        

        if (validarID.status_code == 200) {

            
            // Processamento
            // Chama a função para atualizar um filme no BD
            let resultAtores = await atorDAO.setDeleteActor(id)

            if (resultAtores) {
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

// Validação dos dados de cadastro e atualização do filme
const validarDadosAtor = async function (ator) {

    // Criando um objeto novo para que um nõo interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    // Validação de todas as entradas de dados
    if (ator.nome == '' || ator.nome == undefined || ator.nome == null || ator.nome.length > 100) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (ator.data_nascimento == undefined || ator.data_nascimento.length != 10) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data De Nascimento Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (ator.nacionalidade == undefined || ator.nacionalidade.length > 100) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nacionalidade Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (ator.biografia == undefined) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Biografia Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (ator.foto_url == undefined || ator.foto_url.length > 200) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Foto Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }

}
module.exports = {
    listarAtores,
    buscarAtorID,
    inserirAtor,
    atualizarAtor,
    excluirAtor
}