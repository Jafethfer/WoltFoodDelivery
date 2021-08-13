var mongoose = require('mongoose')

var pedidoSchema = new mongoose.Schema({
    id: String,
    clienteId: Number,
    cliente: String,
    phoneCliente: String,
    productoId: String,
    nombreProducto: String,
    tipoProducto: String,
    nombreEmpresa: String,
    cantidad: Number,
    precio: Number,
    estado: String,
    place_name: String,
    lat: String,
    long: String
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