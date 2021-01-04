const fs = require('fs')
const crypto = require('crypto')
const util = require('util')
const scrypt = util.promisify(crypto.scrypt)
const Repository = require('./repository')
// const Repository = require('./repository')


class CartsRepository extends Repository {}

module.exports = new CartsRepository('carts.json')

