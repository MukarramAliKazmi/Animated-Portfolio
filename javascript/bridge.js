function Bridge(x, y) {

    bridge = Composites.stack(x, y, 19, 1, 0, 0, function (x, y) {
        return Bodies.rectangle(x - 20, y, 53, 20, {
            collisionFilter: { group: group },
            chamfer: 5,
            density: 0.005,
            frictionAir: 0.05,
            render: {
                fillStyle: '#060a19'
            },
        });
    });

    Composites.chain(bridge, 0.3, 0, -0.3, 0, {
        stiffness: 1,
        length: 0,
    });

    let constraint1 = Constraint.create({
        pointA: { x, y },
        bodyB: bridge.bodies[0],
        pointB: { x: -20, y: 0 },
        length: 2,
        stiffness: 0.9
    });

    let constraint2 = Constraint.create({
        pointA: { x: x + 620, y },
        bodyB: bridge.bodies[bridge.bodies.length - 1],
        pointB: { x: 20, y: 0 },
        length: 2,
        stiffness: 0.9
    });

    Composite.addConstraint(bridge, constraint1);
    Composite.addConstraint(bridge, constraint2);

    return bridge;
}