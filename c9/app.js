// const square = n => n * n

// const nums = [1, 2, 3, 0.5, 114, 5, 75]

// const sum = nums.reduce((total, currentVal) => {
//     return total * currentVal
// })

// console.log(sum)

// const max = nums.reduce((max, currentVal) => currentVal > max ? currentVal : max)

// const min = nums.reduce((min, currentVal) => currentVal < min ? currentVal : min)

// const maxMath = nums.reduce((max, currentVal) => Math.max(max, currentVal), 150)

// const minMath = nums.reduce((max, currentVal) => Math.min(max, currentVal), -150)

const votes = ['y', 'y', 'n', 'n', 'y','y', 'y', 'n', 'n', 'y','y', 'y', 'n', 'n', 'y','y', 'y', 'n', 'n', 'y','y', 'y', 'n', 'n', 'y','y', 'y', 'n', 'n', 'y','y', 'y', 'n', 'n', 'y','y', 'y', 'n', 'n', 'y',]

// const res = votes.reduce((total, currentVal) => {
//     if (total[currentVal]) {
//         total[currentVal]++
//     } else {
//         total[currentVal] = 1
//     }
//     return total
// }, {})

const res = votes.reduce((total, currentVal) => {
    total[currentVal] = (total[currentVal] || 0) +1  
    return total
}, {})

const role = 'Director'
const role2 = 'Host'
const person = 'James Cameron'
const person2 = 'Jeremy Clakson'

const team = {
    [role]: person,
    [role2]: person2,
    [6+10]: 'sexteen'
}

const addMember = (obj, k, v) => {
    return {
        ...obj,
        [k]: v
    }
}


const newTeam = addMember(team, 'happy', ':)')

function sayHi() {
    console.log("hi")
    console.log(this)
}

const greet = () => {
    console.log("hello")
    console.log(this)
}

const neko = {
    firstName: 'Nikola',
    lastName: 'Simic',
    nickName: 'Dusko dugousko',
    fullName() {
        const  {
            firstName,
            lastName,
            nickName
        } = this
        return `${firstName} ${lastName} zvani ${nickName}`
    },
    printBio() {
        const fullName = this.fullName()
        console.log(`${fullName} i covek`)
    }
}

const annoyer = {
    phrases: ['literally', 'cray cray', 'I can\'t even', 'Totes!', 'Yolo', 'Can\'t Stop, Won\'t stop'],
    pickPhrase() {
        const index = Math.floor(Math.random() * this.phrases.length)
        return this.phrases[index]
    },
    start() {
        // console.log(this)
        this.timer = setInterval(() => { 
            console.log(this.pickPhrase())
            
        }, 3000)
    },
    stop() {
        clearInterval(this.timer)
    }
}


// const myDeck = () => {
//     const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'J', 'Q', 'K']
//     const suites = ['clubs', 'spades', 'harts', 'diamonds']
//     const deck = []
//     for(const value of values) {
//         for(const suite of suites) {
//             const card = {
//                 value,
//                 suite
//             }
//             deck.push(card)
//         }
//     }
//     return deck
// }

const myDeck = {
    values: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'J', 'Q', 'K'],
    suites: ['clubs', 'spades', 'harts', 'diamonds'],
    deck: [],
    drownCards: [],
    initializeDeck() {
        const {
            values,
            suites,
            deck
        } = this
        for(const value of values) {
            for(const suite of suites) {
                const card = {
                    value,
                    suite
                }
                deck.push(card)
            }
        }
    },
    suffleDeck() {
        const {deck} = this
        for(let i = deck.length -1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i+1))
            const temp = deck[i]
            deck[i] = deck[j]
            deck[j] = temp
        }
    },
    drowCard() {
        const {
            deck,
            drownCards
        } = this
        const card = deck.pop()
        drownCards.push(card)
        return card
    },
    drowMultipleCards(numCards) {
        const nawDrownCards = []
        for(let i = 0; i < numCards; i ++) {
            const cards = this.drowCard()
            nawDrownCards.push(cards)
        }
        return nawDrownCards
    }
}

myDeck.initializeDeck()
myDeck.suffleDeck()



