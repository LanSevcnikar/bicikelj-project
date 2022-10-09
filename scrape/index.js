// make an api call using a simple get request http.get

const https = require("https");
const dayjs = require('dayjs');

let url =
  "https://api.jcdecaux.com/vls/v3/stations?apiKey=frifk0jbxfefqqniqez09tw4jvk37wyf823b5j1i&contract=ljubljana";

function scrapeData() {
  https
    .get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        //dump the data into a file with the date and time in it
        let fs = require("fs");     
        let date = dayjs().format('YYYY-MM-DD-HH-mm-ss').toString();
        console.log(date)

        fs.writeFile(`./data/${date}.json`, data, (err) => {
          if (err) throw err;
          console.log("The file has been saved!");
        });
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
}

//call a function every time the minutes are divisible by 5
function callEveryFiveMinutes() {
  let date = new Date();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  if (minutes % 10 === 0 && seconds === 00) {
    scrapeData();
  }
  setTimeout(callEveryFiveMinutes, 1000);
}

callEveryFiveMinutes();