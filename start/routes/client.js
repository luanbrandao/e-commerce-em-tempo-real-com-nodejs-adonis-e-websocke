'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route')

Route.group( () => {

  // Route.resource('products','ProductController').apiOnly()

  Route.get('products','ProductController.index')
  Route.get('products/:id','ProductController.show')

  // Route.resource('orders','OrderController').apiOnly()
  Route.get('orders','OrderController.index')
  Route.get('orders/:id','OrderController.show')

  Route.post('orders','OrderController.store')
  Route.put('orders/:id','OrderController.put')


})

.prefix('v1/client')
.namespace('Client')

