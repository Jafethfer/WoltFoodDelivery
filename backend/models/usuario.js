var mongoose = require('mongoose')

var ordenSchema = new mongoose.Schema({
    id: String,
    productoId: String,
    nombreProducto: String,
    nombreEmpresa: String,
    cantidad: Number,
    precio: Number,
    estado: String,
    motoristaId: Number,
    nombreMotorista: String,
    place_name: String,
    lat: String,
    long: String
})

var usuarioSchema = new mongoose.Schema({
    id: Number,
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    password: String,
    role: String,
    pedidos: [ordenSchema]
})

module.exports = mongoose.model('usuarios',usuarioSchema)