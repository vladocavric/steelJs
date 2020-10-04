const cards = {
    values: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'J', 'Q', 'K'],
    suites: ['clubs', 'spades', 'harts', 'diamonds'],
    deck: [],
    drownCards: [],
    createDeck() {
        const {
            values,
            suites,
            deck,
        } = this
        for (const value of values) {
            for (const suite of suites) {
                const card = {
                    value,
                    suite
                }
                deck.push(card)
            }
        }
    },
    shufleDeck() {
        const {
            deck
        } = this
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i)
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
    },
    drowMultipleCards(num) {
        for (let i = 0; i < num; i++) {
            this.drowCard()
        }
    }
}

cards.createDeck()