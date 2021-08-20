var express = require('express')
var router = express.Router()
var motorista = require('../models/motorista.js')
var usuario = require('../models/usuario.js')
const mongoose = require('mongoose');
var colaPedidos = []
setInterval(checkDrivers,4000)

router.post('/ordenes',function(req,res){
    motorista.find({"id":req.body.motoristaId}).select("pedidos -_id")
    .then(val=>{
        res.send(val[0].pedidos)
    })
})

router.post('/agregarOrden',function(req,res){
    var nuevaOrden = {
        id: req.body.id,
        clienteId: req.body.clienteId,
        cliente: req.body.cliente,
        phoneCliente: req.body.phoneCliente,
        productoId: req.body.productoId,
        nombreProducto: req.body.nombreProducto,
        tipoProducto: req.body.tipoProducto,
        nombreEmpresa: req.body.nombreEmpresa,
        cantidad: req.body.cantidad,
        precio: req.body.precio,
        estado: req.body.estado,
        place_name: req.body.place_name,
        lat: req.body.lat,
        long: req.body.long
    }
    colaPedidos.push(nuevaOrden)
})

router.post('/updateStatus',function(req,res){
    if(req.body.currentStatus=="Recibido"){
        motorista.updateOne({"pedidos.id":req.body.id},
        {
            $set: {
               "pedidos.$.estado": "Comprando" 
            }
           
        })
        .then(results=>{
            usuario.updateOne({"pedidos.id":req.body.id},
            {
                $set: {
                   "pedidos.$.estado": "Comprando" 
                }
            
            })
            .then(results=>{
                res.send(results)
            })
        })
    }
    else if(req.body.currentStatus=="Comprando"){
        motorista.updateOne({"pedidos.id":req.body.id},
        {
            $set: {
               "pedidos.$.estado": "En camino" 
            }
           
        })
        .then(results=>{
            usuario.updateOne({"pedidos.id":req.body.id},
            {
                $set: {
                   "pedidos.$.estado": "En camino" 
                }
            
            })
            .then(results=>{
                res.send(results)
            })
        })
    }
    else if(req.body.currentStatus=="En camino"){
        motorista.updateOne({"pedidos.id":req.body.id},
        {
            $set: {
               "pedidos.$.estado": "En destino" 
            }
           
        })
        .then(results=>{
            usuario.updateOne({"pedidos.id":req.body.id},
            {
                $set: {
                   "pedidos.$.estado": "En destino" 
                }
            
            })
            .then(results=>{
                res.send(results)
            })
        })
    }
    else if(req.body.currentStatus=="En destino"){
        motorista.updateOne({"pedidos.id":req.body.id},
        {
            $set: {
               "pedidos.$.estado": "Completado", 
               "status": "free"
            }
        })
        .then(results=>{
            usuario.updateOne({"pedidos.id":req.body.id},
            {
                $set: {
                   "pedidos.$.estado": "Completado" 
                }
            
            })
            .then(results=>{
                res.send(results)
            })
        })
    }
})

function checkDrivers(){
    motorista.findOne({"status":"free"}).select('id -_id')
    .then(results=>{
        if(results==null){
            return;
        }else{
            if(colaPedidos.length==0){
                return;
            }else{
                motorista.updateOne({"id":results.id},
                {
                    status: "busy",
                    $push: {"pedidos":{
                        id: colaPedidos[0].id,
                        clienteId: colaPedidos[0].clienteId,
                        cliente: colaPedidos[0].cliente,
                        phoneCliente: colaPedidos[0].phoneCliente,
                        productoId: colaPedidos[0].productoId,
                        nombreProducto: colaPedidos[0].nombreProducto,
                        tipoProducto: colaPedidos[0].tipoProducto,
                        nombreEmpresa: colaPedidos[0].nombreEmpresa,
                        cantidad: colaPedidos[0].cantidad,
                        precio: colaPedidos[0].precio,
                        estado: "Recibido",
                        place_name: colaPedidos[0].place_name,
                        lat: colaPedidos[0].lat,
                        long: colaPedidos[0].long
                    }}
                })
                .then(colaPedidos.shift())
            }
        }
    })
}

module.exports = router