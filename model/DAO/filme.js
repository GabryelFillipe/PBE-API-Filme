/*******************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao filme
 * Data: 01/10/2025
 * Autor: Gabryel Fillipe Cavalcanti da Silva
 * Versão: 1.1
 ******************************************************************************************************************/
/**
   Exemplos de bibliotecas para conexão com o BD
        Sequelize   -> Foi utilizado em muitos projetos desde o inicio do node
        Prisma      -> É uma dependencia atual que trabalha com BD (SQL ou ORM)
            npm install prisma --save           -> Instalar o prisma (Conexão com o Database)
            npm instal @prisma/client --save    -> Instalar o cliente do prisma (Executar scripts SQL no BD)
            npx prisma init                     -> Prompt de comando para inicializar o prisma mp projeto
            npx prisma migrate dev              -> Realiza o sincronismo entre o prisma e o BD(cuidado,
                                                nesse processo voce podra perder dados reais do banco, pois
                                                ele pega e cria as tabelas programados no ORM schema.prisma)
            npx prisma generate                 -> Apenas realiza o sincronismo entre o prisma e o BD, geralmente
                                                usamos para rodar o projeto em um PC novo.

        Knex        -> É uma dependencia atual que trabalha com MySQL
  
    Banco de dados não relacional
        Mongoouse   -> É uma dependencia para o Mongo DB (Não relacional)




 */

// Import da dependencia do prima que permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

// Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

// $queryRawUnsafe() -> permite executar um script SQL
// sem estar em uma vriavel e que retorna valores do banco (SELECT)
// $executeRawUnsafe() -> Permite executar o script SQL
// de uma variavel e que não retorna dados do banco (Update)

// $queryRawU() -> permite executar um script SQL
// de uma vriavel e que retorna valores do banco (SELECT) e
// faz tratamentos de segurança contra SQL Injection
// $executeRaw() -> Permite executar o script SQL
// sem estar em uma variavel e que não retorna dados do banco (Update)
// faz tratamentos de segurança contra SQL Injection

// Retorna uma lista de todos os filmes do banco de dados
const getSelectAllMovies = async function () {

    try {
        // Script SQL
        let sql = `select * from tbl_filme tf where status = 1  order by id desc`

        // Encaminha para o BD o Script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}

// Retorna um filme filtrando pelo ID do banco de dados
const getSelectByIdMovies = async function (id) {

    try {
        // Script SQL
        let sql = `select * from tbl_filme where id=${id}`

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

const getSelectLastID = async function() {
    
    try {
        //Script SQL para retornar apenas o ultimo ID do BD
        let sql = `select id from tbl_filme order by id desc limit 1`

        // Encaminha para o BD o Script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false

    } catch (error) {
        return false
    }

}

// Insere um filme novo no banco de dados
const setInsertMovies = async function (filme) {

    try {
        let sql = `INSERT into tbl_filme(
                        nome,
                        sinopse,
                        data_lancamento,
                        duracao,
                        orcamento,
                        trailer, 
                        capa,
                        classificacao_id) 
                    VALUES(
                            '${filme.nome}',
                            '${filme.sinopse}',
                            '${filme.data_lancamento}',
                            '${filme.duracao}',
                            '${filme.orcamento}',
                            '${filme.trailer}',
                            '${filme.capa}',
                            ${filme.classificacao_id})`

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

// Altera um filme pelo ID no banco de dados
const setUpdateMovies = async function (filme) {

    try {

        let sql = `update tbl_filme set
                    nome            =   '${filme.nome}',
                    sinopse         =   '${filme.sinopse}',
                    data_lancamento =   '${filme.data_lancamento}',
                    duracao         =   '${filme.duracao}',
                    orcamento       =   '${filme.orcamento}',
                    trailer         =   '${filme.trailer}', 
                    capa            =   '${filme.capa}',
                    classificacao_id =  ${filme.classificacao_id}

        where id        =   ${filme.id}`

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

// Exclui um filme pelo ID no banco de dados
const setDeleteMovies = async function (id) {

    try {

        let sql = `update  tbl_filme
                set status = 0
                where id = ${id};`

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
    getSelectAllMovies,
    getSelectByIdMovies,
    getSelectLastID,
    setInsertMovies,
    setUpdateMovies,
    setDeleteMovies
}
