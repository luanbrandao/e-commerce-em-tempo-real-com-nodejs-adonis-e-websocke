'use strict'
const Coupon = use('App/Models/Coupon')
const Order =  use('App/Models/Order')
const Database = use('Database')
const DiscountHook = exports = module.exports = {}

DiscountHook.calculateValues = async (model) => {
  var couponProducts, discountItems = []
  model.discount = 0
  const coupon = await Coupon.find(model.coupon_id)
  const order = await Order.find(model.order_id)

  switch (coupon.can_use_for) {
    // o desconto vale apenas para produtos específicos
    // ou seja, só para alguns itens do pedido
    case 'product_client' || 'product':
      // verifica quais produtos podem receber esse desconto
      couponProducts = await Database
      .from('coupon_product')
      .where('coupon_id' , model.coupon_id)
      .pluck('coupon_id')

      discountItems = await Database
      .from('order_items')
      .where('order_id', model.order_id)
      // pega os itens e ver quais tem desconto
      .whereIn('product_id', couponProducts )
      // .pluck('product_id')

      if( coupon.type == 'precent') {
        for( let orderItem in discountItems ) {
          // percentagem do desconto
          model.discount += ( orderItem.subtotal / 100 ) * coupon.discount
        }
      } else if( coupon.type == 'currency') {
        for( let orderItem in discountItems ) {
          model.discount +=  coupon.discount  * orderItem.quantity
        }
      } else {
        // desconto total, item de graça
        for( let orderItem in discountItems ) {
          model.discount +=  orderItem.subtotal
        }
      }

      break;

    default:
      // o desconto do pedido vale pra todos os produtos
      // client || all
     if( coupon.type == 'percent') {
      model.discount =  (order.subtotal  / 100) * coupon.discount

     } else if( coupon.type  == 'currency'){
      model.discount = coupon.discount

     } else {
       // o desconto é igual o valor total da compra, desconto de 100%
      model.discount = order.subtotal
     }

      break;
  }
  return model
}

// decrementa a quantidade de cupons disponíveis para uso
DiscountHook.decrementCoupons = async (model) => {
  const query = Database.from('coupons');
  if( model.$transaction ) {
    query.transaction(model.$transaction)    
  }

  await query.where('id', model.coupon_id).decrement('quantity',1)

}

// incrementa a quantidade de cupons disponíceis (quando o cupom é retirado)
DiscountHook.incrementCoupons = async (model) => {
  const query = Database.from('coupons');
  if( model.$transaction ) {
    query.transaction(model.$transaction)    
  }

  await query.where('id', model.coupon_id).increment('quantity',1)
}
