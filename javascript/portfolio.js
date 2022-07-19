var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Bounds = Matter.Bounds;

var engine = Engine.create(),
  world = engine.world;

const w = window.innerWidth * 2;
const h = window.innerHeight;

var render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: w,
    height: h,
    wireframes: false,
    hasBounds: true,
    showAngleIndicator: true,
  },
});

var tyres
var truck_body
var plant
var truck 
var ground
var canvas
let verticesA
///
function setup() {
  canvas = createCanvas(w, h);
  tyres = loadImage('/img/tyre.svg');
  truck_body = loadImage('/img/truck_body.svg')
  plant = loadImage('/img/plant.svg')
///

  truck = Truck(400, 200, 200, 90, 40)

  verticesA = Vertices()
  // verticesA = JSON.parse(localStorage.getItem("vertices"))
  localStorage.clear()
  ground = Bodies.fromVertices(
    w, h,
    verticesA,
    {isStatic: true},
    flagInternal = true,
  );

  Body.setPosition(ground, {
    x: w - ground.bounds.min.x,
    y: h - ground.bounds.max.y + h,
  });

  // const {min: {x}, max: {y}} = ground.bounds;

  World.add(world, [
    truck,
    ground,
  ]);

  // Render.run(render);
  Matter.Runner.run(engine);

  setInterval(function () {
    render.bounds.min.x = truck.bodies[1].bounds.min.x - 230;
    render.bounds.max.x = truck.bodies[1].bounds.min.x + render.options.width - 230;
  });

///
  canvas.position(0, 0);
  rectMode(CENTER)
  ellipseMode(CENTER)
  angleMode(RADIANS);
  imageMode(CENTER)
}
///

function draw() {
  background(256, 256, 256);

  push();
      translate(-truck.bodies[2].position.x + 200, 0);
          stroke("rgb(204, 204, 204)")
          strokeWeight(1.2);
          noFill();
          beginShape();
              for(let i = 0; i < verticesA.length - 2; i++) {
                  curveVertex(verticesA[i].x, verticesA[i].y + h - 200);
              }
          endShape();
  pop();

  push();
      translate(-truck.bodies[2].position.x + 200, 0);
      image(plant, verticesA[30].x, verticesA[30].y + h - 200 - 47.5)
  pop();

  push()
      translate(200, truck.bodies[2].position.y);
      rotate(truck.bodies[2].angle)
      image(tyres, 0, 0, 44, 44);
  pop()

  push()
      translate(200 + (truck.bodies[3].position.x - truck.bodies[2].position.x), truck.bodies[3].position.y - 1);
      rotate(truck.bodies[3].angle)
      image(tyres, 0, 0, 44, 44);
  pop()


  push()
      translate(200 + (truck.bodies[1].position.x - truck.bodies[2].position.x), truck.bodies[1].position.y);
      rotate(truck.bodies[1].angle)
      image(truck_body, 0, 0, 868.02*0.3, 263.5*0.3);
  pop()

}