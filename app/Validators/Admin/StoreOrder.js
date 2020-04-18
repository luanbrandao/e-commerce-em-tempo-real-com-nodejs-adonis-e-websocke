'use strict'

class AdminStoreOrder {

  get validateAll () {
    return true
  }

  get rules () {
    return {
    //  validar se um registro existe na tabela na validação
    // pega todo os objetos, e verifica uma prop
    // tabala products usando o campo id
    'items.*.product_id':'exists:products,id',
    'items.*.quantity':'min:1',
    }
  }
}

module.exports = AdminStoreOrder
