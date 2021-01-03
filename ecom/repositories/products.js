const fs = require('fs')
const crypto = require('crypto')
const util = require('util')
const scrypt = util.promisify(crypto.scrypt)
const Repository = require('./repository')

class ProductsRepositories extends Repository {}

module.exports = new ProductsRepositories('products.json')