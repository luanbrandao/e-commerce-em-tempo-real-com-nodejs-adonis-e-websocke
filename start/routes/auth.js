'use strict'

const Route = use('Route')

Route.group( () => {

  Route.post('/register' , 'AuthController.register').as('auth.register')
  Route.post('/login' , 'AuthController.login').as('auth.login')
  Route.post('/refresh' , 'AuthController.refresh').as('auth.refresh')
  Route.post('/logout' , 'AuthController.logout').as('auth.logout')
  Route.post('/forgot' , 'AuthController.forgot').as('auth.forgot')
  Route.post('/remember' , 'AuthController.remember').as('auth.remember')
  Route.post('/reset' , 'AuthController.reset').as('auth.reset')

})
.prefix('v1/auth')
.namespace('Auth')
