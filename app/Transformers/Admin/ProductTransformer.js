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

  static get defaultInclude() {
    return ['images', 'image']
}

  transform (model) {
    return {
      id: model.id,
      name: model.name,
      description: model.description,
      price: model.price,
    }
  }

  includeImages(product) {
    return this.collection(product.getRelated('images'), ImageTransformer)
  }

  includeImage(product) {
    return this.item(product.getRelated('image'), ImageTransformer)
  }
}

module.exports = ProductTransformer
