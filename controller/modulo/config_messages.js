/*******************************************************************************************************************
 * Objetivo: Arquivo responsável pelos padrões de mensagens que o projeto ira realizar, sempre no formato JSON
 *                                                                                      (Mensagens de ERRO e Sucesso, etc)
 * Data: 07/10/2025
 * Autor: Gabryel Fillipe Cavalcanti da Silva
 * Versão: 1.0
 ******************************************************************************************************************/

// Cria um objeto da classe Date para pegar a data atual
const data_atual = new Date()

/******************************************************************************************************************/



/**************************************Messagens Padronizadas******************************************************* */

const DEFAULT_HEADER = {
    development: 'Gabryel Fillipe Cavalcanti da Silva',
    api_description: "API para manipular dados de filmes",
    status: Boolean,
    status_code: Number,
    request_date: data_atual.toString(),
    items: {}
}


/**************************************Messagens De Sucesso******************************************************* */

const SUCESS_REQUEST = {
    status: true,
    status_code: 200,
    message: 'Requisição bem sucedida!!!'
}

const SUCESS_CREATED_ITEM = {
    status: true,
    status_code: 201,
    message: 'Item criado com sucesso!!!'
}

const SUCESS_UPDATED_ITEM = {
    status: true,
    status_code: 200,
    message: 'Item atualizado com sucesso!!!'
}

const SUCESS_DELETED_ITEM = {
    status: true,
    status_code: 200,
    message: 'Item deletado com sucesso!!!'
}


/**************************************Messagens De Erro******************************************************* */

const ERROR_NOT_FOUND = {
    status: false,
    status_code: 404,
    message: 'Não foram encontrados dados de retorno!!!'
}

const ERROR_INTERNAL_SERVER_CONTROLLER = {
    status: false,
    status_code: 500,
    message: 'Não foi possivel processar a requisição, devido a erros internos no servidor (CONTROLLER)!!!'
}
const ERROR_INTERNAL_SERVER_MODEL = {
    status: false,
    status_code: 500,
    message: 'Não foi possivel processar a requisição, devido a erros internos no servidor (MODELAGEM DE DADOS)!!!'
}

const ERROR_REQUIRED_FIELDS = {
    status: false,
    status_code: 400,
    message: 'Não foi possivel processar a requisição, pois existem campos obrigatórios que devem ser encaminhados e atendidos conforme a documentação!!!'
}

const ERRO_CONTENT_TYPE = {
    status: false,
    status_code: 415,
    message: 'Não foi possivel processar a requisição, pois o tipo de dados enviados no corpo devem ser JSON!!!'
}

const ERROR_RELATIONAL_INSERTION = {
    status: false,
    status_code: 500,
    message: 'A requisição do item principal foi processada com sucesso, porém houveram problemas ao inserir dados na tabela de relação !!!'
}



module.exports = {
    DEFAULT_HEADER,
    SUCESS_REQUEST,
    SUCESS_CREATED_ITEM,
    SUCESS_UPDATED_ITEM,
    SUCESS_DELETED_ITEM,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_REQUIRED_FIELDS,
    ERRO_CONTENT_TYPE,
    ERROR_RELATIONAL_INSERTION
}