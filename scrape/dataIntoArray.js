//loop through all files in data folder
const fs = require("fs");
const path = require("path");
const files = fs.readdirSync(path.join(__dirname, "data"));
const data = {};
let firstRun = false;
files.forEach((file) => {
  //read the json data from file
  const json = JSON.parse(fs.readFileSync(path.join(__dirname, "data", file)));
  //loop through the json data
  if (!firstRun) {
    json.forEach((item) => {
      data[item.number] = {
        name: item.name,
        id: item.number,
        address: item.address,
        position: item.position,
        availableStations: [],
      };
    });
    firstRun = true;
  }
  console.log(file);
  // console.log(data);
  json.forEach((item) => {
    //if it is, push the item to the array
    data[item.number].availableStations.push({
      date: file,
      availableBikes: item.totalStands.availabilities.bikes,
      availableStands: item.totalStands.availabilities.stands,
    });
  });
});

//dump all data into a json file
fs.writeFileSync(path.join(__dirname, "data.json"), JSON.stringify(data));
