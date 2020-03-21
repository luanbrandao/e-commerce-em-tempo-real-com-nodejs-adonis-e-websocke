'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {

  image(){
    return this.belongsTo('App/Models/Image')
  }

  // Relacionamente o entre produtos e imagens
  // Galeria de fotos do produto
  images(){
    return this.belongsToMany('App/Models/Image')
  }

  // Relacionamento entre produtos e categorias
  categories(){
    return this.belongsToMany('App/Models/Category')
  }

  // Relacionamento entre produtos e cupons de descontos
  coupons(){
    return this.belongsToMany('App/Models/Coupon')
  }

}

module.exports = Product
