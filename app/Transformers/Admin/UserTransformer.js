'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
const ImageTransformer = use('App/Transformers/Admin/ImageTransformer')
/**
 * UserTransformer class
 *
 * @class UserTransformer
 * @constructor
 */
class UserTransformer extends BumblebeeTransformer {

  static get defaultInclude(){
    return ['image']
  }

  transform (model) {
    return {
     id: model.id,
     name: model.name,
     email: model.email
    }
  }

  includeImage( model ) {
    // relacionamento do model category com a img
    return this.item(model.getRelated('image') , ImageTransformer)
  }
}

module.exports = UserTransformer
