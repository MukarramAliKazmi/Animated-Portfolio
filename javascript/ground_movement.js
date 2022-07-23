function GroundInterval() {

    setInterval(function () {
        render.bounds.min.x = truck.bodies[1].bounds.min.x - 230;
        render.bounds.max.x = truck.bodies[1].bounds.min.x + render.options.width - 230;
    });

    setInterval(function () {

        if (truck.bodies[0].position.x > 4040) {

            if (ground.position.x < 2000) {
                vertices = Vertices()

                Body.setPosition(ground1, {
                    x: ground1.position.x - 3600,
                    y: ground1.position.y,
                });

                World.remove(world, [ground])
                ground = Ground(vertices, 3600)
                World.add(world, [ground])

            } else {
                vertices1 = Vertices()

                Body.setPosition(ground, {
                    x: ground.position.x - 3600,
                    y: ground.position.y,
                });

                World.remove(world, [ground1])
                ground1 = Ground(vertices1, 3600)
                World.add(world, [ground1])
            }

            Body.setPosition(truck.bodies[0], {
                x: truck.bodies[0].position.x - 3600,
                y: truck.bodies[0].position.y,
            });

            Body.setPosition(truck.bodies[1], {
                x: truck.bodies[1].position.x - 3600,
                y: truck.bodies[1].position.y,
            });

            Body.setPosition(truck.bodies[2], {
                x: truck.bodies[2].position.x - 3600,
                y: truck.bodies[2].position.y,
            });
        }
    });
}