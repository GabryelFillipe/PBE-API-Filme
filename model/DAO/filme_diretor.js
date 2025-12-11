/*************************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD da tabela intermediária tbl_filme_direcao
 * Data: 11/12/2025
 * Autor: Gabryel Fillipe
 * Versão: 1.0
 *************************************************************************************************************/

const { PrismaClient } = require('../../generated/prisma')
const prisma = new PrismaClient()

const setInsertFilmeDiretor = async function (dados) {
    try {
        let sql = `INSERT into tbl_filme_direcao (filme_id, diretor_id) 
                   VALUES(${dados.filme_id}, ${dados.diretor_id})`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) return true
        else return false
    } catch (error) {
        return false
    }
}

const setDeleteDiretorByFilmeId = async function (filmeId) {
    try {
        let sql = `delete from tbl_filme_direcao where filme_id = ${filmeId}`
        let result = await prisma.$executeRawUnsafe(sql)
        if (result) return true
        else return false
    } catch (error) {
        return false
    }
}

const getSelectDiretoresByFilmeId = async function (filmeId) {
    try {
        let sql = `select d.diretor_id, d.nome, d.foto as foto_url
                   from tbl_diretor as d
                   inner join tbl_filme_direcao as fd on d.diretor_id = fd.diretor_id
                   where fd.filme_id = ${filmeId}`
        
        let result = await prisma.$queryRawUnsafe(sql)
        return result
    } catch (error) {
        return false
    }
}

module.exports = {
    setInsertFilmeDiretor,
    setDeleteDiretorByFilmeId,
    getSelectDiretoresByFilmeId
}