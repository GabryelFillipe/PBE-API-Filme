/*******************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL, para o CRUDE na relação entre filme e genero
 * Data: 05/11/2025
 * Autor: Gabryel Fillipe Cavalcanti da Silva
 * Versão: 1.0
 ******************************************************************************************************************/

// Import da model do DAO do genero
const filmeGeneroDAO = require('../../model/DAO/filme_genero.js')

// Import do arquivo de mensagens
const DEFAUL_MESSAGES = require('../modulo/config_messages.js')


// Retorna uma lista de todos os generos
const listarFilmesGeneros = async function () {

    // Criando um objeto novo para que um não interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {
        // Chama a função do DAO para retornar a lista de generos do BD
        let resultFilmesGeneros = await filmeGeneroDAO.getSelectAllMoviesGenres()
        if (resultFilmesGeneros) {
            if (resultFilmesGeneros.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.generos = resultFilmesGeneros

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

// Retorna um genero filtrando pelo id
const buscarFilmeGeneroId = async function (id) {

    // Criando um objeto novo para que um não interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        // Validação da chegada do ID
        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let resultFilmesGeneros = await filmeGeneroDAO.getSelectByIdMoviesGenres(Number(id))

            if (resultFilmesGeneros) {

                if (resultFilmesGeneros.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.genero = resultFilmesGeneros

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

// Retorna um genero filtrando pelo id do filme
const listarGenerosFilme = async function (idFilme) {

    // Criando um objeto novo para que um não interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        // Validação da chegada do ID
        if (!isNaN(idFilme) && idFilme != '' && idFilme != null && idFilme > 0) {

            let resultFilmesGeneros = await filmeGeneroDAO.getSelectGenresByIdMovies(Number(idFilme))

            if (resultFilmesGeneros) {

                if (resultFilmesGeneros.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.genero = resultFilmesGeneros

                    return MESSAGES.DEFAULT_HEADER// 200
                } else {
                    return MESSAGES.ERROR_NOT_FOUND //404
                }

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }


        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID do Filme incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS // 400 referente a validação do ID
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

// Retorna um filme filtrando pelo id do genero
const listarFilmesIdGenero = async function (idGenero) {

    // Criando um objeto novo para que um não interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        // Validação da chegada do ID
        if (!isNaN(idGenero) && idGenero != '' && idGenero != null && idGenero > 0) {

            let resultFilmesGeneros = await filmeGeneroDAO.getSelectMoviesByIdGenre(Number(idGenero))

            if (resultFilmesGeneros) {

                if (resultFilmesGeneros.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.genero = resultFilmesGeneros

                    return MESSAGES.DEFAULT_HEADER// 200
                } else {
                    return MESSAGES.ERROR_NOT_FOUND //404
                }

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }


        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID do Genero incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS // 400 referente a validação do ID
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

// Insere um genero
const inserirFilmeGenero = async function (filmeGenero, contentType) {

    // Criando um objeto novo para que um nõo interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        // Validação do tipo de conteudo da requisição. (Obrigatorio ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validar todos os dados do genero 
            let validar = await validarDadosFilmeGenero(filmeGenero)

            if (!validar) {

                // Processamento
                // Chama a função para inserir um novo genero no BD
                let resultFilmesGeneros = await filmeGeneroDAO.setInsertMoivesGeres(filmeGenero)

                if (resultFilmesGeneros) {

                    // Chama a função para recerber o ID gerado no BD
                    let lastID = await filmeGeneroDAO.getSelectLastID()

                    if (lastID) {

                        // Adiciona o ID no JSON com os dados do genero
                        filmeGenero.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = filmeGenero

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

// Atualiza um genero buscando pelo id
const atualizarFilmeGenero = async function (filmeGenero, id, contentType) {

    // Criando um objeto novo para que um nõo interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        // Validação do tipo de conteudo da requisição. (Obrigatorio ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validar todos os dados do genero 
            let validar = await validarDadosFilmeGenero(filmeGenero)

            if (!validar) {

                // Validação de ID válido, chama a função da controller que verifica no BD se o ID existe
                let validarID = await buscarFilmeGeneroId(id)

                if (validarID.status_code == 200) {

                    // Adiciona o ID do genero no JSON de dados para ser encaminhados ao DAO
                    filmeGenero.id = Number(id)

                    // Processamento
                    // Chama a função para atualizar um genero no BD
                    let resultFilmesGeneros = await filmeGeneroDAO.setUpdateMoviesGenres(filmeGenero)

                    if (resultFilmesGeneros) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.filme_genero = filmeGenero

                        return MESSAGES.DEFAULT_HEADER // 201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                } else {
                    return validarID // A função buscarFilmeGeneroId poderá retornar (400 ou 404 ou 500)
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

// Exclui um genero buscando pelo id
const excluirFilmeGenero = async function (id) {

    // Criando um objeto novo para que um nõo interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        let validarID = await buscarFilmeGeneroId(id)


        if (validarID.status_code == 200) {

            // Processamento
            // Chama a função para excluir um genero no BD
            let resultFilmesGeneros = await filmeGeneroDAO.setDeleteMoviesGenres(id)

            if (resultFilmesGeneros) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_DELETED_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_DELETED_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_DELETED_ITEM.message
                delete MESSAGES.DEFAULT_HEADER.items

                return MESSAGES.DEFAULT_HEADER // 200
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return validarID // A função buscarFilmeGeneroId poderá retornar (400 ou 404 ou 500)
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

// Validação dos dados de cadastro e atualização do genero
const validarDadosFilmeGenero = async function (filmeGenero) {

    // Criando um objeto novo para que um nõo interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    // Validação de todas as entradas de dados
    if (isNaN(filmeGenero.filme_id) || filmeGenero.filme_id <= 0 || filmeGenero.filme_id == '' || filmeGenero.filme_id == undefined || filmeGenero.filme_id == null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Filme_id Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (isNaN(filmeGenero.genero_id) || filmeGenero.genero_id <= 0 || filmeGenero.genero_id == '' || filmeGenero.genero_id == undefined || filmeGenero.genero_id == null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Genero_id Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }

}

module.exports = {
    listarFilmesGeneros,
    buscarFilmeGeneroId,
    listarGenerosFilme,
    listarFilmesIdGenero,
    inserirFilmeGenero,
    atualizarFilmeGenero,
    excluirFilmeGenero
}