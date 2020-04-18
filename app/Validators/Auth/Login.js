'use strict'

class Login {

  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'required|email',
      password:'required'

    }
  }

  // get messages() {
  //   return {
  //     'email.required': 'O e-mail já existe'
  //   }
  // }

}

module.exports = Login
