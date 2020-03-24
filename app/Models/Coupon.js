'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Coupon extends Model {

  // informa pro adonis os campos do tipo date
  static get dates(){
    return ['created_at','updated_at','valid_unit']
  }

  users(){
    return this.belongsToMany('App/Models/User')
  }

  products(){
    return this.belongsToMany('App/Models/Product')
  }

  orders(){
    return this.belongsToMany('App/Models/Order')
  }

}

module.exports = Cooupon
