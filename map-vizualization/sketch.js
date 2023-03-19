// make a vue app and attach it to the app element
const { createApp } = Vue;
let app = createApp({
  data() {
    return {
      showPoints: true,
      showAreas: true,
      showLines: true,
      date: "2022-10-13",
      hour: "18:00",
    };
  },
  methods: {
    updateMap() {},
  },
});
app.mount("#app");

let myMap;
let canvas;
const mappa = new Mappa("Leaflet");
const ERR = 0.0000001;

const options = {
  lat: 46.056963,
  lng: 14.507475,
  zoom: 12,
  style: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

//function to calc dist between any two points
function distBetweenPointsBiased(p1, p2) {
  return Math.sqrt(2.6 * Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

class Station {
  constructor(name, lat, lng, address, id) {
    this.name = name;
    this.lat = lat;
    this.lng = lng;
    this.address = address;
    this.id = id;
  }

  draw() {
    const pos = myMap.latLngToPixel(this.lat, this.lng);
    fill(255, 0, 0);
    ellipse(pos.x, pos.y, 10, 10);
  }
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

//vector cross product function
function crossProduct(v1, v2) {
  return v1.x * v2.y - v1.y * v2.x;
}

//make a function that checks if a point is inside a convex polygon
function isInsidePolygon(point, polygon) {
  let x = 46.056219;
  let y = 14.532001;
  let newPoint = new Point(x, y);
  let somePoint = { x: point.lat, y: point.lng };
  //console.log(somePoint, newPoint)
  if (distBetweenPointsBiased(somePoint, newPoint) > 0.1) {
    return false;
  }

  //loop through all edges of the polygon
  for (let i = 0; i < polygon.length; i++) {
    let p1 = polygon[i];
    let p2 = polygon[(i + 1) % polygon.length];
    let v1 = new Point(p2.x - p1.x, p2.y - p1.y);
    let v2 = new Point(somePoint.x - p1.x, somePoint.y - p1.y);
    //console.log(v1, v2, somePoint);
    if (crossProduct(v1, v2) <= 0) {
      return false;
    }
  }
  return true;
}

class StationPolygon {
  constructor(station, points) {
    this.station = station;
    this.points = points;
    this.isHoverOver = false;
  }

  isMouseInsideOfPolygon() {
    //get the mouse position
    const mousePos = myMap.pixelToLatLng(mouseX, mouseY);
    //check if the mouse is inside the polygon
    //console.log(this.points)
    this.isHoverOver = isInsidePolygon(mousePos, this.points);
  }

  //create a draw function, taking three arguments called, showPoint, showShape, showColor
  draw(showPoint, showShape, showColor) {
    //if showPoint is true, draw the points
    if (showPoint) {
      this.station.draw();
    }
    //if showShape is true, draw the shape
    if (showShape) {
      this.drawShape(showColor);
    }
  }

  drawShape(showColor) {
    //if showColor is true, fill the shape with a color
    if (showColor) {
      if (this.isHoverOver) {
        fill(255, 0, 0);
      } else {
        fill(255, 0, 0, 100);
      }
    } else {
      fill(0);
    }
    //draw the shape
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      const pos = myMap.latLngToPixel(this.points[i].x, this.points[i].y);
      vertex(pos.x, pos.y);
    }
    endShape(CLOSE);
  }
}

let stations = [];

function setup() {
  canvas = createCanvas(windowWidth, windowHeight - 80);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  fill(200, 100, 100);

  Data.forEach((stationPolygon) => {
    let station = new Station(
      stationPolygon.station.s,
      stationPolygon.station.x,
      stationPolygon.station.y,
      stationPolygon.station.address,
      stationPolygon.station.number
    );
    let points = [];
    stationPolygon.points.forEach((point) => {
      points.push(new Point(point.x, point.y));
    });
    stations.push(new StationPolygon(station, points));
  });

  myMap.onChange(drawPoints);
}

function draw() {
  clear();
  radius = map(myMap.zoom(), 10, 18, 3, 20);
  for (let i = 0; i < stations.length; i++) {
    stations[i].draw(true, true, true);
    stations[i].isMouseInsideOfPolygon();
  }
  erase();
  let nc = 16;
  for (let i = 0; i < nc; i++) {
    let x = 46.056219;
    let y = 14.532001;
    let xr = 0.06;
    let yr = 0.1;
    beginShape();
    let pos = myMap.latLngToPixel(
      x + xr * Math.sin((i * 2 * Math.PI) / nc),
      y + yr * Math.cos((i * 2 * Math.PI) / nc)
    );
    vertex(pos.x, pos.y);
    pos = myMap.latLngToPixel(
      x + 1.5 * Math.sin((i * 2 * Math.PI) / nc),
      y + 1.5 * Math.cos((i * 2 * Math.PI) / nc)
    );
    vertex(pos.x, pos.y);
    pos = myMap.latLngToPixel(
      x + 1.5 * Math.sin(((i + 1) * 2 * Math.PI) / nc),
      y + 1.5 * Math.cos(((i + 1) * 2 * Math.PI) / nc)
    );
    vertex(pos.x, pos.y);
    pos = myMap.latLngToPixel(
      x + xr * Math.sin(((i + 1) * 2 * Math.PI) / nc),
      y + yr * Math.cos(((i + 1) * 2 * Math.PI) / nc)
    );
    vertex(pos.x, pos.y);
    endShape();
  }
  noErase();
}

function drawPoints() {
  for (let i = 0; i < stations.length; i++) {}
}
