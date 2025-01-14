const he=require('hydra-express');
const express=he.getExpress();
const api = express.Router();
const bodyParser=require('body-parser'); 
const requestLogger = require('./utilities/RequestLogger');
const errorLogger = require('./utilities/ErrorLogger');
const router = require('./routes/routing');
he.init('../Employee-config.json',()=>{
        api.use(bodyParser.json())
        api.use(requestLogger)
        api.use(router)
        api.use(errorLogger)
        he.registerRoutes({'/employee':api})
})
