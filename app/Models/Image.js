'use strict'
// adonis make:model Image
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')

class Image extends Model {

  // chama os metodos
  static get computed(){
    return ['url']
  }
  // campo virtual
  getUrl({path})  {
    return `${Env.get('APP_URL')}/imagens/${path}`
  }

}

module.exports = Image
