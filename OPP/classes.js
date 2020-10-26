class Color {
    constructor(r, g, b, name){
        this.r = r
        this.g = g
        this.b = b
        this.name = name
    }
    rgbStart() {
        const {r, g, b} = this
        return `${r}, ${g}, ${b}`
    }
    rgb() {
        return `rgb(${this.rgbStart()})`
    }
    rgba(a = 1) {
        return `rgba(${this.rgbStart()}, ${a})`
    }
    hex() {
        const {r, g, b} = this
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
    }
    calcHSL() {
        let {r, g, b} = this

        r /= 255
        b /= 255
        g /= 255

        let cmin = Math.min(r, g, b)
        let cmax = Math.max(r, g, b)
        let delta = cmax - cmin
        let h = 0
        let l = 0
        let s = 0
        if (delta == 0) {
            h = 0
        } else if (cmax == r) {
            h = ((g - b) / delta) % 6
        } else if (cmax == g) {
            h = (b - r) / delta + 2
        } else {
            h = (r - g) / delta + 4
        }

        h = Math.round(h * 60)

        if (h < 0) h += 360
        l = (cmax + cmin) / 2
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
        s = +(s * 100).toFixed(1)
        l = +(l * 100).toFixed(1)
        this.h = h;
		this.s = s;
        this.l = l;
        this.calcHSL()
    }
    hsl() {
        const {h, s, l} = this
        return `hsl(${h}, ${l}%, ${s}%)`
    }
    opposite() {
        const {h, s, l} = this
        return `hsl(${(h + 180) % 360}, ${s}%, ${l}%)`
    }
}

const greenish = new Color(54, 200, 100, 'greenish')
console.log(greenish.hex())
console.log(greenish.rgb())
const redish = new Color(255, 54, 150, 'redish')
console.log(redish.hex())
console.log(redish.rgb())

const body = document.body

body.style.background = greenish.rgba(0.5)