const crypto = require('crypto')
const connection = require('../database/connection');

// exportar um objeto com os métodos
module.exports = {
    async index(request,response){
    const ongs = await connection('ongs').select('*');
    return response.json(ongs);
    },


    async create (request,response){
    const {nome, email, whatsapp, city, uf} = request.body;
    const id = crypto.randomBytes(4).toString('HEX');
    await connection('ongs').insert({
        id,
        nome,
        email,
        whatsapp,
        city,
        uf,
    })
    return response.json({id});
    }
}