/*******************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao estudio do filme
 * Data: 01/11/2025
 * Autor: Gabryel Fillipe Cavalcanti da Silva
 * Versão: 1.0
 ******************************************************************************************************************/

// Import da dependencia do prima que permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

// Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

// Retorna uma lista de todos os estudios do banco de dados
const getSelectAllEstudios = async function () {

    try {
        // Script SQL
        let sql = `select * from tbl_estudio order by estudio_id desc`

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

// Retorna um estudio filtrando pelo ID do banco de dados
const getSelectByIdEstudio = async function (id) {

    try {
        // Script SQL
        let sql = `select * from tbl_estudio where estudio_id=${id}`

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
        let sql = `select estudio_id from tbl_estudio order by estudio_id desc limit 1`

        // Encaminha para o BD o Script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].estudio_id)
        else
            return false

    } catch (error) {
        return false
    }

}

// Insere um estudio novo no banco de dados
const setInsertEstudio = async function (estudio) {

    try {
        let sql = `INSERT into tbl_estudio(
                        nome,
                        pais_origem,
                        data_fundacao,
                        site_oficial
                    ) 
                    VALUES(
                        '${estudio.nome}',
                        '${estudio.pais_origem}',
                        '${estudio.data_fundacao}',
                        '${estudio.site_oficial}'
                    )`

        // executeRawUnsafe() -> Executa o script SQL que não tem retorno de valores
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }

}

// Altera um estudio pelo ID no banco de dados
const setUpdateEstudio = async function (estudio) {

    try {

        let sql = `update tbl_estudio set
                    nome            =   '${estudio.nome}',
                    pais_origem     =   '${estudio.pais_origem}',
                    data_fundacao   =   '${estudio.data_fundacao}',
                    site_oficial    =   '${estudio.site_oficial}'
                where estudio_id    =   ${estudio.id}`

        // executeRawUnsafe() -> Executa o script SQL que não tem retorno de valores
        let result = await prisma.$executeRawUnsafe(sql)
        
        if (result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }

}

// Exclui um estudio pelo ID no banco de dados
const setDeleteEstudio = async function (id) {

    try {

        let sql = `delete from tbl_estudio where estudio_id = ${id}`

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
    getSelectAllEstudios,
    getSelectByIdEstudio,
    getSelectLastID,
    setInsertEstudio,
    setUpdateEstudio,
    setDeleteEstudio
}