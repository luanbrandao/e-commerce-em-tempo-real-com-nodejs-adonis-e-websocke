'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * OrderTransformer class
 *
 * @class OrderTransformer
 * @constructor
 */
class OrderTransformer extends BumblebeeTransformer {

  // opcionais
  availableInclude() {
    return ['user','coupons','items','discounts']
  }

  transform (order) {
    order = order.toJSON()
    return {
     id: order.id,
     status: order.status,
    //  total e calculado no hooks
     total: order.total ? parserFloat(order.total.toFixed(2)) : 0,
     date: order.created_at,
     qty_items: order.__meta__ && order.__meta__.qty_items ?  order.__meta__.qty_items : 0,
     // pega os valores do hook usando __meta__
     discount: order.__meta__&&  order.__meta__.discount ?
      order.__meta__.discount : 0,
     subtotal: order.__meta__ && order.__meta__.subtotal ? order.__meta__.subtotal : 0
    }
  }

}

module.exports = OrderTransformer
