const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

let db;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'PAISES';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Use connect method to connect to the Server
client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    db = client.db(dbName);

    client.close();
});

app.get('/', (req, res) => {
    res.send({ message: "Funciona" });
});

app.listen(port, () => {
    console.log("Servidor escuchando en ", port);
});

app.post('/paises', (req, res) => {
    console.log(req.body);
    if (!req.body) {
        return res.status(400).send({
            message: "No se puede tener un cuerpo vacio"
        });
    }

    let pais = {
        country: req.body.country,
        population: req.body.population,
        continent: req.body.continent,
        lifeExpectancy: req.body.lifeExpectancy,
        purchasingPower: req.body.purchasingPower
    }

    const collection = db.collection('pais');

    collection.insertMany([pais], (err, result) => {
        res.send(result);
    })

})

app.get('/paises', (req, res) => {
    const collection = db.collection('pais');
    collection.find({}).toArray((err, docs) => {
        res.send(docs);
    })
});

app.get('/paises/:paisId', (req, res) => {
    const collection = db.collection('pais');
    collection.find({ 'country': req.params.paisId }).toArray((err, docs) => {
        res.send(docs);
    })
});

app.put('/paises/:paisId', (req, res) => {
    const collection = db.collection('pais');
    collection.updateOne({ 'country': req.params.paisId },
        {
            $set: {
                country: req.body.country,
                population: req.body.population,
                continent: req.body.continent,
                lifeExpectancy: req.body.lifeExpectancy,
                purchasingPower: req.body.purchasingPower
            }
        }, (err, result) => {
            res.send(result);
        })
});

app.delete('/paises/:paisId', (req,res) => {
    const collection = db.collection('pais');
    collection.deleteOne({'country': req.params.paisId}, (err,result) => {
        res.send(result);
    })
})

