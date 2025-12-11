/*************************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD da tabela intermediária elenco (Filme e Ator)
 * Data: 11/12/2025
 * Autor: Gabryel Fillipe
 * Versão: 1.0
 *************************************************************************************************************/

const { PrismaClient } = require('../../generated/prisma')
const prisma = new PrismaClient()

// Insere um relacionamento Filme-Ator
const setInsertFilmeAtor = async function (dados) {
    try {
        let ordemImportancia = dados.ordem_importancia ? `'${dados.ordem_importancia}'` : null;
        
        let sql = `INSERT into tbl_elenco (
                        filme_id, 
                        ator_id, 
                        nome_personagem, 
                        ordem_importancia
                    ) 
                    VALUES(
                        ${dados.filme_id}, 
                        ${dados.ator_id}, 
                        '${dados.nome_personagem}', 
                        ${ordemImportancia}
                    )`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) return true
        else return false
    } catch (error) {
        return false
    }
}

// Deleta todos os atores de um filme específico (Usado antes do Update)
const setDeleteAtorByFilmeId = async function (filmeId) {
    try {
        let sql = `delete from tbl_elenco where filme_id = ${filmeId}`
        let result = await prisma.$executeRawUnsafe(sql)
        if (result) return true
        else return false
    } catch (error) {
        return false
    }
}

// Busca os atores de um filme
const getSelectAtoresByFilmeId = async function (filmeId) {
    try {
        let sql = `select a.ator_id, a.nome, a.foto_url, e.nome_personagem, e.ordem_importancia
                   from tbl_ator as a
                   inner join tbl_elenco as e on a.ator_id = e.ator_id
                   where e.filme_id = ${filmeId}`
        
        let result = await prisma.$queryRawUnsafe(sql)
        return result
    } catch (error) {
        return false
    }
}

module.exports = {
    setInsertFilmeAtor,
    setDeleteAtorByFilmeId,
    getSelectAtoresByFilmeId
}