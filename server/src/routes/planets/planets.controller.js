const {getAllPlanets} = require('../../models/planets.model')

async function httpGetAllPlanets(req, res){
    return res.status(200).json(await getAllPlanets())
    //returning the response is a good pattern as it prevents bugs
}

module.exports = {
    httpGetAllPlanets,
}