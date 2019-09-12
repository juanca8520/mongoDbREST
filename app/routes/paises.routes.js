module.exports = (app) => {

    const Pais = require('../models/paises.models.js');

    app.post('/paises', (req, res) => {
        if (req.body.content === null) {
            return res.status(400).send({
                message: "No puede estar vacío"
            });
        }

        const pais = new Pais({
            _id: req.body._id,
            country: req.body.country,
            population: req.body.population,
            continent: req.body.continent,
            lifeExpectancy: req.body.lifeExpectancy,
            purchasingPower: req.body.purchasingPower
        });

        pais.save()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Algo salió mal"
                });
            });

    });

    app.get('/paises', (req, res) => {
        Pais.find()
            .then(paises => {
                res.send(paises);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || 'Algo salió mal'
                });
            })
    });

    app.get('/paises/:paisId', (req, res) => {
        console.log(req.params.paisId);
        Pais.findById(req.params.paisId)
            .then(pais => {
                if (!pais) {
                    return res.status(404).send({
                        message: "País con el id " + req.params.paisId + " no encontrado"
                    });
                }
                res.send(pais);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Note not found with id " + req.params.paisId
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving note with id " + req.params.paisId
                });
            });
    });

    app.put('/paises/:paisId', (req, res) => {
        console.log(req.body);
        if (!req.body) {
            return res.status(400).send({
                message: "El contenido no puede ser vacío"
            });
        }

        Pais.findOneAndUpdate(req.params.paisId, {
            country: req.body.country,
            population: req.body.population,
            continent: req.body.continent,
            lifeExpectancy: req.body.lifeExpectancy,
            purchasingPower: req.body.purchasingPower
        }, { new: true })
            .then(note => {
                if (!note) {
                    return res.status(404).send({
                        message: "No se encontró un país con id " + req.params.paisId
                    })
                }
                res.send(note);
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "No se encontró país con el id " + req.params.paisId
                    });
                }
                return res.status(500).send({
                    message: err || "Hubo un error actualizando el país con id " + req.params.paisId
                });
            });

    })


    app.delete('/paises/:paisId', (req, res) => {
        if (!req.body) {
            return res.status(404).send({
                Message: "No se puede tener un cuerpo vacío"
            });
        }

        Pais.findOneAndRemove(req.params.paisId)
            .then(pais => {
                if (!pais) {
                    return res.status(400).send({
                        message: "No se encuentra un país con el id " + res.params.paisId
                    });
                }
                res.send({ message: "Se eliminó con éxito el país " + req.params.paisId });
            })
            .catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: "No se encontró un país con el id " + req.params.paisId
                    });
                }
                return res.status(500).send({
                    message: "Hubo un error eliminando el país con id  " + req.params.paisId
                });
            })
    });
}