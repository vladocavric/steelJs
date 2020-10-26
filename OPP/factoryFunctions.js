function hex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

function rgb(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`
}

const makeColor = function(r, g, b) {
    const color = {}
    color.r = r
    color.g = g
    color.b = b
    color.hex = function() {
        const {r, g, b} = this
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
    }
    color.rgb = function() {
        const {r, g, b} = this
        return `rgb(${r}, ${g}, ${b})`
    }
    return color
}

const grinish = makeColor(54, 255, 150)
console.log(grinish.hex())
console.log(grinish.rgb())
const redish = makeColor(54, 255, 150)
console.log(redish.hex())
console.log(redish.rgb())

const body = document.body

body.style.background = grinish.hex()

// ovo se uglavnom ne koristi razlog je jednostavan, nakon svakog kreiranja objekta kreiraju se i njemu jedistvene Metode 
// u ovom slucaju stu to rgb i hex.
// To mozemo da proverimo tako sto cemo proveriti reference na te metode 
// grinish.hex === redish.hex ce vratiit false
// dok  redimo ako uporedimo reference na string metode kao npr 
// "kako sad to".lehght === "zasto sad to".lenght ce vratiit true
// ovaj problem resavaju konstruktor funkcije