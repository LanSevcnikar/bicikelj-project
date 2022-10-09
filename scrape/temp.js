// load JSON from file 2022-10-05-16-30-01.json and parse it
// then loop through all elements of the array and print the name of the station
//
const fs = require('fs');
const data = fs.readFileSync('./data/2022-10-05-16-30-01.json', 'utf8');
const obj = JSON.parse(data);
for (let i = 0; i < obj.length; i++) {
    let name = obj[i].name;
    let lat = ((obj[i].position.latitude - 46) * 1000).toFixed(4);
    let lng = ((obj[i].position.longitude - 14) * 1000).toFixed(4);
    console.log(`"${name}", ${lat}, ${lng}`);
}
