var mongoose = require('mongoose')

var pedidoSchema = new mongoose.Schema({
    id: String,
    clienteId: Number,
    cliente: String,
    productoId: String,
    nombreProducto: String,
    cantidad: Number,
    precio: Number,
    estado: String,
})

var motoristaSchema = new mongoose.Schema({
    id: Number,
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    password: String,
    role: String,
    pedidos: [pedidoSchema]
})

module.exports = mongoose.model('motoristas',motoristaSchema)