const form = document.querySelector('form')
const input = document.querySelector('#message-input')
const linkInput = document.querySelector('#link-input')
const copyBtn = document.querySelector('#copy-btn')
const cardPanel = document.querySelectorAll('.card-panel')
const message = document.querySelector('.message')

const { hash } = window.location

if (hash) {
    console.log('ovde ima tajna poruka')
    cardPanel[0].classList.add('hide')
    cardPanel[2].classList.remove('hide')
    const dec = atob(hash.replace('#', ''))
    console.log(dec)
    message.innerHTML = dec
}

form.addEventListener('submit', e => {
    e.preventDefault()
    const curUrl = `${window.location}`
    const enc = btoa(input.value)
    linkInput.value = `${curUrl}#${enc}`
    cardPanel[0].classList.add('hide')
    cardPanel[1].classList.remove('hide')
    linkInput.select()
})

copyBtn.addEventListener('click', e => {
    linkInput.select()
    document.execCommand('copy')
})