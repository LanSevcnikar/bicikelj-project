//create a p5 project that displays a circle on a canvas the size of the window
//the circle should be centered on the canvas

let windowHeight = window.innerHeight - 40;
let windowWidth = window.innerWidth;

const ERR = 0.00001;

//make a class called point, that will have an x and y coordinate
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
  console.log(p, t);
  return pow(p.x - t.center.x, 2) + pow(p.y - t.center.y, 2) < pow(t.radius, 2);
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

  console.log("Adding point", triangles, badTriangles);

  //find the boundary of the polygonal hole
  for (let i = 0; i < badTriangles.length; i++) {
    let t = badTriangles[i];
    let e1 = new Edge(t.p1, t.p2);
    let e2 = new Edge(t.p2, t.p3);
    let e3 = new Edge(t.p3, t.p1);
    console.log("Something, e1, e2, e32", e1, e2, e3);

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

    console.log(e1, e2, e3);
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
  console.log(polygon);

  //loop through the sides of the polygon and make new triangles
  for (let j = 0; j < polygon.length; j++) {
    console.log(polygon[j].p1, polygon[j].p2, p);
    triangles.push(new Triangle(polygon[j].p1, polygon[j].p2, p));
  }
}

//make an equilateral triangle
let points = [
  new Point(windowWidth / 2, windowHeight / 2 - windowHeight / 2.5),
  new Point(
    windowWidth / 2 - windowHeight / 2,
    windowHeight / 2 + windowHeight / 2.5
  ),
  new Point(
    windowWidth / 2 + windowHeight / 2,
    windowHeight / 2 + windowHeight / 2.5
  ),
];

let triangles = [new Triangle(points[0], points[1], points[2])];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function displayVoronoi() {
  for (let i = 0; i < triangles.length; i++) {
    let t1 = triangles[i];
    for (let j = 0; j < triangles.length; j++) {
      if (i == j) continue;
      let t2 = triangles[j];
      if (areTrianglesNeighbouring(t1, t2)) {
        line(t1.center.x, t1.center.y, t2.center.x, t2.center.y);
      }
    }
  }
}

