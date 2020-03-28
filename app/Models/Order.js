'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {

  static boot() {
    super.boot()

    this.addHook('afterFind', 'OrderHook.updateValues')
    // afterPaginate, manda um array
    this.addHook('afterPaginate', 'OrderHook.updateCollectionValues')
  }

// informa que a tabela não tem o campo timesTamp
  static get traits () {
    return ['App/Models/Traits/NoTimestamp']
  }

  items () {
    // hasMany, pois 1 pedido pode ter varias orderns,
    // mas uma ordem só pode pertencer a 1 pedido

    return this.hasMany('App/Models/OrderItem')
  }

  coupons () {
    return this.belongsTo('App/Models/Coupon')
  }

  discounts () {
    return this.hasMany('App/Models/Discount')
  }

  user () {
    return this.belongsTo('App/Models/User', 'user_id' , 'id')
  }



}

module.exports = Order
