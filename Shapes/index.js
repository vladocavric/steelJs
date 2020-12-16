const { Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse } = Matter
const width = window.innerWidth 
const height = window.innerHeight

const engine = Engine.create()
const { world } = engine
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: false,
        width,
        height
    }
})
Render.run(render)
Runner.run(Runner.create(), engine)

World.add(world, MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas)
}))




// Walls
const walls = [
    Bodies.rectangle(width/2, 25, width, 50, {
            isStatic: true
        }),
        Bodies.rectangle(width/2, height-26, width, 50, {
            isStatic: true
        }),
        Bodies.rectangle(25, height/2, 50, height-100, {
            isStatic: true
        }),
        Bodies.rectangle(width-25, height/2, 50, height-100, {
            isStatic: true
        })
]

World.add(world, walls)

for (let i = 0; i < 50; i++) {
    World.add(world, Bodies.rectangle(Math.random() * width, Math.random() * height, 50, 50, {
        // isStatic: true
    }))
    World.add(world, Bodies.circle(Math.random() * width, Math.random() * height, 50, {
        // isStatic: true
    }))
}
