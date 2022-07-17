var Engine = Matter.Engine,
  Render = Matter.Render,
  Composites = Matter.Composites,
  Composite = Matter.Composite,
  Mouse = Matter.Mouse,
  World = Matter.World,
  Constraint = Matter.Constraint,
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
var car 
var ground
var canvas
let verticesA
///
function setup() {
  canvas = createCanvas(w, h);
  tyres = loadImage('/img/tyre.svg');
  truck_body = loadImage('/img/truck_body.svg')
///

  car = Cars(400, 200, 200, 90, 40);

  verticesA = Vertices()
  ground = Matter.Bodies.fromVertices(
    w, h,
    verticesA,
    {isStatic: true},
    flagInternal = true,
  );



  Matter.Body.setPosition(ground, {
    x: w - ground.bounds.min.x,
    y: h - ground.bounds.max.y + 730,
  });

  const {min: {x}, max: {y}} = ground.bounds;

  World.add(world, [
    car,
    ground,
  ]);

  // Render.run(render);
  Matter.Runner.run(engine);

  // setInterval(function () {
  //   render.bounds.min.x = car.bodies[1].bounds.min.x - 230;
  //   render.bounds.max.x = car.bodies[1].bounds.min.x + render.options.width - 230;
  // });

///
  canvas.position(0, 0);
  rectMode(CENTER)
  ellipseMode(CENTER)
  angleMode(RADIANS);
  imageMode(CENTER)
}
///


///
function draw() {
  background(256, 256, 256);

  push();
      translate(-car.bodies[2].position.x + 200, 0);
      push();
          stroke("rgb(180, 180, 180)")
          strokeWeight(8);
          noFill();
          beginShape();
              for(let i = 0; i < verticesA.length - 2; i++) {
                  curveVertex(verticesA[i].x, verticesA[i].y + h - 206);
              }
          endShape();
      pop();
  pop();

  push();
      translate(-car.bodies[2].position.x + 200, 0);
      push();
          stroke("rgb(180, 180, 180)")
          strokeWeight(8);
          noFill();
          
          circle(verticesA[2].x, verticesA[2].y + h - 201, 5)
          circle(verticesA[4].x - 5, verticesA[4].y + h - 201, 5)

          beginShape();
              for(let i = 5; i < verticesA.length-9; i++) {
                  circle(verticesA[i].x, verticesA[i].y + h - 201, 5)
              }
          endShape();

          circle(verticesA[verticesA.length-5].x, verticesA[verticesA.length-5].y + h - 201, 5)
          circle(verticesA[verticesA.length-7].x - 5, verticesA[verticesA.length-7].y + h - 201, 5)
          circle(verticesA[verticesA.length-9].x + 5, verticesA[verticesA.length-9].y + h - 201, 5)

      pop();
  pop();


  push();
      translate(-car.bodies[2].position.x + 200, 0);
      push();
          stroke("rgb(180, 180, 180)")
          strokeWeight(8);
          noFill();
          beginShape();
              for(let i = 0; i < verticesA.length - 2; i++) {
                  curveVertex(verticesA[i].x, verticesA[i].y + h - 196);
              }
          endShape();
      pop();
  pop();


  push()
      translate(200, car.bodies[2].position.y);
      rotate(car.bodies[2].angle)
      image(tyres, 0, 0, 44, 44);
  pop()

  push()
      translate(200 + (car.bodies[3].position.x - car.bodies[2].position.x), car.bodies[3].position.y);
      rotate(car.bodies[3].angle)
      image(tyres, 0, 0, 44, 44);
  pop()


  push()
      translate(200 + (car.bodies[1].position.x - car.bodies[2].position.x), car.bodies[1].position.y);
      rotate(car.bodies[1].angle)
      image(truck_body, 0, 0, 868.02*0.3, 263.5*0.3);
  pop()

}
///


