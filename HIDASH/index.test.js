const assert = require('assert').strict
const {forEach, map} = require('./index')
const test = (des, fn) => {
    console.log('---------', des)
    try {
        fn()
    } catch (err) {
        console.log(err.message)
    }
}

it('test forEach fn', () => {
    let sum = 0
    forEach([1,2,3], (val) => {
        sum = sum + val
    })

    assert.strictEqual(sum, 6)
    
    // if (sum !== 6) {
    //     throw new Error('ocekivana vrednost je 6, ali mi to nismo dobili')
    // }
})


it('test for map fn', () => {
    const result = map([1,2,3], (val) => {
        return val * 2
    })
    assert.deepStrictEqual(result, [2,4,6])
    // assert.strictEqual(result[0], 2, `we expected 2 but we got ${result[0]}`)
    // assert.strictEqual(result[1], 4)
    // assert.strictEqual(result[2], 6)
    // if (result[0] !== 2) { 
    //     throw new Error(`we expected 2 but we got ${result[0]}`)
    // }
    
    // if (result[1] !== 4) {
    //     throw new Error(`we expected 4 but we got ${result[1]}`)
    // }
})