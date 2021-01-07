const assert = require('assert').strict
const {forEach} = require('../index')

let numbers
beforeEach(() => {
    numbers = [1,2,3]
})
it('should sum an array', () => {
    const numbers = [1,2,3]
    let total = 0
    forEach(numbers, (number) => {
        total += number
    } )
    assert.strictEqual(total, 7)
    numbers.push(3)
    numbers.push(3)
    numbers.push(3)
    numbers.push(3)
})

it('beforeEach is run each time', () => {
    assert.strictEqual(numbers.length, 3)
})

