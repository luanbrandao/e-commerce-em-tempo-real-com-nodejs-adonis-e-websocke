'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Coupon extends Model {

  // informa pro adonis os campos do tipo date
  static get dates(){
    return ['created_at','updated_at','valid_unit']
  }

  // todas as tabelas que tem relacionamento com a tabela de coupon

  users(){
    //coupon_user
    return this.belongsToMany('App/Models/User')
  }

  products(){
    //coupon_product
    return this.belongsToMany('App/Models/Product')
  }

  orders(){
    //coupon_order
    return this.belongsToMany('App/Models/Order')
  }

}

module.exports = Cooupon
