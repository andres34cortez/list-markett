var express = require('express');
const path = require('path');
const exphbs = require ('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const body_parser = require('body-parser');
//Inicializaciones
const app = express();
require('./database');
require('./config/passport');



//Configuraciones
app.set('port',process.env.PORT || 2020);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    defaultLayout: 'main',
    LayoutsDir : path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname:'.hbs'
}));
app.set('view engine','.hbs');


//Middlewares
//app.use(body_parser);

app.use (express.urlencoded({extended:false}));//Datos de formulario


app.use(require('cookie-parser')());
app.use(body_parser.urlencoded({ extended: true }));
app.use(session({
    secret: 'grupo',
    resave : true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(flash());


//Variables Globales
app.use((req,res,next)=>{
    res.locals.mensaje_exito = req.flash('mensaje_exito');
    res.locals.mensaje_error = req.flash('mensaje_error');
    res.locals.error = req.flash('error');
    res.locals.USUARIO = req.user|| null;
    next();
})
//Rutas --Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));
//Archivos estaticos -- static Files
app.use(express.static(path.join(__dirname, 'asset')))
//Servidor conectado
app.listen(app.get('port'),()=>{
    console.log('server on port',app.get('port'));
});

