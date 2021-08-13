var express = require('express')
var router = express.Router()
var usuario = require('../models/usuario.js')
const mongoose = require('mongoose');

router.post('/pedidos',function(req,res){
    usuario.find({"id":req.body.usuarioId}).select("pedidos -_id")
    .then(val=>{
        res.send(val[0].pedidos)
    })
})

router.post('/agregarOrden',function(req,res){
    usuario.updateOne({"id":req.body.usuarioId},
    {
        $push: {"pedidos":{
            id: req.body.id,
            usuarioId: req.body.usuarioId,
            productoId: req.body.productoId,
            nombreProducto: req.body.nombreProducto,
            nombreEmpresa: req.body.nombreEmpresa,
            cantidad: req.body.cantidad,
            precio: req.body.precio,
            estado: req.body.estado,
            motoristaId: req.body.motoristaId,
            nombreMotorista: req.body.nombreMotorista,
            place_name: req.body.place_name,
            lat: req.body.lat,
            long: req.body.lng
        }}
    })
    .then(result=>{
        res.send(result)
    })
})

module.exports = router