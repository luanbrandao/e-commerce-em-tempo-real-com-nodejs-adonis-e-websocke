'use strict'

const OrderItemHook = exports = module.exports = {}
const Product = use('App/Models/Product')

OrderItemHook.updateSubtotal = async (model) => {
  let product = await Product.find(model.product_id)
  // evita fraudes
  // pega o items e a quantidade
  model.subtotal = model.quantity * product.price;
  console.log("subtotal ->",model.subtotal);
}
