let myMap;
let canvas;
const mappa = new Mappa("Leaflet");
const options = {
  lat: 46.056963,
  lng: 14.507475,
  zoom: 12,
  style: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};
function setup() {
  canvas = createCanvas(640, 640);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  fill(200, 100, 100);
  //loopš throuzgh all lines in lines


  // Only redraw the point when the map changes and not every frame.
  myMap.onChange(drawPoints);
}

function draw() {}

function drawPoints() {
  clear()
  console.log("HI")
  
  for (_lineIndex in lines) {
    let _line = lines[_lineIndex];
    let newLine = {}
    
    newLine.x1 = 46 + _line.x1 / 1000;
    newLine.x2 = 46 + _line.x2 / 1000;
    newLine.y1 = 14 + _line.y1 / 1000;
    newLine.y2 = 14 + _line.y2 / 1000;
    
    if(
      !myMap.map.getBounds().contains({lat: newLine.x1, lng: newLine.y1}) &&
      !myMap.map.getBounds().contains({lat: newLine.x2, lng: newLine.y2})
    ) continue;
    
    let x1 = myMap.latLngToPixel(newLine.x1, newLine.y1).x;
    let y1 = myMap.latLngToPixel(newLine.x1, newLine.y1).y;
    let x2 = myMap.latLngToPixel(newLine.x2, newLine.y2).x;
    let y2 = myMap.latLngToPixel(newLine.x2, newLine.y2).y;
    
    line(x1, y1, x2, y2);
  }
  
  // Draw all lines
 
}
