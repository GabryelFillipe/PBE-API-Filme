/*************************************************************************************************************
 *  Objetivo: Arquivo responsavel pelo CRUDE de dados MySQL referente ao relacionamento entre filmes e Genero
 *  Data: 05/11/2025
 *  Autor: Gabryel Fillipe Cavalcanti da silva
 *  versão: 1.0.0
 *************************************************************************************************************/


// Import da dependencia do prima que permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

// Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()


// Retorna uma lista de todos os Filmes e generos do banco de dados
const getSelectAllMoviesGenres = async function () {

    try {
        // Script SQL
        let sql = `select * from tbl_filme_genero order by filme_genero_id desc`

        // Encaminha para o BD o Script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// Retorna um genero filtrando pelo ID do banco de dados
const getSelectByIdMoviesGenres = async function (id) {

    try {
        // Script SQL
        let sql = `select * from tbl_filme_genero where filme_genero_id=${id}`

        // Encaminha para o BD o Script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }

}


// Retorna uma lista de generos filtrando pelo ID do filme
const getSelectGenresByIdMovies = async function (filme_id) {

    try {
        // Script SQL
        let sql = `select tbl_genero.genero_id, tbl_genero.nome
                        from tbl_filme
                            inner join tbl_filme_genero
                                on tbl_filme.id = tbl_filme_genero.filme_id
                            inner join tbl_genero
                                on tbl_genero.genero_id = tbl_filme_genero.genero_id
                        where tbl_filme.id = ${filme_id}`

        // Encaminha para o BD o Script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }

}

// Retorna uma lista de filmes filtrando pelo ID do genero
const getSelectMoviesByIdGenre = async function (genero_id) {

    try {
        // Script SQL
        let sql = `select tbl_filme.id, tbl_filme.nome
                        from tbl_filme
                            inner join tbl_filme_genero
                                on tbl_filme.id = tbl_filme_genero.filme_id
                            inner join tbl_genero
                                on tbl_genero.genero_id = tbl_filme_genero.genero_id
                        where tbl_genero.id = ${genero_id}`

        // Encaminha para o BD o Script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }

}

const getSelectLastID = async function () {

    try {
        //Script SQL para retornar apenas o ultimo ID do BD
        let sql = `select filme_genero_id from tbl_filme_genero order by filme_genero_id desc limit 1`

        // Encaminha para o BD o Script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }

}

const getSelectFilmeGenresIdByFilmeId = async function (filmeId) {
    try {

        let sql = `select filme_genero_id from tbl_filme_genero where filme_id = ${filmeId};`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result)) {
            return result
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

// Insere um genero novo no banco de dados
const setInsertMoivesGeres = async function (filmeGenero) {

    try {
        let sql = `INSERT into tbl_filme_genero(filme_id, genero_id) 
                    VALUES(${filmeGenero.filme_id}, ${filmeGenero.genero_id})`

        // executeRawUnsafe() -> Executa o script SQL que não tem retorno de valores
        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }

}

// Altera um genero pelo ID no banco de dados
const setUpdateMoviesGenres = async function (filmeGenero) {

    try {

        let sql = `update tbl_filme_genero set
                        filme_id    =   ${filmeGenero.filme_id},
                        genero_id   =   ${filmeGenero.genero_id}
                    where filme_genero_id =   ${filmeGenero.filme_genero_id}`

        // executeRawUnsafe() -> Executa o script SQL que não tem retorno de valores
        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }

}

const setUpdadeGenresMovie = async function (filmeId) {

    try {
        let sql = `update tbl_filme_genero 
                set genero_id = 11
                where filme_id = ${filmeId};`

        // executeRawUnsafe() -> Executa o script SQL que não tem retorno de valores
        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false

    } catch (error) {
        return false

    }
}
// Exclui um genero pelo ID no banco de dados
const setDeleteMoviesGenres = async function (id) {

    try {

        let sql = `delete from tbl_filme_genero where filme_genero_id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }

}

// Exclui os generos de um filme  pelo ID do filme no banco de dados
const setDeleteGenresByMovieId = async function (id) {

    try {

        let sql = `delete from tbl_filme_genero where filme_id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }

}

module.exports = {
    getSelectAllMoviesGenres,
    getSelectByIdMoviesGenres,
    getSelectGenresByIdMovies,
    getSelectMoviesByIdGenre,
    getSelectLastID,
    getSelectFilmeGenresIdByFilmeId,
    setInsertMoivesGeres,
    setUpdateMoviesGenres,
    setUpdadeGenresMovie,
    setDeleteMoviesGenres,
    setDeleteGenresByMovieId
}