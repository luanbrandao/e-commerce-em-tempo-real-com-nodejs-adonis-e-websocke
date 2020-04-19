'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
const ImageTransformer = use('App/Transformers/Admin/ImageTransformer')
/**
 * CategoryTransformer class
 *
 * @class CategoryTransformer
 * @constructor
 */
class CategoryTransformer extends BumblebeeTransformer {

  // carrega a imagem da categorya
  static get defaultInclude(){
    return ['image']
  }

  // transformers adicionais
  // availableInclude(){
  //   return ['posts']
  // }



  transform (model) {
    return {
     id: model.id,
     title: model.title,
     description: model.description,

    }
  }

  includeImage( model ) {
    // relacionamento do model category com a img
    return this.item(model.getRelated('image') , ImageTransformer)
  }

  // includePosts( model ) {
  //   // relacionamento do model category com a img
  //   return this.paginate(model.getRelated('posts' , PostTransformer))
  // }

}

module.exports = CategoryTransformer
