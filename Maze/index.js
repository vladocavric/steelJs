const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter
const width = window.innerWidth 
const height = window.innerHeight

// const width = 600
// const height = 600

// const cells = 6
const cellsHorizontal = 16
const cellsVertical = 9

// const unitLength = width / cells
const unitLengthX = width / cellsHorizontal
const unitLengthY = height / cellsVertical

const engine = Engine.create()
engine.world.gravity.y = 0
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

// Walls
const walls = [
    Bodies.rectangle(width/2, 0, width, 2, {
            isStatic: true
        }),
        Bodies.rectangle(width/2, height, width, 2, {
            isStatic: true
        }),
        Bodies.rectangle(0, height/2, 2, height, {
            isStatic: true
        }),
        Bodies.rectangle(width, height/2, 2, height, {
            isStatic: true
        })
]

World.add(world, walls)

// Maze generation
const shuffle = (arr) => {
    let counter = arr.length

    while (counter > 0) {
        const index = Math.floor(Math.random() * counter)
        counter--
        const temp = arr[counter]
        arr[counter] = arr[index]
        arr[index] = temp
    }

    return arr
}
const grid = Array(cellsVertical).fill(null).map(() => Array(cellsHorizontal).fill(false))

const verticals = Array(cellsVertical).fill(null).map(() => Array(cellsHorizontal - 1).fill(false))
const horizontals = Array(cellsVertical - 1).fill(null).map(() => Array(cellsHorizontal).fill(false))

const startRow = Math.floor(Math.random() * cellsVertical)
const startColumn = Math.floor(Math.random() * cellsHorizontal)

const stepThroughCell = (row, column) => {
    // if we have visited the cell at [row, column], then return
    if (grid[row][column]) {
        return
    }
    // Mark this cell as visited
    grid[row][column] = true

    // Assemble randomly-order list of neighbors
    const neighbors = shuffle([
        [row - 1, column, 'up'],
        [row + 1, column, 'down'],
        [row, column + 1, 'right'],
        [row, column - 1, 'left']
    ])
    // For each of neighbors
    for (let neighbor of neighbors) {
        const [nextRow, nextColumn, direction] = neighbor

        // see if that neighbor is out of bounds
        if (nextRow < 0 || nextRow >= cellsVertical || nextColumn < 0 || nextColumn >= cellsHorizontal) {
            continue
        }

        // if we have visited that neighbor, continue to nex neighbor
        if (grid[nextRow][nextColumn]) {
            continue
        }

        //Remove a wall from either horizontal or verticals
        if (direction === 'left') {
            verticals[row][column - 1] = true
        } else if (direction === 'right') {
            verticals[row][column] = true
        } else if (direction === 'up') {
            horizontals[row - 1][column] = true
        } else if (direction === 'down') {
            horizontals[row][column] = true
        }

        stepThroughCell(nextRow, nextColumn)
    }
    // visit that next cell
}

stepThroughCell(startRow, startColumn)
// stepThroughCell(1, 1)

horizontals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
        if (open) {
            return
        }
        const wall = Bodies.rectangle(
            columnIndex * unitLengthX + unitLengthX / 2,
            rowIndex * unitLengthY + unitLengthY,
            unitLengthX,
            5,
            {
                label: 'wall',
                isStatic: true,
                render: {
                    fillStyle: 'red'
                }
            }
        )
        World.add(world, wall)
    })
})

verticals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
        if (open) {
            return
        }
        const wall = Bodies.rectangle(
            columnIndex * unitLengthX + unitLengthX,
            rowIndex * unitLengthY + unitLengthY / 2,
            5,
            unitLengthY,
            {
                label: 'wall',
                isStatic: true,
                render: {
                    fillStyle: 'red'
                }
            }
        )
        World.add(world, wall)
    })
})
// Goal
const goal = Bodies.rectangle(
    width - unitLengthX / 2,
    height - unitLengthY / 2,
    unitLengthX * .7,
    unitLengthY * .7,
    {
        isStatic: true,
        label: 'goal',
        render: {
            fillStyle: 'green'
        }
    }
)
World.add(world, goal)

// Ball
const ballRadius = Math.min(unitLengthX, unitLengthY) / 4
const ball = Bodies.circle(
    unitLengthX / 2,
    unitLengthY / 2,
    ballRadius,
    {
        label: 'ball',
        render: {
            fillStyle: 'blue'
        }
    }
)
World.add(world, ball)

document.addEventListener('keydown', e => {
    const { x, y } = ball.velocity
    if (e.keyCode === 87 || e.keyCode === 38) {
        Body.setVelocity(ball, {x, y: y - 5 })
    }
    if (e.keyCode === 83 || e.keyCode === 40) {
        Body.setVelocity(ball, {x, y: y + 5 })
    }
    if (e.keyCode === 65 || e.keyCode === 37) {
        Body.setVelocity(ball, {x: x - 5, y })
    }
    if (e.keyCode === 68 || e.keyCode === 39) {
        Body.setVelocity(ball, {x: x + 5, y })
    }

})


// Win Condition
const message = document.querySelector('h1')
Events.on(engine, 'collisionStart', e => {
    e.pairs.forEach(collision => {
        // console.log(collision.collision.bodyA.label)
        const labels = ['goal', 'ball']
        if (labels.includes(collision.collision.bodyA.label) && labels.includes(collision.collision.bodyB.label)) {
            world.gravity.y = 1
            message.classList.remove('d-none')
            world.bodies.forEach(body => {
                if (body.label === 'wall'){
                    Body.setStatic(body, false)
                }
            })
        }
    })
})