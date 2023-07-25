const fs = require('fs');
const path = require('path'); 
const {parse} = require('csv-parse');
const mongoose = require('mongoose');

const planets = require('./planets.mongo')

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}
/*
Queremos precargar la informacion antes de que se nos haga ninguna peticion
, como estamos usando streams que nos puede dar problemas con node.

creamos una nueva promesa que se resuelve una vez tengamos la informacion cargada
*/
function loadPLanetsData(){
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler-data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', async (data) => {
                if (isHabitablePlanet(data)) {
                    savePlanet(data)
                }
            })
            .on('error', (err) => {
                console.log(err);
                reject(err)
            })
            .on('end', async () => {
                const countPlanetsFound = (await getAllPlanets()).length;
                console.log(`Planet data loaded`);
                resolve()
            });
    })
}

async function getAllPlanets() {
    //las funciones de mongo son async
    return await planets.find({}, {
        //losvalores que queremos omitir 
        '__v': 0, '_id': 0
    });
    //donde importemos esta funcion tambien tenemos que hacerla async
}

async function savePlanet(planet){
    //insert + update = upsert
    //el planeta solo se añade si no existe, y si existe, este se actualiza
    try{
        await planets.updateOne({
            keplerName: planet.kepler_name,
        }, {
            keplerName: planet.kepler_name,
        }, {
            upsert: true
        });
    }catch(err){
        console.error(`Could not save planet: ${err}`)
    }
}

module.exports = {
    loadPLanetsData,
    getAllPlanets,
}