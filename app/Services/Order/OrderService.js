'use strict'

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




}

module.exports = OrderSerevice
