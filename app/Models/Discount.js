'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Discount extends Model {

  static boot() {
    super.boot()

    this.addHook('beforeSave','DiscountHook.calculateValues')
    // diminui a quantidade de cupons disponíveis
    this.addHook('afterSave' ,'DiscountHook.decrementCoupons')
    this.addHook('afterDelete' ,'DiscountHook.incrementCoupons')
  }

  static get table(){
    //
    return 'coupon_order'
  }

  // atualizar os valores as tabelas, fazer os cálculos automaticamente

  order(){
    // 1 - o model relacionado
    // 2 - o campo na tabela COUPON_ORDER que e o ORDER_ID
    // 3 - a chave estrangeira que ta na tabela ORDER que e o ID
    return this.belongsTo('App/Models/Order','order_id','id');
  }

  coupon(){
    // 1 - o model relacionado
    // 2 - o campo na tabela COUPON_ORDER que e o COUPON_ID
    // 3 - a chave estrangeira que ta na tabela COUPON que e o ID
    return this.belongsTo('App/Models/Coupon','coupon_id','id')
  }

}

module.exports = Discount
