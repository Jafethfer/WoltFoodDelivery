var express = require('express')
var router = express.Router()
var usuario = require('../models/usuario.js')
const mongoose = require('mongoose');

router.get('/all',function(req,res){
    usuario.find({})
    .then(val=>{
        res.send(val)
    })
})

router.post('/agregarOrden',function(req,res){
    usuario.updateOne({"id":req.body.usuarioId},
    {
        $push: {"ordenes":{
            nombreProducto: req.body.nombreProducto,
            descripcion: req.body.descripcion,
            cantidad: req.body.cantidad,
            precio: req.body.precio
        }}
    })
    .then(result=>{
        res.send(result)
    })
})

module.exports = router