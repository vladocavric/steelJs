const play = document.querySelector('#play')
const pause = document.querySelector('#pause')
let duration = 15
let leftTime = duration
const myTimer = () => {
    leftTime -= 1
    // console.log(leftTime)
}


// let timer 
// = setInterval(myTimer, 1000)

// window.addEventListener('load', () => {
//     setTimeout(() => {
        
//     }, 5000)
// } )
play.addEventListener('click', () => {
    console.log('play')
    let timer = setInterval(myTimer, 1000)
    return timer
})
pause.addEventListener('click', () => {
    console.log('pause')
    clearInterval(timer)
})