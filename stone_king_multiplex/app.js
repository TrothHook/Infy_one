const express = require("express");
const ticketRouter = require("./src/routes/ticketRoute");
const app = express();

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());

app.use("/api/v1", ticketRouter);

app.listen(3000, () => {
  console.log(`Server is running at http://localhost:3000`);
});
