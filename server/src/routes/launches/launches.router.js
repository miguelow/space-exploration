const express = require('express');
const {
    httpGetAllLaunches,
    httpGetLaunchByFlightNumber,
    httpAddNewLaunch,
    httpAbortLaunch
} = require('./launches.controller')

const launchesRouter = express.Router();
//Definimos las rutas

launchesRouter.get('/', httpGetAllLaunches)
launchesRouter.get('/:id', httpGetLaunchByFlightNumber)
launchesRouter.post('/', httpAddNewLaunch)
launchesRouter.delete('/:id', httpAbortLaunch)

module.exports = launchesRouter;