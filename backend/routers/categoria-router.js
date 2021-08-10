var express = require('express')
var router = express.Router()
var categoria = require('../models/categoria.js')
const mongoose = require('mongoose');

router.get('/all',function(req,res){
    categoria.find({})
    .then(val=>{
        res.send(val)
    })
})

router.post('/agregarCategoria', function(req,res){
    var newCategoria = new categoria({
        nombreCategoria: req.body.nombreCategoria,
        descripcion: req.body.descripcion,
        color: req.body.color,
        icono: '../assets/images/'+req.body.icono,
        empresas: []
    })
    newCategoria.save(function(err){
        if(err) res.send(err)
    })

})

module.exports = router