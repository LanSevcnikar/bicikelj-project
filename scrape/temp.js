// load JSON from file 2022-10-05-16-30-01.json and parse it
// then loop through all elements of the array and print the name of the station
//

const ERR = 0.00001;
const fs = require("fs");
const data = fs.readFileSync("./data/2022-10-05-16-30-01.json", "utf8");
const obj = JSON.parse(data);

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  //make a function that will return the distance between two points
  distanceTo(point) {
    return Math.sqrt((this.x - point.x) ** 2 + (this.y - point.y) ** 2);
  }

  //make a function that will display the point
  display() {
    fill(0);
    ellipse(this.x, this.y, 5, 5);
  }
}

class Point2 {
  constructor(s, x, y) {
    this.s = s;
    this.x = x;
    this.y = y;
  }

  //make a function that will return the distance between two points
  distanceTo(point) {
    return Math.sqrt((this.x - point.x) ** 2 + (this.y - point.y) ** 2);
  }

  //make a function that will display the point
  display() {
    fill(0);
    ellipse(this.x, this.y, 5, 5);
  }
}

class Edge {
  constructor(point1, point2) {
    this.p1 = point1;
    this.p2 = point2;
  }

  display() {
    stroke(0);
    line(this.point1.x, this.point1.y, this.point2.x, this.point2.y);
  }
}

//make a class called triangle that is made out of 3 points
class Triangle {
  constructor(p1, p2, p3) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;

    //find the point that is the center of the circle that is the circumcircle of the triangle
    let a = p1.x - p2.x;
    let b = p1.y - p2.y;
    let c = p1.x - p3.x;
    let d = p1.y - p3.y;
    let e = a * (p1.x + p2.x) + b * (p1.y + p2.y);
    let f = c * (p1.x + p3.x) + d * (p1.y + p3.y);
    let g = 2 * (a * (p3.y - p2.y) - b * (p3.x - p2.x));
    if (Math.abs(g) < ERR) {
      return null;
    }
    let x = -(d * e - b * f) / g;
    let y = -(a * f - c * e) / g;
    this.center = new Point(x, y);
    this.radius = this.center.distanceTo(p1);
    console.log(this)
  }

  //make a function that will display the triangle
  display() {
    fill(0, 0, 0, 0);
    triangle(this.p1.x, this.p1.y, this.p2.x, this.p2.y, this.p3.x, this.p3.y);
    fill(255, 0, 0, 0);
    //  ellipse(this.center.x, this.center.y, 5);
  }
}

function sign(p1, p2, p3) {
  return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
}

function isPointInsideTriangle(p, t) {
  let p1 = t.p1;
  let p2 = t.p2;
  let p3 = t.p3;

  let d1, d2, d3;
  let has_neg, has_pos;

  d1 = sign(p, p1, p2);
  d2 = sign(p, p2, p3);
  d3 = sign(p, p3, p1);

  has_neg = d1 < 0 || d2 < 0 || d3 < 0;
  has_pos = d1 > 0 || d2 > 0 || d3 > 0;

  return !(has_neg && has_pos);
}

function isPointInsideTriangleCircle(p, t) {
  console.log(p, t, typeof p, typeof t);
  return Math.pow(p.x - t.center.x, 2) + Math.pow(p.y - t.center.y, 2) < Math.pow(t.radius, 2);
}

function isSameEdge(e1, e2) {
  if (
    Math.abs(e1.p1.x - e2.p1.x) < ERR &&
    Math.abs(e1.p1.y - e2.p1.y) < ERR &&
    Math.abs(e1.p2.x - e2.p2.x) < ERR &&
    Math.abs(e1.p2.y - e2.p2.y) < ERR
  ) {
    return true;
  }
  if (
    Math.abs(e1.p1.x - e2.p2.x) < ERR &&
    Math.abs(e1.p1.y - e2.p2.y) < ERR &&
    Math.abs(e1.p2.x - e2.p1.x) < ERR &&
    Math.abs(e1.p2.y - e2.p1.y) < ERR
  ) {
    return true;
  }
  return false;
}

