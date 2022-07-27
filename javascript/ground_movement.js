function GroundInterval() {

    setInterval(function () {
        render.bounds.min.x = truck.bodies[1].bounds.min.x - 230;
        render.bounds.max.x = truck.bodies[1].bounds.min.x + render.options.width - 230;
    });

    setInterval(function () {

        if (truck.bodies[0].position.x > 4040) {

            if (ground.position.x < 2000 && ground.position.x > 0) {

                Body.setPosition(ground1, { x: ground1.position.x - 3600, y: ground1.position.y });
                Body.setPosition(ground, { x: ground.position.x - 3600, y: ground.position.y });

                vertices0 = Vertices()
                World.remove(world, [ground0])
                ground0 = Ground(vertices0, 3600)
                World.add(world, [ground0])

            } else if (ground.position.x < 0) {

                Body.setPosition(ground0, { x: ground0.position.x - 3600, y: ground0.position.y });
                Body.setPosition(ground1, { x: ground1.position.x - 3600, y: ground1.position.y });

                vertices = Vertices()
                World.remove(world, [ground])
                ground = Ground(vertices, 3600)
                World.add(world, [ground])

            } else {

                Body.setPosition(ground0, { x: ground0.position.x - 3600, y: ground0.position.y });
                Body.setPosition(ground, { x: ground.position.x - 3600, y: ground.position.y });

                vertices1 = Vertices()
                World.remove(world, [ground1])
                ground1 = Ground(vertices1, 3600)
                World.add(world, [ground1])

            }

            for (let i = 0; i < truck.bodies.length; i++)
                Body.setPosition(truck.bodies[i], {
                    x: truck.bodies[i].position.x - 3600,
                    y: truck.bodies[i].position.y,
                });

        } else if (truck.bodies[0].position.x < (4040 - 3600 * 2)) {

            if (ground.position.x < 2000 && ground.position.x > 0) {

                Body.setPosition(ground0, { x: ground0.position.x + 3600, y: ground0.position.y });
                Body.setPosition(ground, { x: ground.position.x + 3600, y: ground.position.y });

                vertices1 = Vertices()
                World.remove(world, [ground1])
                ground1 = Ground(vertices1, -3600)
                World.add(world, [ground1])

            } else if (ground.position.x < 0) {

                Body.setPosition(ground, { x: ground.position.x + 3600, y: ground.position.y });
                Body.setPosition(ground1, { x: ground1.position.x + 3600, y: ground1.position.y });

                vertices0 = Vertices()
                World.remove(world, [ground0])
                ground0 = Ground(vertices0, -3600)
                World.add(world, [ground0])

            } else {

                Body.setPosition(ground0, { x: ground0.position.x + 3600, y: ground0.position.y });
                Body.setPosition(ground1, { x: ground1.position.x + 3600, y: ground1.position.y });

                vertices = Vertices()
                World.remove(world, [ground])
                ground = Ground(vertices, -3600)
                World.add(world, [ground])

            }

            for (let i = 0; i < truck.bodies.length; i++)
                Body.setPosition(truck.bodies[i], {
                    x: truck.bodies[i].position.x + 3600,
                    y: truck.bodies[i].position.y,
                });
        }
    });
}