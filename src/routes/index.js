const router = require('express').Router();

router.get('/',(req,res)=>{
    res.render('index');//Recibe index.hbs de la carpeta 'Partials'
})


router.get('/about',(req,res)=>{
    res.render('about');//Recibe about    .hbs de la carpeta 'Partials'
})


module.exports = router;