/*******************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL, para o CRUDE de filmes
 * Data: 07/10/2025
 * Autor: Gabryel Fillipe Cavalcanti da Silva
 * Versão: 1.2 (CRUD do filme com relacionamentos: Gênero, Ator, Diretor e Classificação)
 ******************************************************************************************************************/

// Import da model do DAO do Filme
const filmeDAO = require('../../model/DAO/filme.js')

// Import das controllers de relação
const controllerFilmeGenero = require('./controller_filme_genero.js')
const controllerFilmeAtor = require('./controller_filme_ator.js')     // Nova controller de Ator
const controllerFilmeDiretor = require('./controller_filme_diretor.js') // Nova controller de Diretor

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

                // Processamento para adicionar os relacionamentos aos filmes
                for (filme of resultFilmes) {

                    // Busca Gêneros
                    let resultDadosGeneros = await controllerFilmeGenero.listarGenerosIdFilme(filme.id)
                    if (resultDadosGeneros.status_code == 200) {
                        filme.genero = resultDadosGeneros.items.filme_genero
                    }

                    // Busca Atores (Novo)
                    let resultDadosAtores = await controllerFilmeAtor.listarAtoresFilme(filme.id)
                    if (resultDadosAtores.status_code == 200) {
                        filme.atores = resultDadosAtores.items
                    }

                    // Busca Diretores (Novo)
                    let resultDadosDiretores = await controllerFilmeDiretor.listarDiretoresFilme(filme.id)
                    if (resultDadosDiretores.status_code == 200) {
                        filme.diretores = resultDadosDiretores.items
                    }

                }

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

                    // Processamento para adicionar os relacionamentos ao filme
                    for (filme of resultFilmes) {

                        // Busca Gêneros
                        let resultDadosGeneros = await controllerFilmeGenero.listarGenerosIdFilme(filme.id)
                        if (resultDadosGeneros.status_code == 200) {
                            filme.genero = resultDadosGeneros.items.filme_genero
                        }

                        // Busca Atores (Novo)
                        let resultDadosAtores = await controllerFilmeAtor.listarAtoresFilme(filme.id)
                        if (resultDadosAtores.status_code == 200) {
                            filme.atores = resultDadosAtores.items
                        }

                        // Busca Diretores (Novo)
                        let resultDadosDiretores = await controllerFilmeDiretor.listarDiretoresFilme(filme.id)
                        if (resultDadosDiretores.status_code == 200) {
                            filme.diretores = resultDadosDiretores.items
                        }

                    }

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
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS // 400 referente a validação do ID
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

            // Chama a função de validar todos os dados do filme 
            let validar = await validarDadosFilme(filme)

            if (!validar) {

                // Processamento
                // Chama a função para inserir um novo filme no BD
                // Obs: O campo classificacao_id vai dentro do objeto filme para o DAO
                let resultFilmes = await filmeDAO.setInsertMovies(filme)

                if (resultFilmes) {

                    // Chama a função para recerber o ID gerado no BD
                    let lastID = await filmeDAO.getSelectLastID()

                    if (lastID) {

                        // --- RELACIONAMENTO: FILME E GÊNERO ---
                        if (filme.genero && filme.genero.length > 0) {
                            for (genero of filme.genero) {
                                let filmeGenero = { filme_id: lastID, genero_id: genero.genero_id }
                                let resultFilmesGeneros = await controllerFilmeGenero.inserirFilmeGenero(filmeGenero, contentType)
                                if (resultFilmesGeneros.status_code != 201) {
                                    return MESSAGES.ERROR_RELATIONAL_INSERTION
                                }
                            }
                        }

                        // --- RELACIONAMENTO: FILME E ATOR (Novo) ---
                        if (filme.atores && filme.atores.length > 0) {
                            for (ator of filme.atores) {
                                let filmeAtor = { 
                                    filme_id: lastID, 
                                    ator_id: ator.ator_id, 
                                    nome_personagem: ator.nome_personagem, 
                                    ordem_importancia: ator.ordem_importancia 
                                }
                                let resultFilmesAtores = await controllerFilmeAtor.inserirFilmeAtor(filmeAtor, contentType)
                                if (resultFilmesAtores.status_code != 201) {
                                    return MESSAGES.ERROR_RELATIONAL_INSERTION
                                }
                            }
                        }

                        // --- RELACIONAMENTO: FILME E DIRETOR (Novo) ---
                        if (filme.diretores && filme.diretores.length > 0) {
                            for (diretor of filme.diretores) {
                                let filmeDiretor = { filme_id: lastID, diretor_id: diretor.diretor_id }
                                let resultFilmesDiretores = await controllerFilmeDiretor.inserirFilmeDiretor(filmeDiretor, contentType)
                                if (resultFilmesDiretores.status_code != 201) {
                                    return MESSAGES.ERROR_RELATIONAL_INSERTION
                                }
                            }
                        }

                        // Adiciona o ID no JSON com os dados do filme
                        filme.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_CREATED_ITEM.message

                        // Reconstruir o JSON de retorno com os dados inseridos (para visualização)
                        // Limpa arrays de IDs de entrada
                        delete filme.genero
                        delete filme.atores
                        delete filme.diretores

                        // Busca dados inseridos
                        let resultDadosGeneros = await controllerFilmeGenero.listarGenerosIdFilme(lastID)
                        let resultDadosAtores = await controllerFilmeAtor.listarAtoresFilme(lastID)
                        let resultDadosDiretores = await controllerFilmeDiretor.listarDiretoresFilme(lastID)

                        filme.genero = resultDadosGeneros.items.filme_genero
                        if(resultDadosAtores.status_code == 200) filme.atores = resultDadosAtores.items
                        if(resultDadosDiretores.status_code == 200) filme.diretores = resultDadosDiretores.items

                        MESSAGES.DEFAULT_HEADER.items = filme

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

// Atualiza um filme buscando pelo id
const atualizarFilme = async function (filme, id, contentType) {

    // Criando um objeto novo para que um nõo interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        // Validação do tipo de conteudo da requisição. (Obrigatorio ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validar todos os dados do filme 
            let validar = await validarDadosFilme(filme)

            if (!validar) {

                // Validação de ID válido, chama a função da controller que verifica no BD se o ID existe
                let validarID = await buscarFilmeId(id)

                if (validarID.status_code == 200) {

                    // Adiciona o ID do filme no JSON de dados para ser encaminhados ao DA
                    filme.id = Number(id)

                    // 1. DELETAR relacionamentos antigos (Regra de Negócio: Deletar antes de Atualizar)
                    await controllerFilmeGenero.excluirGenerosFilme(id)
                    await controllerFilmeAtor.excluirAtoresFilme(id)     // Novo
                    await controllerFilmeDiretor.excluirDiretoresFilme(id) // Novo

                    // 2. INSERIR novos relacionamentos
                    // Gêneros
                    if (filme.genero && filme.genero.length > 0) {
                        for (genero of filme.genero) {
                            let filmeGenero = { filme_id: id, genero_id: genero.genero_id }
                            let resultFilmesGeneros = await controllerFilmeGenero.inserirFilmeGenero(filmeGenero, contentType)
                            if (resultFilmesGeneros.status_code != 201) return MESSAGES.ERROR_RELATIONAL_INSERTION
                        }
                    }

                    // Atores (Novo)
                    if (filme.atores && filme.atores.length > 0) {
                        for (ator of filme.atores) {
                            let filmeAtor = { 
                                filme_id: id, 
                                ator_id: ator.ator_id, 
                                nome_personagem: ator.nome_personagem, 
                                ordem_importancia: ator.ordem_importancia 
                            }
                            let resultFilmesAtores = await controllerFilmeAtor.inserirFilmeAtor(filmeAtor, contentType)
                            if (resultFilmesAtores.status_code != 201) return MESSAGES.ERROR_RELATIONAL_INSERTION
                        }
                    }

                    // Diretores (Novo)
                    if (filme.diretores && filme.diretores.length > 0) {
                        for (diretor of filme.diretores) {
                            let filmeDiretor = { filme_id: id, diretor_id: diretor.diretor_id }
                            let resultFilmesDiretores = await controllerFilmeDiretor.inserirFilmeDiretor(filmeDiretor, contentType)
                            if (resultFilmesDiretores.status_code != 201) return MESSAGES.ERROR_RELATIONAL_INSERTION
                        }
                    }

                    // 3. ATUALIZAR dados principais do filme (incluindo classificacao_id)
                    let resultFilmes = await filmeDAO.setUpdateMovies(filme)

                    if (resultFilmes) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_UPDATED_ITEM.message
                        
                        // Limpar dados de entrada
                        delete filme.genero
                        delete filme.atores
                        delete filme.diretores

                        // Recarregar dados atualizados do BD
                        let resultDadosGeneros = await controllerFilmeGenero.listarGenerosIdFilme(id)
                        let resultDadosAtores = await controllerFilmeAtor.listarAtoresFilme(id)
                        let resultDadosDiretores = await controllerFilmeDiretor.listarDiretoresFilme(id)

                        filme.genero = resultDadosGeneros.items.filme_genero
                        if(resultDadosAtores.status_code == 200) filme.atores = resultDadosAtores.items
                        if(resultDadosDiretores.status_code == 200) filme.diretores = resultDadosDiretores.items

                        MESSAGES.DEFAULT_HEADER.items = filme

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
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

// Exclui um filme buscando pelo id
const excluirFilme = async function (id) {

    // Criando um objeto novo para que um nõo interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        let validarID = await buscarFilmeId(id)


        if (validarID.status_code == 200) {

            // Processamento
            // Chama a função para atualizar um filme no BD
            let resultFilmes = await filmeDAO.setDeleteMovies(id)

            if (resultFilmes) {
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
const validarDadosFilme = async function (filme) {

    // Criando um objeto novo para que um nõo interfira no outro
    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    // Validação de todas as entradas de dados
    if (filme.nome == '' || filme.nome == undefined || filme.nome == null || filme.nome.length > 100) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.sinopse == undefined) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Sinopse Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.data_lancamento == undefined || filme.data_lancamento.length != 10) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data Lançamento Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.duracao == '' || filme.duracao == undefined || filme.duracao == null || filme.duracao.length > 8) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Duração Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.orcamento == '' || filme.orcamento == undefined || filme.orcamento == null || filme.orcamento.length > 12 || typeof (filme.orcamento) != 'number') {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Orçamento Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.trailer == undefined || filme.trailer.length > 200) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Trailer Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.capa == '' || filme.capa == undefined || filme.capa == null || filme.capa.length > 200) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Capa Incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.classificacao_id == '' || filme.classificacao_id == undefined || filme.classificacao_id == null || isNaN(filme.classificacao_id)) {
        // Validação da Classificação (1:N)
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Classificação ID Incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }

}

module.exports = {
    listarFilmes,
    buscarFilmeId,
    inserirFilme,
    atualizarFilme,
    excluirFilme
}