const express = require("express");
const { getAllShows, bookMovie } = require("../controllers/ticketController");

const router = express.Router();

router.get("/getAllShows", getAllShows);

router.post("/bookMovie", bookMovie);

module.exports = router;
