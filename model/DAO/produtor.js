/*******************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao produtor do filme
 * Data: 29/10/2025
 * Autor: Gabryel Fillipe Cavalcanti da Silva
 * Versão: 1.0
 ******************************************************************************************************************/


// Import da dependencia do prima que permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

// Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

// Função para buscar todos os produtores no BD
const getSelectAllProducers = async function () {

    try {

        let sql = 'select * from tbl_produtor'

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

// Função para buscar um Produtor filtrando pelo ID
const getSelectByIdProducer = async function (id) {

    try {

        let sql = `select * from tbl_produtor where produtor_id = ${id}`

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

// Função para buscar o ultimo ID adiiconado ao BD
const getSelectLastID = async function () {

    try {

        let sql = 'select produtor_id from tbl_produtor order by produtor_id desc limit 1'

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result)) {
            return Number(result[0].produtor_id)
        } else {
            return false
        }

    } catch (error) {

        return false
    }

}

// Função responsavel por inserir novos produtores no BD
const setInsertProducers = async function (produtor) {

    try {

        let sql = `INSERT INTO tbl_produtor (
                        nome, 
                        data_nascimento,
                        nacionalidade,
                        foto_url,
                        biografia)
                 VALUES (
                        '${produtor.nome}',
                        '${produtor.data_nascimento}',
                        '${produtor.nacionalidade}',
                        '${produtor.foto_url}',
                        '${produtor.biografia}'
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

// Função para atualizar um produtor no BD
const setUpdateProducer = async function (produtor) {

    try {

        let sql = `update tbl_produtor set
                    nome                =   '${produtor.nome}',
                    data_nascimento     =   '${produtor.data_nascimento}',
                    nacionalidade       =   '${produtor.nacionalidade}',
                    foto_url            =   '${produtor.foto_url}',
                    biografia           =   '${produtor.biografia}'

                where produtor_id        =   ${produtor.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }

}

// Função que exclui um produtor do BD filtrando pelo ID
const setDeleteProducer = async function (id) {

    try {

        let sql = `delete from tbl_produtor where produtor_id = ${id}`

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
    getSelectAllProducers,
    getSelectByIdProducer,
    getSelectLastID,
    setInsertProducers,
    setUpdateProducer,
    setDeleteProducer
}