const router = require('express').Router();
const Usuarios = require('../models/usuarios'); //Schema de Usuarios
const passport = require('passport');


router.get('/users/signin',(req,res)=>{
    res.render('users/signin');
})

router.post('/users/signin', passport.authenticate('local',{
    successRedirect:'/notes',
    failureRedirect: '/users/signin',
     failureFlash: true
}));

router.get('/users/signup',(req,res)=>{
    res.render('users/signup');
})

router.post('/users/signup',async   (req,res)=>{
    const {nombre,email,contrasena,confirm_contrasena} = req.body;
    const errores =[]; //Arreglo de errores para luego ser mostrados en alerts de boostrap
    if(nombre.length<=0){
        errores.push({text:'Por Favor Insertar Nombre'})
    }
   if(contrasena!=confirm_contrasena)
   {
        errores.push({text: 'Las Contraseñas No Coinciden'}); //Guardo el error en el arreglo
   }

   if(contrasena.length < 5){
       errores.push ({text: 'La contraseña debe tener al menos 5 caracteres'});
   }

   if(errores.length>0){
       res.render('users/signup',{errores,nombre,email,contrasena,confirm_contrasena});
   }
   else{
     const emailUsuario = await Usuarios.findOne({email: email})//Busca si ya se registro ese email
     if(emailUsuario)
     {
        req.flash('mensaje_exito','El email ya fue registrado anteriormente');
        res.redirect('/users/signup');
     }
     const usuarioNuevo = new Usuarios({nombre, email, contrasena}); //Creo un nuevo objeto Usuarios
     usuarioNuevo.contrasena = await usuarioNuevo.encryptPassword(contrasena);//encripta la contraseña
  
     await usuarioNuevo.save();//Guarda el nuevo usuario
     req.flash('mensaje_exito','Tu registro se realizó con éxito');
     res.redirect('/users/signin');
   }
    
  
})
router.get('/users/logout',(req,res)=>{
    req.logout();
     res.redirect('/');
 })
module.exports = router