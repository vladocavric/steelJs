// const rollDie = () => {
//    const number =  Math.ceil(Math.random() * 6)
//     console.log(number)
// }

// rollDie()

const isValidPassword = (password, username) => {
    if(password.length >= 8 && !password.includes(' ') && !password.includes(username)) {
        return true
    }
    return false
}

// const average = (array) => array.reduce((a, b) => a + b) / array.length
const average = (array) => {
    let total = 0
    for(let i = 0; i < array.length; i++) {       
        total += array[i]
    }
    return total / array.length
}

const isPangram = (sentence) => {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'
    for(const letter of alphabet) {
        if(sentence.toLowerCase().indexOf(letter) === -1) {
            return false
        }
    }
    return true
}

const pick = (arr) => {
    const index = Math.floor(Math.random() * arr.length)
    return arr[index]
}
const getCard = () => {
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'J', 'Q', 'K']
    const suites = ['clubs', 'spades', 'harts', 'diamonds']
    const card = {
        value: pick(values),
        suite: pick(suites)
    }
    return card
}