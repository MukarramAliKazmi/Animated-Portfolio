function setup() {
  canvas = createCanvas(w, h);
  canvas.position(0, 0);

  rectMode(CENTER)
  ellipseMode(CENTER)
  imageMode(CENTER)
  angleMode(RADIANS)

  tyres = loadImage('./img/tyre.svg')
  truck_body = loadImage('./img/truck_body.svg')
  plant = loadImage('./img/plant.svg')

  vertices0 = Vertices() //ground_vertices.js
  vertices = Vertices() //ground_vertices.js
  vertices1 = Vertices() //ground_vertices.js

  bridge0 = Bridge(vertices[0].x - 10 - 600, h - vertices[0].y + -90) //bridge.js
  bridge = Bridge(vertices[vertices.length - 2].x - 10, h - vertices[vertices.length - 2].y + 60) //bridge.js
  truck = Truck(340, vertices[20].y + h - 350, 260.7, 79.5, 22) //truck.js
  ground0 = Ground(vertices0, -3600) // ground.js
  ground = Ground(vertices, 0) //ground.js
  ground1 = Ground(vertices1, 3600) //ground.js

  World.add(world, [truck, ground0, ground, ground1, bridge0, bridge]);

  // Render.run(render);
  Matter.Runner.run(engine);

  GroundInterval() //ground_movement.js
}

function draw() {
  background(256, 256, 256);

  if (ground.position.x < 2000 && ground.position.x > 0) {

    push();
    translate(-truck.bodies[1].position.x + 200, 0);
    image(plant, vertices[60].x, vertices[60].y + h - 200 - 47.5)
    pop();

    push();
    translate(-truck.bodies[1].position.x + 200 - 3600, 0);
    stroke("rgb(204, 204, 204)")
    strokeWeight(1.2);
    noFill();
    beginShape();
    for (let i = 0; i < vertices0.length - 2; i++) {
      curveVertex(vertices0[i].x, vertices0[i].y + h - 200);
    }
    endShape();
    pop();

    push();
    translate(-truck.bodies[1].position.x + 200, 0);
    stroke("rgb(204, 204, 204)")
    strokeWeight(1.2);
    noFill();
    beginShape();
    for (let i = 0; i < vertices.length - 2; i++) {
      curveVertex(vertices[i].x, vertices[i].y + h - 200);
    }
    endShape();
    pop();

    push();
    translate(-truck.bodies[1].position.x + 200 + 3600, 0);
    stroke("rgb(204, 204, 204)")
    strokeWeight(1.2);
    noFill();
    beginShape();
    for (let i = 0; i < vertices1.length - 2; i++) {
      curveVertex(vertices1[i].x, vertices1[i].y + h - 200);
    }
    endShape();
    pop();

  } else if (ground.position.x < 0) {
    push();
    translate(-truck.bodies[1].position.x + 200, 0);
    image(plant, vertices[60].x, vertices[60].y + h - 200 - 47.5)
    pop();

    push();
    translate(-truck.bodies[1].position.x + 200 + 3600, 0);
    stroke("rgb(204, 204, 204)")
    strokeWeight(1.2);
    noFill();
    beginShape();
    for (let i = 0; i < vertices0.length - 2; i++) {
      curveVertex(vertices0[i].x, vertices0[i].y + h - 200);
    }
    endShape();
    pop();

    push();
    translate(-truck.bodies[1].position.x + 200 - 3600, 0);
    stroke("rgb(204, 204, 204)")
    strokeWeight(1.2);
    noFill();
    beginShape();
    for (let i = 0; i < vertices.length - 2; i++) {
      curveVertex(vertices[i].x, vertices[i].y + h - 200);
    }
    endShape();
    pop();

    push();
    translate(-truck.bodies[1].position.x + 200, 0);
    stroke("rgb(204, 204, 204)")
    strokeWeight(1.2);
    noFill();
    beginShape();
    for (let i = 0; i < vertices1.length - 2; i++) {
      curveVertex(vertices1[i].x, vertices1[i].y + h - 200);
    }
    endShape();
    pop();

  } else {

    push();
    translate(-truck.bodies[1].position.x + 200, 0);
    image(plant, vertices1[60].x, vertices1[60].y + h - 200 - 47.5)
    pop();

    push();
    translate(-truck.bodies[1].position.x + 200, 0);
    stroke("rgb(204, 204, 204)")
    strokeWeight(1.2);
    noFill();
    beginShape();
    for (let i = 0; i < vertices0.length - 2; i++) {
      curveVertex(vertices0[i].x, vertices0[i].y + h - 200);
    }
    endShape();
    pop();

    push();
    translate(-truck.bodies[1].position.x + 200 + 3600, 0);
    stroke("rgb(204, 204, 204)")
    strokeWeight(1.2);
    noFill();
    beginShape();
    for (let i = 0; i < vertices.length - 2; i++) {
      curveVertex(vertices[i].x, vertices[i].y + h - 200);
    }
    endShape();
    pop();

    push();
    translate(-truck.bodies[1].position.x + 200 - 3600, 0);
    stroke("rgb(204, 204, 204)")
    strokeWeight(1.2);
    noFill();
    beginShape();
    for (let i = 0; i < vertices1.length - 2; i++) {
      curveVertex(vertices1[i].x, vertices1[i].y + h - 200);
    }
    endShape();
    pop();
  }

  for (let i = 0; i < bridge0.bodies.length; i++) {
    stroke("rgb(204, 204, 204)")
    strokeWeight(1.2);
    push();
    translate(-truck.bodies[1].position.x + 200, 0);
    circle(bridge0.bodies[i].position.x, bridge0.bodies[i].position.y, 20)
    pop();
  }

  for (let i = 0; i < bridge.bodies.length; i++) {
    stroke("rgb(204, 204, 204)")
    strokeWeight(1.2);
    push();
    translate(-truck.bodies[1].position.x + 200, 0);
    circle(bridge.bodies[i].position.x, bridge.bodies[i].position.y, 20)
    pop();
  }

  push()
  translate(200, truck.bodies[1].position.y);
  rotate(truck.bodies[1].angle)
  image(tyres, 0, 0, 44, 44);
  pop()

  push()
  translate(200 + (truck.bodies[2].position.x - truck.bodies[1].position.x), truck.bodies[2].position.y - 1);
  rotate(truck.bodies[2].angle)
  image(tyres, 0, 0, 44, 44);
  pop()

  push()
  translate(200 + (truck.bodies[0].position.x - truck.bodies[1].position.x), truck.bodies[0].position.y);
  rotate(truck.bodies[0].angle)
  image(truck_body, 0, 0, 868.02 * 0.3, 263.5 * 0.3);
  pop()

}