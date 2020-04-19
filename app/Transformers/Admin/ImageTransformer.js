'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * ImageTransformer class
 *
 * @class ImageTransformer
 * @constructor
 */
class ImageTransformer extends BumblebeeTransformer {

  // Computed Properties só começam a axistir
  //no model quando usa o método toJson

  transform ( image ) {
    image = image.toJSON()

    return {
     id: image.id,
     url: image.url,
     size: image.size,
     original_name: image.original_name,
     extension: image.extension
    }
  }
}

module.exports = ImageTransformer
