/*******************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao genero do filme
 * Data: 01/11/2025
 * Autor: Gabryel Fillipe Cavalcanti da Silva
 * Versão: 1.0
 ******************************************************************************************************************/

// Import da dependencia do prima que permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

// Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

// Retorna uma lista de todos os generos do banco de dados
const getSelectAllGeneros = async function () {

    try {
        // Script SQL
        let sql = `select * from tbl_genero order by genero_id desc`

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
const getSelectByIdGenero = async function (id) {

    try {
        // Script SQL
        let sql = `select * from tbl_genero where genero_id=${id}`

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
        let sql = `select genero_id from tbl_genero order by genero_id desc limit 1`

        // Encaminha para o BD o Script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].genero_id)
        else
            return false

    } catch (error) {
        return false
    }

}

// Insere um genero novo no banco de dados
const setInsertGenero = async function (genero) {

    try {
        let sql = `INSERT into tbl_genero(
                        nome,
                        descricao
                    ) 
                    VALUES(
                        '${genero.nome}',
                        '${genero.descricao}'
                    )`

        // executeRawUnsafe() -> Executa o script SQL que não tem retorno de valores
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error)
    {
        // Tratamento de erro para violação de constraint (aspas simples)
        if (error.code === 'P2010' && error.meta?.code === '1064') {
             console.error("Erro de sintaxe SQL: Verifique se há aspas simples nos dados (ex: biografia).");
         } else {
            console.log(error)
         }
        return false
    }

}

// Altera um genero pelo ID no banco de dados
const setUpdateGenero = async function (genero) {

    try {

        let sql = `update tbl_genero set
                    nome        =   '${genero.nome}',
                    descricao   =   '${genero.descricao}'
                where genero_id =   ${genero.id}`

        // executeRawUnsafe() -> Executa o script SQL que não tem retorno de valores
        let result = await prisma.$executeRawUnsafe(sql)
        
        if (result)
            return true
        else
            return false

    } catch (error) {
         // Tratamento de erro para violação de constraint (aspas simples)
         if (error.code === 'P2010' && error.meta?.code === '1064') {
            console.error("Erro de sintaxe SQL: Verifique se há aspas simples nos dados (ex: biografia).");
        } else {
           console.log(error)
        }
       return false
    }

}

// Exclui um genero pelo ID no banco de dados
const setDeleteGenero = async function (id) {

    try {

        let sql = `delete from tbl_genero where genero_id = ${id}`

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
    getSelectAllGeneros,
    getSelectByIdGenero,
    getSelectLastID,
    setInsertGenero,
    setUpdateGenero,
    setDeleteGenero
}