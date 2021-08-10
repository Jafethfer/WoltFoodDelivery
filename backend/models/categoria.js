var mongoose = require('mongoose')

var productoSchema = new mongoose.Schema({
    id: String,
    nombreProducto: String,
    precio: Number
})

var empresaSchema = new mongoose.Schema({
    id: String,
    nombreEmpresa: String,
    banner: String,
    productos: [productoSchema]
})

var categoriaSchema = new mongoose.Schema({
    id: String,
    nombreCategoria: String,
    descripcion: String,
    imagen: String,
    font: String,
    shadow: String,
    empresas: [empresaSchema]
})

module.exports = mongoose.model('categorias',categoriaSchema)