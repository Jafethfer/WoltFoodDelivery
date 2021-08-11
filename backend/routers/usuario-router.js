var express = require('express')
var router = express.Router()
var usuario = require('../models/usuario.js')
const mongoose = require('mongoose');

router.post('/pedidos',function(req,res){
    usuario.find({"id":req.body.usuarioId}).select("pedidos -_id")
    .then(val=>{
        res.send(val)
    })
})

router.post('/agregarOrden',function(req,res){
    usuario.updateOne({"id":req.body.usuarioId},
    {
        $push: {"pedidos":{
            id: req.body.pedidoId,
            productoId: req.body.productoId,
            nombreProducto: req.body.nombreProducto,
            cantidad: req.body.cantidad,
            precio: req.body.precio,
            estado: req.body.estado,
            motoristaId: req.body.motoristaId,
            nombreMotorista: req.body.motorista
        }}
    })
    .then(result=>{
        res.send(result)
    })
})

module.exports = router