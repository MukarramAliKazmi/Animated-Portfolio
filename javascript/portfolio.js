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
var ground1
var canvas
let vertices
let vertices1
let bridge
////
function setup() {
  canvas = createCanvas(w, h);
  tyres = loadImage('./img/tyre.svg');
  truck_body = loadImage('./img/truck_body.svg')
  plant = loadImage('./img/plant.svg')
////
  vertices = Vertices()
  vertices1 = Vertices()
  var group = Body.nextGroup(true);


    bridge = Composites.stack(vertices[vertices.length-2].x, h - vertices[vertices.length-2].y, 19, 1, 0, 0, function(x, y) {
        return Bodies.rectangle(x - 20, y, 53, 20, { 
            collisionFilter: { group: group },
            chamfer: 5,
            density: 0.005,
            frictionAir: 0.05,
            render: {
                fillStyle: '#060a19'
            }
        });
    });

    console.log(bridge)
    
    Composites.chain(bridge, 0.3, 0, -0.3, 0, { 
        stiffness: 1,
        length: 0,
        render: {
            visible: false
        }
    });

  let constraint1 = Constraint.create({ 
    bodyA: ground,
    pointA: { x: vertices[vertices.length-2].x - 10, y: h - vertices[vertices.length-2].y + 60}, 
    bodyB: bridge.bodies[0], 
    pointB: { x: -20, y: 0 },
    length: 2,
    stiffness: 0.8
  });

  console.log(vertices1[0].x)
  let constraint2 = Constraint.create({ 
      bodyA: ground1,
      pointA: { x: vertices[vertices.length-2].x + 610, y: h - vertices[vertices.length-2].y + 60}, 
      bodyB: bridge.bodies[bridge.bodies.length - 1], 
      pointB: { x: 20, y: 0 },
      length: 2,
      stiffness: 0.8
  });

  truck = Truck(340, vertices[20].y + h - 350, 260.7, 79.5, 22)

  ground = Bodies.fromVertices(
    w, h,
    vertices,
    {isStatic: true, 
    collisionFilter: { group: group }
    },
    flagInternal = true,
  );

  console.log(ground)
  console.log(vertices[vertices.length-2].x)

  Body.setPosition(ground, {
    x: w - ground.bounds.min.x,
    y: h - ground.bounds.max.y + h,
  });


  ground1 = Bodies.fromVertices(
    w, h,
    vertices1,
    {isStatic: true,
    collisionFilter: { group: group }},
    flagInternal = true,
  );

  Body.setPosition(ground1, {
    x: w - ground1.bounds.min.x + 3600,
    y: h - ground1.bounds.max.y + h,
  });
  // const {min: {x}, max: {y}} = ground.bounds;

  World.add(world, [
    truck,
    ground,
    ground1,
    bridge,
    constraint1,
    constraint2
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
      translate(-truck.bodies[1].position.x + 200, 0);
          stroke("rgb(204, 204, 204)")
          strokeWeight(1.2);
          noFill();
          beginShape();
              for(let i = 0; i < vertices.length - 2; i++) {
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
          for(let i = 0; i < vertices1.length - 2; i++) {
              curveVertex(vertices1[i].x, vertices1[i].y + h - 200);
          }
      endShape();
  pop();

  for(let i = 0; i < bridge.bodies.length; i++) {
    stroke("rgb(204, 204, 204)")
    strokeWeight(1.2);
    push();
        translate(-truck.bodies[1].position.x + 200, 0);
        circle(bridge.bodies[i].position.x, bridge.bodies[i].position.y, 20)
    pop();
  }

  push();
      translate(-truck.bodies[1].position.x + 200, 0);
      image(plant, vertices[30].x, vertices[30].y + h - 200 - 47.5)
  pop();

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
      image(truck_body, 0, 0, 868.02*0.3, 263.5*0.3);
  pop()

}