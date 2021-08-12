var express = require('express');
var cors = require('cors'); //Para gestionar politicas de dominios cruzados
var bodyParser = require('body-parser');
var database = require('./modules/database');
var categoria = require('./models/categoria')
var usuario = require('./models/usuario')
var administrador = require('./models/administrador')
var motorista = require('./models/motorista')
var categoriaRouter = require('./routers/categoria-router.js')
var usuarioRouter = require('./routers/usuario-router.js')
var motoristaRouter = require('./routers/motorista-router.js')

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/categoria',categoriaRouter)
app.use('/usuario',usuarioRouter)
app.use('/motorista',motoristaRouter)

app.post('/login',function(req,res){
    usuario.findOne({'email':req.body.email,'password':req.body.password})
    .then(usuario=>{
        if(usuario==null){
            motorista.findOne({'email':req.body.email,'password':req.body.password})
            .then(motorista=>{
                if(motorista==null){
                    administrador.findOne({'email':req.body.email,'password':req.body.password})
                    .then(admin=>{
                        if(admin==null){
                            res.send(false)
                        }else{
                            res.send(admin)
                        }
                    })
                }else{
                    res.send(motorista)
                }
            })
        }else{
            res.send(usuario)
        }
    })
})

app.listen(3000, ()=>{
    console.log('Servidor del backend levantado en 3000');
});