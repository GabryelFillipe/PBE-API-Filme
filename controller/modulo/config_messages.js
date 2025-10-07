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

const MESSAGE_HEADER    = {
    development: 'Gabryel Fillipe Cavalcanti da Silva',
    api_description: "API para manipular dados de filmes",
    status: Boolean,
    status_code: Number,
    request_date: data_atual.getTimezoneOffset(),
    items: {}
   }
 

/**************************************Messagens De Sucesso******************************************************* */

const MESSAGE_REQUEST_SUCESS = {
    status: true,
    status_code: 200,
    message: 'Requisição bem sucedida!!!'
}
 

/**************************************Messagens De Erro******************************************************* */

module.exports = {
    MESSAGE_HEADER,
    MESSAGE_REQUEST_SUCESS
}