function Cars(xx, yy, width, height, wheelSize) {

  var group = Body.nextGroup(true),
    wheelBase = 20,
    wheelAOffset = -width * 0.5 + wheelBase,
    wheelBOffset = width * 0.5 - wheelBase,
    wheelYOffset = 0;

  var car = Composite.create({ label: "Car" })

  
  var carBody = [...document.querySelectorAll("svg > path")].map(path => {
    const body = Matter.Bodies.fromVertices(
      xx, yy, Matter.Svg.pathToVertices(path), {}, true
    );
    Matter.Body.scale(body, 0.3, 0.3);
    return body;
  })
  carBody[0].collisionFilter.group = group

  var fakeBody = Bodies.rectangle(xx, yy, 210, 16, {
    collisionFilter: {
      group: group,
    },
  })

  var wheelA = Bodies.circle(xx + wheelAOffset - 40, yy + wheelYOffset + 50, wheelSize - 18, {
    collisionFilter: {
      group: group,
    },
    inertia: 10000,
    friction: 4,
    restitution: 0.8,
  });


  var wheelB = Bodies.circle(xx + wheelBOffset + 20, yy + wheelYOffset + 50, wheelSize - 18, {
    collisionFilter: {
      group: group,
    },
    friction: 4,
    inertia: 10000,
    restitution: 0.8,
  });

  var axelA = Constraint.create({
    bodyB: carBody[0],
    pointB: { x: wheelAOffset + 2, y: wheelYOffset + 45},
    bodyA: wheelA,
    stiffness: 0.15,
    length: 0,
  });

  var axelB = Constraint.create({
    bodyB: carBody[0],
    pointB: { x: wheelBOffset + 10, y: wheelYOffset + 45},
    bodyA: wheelB,
    stiffness: 0.15,
    length: 0,
  });

  var axelC = Constraint.create({
    bodyB: fakeBody,
    pointB: { x: -200 + 100, y: -5},
    pointA: { x: -200 + 100, y: -13},

    bodyA: carBody[0],
    stiffness: 1,
    length: 0,
  });

  var axelD = Constraint.create({
    bodyB: fakeBody,
    pointB: { x: -200 + 100, y: 6},
    pointA: { x: -200 + 100, y: -2},

    bodyA: carBody[0],
    stiffness: 1,
    length: 0,
  });

  var axelE = Constraint.create({
    bodyB: fakeBody,
    pointB: { x: 200 - 100, y: -5},
    pointA: { x: 200 - 100, y: -13},

    bodyA: carBody[0],
    stiffness: 1,
    length: 0,
  });

  var axelF = Constraint.create({
    bodyB: fakeBody,
    pointB: { x: 200 - 100, y: 6},
    pointA: { x: 200 - 100, y: -2},

    bodyA: carBody[0],
    stiffness: 1,
    length: 0,
  });

  Composite.addBody(car, carBody[0]);
  Composite.addBody(car, fakeBody);
  Composite.addBody(car, wheelA);
  Composite.addBody(car, wheelB);
  Composite.addConstraint(car, axelA);
  Composite.addConstraint(car, axelB);
  Composite.addConstraint(car, axelC);
  Composite.addConstraint(car, axelD);
  Composite.addConstraint(car, axelE);
  Composite.addConstraint(car, axelF);


  window.addEventListener("keydown", function (event) {
    console.log("hello")
      if (event.code === "ArrowLeft") {        
        Body.setAngularVelocity(wheelA, -0.4);
        Body.setAngularVelocity(wheelB, -0.4);
      } else if (event.code === "ArrowRight") {
          Body.setAngularVelocity(wheelA, 0.4);
          Body.setAngularVelocity(wheelB, 0.4);
      } else if (event.code === "ArrowDown") { 
        Body.setAngularVelocity(wheelA, 0);
        Body.setAngularVelocity(wheelB, 0);
        World.remove(world, ground)

      }

  },false);

  return car;
}


function Vertices() {
  var vertices = [
    ...[...Array(13)].map((_, i) => ({
        x: i * 250,
        y: Math.floor(Math.random() * 150),
    })),
    {x: 3000, y: 200},
    {x: 0, y: 200},
  ];

  var vertices2 = [];
  for(let j = 0; j < 6; j++) {
      if (j % 2 === 0) {
          vertices2 = []
          vertices2.push(vertices[0])
          for(let i = 0; i < vertices.length - 3; i++) {
              vertices2.push(vertices[i])

              x1 = ( vertices[i].x + vertices[i+1].x ) / 2
              y1 = ( vertices[i].y + vertices[i+1].y ) / 2

              vertices2.push({x: x1, y: y1})
          }
          vertices2.push(vertices[vertices.length - 3])
          vertices2.push(vertices[vertices.length - 2])
          vertices2.push(vertices[vertices.length - 1])
      } else {
          vertices = []
          for(let i = 0; i < vertices2.length - 3; i++) {
              x1 = ( vertices2[i].x + vertices2[i+1].x ) / 2
              y1 = ( vertices2[i].y + vertices2[i+1].y ) / 2

              vertices.push({x: x1, y: y1})
          }
          vertices.push(vertices2[vertices2.length - 3])
          vertices.push(vertices2[vertices2.length - 2])
          vertices.push(vertices2[vertices2.length - 1])
      }
  }

  return vertices;
}