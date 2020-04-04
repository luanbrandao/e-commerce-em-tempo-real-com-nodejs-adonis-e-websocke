'use strict'

/*
|--------------------------------------------------------------------------
| ClientSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const Role = use('Role')
const User = use('App/Models/User');

class ClientSeeder {

  async run () {
    const role = await Role.findBy('slug' , 'client')
    const clients = await Factory.model('App/Models/User').createMany(30)

    // add o cargo no cliente
    await Promise.all(
      clients.map( async client => {
        //attach, n pra n
         await client.roles().attach([ role.id ])
      })
    )

    const user = await User.create({
      name: 'Thauan',
      surname: 'Santos',
      email: 'thauan@gmail.com',
      password: 'asdfasdf'
    })

    const adminRole = await Role.findBy('slug', 'admin')

    await user.roles().attach( [adminRole.id] )

  }

}

module.exports = ClientSeeder