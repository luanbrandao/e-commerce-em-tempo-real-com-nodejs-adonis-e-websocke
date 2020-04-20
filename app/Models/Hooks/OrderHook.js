'use strict'

const OrderHook = exports = module.exports = {}

/**
    calcula o valor do pedido.
**/
OrderHook.updateValues = async (model) => {

  // model.items e model.discounts são relacionamentos nos models

  // campos virtuais
  model.$sideLoaded.subtotal = await model.items().getSum('subtotal')

  // é um relacionamento, não pode ter um nove igual o nome do relacionamento
  model.$sideLoaded.qty_items = await model.items().getSum('quantity')

  // valor total do desconto
  model.$sideLoaded.discout= await model.discounts().getSum('discount')

  model.total = model.$sideLoaded.subtotal - model.$sideLoaded.discount;
}


OrderHook.updateCollectionValues = async (models) => {

  for( let model of models ) {
    models = await OrderHook.updateValues(model);
  }

}
