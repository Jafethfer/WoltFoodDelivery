var express = require('express');
var cors = require('cors'); //Para gestionar politicas de dominios cruzados
var bodyParser = require('body-parser');
var database = require('./modules/database');
var categoria = require('./models/categoria')
var usuario = require('./models/usuario')
var categoriaRouter = require('./routers/categoria-router.js')
var usuarioRouter = require('./routers/usuario-router.js')

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/categoria',categoriaRouter)
app.use('/usuario',usuarioRouter)

app.listen(3000, ()=>{
    console.log('Servidor del backend levantado en 8888');
});