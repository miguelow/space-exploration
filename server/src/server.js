const http = require('http');

require('dotenv').config();

const app = require ('./app');
const {mongoConnect} = require('./services/mongo')
const {loadPLanetsData} = require('./models/planets.model')
const {loadLaunchesData} = require('./models/launches.model')

const server = http.createServer(app);

const PORT = process.env.PORT

async function startServer(){
    await mongoConnect()
    //Load data on startup
    await loadPLanetsData()
    await loadLaunchesData()
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}

startServer()