'use strict'

class AdminStoreUser {

  get validateAll () {
    return true
  }

  get rules () {


    let userID = this.ctx.params.id
    let rule = ''
    // significa que o usuário tá atualizando
    if( userID ) {
      // para atualizar tem que passar o id tbm
      rule = `unique:users,email,id,${userID}`
    } else {
      rule = `unique:users,email|required`
    }

    return {
      // validation rules
      email: rule,
      // tem que existir uma imagem com esse id
      image_id: 'exists:images,id'
    }
  }
}

module.exports = AdminStoreUser
