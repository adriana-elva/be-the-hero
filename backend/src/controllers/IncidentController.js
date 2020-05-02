const connection = require('../database/connection')
//exportar um objeto
module.exports = {
    async index(request,response){
        //se o parametro 'page' não existir, por padrão 1 (buscar dados da página 1)
        const { page = 1 } = request.query;
        
        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['incidents.*', 'ongs.nome','ongs.email','ongs.whatsapp','ongs.city','ongs.uf']);

        response.header('X-Total-Count', count ['count(*)'])

        return response.json(incidents);
    },

    async create(request, response){
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })
        return response.json({ id });
    },

    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;
        
        const incident = await connection('incidents')
        .where('id' , id)
        .select('ong_id')
        .first(); //retorna apenas um resultado

        if(incident.ong_id != ong_id){
            return response.status(401).json({ error: 'Operation not permited.' });
        }
        await connection('incidents').where('id' , id).delete();
        return response.status(204).send();
    }
}