const express = require('express');
const {httpGetAllPlanets} = require('./planets.controller')

const planetsRouter = express.Router();
//Definimos las rutas

planetsRouter.get('/', httpGetAllPlanets)

module.exports = planetsRouter;