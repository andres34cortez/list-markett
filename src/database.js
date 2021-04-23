const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/listado-de-compras',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(db=> console.log('Db esta conectado'))
.catch(err=> console.log(err));