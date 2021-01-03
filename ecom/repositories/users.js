const fs = require('fs')
const crypto = require('crypto')
const util = require('util')
const scrypt = util.promisify(crypto.scrypt)
const Repository = require('./repository')
class UsersRepositories extends Repository {
    async create(attributes) {
        attributes.id = this.randomId()
        const salt = await crypto.randomBytes(8).toString('hex')
        const buffer = await scrypt(attributes.password, salt, 64)
        const hash = await buffer.toString('hex')
        const records = await this.getAll()
        const record = {
            ...attributes,
            password: `${hash}.${salt}`
        }
        await records.push(record)
        this.writeAll(records)
        return record
    }

    async comperePasswords(saved, supplied) {
        const [hashed, salt] = saved.split('.')
        const buffer = await scrypt(supplied, salt, 64)
        const hash = await buffer.toString('hex')
        return hashed === hash
    }
}

module.exports = new UsersRepositories('users.json')