'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Coupon = use('App/Models/Coupon')
const Database = use('Database')
const Service = use('App/Services/Coupon/CouponService')
/**
 * Resourceful controller for interacting with coupons
 */
class CouponController {
  /**
   * Show a list of all coupons.
   * GET coupons
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, pagination }) {

    const  code  = request.input('code')

    const query = Category.query()

    if( code ) {
      // no postgres e ILIKE
      query.where('code', 'ILIKE' , `%${code}%` )
    }
    const coupons = await query.paginate(pagination.page , pagination.limit );

    return response.send(coupons)
  }


  /**
   * Create/save a new coupon.
   * POST coupons
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    /**
     *  1 - produto - pode ser utilizado apenas em produtos específicos
     *  2 - clients - pode ser utilizado apenas por clientes específicos
     *  3 - clients e products - pode ser utilizado somente em produtos
     *      e clientes especificos
     *  4 - pode ser utilizado por qualquer cliente em qualquer pedido
     */

    const trx = await Database.beginTransaction()

     var can_user_for = {
       client: false,
       product: false
     }

     try {

      const couponData = request.only([
        'code',
        'discount',
        'valid_from',
        'valid_until',
        'quantity',
        'type',
        'recursive'
       ])

       const { users , products } = request.only([ 'users' , 'products' ])
       const coupon = await Coupon.create( couponData , trx)

       // starts service layer
       const service = new Service(coupon , trx)

     } catch (error) {

     }


   }

  /**
   * Display a single coupon.
   * GET coupons/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params: {id }, request, response, view }) {
    const coupon = await Coupon.findOrFail(id)
    return response.send(coupon)
  }

  /**
   * Update coupon details.
   * PUT or PATCH coupons/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a coupon with id.
   * DELETE coupons/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params: { id }, request, response }) {
    // relacionado com pedidos, usuários e produtos
    const trx = await Database.beginTransaction()
    const coupon = await Coupon.findOrFail(id)

    try {
      // remove os relacionamentos
      await coupon.products().detach([], trx)
      await coupon.orders().detach([],trx)
      await coupon.users().detach([],trx)

      await trx.commit()

      await coupon.delete(trx);
      return response.status(204).send()

    } catch (error) {
      await trx.rollback()
      return response.status(400).send({
        message: "Não foi possível deletar esse cupom no momento"
      })
    }
  }
}

module.exports = CouponController
