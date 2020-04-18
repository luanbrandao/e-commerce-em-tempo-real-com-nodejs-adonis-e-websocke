'use strict'

class Register {
  get rules () {
    return {
      name: 'required',
      surname:'required',
      // unique:users,email, passa a tabela e a coluna
      email: 'required|email|unique:users,email',
      password: 'required|confirmed'
    }
  }
}

module.exports = Register
