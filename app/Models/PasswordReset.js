'use strict'
// adonis make:model PasswordReset
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const {str_random} = use('App/Helpers')

class PasswordReset extends Model {

  static boot(){
    super.boot()

    // implementa diretamenta a lógica no model
    this.addHook('beforeCreate', async model => {
      model.token = await str_random(25)
      const expires_at = new Date()
      now.setMinutes(expires_at.getMinutes() + 30)
      model.expires_at = expires_at

    })
  }

  // trata antes de salvar e apresetar os dados
  // formata os valores para o padrão do MYSQL
  // informa pro adonis os campos do tipo date
  static get dates(){
    return ['created_at','updated_at','expires_at']
  }


}

module.exports = PasswordReset
