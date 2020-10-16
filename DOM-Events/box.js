const colors = ['green', 'yellow', 'purple', 'blue', 'black', 'violet', 'red', 'pink', 'teal', 'tomato', 'aqua', 'azure', 'cyan']
const section = document.querySelector('section')
const printColor = function(e) {
    console.log(e)
    const title = document.querySelector('h1')
    // console.log(this.style.background)
    // console.log(window.getComputedStyle(this).backgroundColor)
    title.style.color = window.getComputedStyle(this).backgroundColor
}
for (const color of colors) {
    const box = document.createElement('div')
    box.classList.add('box')
    box.style.background = color
    section.appendChild(box)
    box.addEventListener('click', printColor)
}

