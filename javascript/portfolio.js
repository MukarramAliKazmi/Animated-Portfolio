let gradient, mountain, mountain_2, font, character, direction_sign

function preload() {
  tyres = loadImage("./img/tyre.svg");
  truck_body = loadImage("./img/truck_body.svg");
  plant = loadImage("./img/plant.svg");
  mukarram = loadImage("./img/mukarram.svg");
  gradient = loadImage("./img/gradient.svg")
  mountain = loadImage("./img/mountain.svg")
  mountain_2 = loadImage("./img/mountain-2.svg")
  character = loadImage("./img/character.PNG")
  direction_sign = loadImage("./img/direction_sign.svg")
  font = loadFont("./font/MochiyPopOne-Regular.ttf")
}

function setup() {
  canvas = createCanvas(w, h);
  canvas.position(0, 0);
  rectMode(CENTER);
  ellipseMode(CENTER);
  imageMode(CENTER);
  angleMode(RADIANS);

  vertices0 = Vertices(); //ground_vertices.js
  vertices = Vertices(); //ground_vertices.js
  vertices1 = Vertices(); //ground_vertices.js

  bridge0 = Bridge(vertices[0].x - 10 - 600, h - vertices[0].y + -90); //bridge.js
  bridge = Bridge(
    vertices[vertices.length - 2].x - 10,
    h - vertices[vertices.length - 2].y + 60
  ); //bridge.js
  truck = Truck(340, vertices[20].y + h - 350, 260.7, 79.5, 22); //truck.js
  ground0 = Ground(vertices0, -3600); // ground.js
  ground = Ground(vertices, 0); //ground.js
  ground1 = Ground(vertices1, 3600); //ground.js

  World.add(world, [truck, ground0, ground, ground1, bridge0, bridge]);

  // Render.run(render);
  Matter.Runner.run(engine);

  GroundInterval(); //ground_movement.js
}

let temp_vertices = Mountains()
const intro = "Hi, \n \n I'm Mukarram, \n web developer.";
const rand1 = Math.floor(Math.random() * 30);
const rand2 = Math.floor(Math.random() * 30);
const rand3 = Math.floor(Math.random() * 30);
const rand4 = Math.floor(Math.random() * 30);

const rand = [
  Math.floor(Math.random() * 30),
  Math.floor(Math.random() * 30),
  Math.floor(Math.random() * 30),
  Math.floor(Math.random() * 30),
  Math.floor(Math.random() * 30),
  Math.floor(Math.random() * 30),
  Math.floor(Math.random() * 30)
]

let positionx = [0, 0, 0, 0, 0, 0, 0]

let random_number = [
  0 + Math.floor(Math.random() * 300),
  200 + Math.floor(Math.random() * 300),
  300 + Math.floor(Math.random() * 300),
  700 + Math.floor(Math.random() * 300),
  800 + Math.floor(Math.random() * 300),
  1100 + Math.floor(Math.random() * 300),
  1200 + Math.floor(Math.random() * 300)
]

const rand_2 = [
  Math.floor(Math.random() * 30),
  Math.floor(Math.random() * 30),
  Math.floor(Math.random() * 30),
  Math.floor(Math.random() * 30),
  Math.floor(Math.random() * 30),
  Math.floor(Math.random() * 30),
  Math.floor(Math.random() * 30)
]

let positionx_2 = [0, 0, 0, 0, 0, 0, 0]

let random_number_2 = [
  random_number[0] + Math.floor(Math.random() * 300),
  random_number[6] + Math.floor(Math.random() * 300)
]


