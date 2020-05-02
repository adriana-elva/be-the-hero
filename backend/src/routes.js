//Importando o express
const express= require('express');
//desacoplando o módulo de rotas do express na variavel 'routes'
const routes= express.Router();

const ongController = require('./controllers/ongController');
const incidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController')



routes.get('/ongs', ongController.index);
routes.post('/ongs', ongController.create);

routes.post('/sessions', sessionController.create);

routes.post('/incidents',incidentController.create);
routes.get('/incidents',incidentController.index);
routes.delete('/incidents/:id', incidentController.delete);

routes.get('/profile', ProfileController.index);

//deixando as rotas disponiveis para a index acessar
module.exports = routes;
// e dessa forma no node que fazemos para exportar uma var de dentro de um arquivo