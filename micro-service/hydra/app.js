const he = require("hydra-express");
const express = he.getExpress();
const api = express.Router();
const router = require("./routes/index");

// Initialize hydra-express with config
he.init("./config.json", () => {
  api.use(router);
  
  // Register routes with hydra-express
  he.registerRoutes({ "/hello": api });
}).then(() => {
  console.log("Server initialized successfully");
}).catch(err => {
  console.log("Error initializing server:", err);
});