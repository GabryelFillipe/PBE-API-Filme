/*******************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL, para o CRUDE de diretor
 * Data: 22/10/2025
 * Autor: Gabryel Fillipe Cavalcanti da Silva
 * Versão: 1.0
 ******************************************************************************************************************/

const diretorDAO = require('../../model/DAO/diretor')

const DEFAUL_MESSAGES = require('../modulo/config_messages')

// Busca todos os diretores
const listarDiretores = async function () {

    // Criando um objeto novo para que um não interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        // Chama a função para inserir um novo filme no BD
        let resultDiretores = await diretorDAO.getSelectAllDirectors()

        if (resultDiretores) {

            if (resultDiretores.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.diretores = resultDiretores

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

// Busca um diretor filtrando pelo id
const buscarDiretorID = async function (id) {

    // Criando um objeto novo para que um não interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            // Chama a função para inserir um novo filme no BD
            let resultDiretores = await diretorDAO.getSelectByIdDirectors(Number(id))

            if (resultDiretores) {

                if (resultDiretores.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.diretores = resultDiretores

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
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

// Insere um diretor
const inserirDiretor = async function (diretor, contentType) {

    // Criando um objeto novo para que um não interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

         // Validação do tipo de conteudo da requisição. (Obrigatorio ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            // Chama a função de validar dados do diretor
            let validar = await validarDadosDiretor(diretor)
            
            if (!validar) {

                // Chama a função para inserir um novo filme no BD
                let resultDiretores = await diretorDAO.setInsertDirectors(diretor)
               
                if (resultDiretores) {
                    // Chama a função para procurar o ultimo ID de diretor adicionado no BD
                    let lastID = await diretorDAO.getSelectLastID()
                    console.log(lastID)
                    if (lastID) {

                        // Adiciona o ID no JSON com os dados do filme
                        diretor.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = diretor

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
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

// Atualiza um diretor
const atualizarDiretor = async function (diretor, id, contentType) {

    // Criando um objeto novo para que um não interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        // Validação do tipo de conteudo da requisição. (Obrigatorio ser um JSON)
                if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
        
                    // Chama a função de validar todos os dados do filme 
                    let validar = await validarDadosDiretor(diretor)
        
                    if (!validar) {
        
                        // Validação de ID válido, chama a função da controller que verifica no BD se o ID existe
                        let validarID = await buscarDiretorID(id)
        
                        if (validarID.status_code == 200) {
        
                            // Adiciona o ID do filme no JSON de dados para ser encaminhados ao DA
                            diretor.id = Number(id)
        
                            // Processamento
                            // Chama a função para atualizar um filme no BD
                            let resultDiretores = await diretorDAO.setUpdateDirectors(diretor)
                            
                            if (resultDiretores) {
                                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_UPDATED_ITEM.status
                                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_UPDATED_ITEM.status_code
                                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_UPDATED_ITEM.message
                                MESSAGES.DEFAULT_HEADER.items.diretor = diretor
        
                                return MESSAGES.DEFAULT_HEADER // 201
                            } else {
                                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                            }
                        } else {
                            return validarID // A função buscarFilmeId poderá retornar (400 ou 404 ou 500)
                        }
        
                    } else {
                        return validar // 400 referente a validação dos dados
                    }
        
                } else {
                    return MESSAGES.ERRO_CONTENT_TYPE // 415
                }
        
        
            } catch (error) {
                console.log(error)
                return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
            }

}

// Exclui um diretor
const excluirDiretor = async function (id) {
// Criando um objeto novo para que um nõo interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        let validarID = await buscarDiretorID(id)
        

        if (validarID.status_code == 200) {

            // Processamento
            // Chama a função para atualizar um filme no BD
            let resultDiretores = await diretorDAO.setDeleteDirector(id)

            if (resultDiretores) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_DELETED_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_DELETED_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_DELETED_ITEM.message

                return MESSAGES.DEFAULT_HEADER // 200
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return validarID // A função buscarFilmeId poderá retornar (400 ou 404 ou 500)
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Validação dos dados de cadastro e atualização do filme
const validarDadosDiretor = async function (diretor) {

    // Criando um objeto novo para que um nõo interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    // Validação de todas as entradas de dados
    if (diretor.nome == '' || diretor.nome == undefined || diretor.nome == null || diretor.nome.length > 100) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (diretor.nome_artistico == undefined || diretor.nome_artistico > 100) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome Artistico Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (diretor.data_nascimento == undefined || diretor.data_nascimento.length != 10) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data De Nascimento Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (diretor.nacionalidade == undefined || diretor.nacionalidade.length > 50) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nacionalidade Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (diretor.biografia == undefined) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Biografia Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (diretor.foto_url == undefined || diretor.foto_url.length > 200) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Foto Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }

}
module.exports = {
    listarDiretores,
    buscarDiretorID,
    inserirDiretor,
    atualizarDiretor,
    excluirDiretor
}