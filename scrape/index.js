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

//push the data to git
function pushToGit() {
  const { exec } = require("child_process");
  exec("git add .", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
  exec("git commit -m 'data'", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
  exec("git push", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
  //push data to github
  exec("git push", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

//call a function every time the minutes are divisible by 5
function callEveryFiveMinutes() {
  let date = new Date();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  if (minutes % 5 === 0 && seconds === 00) {
    scrapeData();
    pushToGit();
  }
  setTimeout(callEveryFiveMinutes, 1000);
}

callEveryFiveMinutes();