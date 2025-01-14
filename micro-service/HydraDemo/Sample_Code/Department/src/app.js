const he=require('../node_modules/hydra-express');
const express=he.getExpress();
const api = express.Router();
const requestLogger = require('./utilities/RequestLogger')
const errorLogger = require('./utilities/ErrorLogger')
const router = require('./routes/routing');
he.init('../department-config.json',()=>{
    api.use(requestLogger)
    api.use(router)
    api.use(errorLogger)
    he.registerRoutes({'/departmentRoute':api})
})