function areTrianglesNeighbouring(t1, t2) {
  let edges = [];
  edges.push(new Edge(t1.p1, t1.p2));
  edges.push(new Edge(t1.p2, t1.p3));
  edges.push(new Edge(t1.p3, t1.p1));

  for (let i = 0; i < edges.length; i++) {
    if (
      isSameEdge(edges[i], new Edge(t2.p1, t2.p2)) ||
      isSameEdge(edges[i], new Edge(t2.p2, t2.p3)) ||
      isSameEdge(edges[i], new Edge(t2.p3, t2.p1))
    ) {
      return true;
    }
  }
  return false;
}

function addPoint(p) {
  let badTriangles = [];
  let polygon = [];

  //find all the triangles that are no longer valid due to the new point
  for (let i = 0; i < triangles.length; i++) {
    if (isPointInsideTriangleCircle(p, triangles[i])) {
      badTriangles.push(triangles[i]);
    }
  }


  //find the boundary of the polygonal hole
  for (let i = 0; i < badTriangles.length; i++) {
    let t = badTriangles[i];
    let e1 = new Edge(t.p1, t.p2);
    let e2 = new Edge(t.p2, t.p3);
    let e3 = new Edge(t.p3, t.p1);

    let e1Shared = false;
    let e2Shared = false;
    let e3Shared = false;

    for (let j = 0; j < badTriangles.length; j++) {
      if (i == j) continue;
      t2 = badTriangles[j];
      let _e1 = new Edge(t2.p1, t2.p2);
      let _e2 = new Edge(t2.p2, t2.p3);
      let _e3 = new Edge(t2.p3, t2.p1);

      if (!e1Shared && isSameEdge(e1, _e1)) e1Shared = true;
      if (!e1Shared && isSameEdge(e1, _e2)) e1Shared = true;
      if (!e1Shared && isSameEdge(e1, _e3)) e1Shared = true;

      if (!e2Shared && isSameEdge(e2, _e1)) e2Shared = true;
      if (!e2Shared && isSameEdge(e2, _e2)) e2Shared = true;
      if (!e2Shared && isSameEdge(e2, _e3)) e2Shared = true;

      if (!e3Shared && isSameEdge(e3, _e1)) e3Shared = true;
      if (!e3Shared && isSameEdge(e3, _e2)) e3Shared = true;
      if (!e3Shared && isSameEdge(e3, _e3)) e3Shared = true;
    }

    if (!e1Shared) polygon.push(e1);
    if (!e2Shared) polygon.push(e2);
    if (!e3Shared) polygon.push(e3);
  }
  //remove bad triangles from triangulation
  for (let j = 0; j < badTriangles.length; j++) {
    for (let k = 0; k < triangles.length; k++) {
      if (triangles[k] == badTriangles[j]) {
        triangles.splice(k, 1);
        k--;
      }
    }
  }

  //loop through the sides of the polygon and make new triangles
  for (let j = 0; j < polygon.length; j++) {
    triangles.push(new Triangle(polygon[j].p1, polygon[j].p2, p));
  }
}

//make class polygon
class Polygon {
  constructor(name, id, center, points) {
    this.name = name;
    this.id = id;
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
}

let triangles = [
  new Triangle(
    new Point(obj[0].position.latitude, obj[0].position.longitude),
    new Point(obj[1].position.latitude, obj[1].position.longitude),
    new Point(obj[2].position.latitude, obj[2].position.longitude)
  ),
];

let points = [];

for (let i = 0; i < obj.length; i++) {
    let lat = obj[i].position.latitude;
    let lng = obj[i].position.longitude;
    points.push(new Point(lat, lng));
}

for (let i = 3; i < points.length; i++) {
    addPoint(points[i]);
}

// console.log(triangles);

//make array of polygons
let polygons = [];

// for (let i = 0; i < obj.length; i++) {
//     let name = obj[i].name;
//     let id = obj[i].number;
//     let lat = obj[i].position.latitude;
//     let lng = obj[i].position.longitude;
//   let center = {
//     lat: lat,
//     lng: lng,
//   };

//   console.log(`{name: "${name}", number: ${id}, lat: ${lat}, lng: ${lng}}`);
// }

// console.log("Getting the data");
