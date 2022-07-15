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
    // background: "white",
    hasBounds: true,
    showAngleIndicator: true,
  },
});

Matter.Runner.run(engine);

var car = Cars(400, 200, 200, 90, 40);

var vertices = [
  ...[...Array(30)].map((_, i) => ({
      x: i * 200,
      y: Math.floor(Math.random() * 100),
  })),
  {x: w * 6, y: 200},
  {x: 0, y: 200},
];


let vertices2 = [];
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
        // vertices.push(vertices2[0])
        for(let i = 0; i < vertices2.length - 3; i++) {
            // vertices2.push(vertices[i])

            x1 = ( vertices2[i].x + vertices2[i+1].x ) / 2
            y1 = ( vertices2[i].y + vertices2[i+1].y ) / 2

            vertices.push({x: x1, y: y1})
        }
        vertices.push(vertices2[vertices2.length - 3])
        vertices.push(vertices2[vertices2.length - 2])
        vertices.push(vertices2[vertices2.length - 1])
    }
}

console.log(vertices)

const ground = Matter.Bodies.fromVertices(
  w, h,
  vertices,
  {isStatic: true},
  flagInternal = true,
);


console.log(ground)

Matter.Body.setPosition(ground, {
  x: w - ground.bounds.min.x,
  y: h - ground.bounds.max.y + 730,
});

const {min: {x}, max: {y}} = ground.bounds;

World.add(world, [
  car,
  ground,
  // Bodies.rectangle(400, 400, 810, 30, { isStatic: true, friction: 2 }),
]);


Render.run(render);

setInterval(function () {
  // while(1) {
  render.bounds.min.x = car.bodies[1].bounds.min.x - 230;
  render.bounds.max.x = car.bodies[1].bounds.min.x + render.options.width - 230;

  //   render.bounds.min.y = car.bodies[0].bounds.min.y - 400;
  //   render.bounds.max.y = car.bodies[0].bounds.min.y + render.options.height - 400;
});
  // }

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

  // for (let i = 0; i <= 28; i++) {
  //   carBody[0].parts[i].render.fillStyle = "#CCCCCC"
  // }

  var fakeBody = Bodies.rectangle(xx, yy, 210, 30, {
    collisionFilter: {
      group: group,
    },
  })

  var wheelA = Bodies.circle(xx + wheelAOffset - 40, yy + wheelYOffset + 50, wheelSize - 18, {
    collisionFilter: {
      group: group,
    },
    // render: {
    //   sprite: {
    //     texture: './img/tyre.png',
    //     xScale: 0.6,
    //     yScale: 0.6,
    //   }
    // },
    inertia: 10000,
    friction: 4,
    restitution: 0.8,
  });


  var wheelB = Bodies.circle(xx + wheelBOffset + 20, yy + wheelYOffset + 50, wheelSize - 18, {
    collisionFilter: {
      group: group,
    },
    // render: {
    //   sprite: {
    //     texture: './img/tyre.png',
    //     xScale: 0.6,
    //     yScale: 0.6
    //   }
    // },
    friction: 4,
    inertia: 10000,
    restitution: 0.8,
  });

  var axelA = Constraint.create({
    bodyB: carBody[0],
    pointB: { x: wheelAOffset , y: wheelYOffset + 60},
    bodyA: wheelA,
    stiffness: 0.1,
    length: 0,
  });

  var axelB = Constraint.create({
    bodyB: carBody[0],
    pointB: { x: wheelBOffset + 10, y: wheelYOffset + 60},
    bodyA: wheelB,
    stiffness: 0.1,
    length: 0,
  });

  var axelC = Constraint.create({
    bodyB: fakeBody,
    pointB: { x: -200 + 100, y: -10},
    pointA: { x: -200 + 100, y: -18},

    bodyA: carBody[0],
    stiffness: 1,
    length: 0,
  });

  var axelD = Constraint.create({
    bodyB: fakeBody,
    pointB: { x: -200 + 100, y: 10},
    pointA: { x: -200 + 100, y: 2},

    bodyA: carBody[0],
    stiffness: 1,
    length: 0,
  });

  var axelE = Constraint.create({
    bodyB: fakeBody,
    pointB: { x: 200 - 100, y: -10},
    pointA: { x: 200 - 100, y: -18},

    bodyA: carBody[0],
    stiffness: 1,
    length: 0,
  });

  var axelF = Constraint.create({
    bodyB: fakeBody,
    pointB: { x: 200 - 100, y: 10},
    pointA: { x: 200 - 100, y: 2},

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
      if (event.code === "ArrowLeft") {        
        Body.setAngularVelocity(wheelA, -0.4);
        Body.setAngularVelocity(wheelB, -0.4);
      } else if (event.code === "ArrowRight") {
          Body.setAngularVelocity(wheelA, 0.4);
          Body.setAngularVelocity(wheelB, 0.4);
      } else if (event.code === "ArrowDown") { 

        Body.setAngularVelocity(wheelA, 0);
        Body.setAngularVelocity(wheelB, 0);
      }

  },false);

  return car;
}