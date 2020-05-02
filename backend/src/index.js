//Importando as funcionalidades do express
const express = require('express');
const cors = require('cors');

//Importando as rotas
const routes = require('./routes')
//utilizar o './'(caminho relativo) para que ele pense 
//que é um arquivo é nao um pacote 

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);