function loadExample() {
  strokeWeight(1);
  points = [];
  triangles = [];
  points.push(new Point2("KAMNIK", 180, 450));
  points.push(new Point2("VISNJA GORA", -20, 350));
  points.push(new Point2("PODLIPA", 40, 800));
  //loop through the points
  for (var i = 0; i < points.length; i++) {
    points[i].x = map(points[i].x, -20, 180, 100, width - 100);
    points[i].y = map(points[i].y,  350, 800, 100, height - 100);
    console.log(points[i].x + " " + points[i].y);
  }
  triangles.push(new Triangle(points[0], points[1], points[2]));

  points.push(new Point2("LIDL BEŽIGRAD", 63.797, 506.854));
  points.push(new Point2("ŠMARTINSKI PARK", 65.206, 529.911));
  points.push(new Point2("ČRNUČE", 102.446, 530.213));
  points.push(new Point2("SAVSKO NASELJE 1-ŠMARTINSKA CESTA", 62.475, 524.321));
  points.push(new Point2("VILHARJEVA CESTA", 60.05, 513.02));
  points.push(new Point2("MASARYKOVA DDC", 57.63, 514.264));
  points.push(new Point2("POGAČARJEV TRG-TRŽNICA", 51.093, 507.186));
  points.push(new Point2("CANKARJEVA UL.-NAMA", 52.431, 503.257));
  points.push(new Point2("ANTONOV TRG", 41.753, 477.016));
  points.push(new Point2("PRUŠNIKOVA", 90.608, 471.637));
  points.push(new Point2("TEHNOLOŠKI PARK", 48.43, 461.086));
  points.push(new Point2("KOSEŠKI BAJER", 68.443, 470.913));
  points.push(new Point2("TIVOLI", 59.52, 498.2));
  points.push(new Point2("TRŽNICA MOSTE", 55.801, 534.156));
  points.push(new Point2("GRUDNOVO NABREŽJE-KARLOVŠKA C.", 45.748, 506.196));
  points.push(new Point2("LIDL-LITIJSKA CESTA", 47.689, 547.416));
  points.push(new Point2("ŠPORTNI CENTER STOŽICE", 82.59, 520.16));
  points.push(new Point2("ŠPICA", 40.213, 512.044));
  points.push(new Point2("ROŠKA - STRELIŠKA", 45.0, 518.46));
  points.push(new Point2("BAVARSKI DVOR", 56.82, 505.51));
  points.push(new Point2("STARA CERKEV", 63.42, 494.588));
  points.push(new Point2("SITULA", 59.433, 520.51));
  points.push(new Point2("ILIRSKA ULICA", 53.144, 513.479));
  points.push(new Point2("LIDL - RUDNIK", 20.012, 532.479));
  points.push(new Point2("KOPALIŠČE KOLEZIJA", 42.867, 495.239));
  points.push(new Point2("POVŠETOVA - KAJUHOVA", 51.512, 539.272));
  points.push(new Point2("DUNAJSKA C.-PS MERCATOR", 74.193, 511.134));
  points.push(new Point2("CITYPARK", 68.805, 546.257));
  points.push(new Point2("KOPRSKA ULICA", 33.408, 482.468));
  points.push(new Point2("LIDL - VOJKOVA CESTA", 75.89, 520.11));
  points.push(new Point2("POLJANSKA-POTOČNIKOVA", 48.982, 522.709));
  points.push(new Point2("POVŠETOVA-GRABLOVIČEVA", 51.863, 530.349));
  points.push(new Point2("PARK NAVJE-ŽELEZNA CESTA", 63.61, 513.15));
  points.push(new Point2("ZALOG", 60.43, 613.797));
  points.push(new Point2("CESTA NA ROŽNIK", 53.241, 486.206));
  points.push(new Point2("HOFER-KAJUHOVA", 56.405, 540.901));
  points.push(new Point2("DUNAJSKA C.-PS PETROL", 65.136, 509.112));
  points.push(new Point2("STUDENEC", 54.615, 576.031));
  points.push(new Point2("PARKIRIŠČE NUK 2-FF", 46.377, 501.256));
  points.push(new Point2("BRATOVŠEVA PLOŠČAD", 89.29, 513.751));
  points.push(new Point2("KONGRESNI TRG-ŠUBIČEVA ULICA", 50.388, 504.623));
  points.push(new Point2("BS4-STOŽICE", 86.761, 514.151));
  points.push(new Point2("GERBIČEVA - ŠPORTNI PARK SVOBODA", 39.384, 485.458));
  points.push(new Point2("ŽIVALSKI VRT", 52.454, 472.149));
  points.push(new Point2("VOKA - SLOVENČEVA", 75.207, 504.734));
  points.push(new Point2("BTC CITY/DVORANA A", 65.297, 543.996));
  points.push(new Point2("TRNOVO", 37.84, 500.01));
  points.push(new Point2("P+R BARJE", 27.49, 499.58));
  points.push(new Point2("ROŽNA DOLINA-ŠKRABČEVA UL.", 51.439, 492.73));
  points.push(new Point2("KINO ŠIŠKA", 69.28, 489.71));
  points.push(new Point2("BRODARJEV TRG", 54.398, 553.319));
  points.push(new Point2("ZALOŠKA C.-GRABLOVIČEVA C.", 54.41, 529.78));
  points.push(new Point2("DOLENJSKA C. - STRELIŠČE", 38.866, 517.605));
  points.push(new Point2("ŠTEPANJSKO NASELJE 1-JAKČEVA ULICA", 53.047, 545.125));
  points.push(new Point2("SOSESKA NOVO BRDO", 45.617, 462.281));
  points.push(new Point2("TRŽNICA KOSEZE", 74.315, 475.483));
  points.push(new Point2("ALEJA - CELOVŠKA CESTA", 77.302, 482.581));
  points.push(new Point2("MERCATOR CENTER ŠIŠKA", 87.079, 475.439));
  points.push(new Point2("GH ŠENTPETER-NJEGOŠEVA C.", 52.57, 519.28));
  points.push(new Point2("HOFER - POLJE", 53.718, 589.284));
  points.push(new Point2("VIŠKO POLJE", 46.189, 469.037));
  points.push(new Point2("BONIFACIJA", 39.641, 472.664));
  points.push(new Point2("P + R DOLGI MOST", 37.003, 465.229));
  points.push(new Point2("DRAVLJE", 79.84, 479.952));
  points.push(new Point2("POLJE", 57.22, 583.537));
  points.push(new Point2("SUPERNOVA LJUBLJANA - RUDNIK", 21.586, 536.745));
  points.push(new Point2("SREDNJA FRIZERSKA ŠOLA", 80.522, 491.439));
  points.push(new Point2("TRG OF-KOLODVORSKA UL.", 57.421, 510.265));
  points.push(new Point2("TRG MDB", 47.565, 495.687));
  points.push(new Point2("TRŽAŠKA C.-ILIRIJA", 44.629, 486.699));
  points.push(new Point2("PREŠERNOV TRG-PETKOVŠKOVO NABREŽJE", 51.367, 506.542));
  points.push(new Point2("MERCATOR MARKET - CELOVŠKA C. 163", 73.264, 485.942));
  points.push(new Point2("SAVSKO NASELJE 2-LINHARTOVA CESTA", 64.546, 518.013));
  points.push(new Point2("BREG", 46.498, 505.148));
  points.push(new Point2("BTC CITY ATLANTIS", 63.081, 547.851));
  points.push(new Point2("IKEA", 65.175, 539.537));
  points.push(new Point2("MIKLOŠIČEV PARK", 54.168, 507.06));
  points.push(new Point2("BARJANSKA C.-CENTER STAREJŠIH TRNOVO", 40.81, 499.51));
  points.push(new Point2("LEK - VEROVŠKOVA", 76.856, 500.222));
  points.push(new Point2("AMBROŽEV TRG", 49.877, 516.308));
  points.push(new Point2("VOJKOVA - GASILSKA BRIGADA", 68.727, 516.858));
  points.push(new Point2("RAKOVNIK", 36.284, 522.948));
  points.push(new Point2("PREGLOV TRG", 54.554, 559.08));
  points.push(new Point2("PLEČNIKOV STADION", 69.42, 510.52));
  
  for(var i = 3; i < points.length; i++) {
    points[i].x = map(points[i].x, -20, 180, 100, width - 100);
    points[i].y = map(points[i].y,  350, 800, 100, height - 100);
    console.log(points[i].x + " " + points[i].y);
    addPoint(points[i]);
  }

  console.log(triangles)
}

