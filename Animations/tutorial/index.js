
const startButton = document.querySelector('.fa-play')
const pauseButton = document.querySelector('.fa-pause')
const duration = document.querySelector('.timer')
const circle = document.querySelector('.circle2')

const perimeter = Math.round(circle.getAttribute('r') * 2 * Math.PI)


circle.setAttribute('stroke-dasharray', perimeter)
let currentOffset = 0
let timeTotal
let increment
const timer = new Timer(duration, startButton, pauseButton, {
    onStart(totalTime) {
        timeTotal = totalTime
        increment = (perimeter / (timeTotal*50))
        currentOffset =  currentOffset + increment
    },
    onTick(timeRemaining) {
        circle.setAttribute('stroke-dashoffset', currentOffset)
        currentOffset =  currentOffset + increment
    },
    onComplete() {
        console.log('done')
    }
})