const mongoose = require('mongoose');
const {Schema} = mongoose;


const articuloSchema =new Schema({
    tipo:{type: String, required: true},
    descripcion:{type: String, required: true},
    cantidad:{type: String, required: true},
    date: {type:Date,default:Date.now},
    usuario: {type: String} //id del usuario que creo la nota
})

module.exports = mongoose.model('articulo',articuloSchema);