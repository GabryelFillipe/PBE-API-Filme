/*******************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL, para o CRUDE de filmes
 * Data: 07/10/2025
 * Autor: Gabryel Fillipe Cavalcanti da Silva
 * Versão: 1.3 (Remoção de status visual e inclusão de relacionamentos)
 ******************************************************************************************************************/

// Import da model do DAO do Filme
const filmeDAO = require('../../model/DAO/filme.js')

// Import das controllers de relação
const controllerFilmeGenero = require('./controller_filme_genero.js')
const controllerFilmeAtor = require('./controller_filme_ator.js')
const controllerFilmeDiretor = require('./controller_filme_diretor.js')

// Import do arquivo de mensagens
const DEFAUL_MESSAGES = require('../modulo/config_messages.js')

// --- FUNÇÕES AUXILIARES PARA INSERIR RELACIONAMENTOS ---
const insertRelationships = async (filmeId, body, contentType) => {

    // Inserir Generos
    if (body.genero && body.genero.length > 0) {
        for (let genero of body.genero) {
            let dados = { filme_id: filmeId, genero_id: genero.genero_id }
            await controllerFilmeGenero.inserirFilmeGenero(dados, contentType)
        }
    }

    // Inserir Atores (N:N) - Tabela elenco
    if (body.atores && body.atores.length > 0) {
        for (let ator of body.atores) {
            let dados = {
                filme_id: filmeId,
                ator_id: ator.ator_id,
                nome_personagem: ator.nome_personagem,
                ordem_importancia: ator.ordem_importancia
            }
            await controllerFilmeAtor.inserirFilmeAtor(dados, contentType)
        }
    }

    // Inserir Diretores (N:N) - Tabela tbl_filme_direcao
    if (body.diretores && body.diretores.length > 0) {
        for (let diretor of body.diretores) {
            let dados = { filme_id: filmeId, diretor_id: diretor.diretor_id }
            await controllerFilmeDiretor.inserirFilmeDiretor(dados, contentType)
        }
    }
}

// --- CONTROLLER ---

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
                for (let filme of resultFilmes) {

                    // Remove o campo status da visualização (JSON)
                    delete filme.status

                    // Busca Gêneros
                    let resultDadosGeneros = await controllerFilmeGenero.listarGenerosIdFilme(filme.id)
                    if (resultDadosGeneros.status_code == 200) {
                        filme.genero = resultDadosGeneros.items.filme_genero
                    } else {
                        filme.genero = [] // Retorna array vazio se não houver genero, para manter o padrão
                    }

                    // Busca Atores
                    let resultDadosAtores = await controllerFilmeAtor.listarAtoresFilme(filme.id)
                    if (resultDadosAtores.status_code == 200) {
                        filme.atores = resultDadosAtores.items
                    } else {
                        filme.atores = []
                    }

                    // Busca Diretores
                    let resultDadosDiretores = await controllerFilmeDiretor.listarDiretoresFilme(filme.id)
                    if (resultDadosDiretores.status_code == 200) {
                        filme.diretores = resultDadosDiretores.items
                    } else {
                        filme.diretores = []
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

    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        if (!isNaN(id) && id > 0) {

            let resultFilmes = await filmeDAO.getSelectByIdMovies(Number(id))
            if (resultFilmes) {

                if (resultFilmes.length > 0) {
                    let filme = resultFilmes[0]

                    // Remove o campo status da visualização
                    delete filme.status

                    // Busca Gêneros
                    let resultDadosGeneros = await controllerFilmeGenero.listarGenerosIdFilme(filme.id)
                    if (resultDadosGeneros.status_code == 200) {
                        filme.genero = resultDadosGeneros.items.filme_genero
                    } else {
                        filme.genero = []
                    }

                    // Busca Atores
                    let resultDadosAtores = await controllerFilmeAtor.listarAtoresFilme(filme.id)
                    if (resultDadosAtores.status_code == 200) {
                        filme.atores = resultDadosAtores.items
                    } else {
                        filme.atores = []
                    }

                    // Busca Diretores
                    let resultDadosDiretores = await controllerFilmeDiretor.listarDiretoresFilme(filme.id)
                    if (resultDadosDiretores.status_code == 200) {
                        filme.diretores = resultDadosDiretores.items
                    } else {
                        filme.diretores = []
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

    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosFilme(filme)

            if (!validar) {

                let resultFilmes = await filmeDAO.setInsertMovies(filme)

                if (resultFilmes) {

                    let lastID = await filmeDAO.getSelectLastID()

                    if (lastID) {
                        if (filme.genero && filme.genero.length > 0) {
                            for (let genero of filme.genero) { 
                                let filmeGenero = { filme_id: lastID, genero_id: genero.genero_id }
                                let resultFilmesGeneros = await controllerFilmeGenero.inserirFilmeGenero(filmeGenero, contentType)
                                if (resultFilmesGeneros.status_code != 201) return MESSAGES.ERROR_RELATIONAL_INSERTION
                            }
                        }

                        if (filme.atores && filme.atores.length > 0) {
                            for (let ator of filme.atores) { 
                                let filmeAtor = {
                                    filme_id: lastID,
                                    ator_id: ator.ator_id,
                                    nome_personagem: ator.nome_personagem, // Certifique-se de mandar este campo no JSON
                                    ordem_importancia: ator.ordem_importancia
                                }
                                let resultFilmesAtores = await controllerFilmeAtor.inserirFilmeAtor(filmeAtor, contentType)
                                if (resultFilmesAtores.status_code != 201) return MESSAGES.ERROR_RELATIONAL_INSERTION
                            }
                        }

                        if (filme.diretores && filme.diretores.length > 0) {
                            for (let diretor of filme.diretores) { 
                                let filmeDiretor = { filme_id: lastID, diretor_id: diretor.diretor_id }
                                let resultFilmesDiretores = await controllerFilmeDiretor.inserirFilmeDiretor(filmeDiretor, contentType)
                                if (resultFilmesDiretores.status_code != 201) return MESSAGES.ERROR_RELATIONAL_INSERTION
                            }
                        }
                        // Adiciona o ID no JSON com os dados do filme
                        filme.id = lastID

                        // Busca dados inseridos para retorno completo
                        let dadosFilmeInserido = await buscarFilmeId(lastID)

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = dadosFilmeInserido.items.filme[0]

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

    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosFilme(filme)

            if (!validar) {

                let validarID = await buscarFilmeId(id)

                if (validarID.status_code == 200) {

                    filme.id = Number(id)

                    // 1. DELETAR relacionamentos antigos
                    await controllerFilmeGenero.excluirGenerosFilme(id)
                    await controllerFilmeAtor.excluirAtoresFilme(id)
                    await controllerFilmeDiretor.excluirDiretoresFilme(id)

                    // 2. ATUALIZAR dados do filme
                    let resultFilmes = await filmeDAO.setUpdateMovies(filme)

                    if (resultFilmes) {

                        // 3. INSERIR novos relacionamentos
                        await insertRelationships(id, filme, contentType)

                        // Busca dados atualizados para retorno completo
                        let dadosFilmeAtualizado = await buscarFilmeId(id)

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = dadosFilmeAtualizado.items.filme[0]

                        return MESSAGES.DEFAULT_HEADER // 201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                } else {
                    return validarID
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

// Exclui um filme buscando pelo id
const excluirFilme = async function (id) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

    try {

        let validarID = await buscarFilmeId(id)

        if (validarID.status_code == 200) {

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
            return validarID
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

// Validação dos dados
const validarDadosFilme = async function (filme) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAUL_MESSAGES))

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