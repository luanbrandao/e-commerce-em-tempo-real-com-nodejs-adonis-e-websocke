'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with images
 */

 const Image = use('App/Models/Image')

const { manage_single_upload, manage_mutiple_uploads } =
 use('App/Helpers')



class ImageController {
  /**
   * Show a list of all images.
   * GET images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, pagination }) {
    const imagens = await Image.query().orderBy('id','DESC')
    .paginate(pagination.page , pagination.limit)

    return response.send(imagens)
  }


  /**
   * Create/save a new image.
   * POST images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    try {

      // captura uma image ou mais do request
      const fileJar = request.file('images', {
        types: ['image'],
        size: '2mb'
      })

      // retorno pro usuário
      let images = []
      // caso seja um unico arquivo - manage_single_upload
      //caso seja vários arquivos - manage_multiple_uploads
      if( !fileJar.files ) {

        const file = await manage_single_upload(fileJar)
        //precisa verificar novamento se tem multilpos arquivos
        if( file.moved() ) {
          const Image = await Image.create({
            path: file.fileName,
            size: file.size,
            original_name : file.clientName,
            extension: file.subtype

          })

          imagens.push(image)

          return response.status(201).send({
            successes: images,
            errors: {}
          })



        }


        return response.status(400).send({
          message: 'Não foi possível processar está imagem no momento'
        })



      }

      let files = manage_mutiple_uploads(fileJar)

      await Promise.all(
        files.successes.map( async file => {
          const image = await Image.create({
            path: file.fileName,
            size: file.size,
            original_name: file.clientName,
            extension: file.subtype
          })
          images.push(image)
        })
      )

      return response.status(201).send( {successes: images, errors: files.errors })

    } catch (error) {
      return response.status(400)
      .send({ message: 'Não foi possível processar sua solicitação'})
    }

  }

  /**
   * Display a single image.
   * GET images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params: { id }, request, response, view }) {

    const image = await Image.findOrFail(id)
    return response.send(image)

  }

  /**
   * Update image details.
   * PUT or PATCH images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a image with id.
   * DELETE images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ImageController
