'use strict'

const Category = use('App/Models/Category')
const Database = use('Database')
const Transformer = use('App/Transformers/Admin/CategoryTransformer')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  /**
   * Show a list of all categories.
   * GET categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   * @param {Object} ctx.pagination
   */
  async index ({ request, response, transform , pagination  }) {

    // return response.send({message: 'ok'})
    // const page = request.input('page')
    // const limit = request.input('limit')
    // const catagories = await Category.query().paginate(page , limit );

    const  title  = request.input('title')

    const query = Category.query()

    if( title ) {
      // query.where('title', 'LIKE' , `%${title}%` )

      // no postgres e ILIKE
      query.where('title', 'ILIKE' , `%${title}%` )
      // query.limit(50);
      // query.whereRaw(`title ILIKE '%Moldova%' `)

    }
    // const categories = await query.paginate(pagination.page , pagination.limit );
    var categories = await query.paginate(pagination.page , pagination.limit );

    categories = await transform.paginate(categories,Transformer )

    return response.send(categories)

  }



  /**
   * Create/save a new category.
   * POST categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, transform }) {

    try {

      const { title , description , image_id } = request.all()
      var category = await Category.create( { title , description , image_id })

      // item retorna só 1 item
      category = await transform.item(category, Transformer);

      return response.status(201).send( category )

    } catch (error) {
      return response.status(400).send( { message: "Erro ao processar a sua solicitação" } )
    }

  }

  /**
   * Display a single category.
   * GET categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params: { id }, request, response, transform }) {

    // const category = await Category.findOrFail(params.id)
    var category = await Category.findOrFail( id )
    category = await transform.item(category, Transformer)
    return response.send(category)
  }


  /**
   * Update category details.
   * PUT or PATCH categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id } , request, response, transform }) {
    const transaction = await Database.beginTransaction()
    try {
      const category = await Category.findOrFail(id)
      category.merge(request.only(['title', 'description', 'image_id']))
      await category.save(transaction)
      await transaction.commit()
      return response.send(await transform.item(category, Transformer))
    } catch (e) {
      await transaction.rollback()
      return response.status(400).send({
        message: 'Erro ao processar sua requisição!',
        error: e.message
      })
    }
  }
  /**
   * Delete a category with id.
   * DELETE categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params: {id}, response }) {

    const category = await Category.findOrFail( id )
    category.delete()
    return response.status(204).send()

  }
}

module.exports = CategoryController
