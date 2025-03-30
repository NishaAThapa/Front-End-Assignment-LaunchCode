const express = require("express");
const _ = require("lodash");
const router = express.Router();
const json = require("./files/user-behavior-data.json");

router.get("/data/search", (req, res) => {
  /*
    Valid Query String Parameters
    - operatingSystem
    - deviceModel
    - gender
    - behaviorClass
  */

  const { filterType, keyword } = req.query;
  let searchType = "unfiltered";

  if (filterType) {
    const lower_case = filterType.toLowerCase();
    searchType =
      lower_case === "model"
        ? "m"
        : lower_case === "gender"
        ? "g"
        : lower_case === "operatingsystem"
        ? "op"
        : lower_case === "behaviorclass"
        ? "bc"
        : "unfiltered";
  }

  if (searchType === "unfiltered" || !keyword) {
    return res.send(json); // Return all records if no filter or keyword provided
  } else {
    const filteredData = _.filter(json, (record) => {
      let include = false;
      const lower_keyword = keyword.toLowerCase();
      switch (searchType) {
        case "m":
          include =
            record["Device Model"].toLowerCase().includes(lower_keyword);
          break;
        case "g":
          include = record["Gender"].toLowerCase() === lower_keyword;
          break;
        case "op":
          include =
            record["Operating System"].toLowerCase().includes(lower_keyword);
          break;
        case "bc":
          include = record["User Behavior Class"] === lower_keyword;
          break;
        default:
          return false;
      }

      return include;
    });

    return res.send(filteredData);
  }
});

module.exports = router;
