const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Usuario = require('../models/usuarios'); 

passport.use(new LocalStrategy({
  usernameField : 'email',
  passwordField : 'contrasena'
}, async (email, contrasena, done) => {

  
  const user = await Usuario.findOne({email: email});   // busca email del usuario

  if (!user) {
    return done(null, false, { message: 'No se encuentra el usuario.' });
  } else {
   
      const match = await user.matchPassword(contrasena); // compara contraseña ingresada con la de bdd
   
    if(match) {
      return done(null, user); 
    } else {
        
      return done(null, false, { message: 'Contraseña incorrecta.' });
    }
  }

}));

//Funciones para almacenar la informacion del usuario para que se guarde su sesion y no lo pida nuevamente hasta des-loguearse
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Usuario.findById(id, (err, user) => {
    done(err, user);
  });
});