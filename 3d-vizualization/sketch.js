//make a p5js 3d render of a cube

let angle = 0;
let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(0);
  rotateX(angle);
  rotateY(angle * 0.3);
  rotateZ(angle * 1.2);
  normalMaterial();
  box(200);
  angle += 0.01;
}