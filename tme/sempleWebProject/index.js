const form = document.querySelector('form')

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const {value} = document.querySelector('input')
    const header = document.querySelector('h1')
    if (value.includes('@')) {
        header.innerHTML = 'Looks good'
    } else {
        header.innerHTML = 'invalid email'
    }
})

window.stuffLoaded = true