var express = require('express')
var router = express.Router()
var administrador = require('../models/administrador')
var motorista = require('../models/motorista.js')
var usuario = require('../models/usuario.js')
const mongoose = require('mongoose');
const categoria = require('../models/categoria')

router.get('/pieChart',function(req,res){
    var data = {}
    motorista.find({"pedidos.tipoProducto":"Farmacias"}).count()
    .then(Farmacias=>{
        motorista.find({"pedidos.tipoProducto":"Restaurantes"}).count()
        .then(Restaurantes=>{
            motorista.find({"pedidos.tipoProducto":"Mascotas"}).count()
            .then(Mascotas=>{
                motorista.find({"pedidos.tipoProducto":"Bebidas"}).count()
                .then(Bebidas=>{
                    data.Farmacias = Farmacias
                    data.Restaurantes = Restaurantes
                    data.Mascotas = Mascotas
                    data.Bebidas = Bebidas
                    res.send(data)
                })
            })
        })
    })
})

router.get('/barChart',function(req,res){
    var motoristas = []
    var datos = []
    motorista.find({},"firstName pedidos._id -_id")
    .then(results=>{
        for(let i in results){
            motoristas.push(results[i].firstName)
            datos.push(results[i].pedidos.length)
        }
        res.json({motoristaDatos: motoristas, pedidosDatos: datos})
    })
})

router.post('/hireEmployee',function(req,res){
    motorista.find({},"id")
    .then(results=>{
        if(results.length!=0){
            let newId = parseInt(results[results.length-1].id) + 1 
            var newMotorista = new motorista({
                id: newId,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
                email: req.body.email,
                password: req.body.password,
                imagen: "../assets/img/motoristas/avatar.png",
                role: 'Motorista',
                status: 'free',
                pedidos: []
            })
            newMotorista.save(function(err,motorista){
                if (err) res.send(false)
                res.send(true)
            })
        }else{
            var newMotorista = new motorista({
                id: 1,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
                email: req.body.email,
                password: req.body.password,
                imagen: "../assets/img/motoristas/avatar.png",
                role: 'Motorista',
                status: 'free',
                pedidos: []
            })
            newMotorista.save(function(err,motorista){
                if (err) res.send(false)
                res.send(true)
            })
        }
    })
    
})

router.post('/agregarCategoria',function(req,res){
    categoria.find({},"id")
    .then(results=>{
        var newId = parseInt(results[results.length-1].id) + 1
        var newCategory = new categoria({
            id: newId,
            nombreCategoria: req.body.nombreCategoria,
            descripcion: req.body.descripcion,
            font: req.body.font,
            shadow: "1px 1px "+req.body.shadow,
            imagen: '../assets/img/cards/new-card.png',
            empresas: []
        })
        newCategory.save(function(err,doc){
            if(err) res.send(false)
            res.send(true)
        })
    })
})

router.get('/categorias',function(req,res){
    categoria.find({},"id nombreCategoria imagen font shadow descripcion")
    .then(results=>{
        res.send(results)
    })
})

router.get('/empresas',function(req,res){
    categoria.find({},"id empresas.id empresas.nombreEmpresa empresas.banner -_id")
    .then(results=>{
        res.send(results)
    })
})

router.post('/agregarEmpresa',function(req,res){
    try{
        getNewEmpresaId(req.body.nombreCategoria)
        .then(value=>{
            categoria.updateOne({"nombreCategoria": req.body.nombreCategoria},
            {
                $push: {
                    "empresas":{
                        id: req.body.nombreCategoria+"-"+value,
                        nombreEmpresa: req.body.nombreEmpresa,
                        banner: "../assets/img/empresas/banner.jpg",
                        productos: []
                    }
                }
            })
            .then(results=>{
                res.send(results)
            })
        })
    }catch(e){
        console.log(e)
    }
    
})

function getNewEmpresaId(nombreCategoria){
    return new Promise(function(reject,resolve){
        categoria.findOne({"nombreCategoria":nombreCategoria},"empresas -_id")
        .then(results=>{
            if(results.length==0){
                resolve(1)
            }else{
                let lastId = results.empresas[results.empresas.length-1].id
                let newId = parseInt(lastId.charAt(lastId.length-1))+1
                resolve(newId)
            }
        })
    })
}

router.post('/fireEmployee',function(req,res){
    motorista.deleteOne({"id":req.body.motoristaId})
    .then(results=>{
        res.send(results)
    })
})

router.get('/motoristas',function(req,res){
    motorista.find({},"id firstName lastName phone email status imagen")
    .then(results=>{
        res.send(results)
    })
})

router.post('/fireEmployee',function(req,res){
    motorista.deleteOne()
})

module.exports = router