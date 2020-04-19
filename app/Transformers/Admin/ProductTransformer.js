'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
const ImageTransformer = use('App/Transformers/Admin/ImageTransformer')
/**
 * ProductTransformer class
 *
 * @class ProductTransformer
 * @constructor
 */
class ProductTransformer extends BumblebeeTransformer {

  static get defaultInclude(){
    return ['image']
  }

  transform (model) {
    return {
      id: model.id,
      name: model.name,
      description: model.description,
      price: model.price,
    }
  }

  includeImage( model ) {
    // relacionamento do model category com a img
    return this.item(model.getRelated('image') , ImageTransformer)
  }
}

module.exports = ProductTransformer
