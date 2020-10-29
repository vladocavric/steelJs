const play = document.querySelector('.fa-play')
const pause = document.querySelector('.fa-pause')
const liteBox = document.querySelector('.light-box')
const close = document.querySelector('.close')
const timerDisplay = document.querySelector('.timer')
const inputTimer = document.querySelector('.input-timer')
//====================================================================================================
let duration = 15
let leftTime = duration
let timer
const myTimer = () => {
    leftTime -= 1
    // console.log(leftTime)
}

timer = setInterval(myTimer, 1000)

window.addEventListener('load', () => {
    setTimeout(() => {
        clearInterval(myTimer)
    }, 5000)
} )
//====================================================================================================

play.addEventListener('click', () => {
    timer = setInterval(myTimer, 1000)
    console.log('play clicked')
    var time = 5
    // display = document.querySelector('.timer');
    // startTimer(time, timerDisplay);
})

pause.addEventListener('click', () => {
    console.log('pouse clicked')
    clearInterval(myTimer)
})

close.addEventListener('click', () => {
    liteBox.classList.add('d-none')
    liteBox.classList.remove('d-flex')
})

inputTimer.addEventListener('focusout', () => {
    liteBox.classList.add('d-none')
    liteBox.classList.remove('d-flex')
})

timerDisplay.addEventListener('click', () => {
    liteBox.classList.add('d-flex')
    liteBox.classList.remove('d-none')
    const nesto = inputTimer.getBoundingClientRect()
    // console.log(nesto)
})

// const  startTimer = (duration, display) => {
//     let leftTime = duration
//     let minutes
//     let seconds
//     setInterval( () => {
//         minutes = parseInt(leftTime / 60, 10);
//         seconds = parseInt(leftTime % 60, 10);

//         minutes = minutes < 10 ? "0" + minutes : minutes;
//         seconds = seconds < 10 ? "0" + seconds : seconds;

//         display.textContent = minutes + ":" + seconds;
//         leftTime -= 1
//         if (leftTime <= 0) {
//             leftTime = 0;
//         }
//     }, 1000)
// }

// const someTimer = (durationx) => {
//     setInterval(() => {
//         durationx -= 1
//         // console.log(durationx)
//     }, 1000)
// }

// someTimer(100)