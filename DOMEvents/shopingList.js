const input = document.querySelector('input')
const ul = document.querySelector('ul')

input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        if (!this.value) {
            return
        }
        const li = document.createElement('li')
        li.innerHTML = `${this.value} <button>x</button>`
        this.value = ''
        ul.appendChild(li)
        const button = document.querySelector('li:last-child button')
    }
})
