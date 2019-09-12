const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

const dbConfig = require('./config/config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.set('useFindAndModify', false);

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(()=>{
    console.log('Me conecté a la base de datos');
}).catch(err => {
    console.log('Hubo un error', err);
    process.exit();
})

app.get('/', (req, res) => {
    res.json({"message":"Hola"});
});

require('./app/routes/paises.routes.js')(app);

app.listen(3000, ()=>{
    console.log("Servidor escuchando en 3000");
});