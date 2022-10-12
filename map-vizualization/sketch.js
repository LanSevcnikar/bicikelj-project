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

function latToLat(lat) {
  return 46 + lat / 1000;
}

function lngToLng(lng) {
  return 14 + lng / 1000;
}

//make a class called polygon with a constructor that takes in the lat and lng of the polygon
class Polygon {
  constructor(center, points) {
    this.center = center;
    this.points = points;
    //sort all points by angle
    this.points.sort(function (a, b) {
      return (
        Math.atan2(a.y - center.y, a.x - center.x) -
        Math.atan2(b.y - center.y, b.x - center.x)
      );
    });
  }
  //make a function that draws the polygon
  draw(drawPoint, drawOutline) {
    fill(0,0,0,0);
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      if(Math.floor(this.points[i].x) != 46){
        console.log(this.points[i].x);
      }
      if(Math.floor(this.points[i].y) != 14){
        console.log(this.points[i].y);
      }
      const pos = myMap.latLngToPixel(this.points[i].x, this.points[i].y);
      vertex(pos.x, pos.y);
    }
    endShape(CLOSE);
    const pos = myMap.latLngToPixel(this.center.lat, this.center.lng);
    //console.log("hi");
    //console.log(pos, this);
    //set fill and stroke
    fill(255, 0, 0);
    stroke(0);
    ellipse(pos.x, pos.y, 10);
  }
}

let polygons = [];

function setup() {
  canvas = createCanvas(640, 640);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  fill(200, 100, 100);
  allStations.forEach((station) => {
    const stationPoint = {
      lat: latToLat(station.lat),
      lng: lngToLng(station.lng),
    };

    let triangles = [];

    station.triangles.forEach((_triangle) => {
      let triangle = allTriangles.find((t) => t.id === _triangle);
      let _p1 = allStations.find((s) => s.number === triangle.p1);
      let _p2 = allStations.find((s) => s.number === triangle.p2);
      let _p3 = allStations.find((s) => s.number === triangle.p3);

      let a = _p1.lat - _p2.lat;
      let b = _p1.lng - _p2.lng;
      let c = _p1.lat - _p3.lat;
      let d = _p1.lng - _p3.lng;
      let e = a * (_p1.lat + _p2.lat) + b * (_p1.lng + _p2.lng);
      let f = c * (_p1.lat + _p3.lat) + d * (_p1.lng + _p3.lng);
      let g = 2 * (a * (_p3.lng - _p2.lng) - b * (_p3.lat - _p2.lat));
      if (Math.abs(g) < ERR) {
        return null;
      }
      let x = -(d * e - b * f) / g;
      let y = -(a * f - c * e) / g;

      let center = {
        x: latToLat(x),
        y: lngToLng(y),
      };
      let p1 = {
        x: latToLat(_p1.lat),
        y: lngToLng(_p1.lng),
      };
      let p2 = {
        x: latToLat(_p2.lat),
        y: lngToLng(_p2.lng),
      };
      let p3 = {
        x: latToLat(_p3.lat),
        y: lngToLng(_p3.lng),
      };

      //find the center of the triangle

      triangles.push(new Polygon(center, [p1, p2, p3]));
    });

    let points = [];
    triangles.forEach((triangle) => {
      points.push(triangle.center);
    });

    polygons.push(new Polygon(stationPoint, points));
  });

  myMap.onChange(drawPoints);
}

function draw() {
  //console.log("HI")
}

function drawPoints() {
  //clear everything on screen p5js
  clear();
  //set variable radious to be equal to the zoom of mappa
  radius = map(myMap.zoom(), 10, 18, 3, 20);

  // allStations.forEach((station) => {
  //   console.log(station);
  //   const pos = myMap.latLngToPixel(
  //     latToLat(station.lat),
  //     lngToLng(station.lng)
  //   );
  //   ellipse(pos.x, pos.y, radius);
  // });

  polygons[1].draw();
  console.log(polygons[1]);
}
