const {
  getAllLaunches, 
  getLaunchByFlightNumber,
  scheduleNewLaunch, 
  existsLaunchWithId, 
  abortLaunchById
} = require('../../models/launches.model')

const {
  getPagination
} = require('../../services/query')

//Al usar la nomenclatura http... sabemos que esa funcion devuelve una response
async function httpGetAllLaunches(req, res){
  const { skip, limit } = getPagination(req.query)

  const launches = await getAllLaunches(skip, limit)

  return res.status(200).json(launches)
}

async function httpGetLaunchByFlightNumber(req, res){
  const launchId = Number(req.params.id);
  
    const existsLaunch = await existsLaunchWithId(launchId);
    if (!existsLaunch) {
      return res.status(404).json({
        error: 'Launch not found',
      });
    }
    
    const launch = await getLaunchByFlightNumber(launchId)
    return res.status(200).json(launch)
}

async function httpAddNewLaunch(req, res){
  const launch = req.body

  //validamos los campos y la fecha
  if(!launch.launchDate || !launch.rocket || !launch.mission || !launch.target){
      return res.status(400).json({error: 'All fields are required'})
  }
  launch.launchDate = new Date(launch.launchDate)
  if(isNaN(launch.launchDate)){
      //isNan devuelve false si es una fecha valida
      return res.status(400).json({error: 'Invalid launch date format'})
  }

  await scheduleNewLaunch(launch)
  return res.status(201).json(launch)
  //return so we only set the response once per controller function
}

async function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);
  
    const existsLaunch = await existsLaunchWithId(launchId);
    if (!existsLaunch) {
      return res.status(404).json({
        error: 'Launch not found',
      });
    }
  
    const aborted = await abortLaunchById(launchId);
    if (!aborted) {
      return res.status(400).json({
        error: 'Launch not aborted',
      });
    }
  
    return res.status(200).json({
      ok: true,
    });
  }

module.exports = {
    httpGetAllLaunches,
    httpGetLaunchByFlightNumber,
    httpAddNewLaunch,
    httpAbortLaunch,
}