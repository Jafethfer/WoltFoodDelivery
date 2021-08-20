var express = require('express')
var router = express.Router()
var usuario = require('../models/usuario.js')
var motorista = require('../models/motorista.js')
const mongoose = require('mongoose');
var colaPedidos = []
setInterval(checkDrivers,4000)

router.post('/pedidos',function(req,res){
    usuario.find({"id":req.body.usuarioId}).select("pedidos -_id")
    .then(val=>{
        res.send(val[0].pedidos)
    })
})

router.post('/agregarOrden',function(req,res){
    let nuevaOrden = {
        usuarioId: req.body.usuarioId,
        id: req.body.id,
        usuarioId: req.body.usuarioId,
        productoId: req.body.productoId,
        nombreProducto: req.body.nombreProducto,
        nombreEmpresa: req.body.nombreEmpresa,
        cantidad: req.body.cantidad,
        precio: req.body.precio,
        estado: req.body.estado,
        motoristaId: 0,
        nombreMotorista: '',
        place_name: req.body.place_name,
        lat: req.body.lat,
        long: req.body.lng
    }
    colaPedidos.push(nuevaOrden)
    res.json({mensaje: true})
})

router.post('/cancelarOrden',function(req,res){
    usuario.updateOne({"id":req.body.usuarioId},
        {
            $pull: {"pedidos":{
                id: req.body.id,
            }
        }
    })
    .then(val=>{
        motorista.updateOne({"pedidos.id":req.body.id},
        {
            $set: {
                "status": "free"
            }
        })
        res.send(val)
    })
})


function checkDrivers(){
    if(colaPedidos.length==0) return
    motorista.findOne({"pedidos.id":colaPedidos[0].id}).select('id firstName lastName -_id')
    .then(results=>{
        if(results==null){
            return;
        }else{
            if(colaPedidos.length==0){
                return;
            }else{
                usuario.updateOne({"id":colaPedidos[0].usuarioId},
                {
                    $push: {"pedidos":{
                        id: colaPedidos[0].id,
                        productoId: colaPedidos[0].productoId,
                        nombreProducto: colaPedidos[0].nombreProducto,
                        nombreEmpresa: colaPedidos[0].nombreEmpresa,
                        cantidad: colaPedidos[0].cantidad,
                        precio: colaPedidos[0].precio,
                        estado: "Recibido",
                        motoristaId: results.id,
                        nombreMotorista: results.firstName+" "+results.lastName,
                        place_name: colaPedidos[0].place_name,
                        lat: colaPedidos[0].lat,
                        long: colaPedidos[0].long
                    }}
                }).then(results=>{
                    colaPedidos.shift()
                })
            }
        }
    })
}

module.exports = router