function draw() {
  background(227, 251, 256);

  if (ground.position.x < 2000 && ground.position.x > 0) {
    v0 = -3600;
    v = 0;
    v1 = 3600;
  } else if (ground.position.x < 0) {
    v0 = 3600;
    v = -3600;
    v1 = 0;
  } else {
    v0 = 0;
    v = 3600;
    v1 = -3600;
  }

  for (let i = 0; i < 7; i++) {
    positionx[i] = positionx[i] - (truck.bodies[0].velocity.x / 50)
    if ((positionx[i] + random_number[i]) < -200 && truck.bodies[0].velocity.x > 0)
      positionx[i] = window.innerWidth
    else if ((positionx[i] + random_number[i]) > 1700 && truck.bodies[0].velocity.x < 0)
      positionx[i] = -window.innerWidth
    push();
    translate(positionx[i] + random_number[i], rand[i] + window.innerHeight / 2.9);
    image(mountain, positionx[i], rand[i] + window.innerHeight / 2.9, 1875, 724 - rand[i] * 3);
    pop();
  }

  for (let i = 0; i < 2; i++) {
    positionx_2[i] = positionx_2[i] - (truck.bodies[0].velocity.x / 30)
    if ((positionx_2[i] + random_number_2[i]) < -200 && truck.bodies[0].velocity.x > 0)
      positionx_2[i] = window.innerWidth
    else if ((positionx_2[i] + random_number_2[i]) > 1700 && truck.bodies[0].velocity.x < 0)
      positionx_2[i] = -window.innerWidth
    push();
    translate(positionx_2[i] + random_number_2[i], rand_2[i] + window.innerHeight / 2.6);
    image(mountain_2, positionx_2[i], rand_2[i] + window.innerHeight / 2.6, 1875, 724 - rand_2[i] * 3);
    pop();
  }

  push();
  translate(-truck.bodies[1].position.x + 200 + v, 0);
  image(plant, vertices[30].x, vertices[30].y + h - 200 - 47.5);
  pop();

  push();
  translate(-truck.bodies[1].position.x + 200 + v, 0);
  image(direction_sign, vertices[45].x, vertices[45].y + h - 200 - 47.5);
  pop();

  push();

  translate(-truck.bodies[1].position.x + 200 + v0, 0);
  stroke("rgb(204, 204, 204)");
  strokeWeight(1.2);
  // noFill();
  strokeWeight(0)
  fill(80, 169, 199)
  beginShape();
  for (let i = 0; i < vertices0.length; i++) {
    vertex(vertices0[i].x, vertices0[i].y + h - 200);
  }
  endShape();
  pop();

  push();

  push();

  translate((-truck.bodies[1].position.x + 200 + v) / 3, 0);

  push();
  strokeWeight(0)
  fill(255)
  beginShape();
  vertex((1.8 * window.innerWidth) / 4 + rand1, window.innerHeight / 5 + rand3);
  vertex((4.4 * window.innerWidth) / 5 + rand2, window.innerHeight / 5 + rand4);
  vertex(
    (4.4 * window.innerWidth) / 5 + rand3,
    window.innerHeight / 1.8 + rand1
  );
  vertex(
    (1.8 * window.innerWidth) / 4 + rand1,
    window.innerHeight / 1.8 + rand1
  );
  endShape(CLOSE);

  pop();

  image(
    mukarram,
    (1.8 * window.innerWidth) / 4 + rand1 + window.innerHeight / 7,
    rand1 + window.innerHeight / 1.8 - window.innerHeight / 7,
    window.innerHeight / 3.5,
    window.innerHeight / 3.5
  );

  push();
  strokeWeight(0)
  textFont(font);
  fill(80, 169, 199)
  textSize(window.innerHeight / 20);
  text(
    intro,
    (4 * window.innerWidth - 100) / 5,
    window.innerHeight / 1.8 + rand1,
    window.innerWidth / 3,
    window.innerHeight / 2
  );
  pop();

  pop();

  translate(-truck.bodies[1].position.x + 200 + v, 0);
  strokeWeight(0);
  // noFill();
  fill(80, 169, 199)
  beginShape();
  for (let i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y + h - 200);
  }
  endShape();
  pop();

  // pop();

  push();
  translate(-truck.bodies[1].position.x + 200 + v1, 0);
  strokeWeight(0);
  fill(80, 169, 199)
  beginShape();
  for (let i = 0; i < vertices1.length; i++) {
    vertex(vertices1[i].x, vertices1[i].y + h - 200);
  }
  endShape();
  pop();

  for (let i = 0; i < bridge0.bodies.length; i++) {
    stroke("rgb(80, 169, 199)");
    strokeWeight(5);
    fill(80, 169, 199)
    push();
    translate(-truck.bodies[1].position.x + 200, 0);
    if (i < bridge0.bodies.length - 1)
      line(bridge0.bodies[i].position.x, bridge0.bodies[i].position.y - 7, bridge0.bodies[i + 1].position.x, bridge0.bodies[i + 1].position.y - 7)
    pop();
  }

  for (let i = 0; i < bridge.bodies.length; i++) {
    stroke("rgb(80, 169, 199)");
    strokeWeight(5);
    fill(80, 169, 199)
    push();
    translate(-truck.bodies[1].position.x + 200, 0);
    if (i < bridge.bodies.length - 1)
      line(bridge.bodies[i].position.x, bridge.bodies[i].position.y - 7, bridge.bodies[i + 1].position.x, bridge.bodies[i + 1].position.y - 7)
    pop();
  }

  TruckShow(tyres, character, truck_body)
}