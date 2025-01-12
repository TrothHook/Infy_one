const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

app.get("/api/v1/getAll", (req, res) => {
  try {
    fs.readFile("./games.txt", "utf-8", (err, data) => {
      if (err) {
        console.log("unable to read from games.txt", err);
        return;
      }
      return res.status(200).json({ success: true, data });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

app.get("/api/v1/params/:year?", (req, res) => {
  try {
    const year = req.params.year || undefined;
    if (!year) {
      return res.status(400).json({ success: false, message: `Bad Request` });
    }
    return res.status(200).json({
      success: true,
      data: { text: `Filter By Year ${year} was applied` },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

app.get("/api/v1/query", (req, res) => {
  try {
    const name = req.query.name || undefined;
    if (!name) {
      return res.status(400).json({ success: false, message: `Bad Request` });
    }
    return res.status(200).json({
      success: true,
      data: { text: `Filter By Name ${name} was applied` },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log(`Server is running at http://localhost:3000`);
});
