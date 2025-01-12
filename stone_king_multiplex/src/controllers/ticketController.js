const fs = require("fs");

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */

module.exports.getAllShows = async (req, res) => {
  try {
    fs.readFile(
      "../stone_king_multiplex/showDetails.json",
      "utf-8",
      (err, data) => {
        if (err) {
          console.log("unable to read file", err);
          return res
            .status(404)
            .json({ success: false, message: "Data not found" });
        }
        const response = JSON.parse(data);
        // console.log("response", response);
        return res.status(200).json({ success: true, data: response });
      }
    );
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 * {"bookingId":1004,"customerName":"Nick","bookingCost":360,"showId":3004}
 */

module.exports.bookMovie = async (req, res) => {
  try {
    fs.readFile(
      "../stone_king_multiplex/movieBooking.json",
      "utf-8",
      (err, data) => {
        if (err) {
          console.log("unable to read file", err);
          return res
            .status(404)
            .json({ success: false, message: "Data not found" });
        }

        const response = JSON.parse(data);
        const bookingIdArr = response.map((e) => e.bookingId);

        if (!bookingIdArr.includes(req.body.bookingId)) {
          response.push(req.body);
        } else {
          return res
            .status(409)
            .json({ success: false, message: "Record already exists" });
        }

        // Write the updated response back to the file
        fs.writeFile(
          "../stone_king_multiplex/movieBooking.json",
          JSON.stringify(response, null, 2),
          "utf-8",
          (err) => {
            if (err) {
              console.log("unable to write file", err);
              return res
                .status(500)
                .json({ success: false, message: "Unable to save data" });
            }
            console.log("File has been written successfully");
            return res.status(200).json({ success: true, data: req.body });
          }
        );
      }
    );
  } catch (error) {
    console.error("Internal Server Error", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
