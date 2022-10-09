//make a p5js 3d render of a cube

let angle = 0;
let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  var easy=createEasyCam();
  let state = {
    distance : 300,                 // scalar
    center   : [0, 0, 0],         // vector
    rotation : [0, 0, 0, 0],  // quaternion
  };
  easy.setState(state, 1000); // animate to state over the period of 1 second
  document.oncontextmenu = function() { return false; }
}

function draw() {
  background(0);
  normalMaterial();
  box(200);
  angle += 0.01;
}