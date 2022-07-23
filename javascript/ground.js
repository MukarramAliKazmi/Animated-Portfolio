function Ground(vertices, position) {
    let ground = Bodies.fromVertices(
        w, h,
        vertices,
        {
            isStatic: true,
            collisionFilter: { group: group }
        },
        flagInternal = true,
    );

    Body.setPosition(ground, {
        x: w - ground.bounds.min.x + position,
        y: h - ground.bounds.max.y + h,
    });

    return ground;
}