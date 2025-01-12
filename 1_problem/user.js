const fs = require("fs");

let logUser = (username) => {
  fs.readFile("./names.txt", "utf-8", (err, data) => {
    if (err) {
      console.log("unable to  read the file", err);
      return;
    }
    const userNamesArr = data
      .split(", ")
      .map((username) => username.trim().toLowerCase());

    console.log(userNamesArr);

    if (userNamesArr.includes(username.toLowerCase())) {
      console.log(`${username} already exists.`);
    } else {
      console.log(`${username} is not in the list`);

      fs.appendFile("./names.txt", `, ${username}`, (err) => {
        if (err) {
          console.log("Unable to update the file", err);
        } else {
          console.log(`${username} has been added successfully`);
        }
      });
    }
  });
};

logUser("Oliver");
