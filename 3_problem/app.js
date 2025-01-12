const fs = require("fs");

fs.readFile("./data/data.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("unable to read the file", err);
  }
  const sortedData = data
    .split(", ")
    .map((name) => name.trim())
    .sort((a, b) => b.localeCompare(a));

  fs.mkdir("./sortedData", { recursive: true }, (err) => {
    if (err) {
      console.log("unable to create directory", err);
      return;
    }
    fs.writeFile(
      "./sortedData/sortedData.txt",
      sortedData.join(", "),
      "utf-8",
      (err) => {
        if (err) {
          console.log("Error in writing to the file", err);
          return;
        }
        console.log("File has been written successfully");
      }
    );
  });
});
