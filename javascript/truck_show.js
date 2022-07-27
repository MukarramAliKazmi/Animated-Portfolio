function TruckShow(tyres, character, truck_body) {

    push();
    translate(200, truck.bodies[1].position.y - 0.5);
    rotate(truck.bodies[1].angle);
    image(tyres, 0, 0, 44, 44);
    pop();

    push();
    translate(
        200 + (truck.bodies[2].position.x - truck.bodies[1].position.x),
        truck.bodies[2].position.y
    );
    rotate(truck.bodies[2].angle);
    image(tyres, 0, 0, 44, 44);
    pop();

    push();
    translate(
        200 + (truck.bodies[3].position.x - truck.bodies[1].position.x),
        truck.bodies[3].position.y
    );
    rotate(truck.bodies[3].angle);
    image(character, -25, -18, 25, 25);
    pop();

    push();
    translate(
        200 + (truck.bodies[0].position.x - truck.bodies[1].position.x),
        truck.bodies[0].position.y
    );
    rotate(truck.bodies[0].angle);
    image(truck_body, 0, 0, 868.02 * 0.3, 263.5 * 0.3);
    pop();
}