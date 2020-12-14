const express = require('express');
const Caster = require('./models/casters');
const app = express();

app.use(express.json());

//endpoints

app.post('/api/v1/casters', (req, res, next) => {
  Caster
    .insert(req.body)
    .then(caster => res.send(caster))
    .catch(next);
});

app.get('/api/v1/casters/:id', (req, res, next) => {
  Caster
    .findById(req.params.id)
    .then(caster => res.send(caster))
    .catch(next);
});

app.get('/api/v1/casters', (req, res, next) => {
  Caster
    .find()
    .then(caster => res.send(caster))
    .catch(next);
});

app.put('/api/v1/casters/:id', (req, res, next) => {
  Caster
    .update(req.params.id, req.body)
    .then(caster => res.send(caster))
    .catch(next);
});

app.delete('/api/v1/casters/:id', (req, res, next) => {
  Caster
    .delete(req.params.id)
    .then(caster => res.send(caster))
    .catch(next);
});

module.exports = app;
