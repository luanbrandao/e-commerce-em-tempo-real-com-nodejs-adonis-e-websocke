
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
  * @param { File } file p arquivoa ser gerenciado
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


 module.exports = {
    str_random
 }
