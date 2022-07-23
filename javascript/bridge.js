function Bridge() {

    bridge = Composites.stack(vertices[vertices.length - 2].x, h - vertices[vertices.length - 2].y, 19, 1, 0, 0, function (x, y) {
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

    Composites.chain(bridge, 0.3, 0, -0.3, 0, {
        stiffness: 1,
        length: 0,
        render: {
            visible: false
        }
    });

    let constraint1 = Constraint.create({
        bodyA: ground,
        pointA: { x: vertices[vertices.length - 2].x - 10, y: h - vertices[vertices.length - 2].y + 60 },
        bodyB: bridge.bodies[0],
        pointB: { x: -20, y: 0 },
        length: 2,
        stiffness: 0.8
    });

    let constraint2 = Constraint.create({
        bodyA: ground1,
        pointA: { x: vertices[vertices.length - 2].x + 610, y: h - vertices[vertices.length - 2].y + 60 },
        bodyB: bridge.bodies[bridge.bodies.length - 1],
        pointB: { x: 20, y: 0 },
        length: 2,
        stiffness: 0.8
    });

    Composite.addConstraint(bridge, constraint1);
    Composite.addConstraint(bridge, constraint2);

    return bridge;
}