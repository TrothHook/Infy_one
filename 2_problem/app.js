const fs = require("fs");
const http = require("http");

const readFromFile = (res) => {
  fs.readFile("./docs/display.txt", "utf-8", (err, data) => {
    if (err) {
      res.writeHead(500, { "content-type": "text/plain" });
      res.end("Error reading file.\n");
      return;
    }
    res.writeHead(200, { "content-type": "text/plain" });
    res.end(data);
  });
};

http
  .createServer((req, res) => {
    readFromFile(res);
  })
  .listen(2080, () => {
    console.log("server is running at http://localhost:2080");
  });
