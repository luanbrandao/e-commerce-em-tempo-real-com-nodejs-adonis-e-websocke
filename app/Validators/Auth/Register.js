'use strict'

class Register {

  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required',
      surname:'required',
      // unique:users,email, passa a tabela e a coluna
      email: 'required|email|unique:users,email',
      password: 'required|confirmed'
    }
  }

  get messages(){
    return {
      'name.required': 'O nome é obrigatório!',
      'surname.required': 'O sobrenome é obrigatório!',
      'email.required': 'O e-mail é obrigatório!',
      'email.email': 'E-mail inválido!',
      'email.unique': 'Este E-mail já existe!',
      'password.required': 'A senha é obrigatória!',
      'password.confirmed': 'A senhas não são iguais!',
    }
  }
}

module.exports = Register
