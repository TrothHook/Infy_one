const he = require("hydra-express");
const express = he.getExpress();
const router = express.Router();
const hydra = he.getHydra();

router.get("/greeting", (req, res, next) => {
  res.json({ msg: "hello world" + hydra.getInstanceID() });
});

module.exports = router;
