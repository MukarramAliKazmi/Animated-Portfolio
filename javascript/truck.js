function Truck(xx, yy, width, height, wheelSize) {

    var group = Body.nextGroup(true),
        wheelBase = 20,
        wheelAOffset = -200 * 0.5 + wheelBase + 2,
        wheelBOffset = 200 * 0.5 - wheelBase + 10,
        wheelYOffset = wheelSize * 2 + wheelSize / 5;

    var truck = Composite.create({ label: "truck" })

    var truckBody = [...document.querySelectorAll("svg > path")].map(path => {
        const body = Matter.Bodies.fromVertices(
            xx, yy, Matter.Svg.pathToVertices(path), {}, true
        );
        Matter.Body.scale(body, width / 869, height / 265);
        return body;
    })
    truckBody[0].collisionFilter.group = group

    var wheelA = Bodies.circle(xx + wheelAOffset, yy + wheelYOffset, wheelSize, {
        collisionFilter: {
            group: group,
        },
        inertia: 10000,
        friction: 4,
        restitution: 0.8,
    });

    var wheelB = Bodies.circle(xx + wheelBOffset, yy + wheelYOffset, wheelSize, {
        collisionFilter: {
            group: group,
        },
        friction: 4,
        inertia: 10000,
        restitution: 0.8,
    });

    var player = Bodies.rectangle(xx + 30, yy, 10, 60, {
        collisionFilter: {
            group: group,
        }
    })

    var axelC = Constraint.create({
        bodyB: truckBody[0],
        pointB: { x: 30, y: 0 },
        bodyA: player,
        stiffness: 0.09,
        length: 0,
    });

    var axelD = Constraint.create({
        bodyB: truckBody[0],
        pointB: { x: 30, y: 10 },
        pointA: { x: 0, y: 10 },
        bodyA: player,
        stiffness: 0.2,
        length: 0,
    });

    var axelA = Constraint.create({
        bodyB: truckBody[0],
        pointB: { x: wheelAOffset, y: wheelYOffset },
        bodyA: wheelA,
        stiffness: 0.15,
        length: 0,
    });

    var axelB = Constraint.create({
        bodyB: truckBody[0],
        pointB: { x: wheelBOffset, y: wheelYOffset },
        bodyA: wheelB,
        stiffness: 0.15,
        length: 0,
    });

    Composite.addBody(truck, truckBody[0]);
    Composite.addBody(truck, wheelA);
    Composite.addBody(truck, wheelB);
    Composite.addBody(truck, player);
    Composite.addConstraint(truck, axelA);
    Composite.addConstraint(truck, axelB);
    Composite.addConstraint(truck, axelC);
    Composite.addConstraint(truck, axelD);

    window.addEventListener("keydown", function (event) {

        if (event.code === "ArrowLeft") {
            Body.setAngularVelocity(wheelA, -0.3);
            Body.setAngularVelocity(wheelB, -0.3);
        } else if (event.code === "ArrowRight") {
            Body.setAngularVelocity(wheelA, 0.3);
            Body.setAngularVelocity(wheelB, 0.3);
        } else if (event.code === "ArrowDown") {
            Body.setAngularVelocity(wheelA, 0);
            Body.setAngularVelocity(wheelB, 0);
            World.remove(world, ground)
        }

    }, false);

    return truck;
}