const he = require("hydra-express");
const express = he.getExpress();
const router = express.Router();
const hydra = he.getHydra();

router.get("/birthday", (req, res, next) => {
  // we are going to send the request to the hello microservice and return the response
  const message = hydra.createUMFMessage({
    to: "helloms:[get]/hello/greeting",
    from: "wishesms",
    body: {},
  });

  hydra
    .makeAPIRequest(message)
    .then((response) => {
      console.log('response',response)
      return res.json({ msg: `Happy Birthday, ${response.msg}` });
    })
    .catch((err) => {
      return res.json({ error: err.message });
    });
});

module.exports = router;