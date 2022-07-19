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

function Truck(xx, yy, width, height, wheelSize) {

var group = Body.nextGroup(true),
    wheelBase = 20,
    wheelAOffset = -width * 0.5 + wheelBase,
    wheelBOffset = width * 0.5 - wheelBase,
    wheelYOffset = 0;

var truck = Composite.create({ label: "truck" })

var truckBody = [...document.querySelectorAll("svg > path")].map(path => {
    const body = Matter.Bodies.fromVertices(
    xx, yy, Matter.Svg.pathToVertices(path), {}, true
    );
    Matter.Body.scale(body, 0.3, 0.3);
    return body;
})
truckBody[0].collisionFilter.group = group

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
    bodyB: truckBody[0],
    pointB: { x: wheelAOffset + 2, y: wheelYOffset + 45},
    bodyA: wheelA,
    stiffness: 0.15,
    length: 0,
});

var axelB = Constraint.create({
    bodyB: truckBody[0],
    pointB: { x: wheelBOffset + 10, y: wheelYOffset + 45},
    bodyA: wheelB,
    stiffness: 0.15,
    length: 0,
});

var axelC = Constraint.create({
    bodyB: fakeBody,
    pointB: { x: -200 + 100, y: -5},
    pointA: { x: -200 + 100, y: -13},

    bodyA: truckBody[0],
    stiffness: 1,
    length: 0,
});

var axelD = Constraint.create({
    bodyB: fakeBody,
    pointB: { x: -200 + 100, y: 6},
    pointA: { x: -200 + 100, y: -2},

    bodyA: truckBody[0],
    stiffness: 1,
    length: 0,
});

var axelE = Constraint.create({
    bodyB: fakeBody,
    pointB: { x: 200 - 100, y: -5},
    pointA: { x: 200 - 100, y: -13},

    bodyA: truckBody[0],
    stiffness: 1,
    length: 0,
});

var axelF = Constraint.create({
    bodyB: fakeBody,
    pointB: { x: 200 - 100, y: 6},
    pointA: { x: 200 - 100, y: -2},

    bodyA: truckBody[0],
    stiffness: 1,
    length: 0,
});

Composite.addBody(truck, truckBody[0]);
Composite.addBody(truck, fakeBody);
Composite.addBody(truck, wheelA);
Composite.addBody(truck, wheelB);
Composite.addConstraint(truck, axelA);
Composite.addConstraint(truck, axelB);
Composite.addConstraint(truck, axelC);
Composite.addConstraint(truck, axelD);
Composite.addConstraint(truck, axelE);
Composite.addConstraint(truck, axelF);


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
        World.remove(world, ground)

    }

},false);

return truck;
}
  