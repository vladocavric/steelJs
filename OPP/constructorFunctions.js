// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new

function Car(brand, model, year) {
    this.brand = brand
    this.model = model
    this.year = year
}

const car1 = new Car('Eagle', 'Talon TSi', 1993)

console.log(car1.brand)

//   Creates a blank, plain JavaScript object;
// Links (sets the constructor of) the newly created object to another object by setting the other object as its parent prototype;
// Passes the newly created object from Step 1 as the this context;
// Returns this if the function doesn't return an object.

function Color(r, g, b) {
    this.r = r
    this.g = g
    this.b = b
}

// ukoliko ubacimo metodu u okvriru konstruktor funkcije kao npr:
// function Color(r, g, b) {
//     this.r = r
//     this.g = g
//     this.b = b
//     color.rgb = function() {
//         const {r, g, b} = this
//         return `rgb(${r}, ${g}, ${b})`
//     }
// }

// imamo isti problem kao i na factory funkcimama, medjutim ovde imamo zaoblazni put oko toga

Color.prototype.rgbStart = function() {
    const {r, g, b} = this
    return `${r}, ${g}, ${b}`
}

Color.prototype.rgb = function() {
    return `rgb(${this.rgbStart()})`
}

Color.prototype.hex = function() {
    const {r, g, b} = this
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

Color.prototype.rgba = function(a = 1) {
    return `rgb(${this.rgbStart()}, ${a})`
}

const greenish = new Color(54, 255, 150)
console.log(greenish.hex())
console.log(greenish.rgb())
const redish = new Color(255, 54, 150)
console.log(redish.hex())
console.log(redish.rgb())

const body = document.body

body.style.background = redish.rgba(0.5)