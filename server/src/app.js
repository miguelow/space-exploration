const express = require('express');
var cors = require('cors')
const path = require('path')
const morgan = require('morgan')

const api = require('./routes/api')

const app = express();

app.use(cors())
app.use(morgan('combined'))

app.use(express.json());
//Servimos nuestro frontend optimizado desde la carpeta public
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use(api)

module.exports = app;