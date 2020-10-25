const checkTerms = document.querySelector('#terms')
const inputNumber = document.querySelector('#number')
const inputName = document.querySelector('#name')
const selectFruit = document.querySelector('#fruit')
console.log(selectFruit)
const form = document.querySelector('form')

form.addEventListener('submit', function(e) {
    e.preventDefault()
    console.log(checkTerms.checked)
    console.log(inputNumber.value)
    console.log(inputName.value)
    console.log(selectFruit.value)
})

//==========================================================================================

const formData = {}
for (const input of [checkTerms, inputName, inputNumber, selectFruit]) {
    input.addEventListener('change', ({target}) => {
        const {name, value, checked} = target
        formData[name] = name === 'terms' ? checked : value
        console.log(formData)
    })
}
// checkTerms.addEventListener('input', e => {
//     formData.terms = e.target.checked
//     console.log(formData)
// })

// inputNumber.addEventListener('input', e => {
//     formData.number = e.target.value
//     console.log(formData)
// })

// inputName.addEventListener('input', e => {
//     formData.number = e.target.value
//     console.log(formData)
// })

// selectFruit.addEventListener('input', e => {
//     formData.number = e.target.value
//     console.log(formData)
// })