const he = require("hydra-express");
const express = he.getExpress();
const router = express.Router();

router.get("/greeting", (req, res, next) => {
  res.json({ msg: "hello world" });
});

module.exports = router;