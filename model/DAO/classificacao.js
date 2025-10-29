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


const getSelectAllClassificacao = async function () {

    try {

        let sql = 'select * from tbl_classificacao'

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

const getSelectByIdClassificacao = async function (id) {

    try {

        let sql = `select * from tbl_classificacao where classificacao_id = ${id}`

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

        let sql = 'select classificacao_id from tbl_classificacao order by classificacao_id desc limit 1'

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result)) {
            return Number(result[0].classificacao_id)
        } else {
            return false
        }

    } catch (error) {

        return false
    }

}

const setInsertclassificacao = async function (classificacao) {

    try {

        let sql = `INSERT INTO tbl_classificacao (
                        nome, 
                        descricao, 
                        icone_url)
                    VALUES (
                        '${classificacao.nome}',
                        '${classificacao.descricao}',
                        '${classificacao.icone_url}'
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

const setUpdateClassificacao = async function (classificacao) {

    try {

        let sql = `update tbl_classificacao set
                    nome                =   '${classificacao.nome}',
                    descricao     =   '${classificacao.descricao}',
                    icone_url       =   '${classificacao.icone_url}'
                  

                where classificacao_id        =   ${classificacao.id}`

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

const setDeleteClassificacao = async function (id) {

    try {

        let sql = `delete from tbl_classificacao where classificacao_id = ${id}`

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
    getSelectAllClassificacao,
    getSelectByIdClassificacao,
    getSelectLastID,
    setInsertclassificacao,
    setUpdateClassificacao,
    setDeleteClassificacao
}