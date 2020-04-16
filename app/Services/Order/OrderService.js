'use strict'
const Database = use('Database')
class OrderSerevice {

  constructor( model , trx = false) {
    this.model = model
    this.trx = trx
  }

  async syncItems( items ) {

    if( !Array.isArray(items)) {
      return false;
    }

    await this.model().delete(this.trx)
    return await this.model.items().createMany( items, this.trx )

  }

  async updateItems( items ) {
    let currentItems = await this.model
    .items()
    .whereIn( 'id' , items.map( item => item.id ))
    .fetch(this.trx)

    // deleta os itens que o user não quer mais
    await this.model
    .items()
    .whereIn('id', items.map( item => item.id))
    .delete(this.trx)

    // Atualiza os valores e quantidade
    await Promise.all( currentItems.rows.map( async item => {
      //fill, preenche o item
      item.fill( items.find( n => n.id === item.id))

      await item.save(this.trx)

    }))

  }

  async canApplyDiscount( counpon ) {
    const couponProducts = await Database
    .from('coupon_products')
    .where(coupon_id , coupon.id)
    .puck('product_id')
    // retorna um array no formato: [1,2,3,...]

    // associado a algum cliente
    const couponClients = await Database
    .from('coupon_user')
    .where(coupon_id, coupon.id)
    .puck('user_id')

    // veriicar se o coupon não está associado a produtos e clientes específicos
    if( Array.isArray(couponProducts) && couponProducts.length < 1 && Array.isArray(couponClients) && couponClients < 1 ) {
      //  Caso não estaja associado a cliente ou produto específico, é de uso livre
      return true
    }

    let isAssociatedToProducts, isAssociatedToClients = false

    if( Array.isArray(couponProducts) && couponProducts > 0 ) {
      isAssociatedToProducts = true;
    }

    if( Array.isArray(couponClients) && couponClients > 0 ) {
      isAssociatedToClients = true;
    }

    const productsMatch  = await Database
    .from('order_items')
    .where('order_id' , this.model.id)
    .whereIn('product_id', couponProducts)
    .puck('product_id')

    // caso de uso 1 - O cupom está associado a clientes e produtos
    if( isAssociatedToClients && isAssociatedToProducts ) {
      // find = filter
      const clientMatch = couponClients.find(
        client => client == this.model.user_id
      )


      if( clientMatch && Array.isArray(productsMatch) && productsMatch.length > 0) {
        return true
      }

    }

    // caso de uso 2- O cupom está apenas associado aapenas a produtos
    if(  isAssociatedToProducts && Array.isArray(productsMatch) && productsMatch.length > 0) {
      return true;
    }
    // caso de uso 3- O cupom está apenas associado a 1 ou mais clientes ( e nenhum produto)
    if(  isAssociatedToClients && Array.isArray(couponClients) && couponClients.length > 0) {
      const match = couponClients.find( client => client === this.model.user_id )
      if( match ) {
        return true;
      }
    }

    /**
     caso nenhuma das verificaçoes acima deem positivas
     então o cupom está associado a clientes ou produtos ou os dois
     porém nenhum dos produtos deste pedido está elegível ao desconto
     e o cliente que fez a compra também não poderá utilizar este couponClients
    */

     return false

  }
}

module.exports = OrderSerevice
