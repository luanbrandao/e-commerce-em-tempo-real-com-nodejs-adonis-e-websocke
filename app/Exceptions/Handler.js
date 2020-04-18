'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')
const Logger = use('Logger')
/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */

  //pega a requisição antes de retornar pro usuário
  async handle (error, { request, response }) {
    // response.status(error.status).send({
    //   error: error.message
    // })

    if (error.name === 'ValidationException') {
      return response.status(error.status).send({
        error: error.messages
      })
    }

    // if (Env.get('NODE_ENV') === 'development') {
    //   const youch = new Youch(error, request.request)

    //   const errorJson = await youch.toJSON()

    //   return response.status(error.status).send(errorJson)
    // }

    return response.status(error.status)

  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
    if( error.status >= 500 ) {
      Logger.error(error.message,{
        stack: error.stack,
        message:error.message,
        status:error.status,
        name:error.name
      })
    }
  }
}

module.exports = ExceptionHandler
