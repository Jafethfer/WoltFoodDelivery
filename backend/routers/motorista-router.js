var express = require('express')
var router = express.Router()
var motorista = require('../models/motorista.js')
const mongoose = require('mongoose');

router.post('/ordenes',function(req,res){
    motorista.find({"id":req.body.motoristaId}).select("pedidos -_id")
    .then(val=>{
        res.send(val[0].pedidos)
    })
})

router.post('/agregarOrden',function(req,res){
    motorista.updateOne({"id":req.body.motoristaId},
    {
        $push: {"pedidos":{
            id: req.body.id,
            clienteId: req.body.clienteId,
            cliente: req.body.cliente,
            productoId: req.body.productoId,
            nombreProducto: req.body.nombreProducto,
            cantidad: req.body.cantidad,
            precio: req.body.precio,
            estado: req.body.estado,
        }}
    })
    .then(result=>{
        res.send(result)
    })
})

module.exports = router