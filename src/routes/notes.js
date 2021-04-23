const router = require('express').Router();
var FileSaver = require('file-saver');
const Blob = require("cross-blob");
const articulo = require('../models/articulos');
const {isAuthenticated}=require('../helpers/permisos')//Funcion para darle permisos a usuario




router.get('/notes/generartxt',isAuthenticated,async(req,res)=>{

    console.log("HOLA");
    var blob = new Blob(["This is my first text."], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "C:\\Users\\andre\\Desktop\\aver.txt");
    console.log("chau");
    
    
})

router.get('/notes/nueva-nota',isAuthenticated,(req,res)=>{
    res.render('notes/nueva-nota');
})

//Crea nueva nota
router.post('/notes/nueva-nota',isAuthenticated,async(req,res) => {
    const {tipo, descripcion,cantidad} = req.body;
    const errores = [];
    if(!tipo){
        errores.push({text: 'Por favor ingrese un tipo'})
    }
    if(!descripcion){
        errores.push({text: 'Por favor ingrese una descripcion'})
    }

    if(!cantidad){
        errores.push({text: 'Por favor ingrese una cantidad'})
    }

    if(errores.length>0)
    {
        res.render('notes/nueva-nota',{
            errores,
            tipo,
            descripcion,
            cantidad

        })
    }
    else {
           const nuevoArt= new articulo({tipo,descripcion,cantidad});
           nuevoArt.usuario = req.user.id;
           await nuevoArt.save();
           req.flash('mensaje_exito','Artículo Guardado Con Éxito');
           res.redirect('/notes');
        }


});

//Se encuentran todas las notas de articulos
router.get('/notes',isAuthenticated,async(req,res)=>{
    
    const arts = await articulo.find({usuario:req.user.id}).sort({tipo:'asc'} );//sort desc ordena de mayor a menor por fecha(Del mas actual al mas antiguo) 
    
  res.render('notes/todos-articulos',{arts});
})

//Carga Vista de editar
router.get('/notes/editar/:id',isAuthenticated, async (req,res)=>{
    const art = await articulo.findById(req.params.id);
  
    res.render('notes/editar-articulo',{art});
})

//Actualiza articulos en la base de datos
router.post('/notes/editar-articulo/:id',isAuthenticated, async (req,res)=>{
    const {tipo, descripcion,cantidad} = req.body;
   await articulo.findByIdAndUpdate(req.params.id,{tipo,descripcion,cantidad});
   req.flash('mensaje_exito','Artículo Modificado Con Éxito');  
    res.redirect('/notes');
})

//Elimina Articulos en la base de datos
router.post('/notes/eliminar/:id',isAuthenticated, async (req,res)=>{


    await articulo.findByIdAndDelete(req.params.id);
    req.flash('mensaje_exito','Artículo Eliminado Con Éxito');
    res.redirect('/notes');

})

module.exports = router