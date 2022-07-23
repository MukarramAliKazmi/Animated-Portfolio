let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Bounds = Matter.Bounds,
    Composites = Matter.Composites,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint;


let engine = Engine.create(),
    world = engine.world;

const w = window.innerWidth * 2;
const h = window.innerHeight;

let render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: w,
        height: h,
        hasBounds: true,
        showAngleIndicator: true,
    },
});

let canvas
let tyres
let truck_body
let plant
let truck
let vertices0
let vertices
let vertices1
let ground0
let ground
let ground1
let bridge0
let bridge
let group = Body.nextGroup(true);