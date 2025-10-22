/*******************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao diretor do filme
 * Data: 22/10/2025
 * Autor: Gabryel Fillipe Cavalcanti da Silva
 * Versão: 1.0
 ******************************************************************************************************************/


// Import da dependencia do prima que permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

// Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()


const getSelectAllDirectors = async function () {

    try {

        let sql = 'select * from tbl_diretor'

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

const getSelectByIdDirectors = async function (id) {

    try {

        let sql = `select * from tbl_diretor where diretor_id = ${id}`

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

        let sql = 'select diretor_id from tbl_diretor order by diretor_id desc limit 1'

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result)) {
            return Number(result[0].diretor_id)
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

const setInsertDirectors = async function (diretor) {

    try {

        let sql = `INSERT INTO tbl_diretor
                        (nome,
                        nome_artistico,
                        data_nascimento,
                        nacionalidade,
                        biografia,
                        foto_url)
                    VALUES (
                        '${diretor.nome}',
                        '${diretor.nome_artistico}',
                        '${diretor.data_nascimento}',
                        '${diretor.nacionalidade}',
                        '${diretor.biografia}',
                        '${diretor.foto_url}')`

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

const setUpdateDirectors = async function (diretor) {

    try {

        let sql = `update tbl_diretor set
                    nome                =   '${diretor.nome}',
                    nome_artistico      =   '${diretor.nome_artistico}',
                    data_nascimento     =   '${diretor.data_nascimento}',
                    nacionalidade       =   '${diretor.nacionalidade}',
                    biografia           =   '${diretor.biografia}',
                    foto_url            =   '${diretor.foto_url}'

                where diretor_id        =   ${diretor.id}`

        let result = await prisma.$executeRawUnsafe(sql)
        
        if (result)
            return true
        else
            return false

    } catch (error) {
        
        return false
    }

}

const setDeleteDirector = async function (id) {

    try {
        
        let sql = `delete from tbl_diretor where diretor_id = ${id}`

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
    getSelectAllDirectors,
    getSelectByIdDirectors,
    getSelectLastID,
    setInsertDirectors,
    setUpdateDirectors,
    setDeleteDirector
}