/*******************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao ator do filme
 * Data: 29/10/2025
 * Autor: Gabryel Fillipe Cavalcanti da Silva
 * Versão: 1.0
 ******************************************************************************************************************/


// Import da dependencia do prima que permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

// Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()


const getSelectAllActors = async function () {

    try {

        let sql = 'select * from tbl_ator'

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

const getSelectByIdActor = async function (id) {

    try {

        let sql = `select * from tbl_ator where ator_id = ${id}`

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

const getSelectLastID = async function () {

    try {

        let sql = 'select ator_id from tbl_ator order by ator_id desc limit 1'

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result)) {
            return Number(result[0].ator_id)
        } else {
            return false
        }

    } catch (error) {

        return false
    }

}

const setInsertActors = async function (ator) {

    try {

        let sql = `INSERT INTO tbl_ator (
                        nome, 
                        data_nascimento, 
                        nacionalidade, 
                        foto_url, 
                        biografia)
                    VALUES (
                        '${ator.nome}',
                        '${ator.data_nascimento}',
                        '${ator.nacionalidade}',
                        '${ator.foto_url}',
                        '${ator.biografia}'
                    );`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false

    }

}

const setUpdateActors = async function (ator) {

    try {

        let sql = `update tbl_ator set
                    nome                =   '${ator.nome}',
                    data_nascimento     =   '${ator.data_nascimento}',
                    nacionalidade       =   '${ator.nacionalidade}',
                    foto_url            =   '${ator.foto_url}',
                    biografia           =   '${ator.biografia}'

                where ator_id        =   ${ator.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }

}

const setDeleteActor = async function (id) {

    try {

        let sql = `delete from tbl_ator where ator_id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

module.exports = {
    getSelectAllActors,
    getSelectByIdActor,
    getSelectLastID,
    setInsertActors,
    setUpdateActors,
    setDeleteActor
}