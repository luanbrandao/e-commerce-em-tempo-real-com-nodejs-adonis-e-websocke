
const crypto = use('crypto')
const Helpers = use('Helpers')

/**
 * @param { int } length - O tamanho da string que vocÇe quer gear
 * @return { string } uma string randomica do tamanho de length
 */

 const str_random = async ( length = 40 ) => {

  let string = ''
  let len = string.length

  if( len < length) {
    let size = length - len
    let bytes = await crypto.randomBytes(size)
    let buffer = Buffer.from(bytes)

    string = buffer
      .toString('base64')
      .replace(/[^a-zA-Z0-9]/g,'')
      .substr(0,size)
  }

  return string
 }


 /**
  * Move um único arquivo para o caminho especificado, se nenhum for especificado então
  * o caminho 'public/upload' será usado
  * @param { File } file o arquivoa ser gerenciado
  * @param { string } path o caminho para onde o arquivo deve sermovido
 */

 const manage_single_upload = async ( file, path = null ) =>{
   path = path ? path : Helpers.publicPath('uploads')
   // gera um nome aleatório
   const random_name = await str_random(30)
   let filename = `${new Date().getTime()}-${random_name}.${file.subtype}`

   //renomeia o arquivo e move ele para opath
   await file.move(path, {
     name: filename,
    })

    return file
 }

 /**
  * Move multiplos único arquivos para o caminho especificado, se nenhum for especificado então
  * o caminho 'public/upload' será usado
  * @param { FileJas } fileJar os arquivoa a serem gerenciado
  * @param { string } path o caminho para onde os arquivos deve ser movido
  * @return { Onject<FileJar> }
 */

 const manage_mutiple_uploads = async ( fileJar, path = null ) =>{

  path = path ? path : Helpers.publicPath('uploads')

  let successes = [],
   erros = []

   await Promise.all(fileJar.files.map( async file => {

    // gera um nome aleatório
    const random_name = await str_random(30)
    let filename = `${new Date().getTime()}-${random_name}.${file.subtype}`

    // move o arquivo

   await file.move(path, {
    name: filename,
   })

   //verificamos se moveu mesmo

   if( file.moved() ) {
    successes.push(file)
   } else {
     erros.push(file.error())
   }

   })
  )

  return { successes, erros }

 }


 module.exports = {
    str_random
 }
