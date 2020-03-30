'use strict'

const Role = use('Role')

class RoleSeeder {
  async run () {

    // Cria admin
     await Role.create({
      name: 'Admin',
      slug: 'admin',
      description: 'Administrador do sistema'
    });

    //cria o gerente
    await Role.create({
      name: 'Manager',
      slug: 'manager',
      description: 'Gerente da loja'
    });

    //cria o cliente
    await Role.create({
      name: 'Cliente',
      slug: 'client',
      description: 'Cliente da loja'
    });

  }
}

module.exports = RoleSeeder