function displayHoveredTriangle() {
  for (let i = 0; i < triangles.length; i++) {
    let t = triangles[i];
    if (isPointInsideTriangle(new Point(mouseX, mouseY), t)) {
      fill(255, 0, 0, 50);
      triangle(t.p1.x, t.p1.y, t.p2.x, t.p2.y, t.p3.x, t.p3.y);

      //find all neighbouring triangles
      for (let j = 0; j < triangles.length; j++) {
        if (i == j) continue;
        let t2 = triangles[j];
        if (areTrianglesNeighbouring(t, t2)) {
          fill(255, 0, 0, 25);
          triangle(t2.p1.x, t2.p1.y, t2.p2.x, t2.p2.y, t2.p3.x, t2.p3.y);
        }
      }
    }
  }
}

//function that is called when the resetButton is pressed
function reset() {
  strokeWeight(2);
  //make an equilateral triangle
  points = [
    new Point(windowWidth / 2, windowHeight / 2 - windowHeight / 2.5),
    new Point(
      windowWidth / 2 - windowHeight / 2,
      windowHeight / 2 + windowHeight / 2.5
    ),
    new Point(
      windowWidth / 2 + windowHeight / 2,
      windowHeight / 2 + windowHeight / 2.5
    ),
  ];
  triangles = [new Triangle(points[0], points[1], points[2])];
}

function draw() {
  background(255);
  strokeWeight(2);
  //draw the triangles
  //select element with id selectTheType
  let selectTheType = document.getElementById("selectForType");
  if (selectTheType.value == "1") {
    for (let i = 0; i < triangles.length; i++) {
      triangles[i].display();
    }
    displayHoveredTriangle();
  } else {
    displayVoronoi();
  }

  //draw the points
  for (let i = 0; i < points.length; i++) {
    points[i].display();
  }
  //in the corner, display the x and y of the mouse
  fill(0);
  text("x: " + mouseX + " y: " + mouseY, 10, 10);
}

//when the mouse is clicked on the screen, I want a new point made
function mouseClicked() {
  if (mouseY < 40) return;
  points.push(new Point(mouseX, mouseY));
  addPoint(points[points.length - 1]);
}

//when the screen is resizyed, I want to update the window width and height
function windowResized() {
  windowHeight = window.innerHeight - 40;
  windowWidth = window.innerWidth;
  resizeCanvas(windowWidth, windowHeight);
}
