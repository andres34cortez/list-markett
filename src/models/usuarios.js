// const mongoose = require('mongoose');
// const {Schema} = mongoose;

// const bcrypt = require('bcryptjs'); // Modulo para encriptar contraseñas

// const UsuariosSchema =new Schema({
//     nombre:{type: String, required: true},
//     email:{type: String, required: true},
//     contrasena:{type: String, required: true},
//     date: {type:Date,default:Date.now}
// })

// //Metodo mara encriptar contraseñas
// UsuariosSchema.methods.encryptPass = async (contrasena)=>{
//    const salt = await bcrypt.genSalt(10);
//    const hash = await bcrypt.hash(contrasena,salt);
//    console.log(hash);
//    return hash;
// }

// //Metodo para comparar contraseña ingresada por el usuario con una ya almacenada y cifrada
// UsuariosSchema.methods.comparaPass = async function(contrasena){
//     return await bcrypt.compare(contrasena, this.contrasena);
// }


// module.exports = mongoose.model('Usuarios',UsuariosSchema);


  
const mongoose = require('mongoose');
const { Schema } = mongoose;

const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  contrasena: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

UserSchema.methods.encryptPassword = async (contrasena) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(contrasena, salt);
  return hash;
};

UserSchema.methods.matchPassword = async function (contrasena) {
  return await bcrypt.compare(contrasena, this.contrasena);
};

module.exports = mongoose.model('Usuario', UserSchema);