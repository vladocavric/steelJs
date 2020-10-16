const width = window.innerWidth
const height = window.innerHeight
const button = document.querySelector('button')
button.addEventListener('mouseover', function() {
    const btnWidth = this.clientWidth
    const btnHeight = this.clientHeight
    let  posLeft = Math.floor(Math.random() * width - btnWidth)
    let  posTop = Math.floor(Math.random() * height - btnHeight)
    posLeft < 0 ? posLeft = 0 : posLeft
    posTop < 0 ? posTop = 0 : posTop
    this.style = `left: ${posLeft}px; top: ${posTop}px`
})

button.addEventListener('click', () => {
    alert('pa ljudi moji da li je ovo moguce')
})

//====================================================================================================
// boxes

