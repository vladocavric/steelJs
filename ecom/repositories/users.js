const fs = require('fs')
const crypto = require('crypto')
class UsersRepositories {
    constructor(filename) {
        if (!filename) {
            throw new Error('Createing a new repository requires a filename')
        }
        this.filename = filename
        try {
            fs.accessSync(this.filename)
        } catch {
            fs.writeFileSync(this.filename, '[]') 
        }
    }
    async getAll() {
        // Open the file called this.filename, parse the contents and return
        try{
            return JSON.parse(await fs.promises.readFile(this.filename, {encoding: 'utf8'}))
        } catch {
            console.log('nesto je poslo po zlu')
        }
    }
    async getOne(id) {
        const records = await this.getAll()
        return records.find(record => record.id === id)
    }

    async getOneBy(filters) {
        const records = await this.getAll()
        for (let record of records) {
            let found = true
            for (let key in filters) {
                if (record[key] !== filters[key]) {
                    found = false
                }
            }
            return found ?  record : undefined
            // if (found) {
            //     return record
            // }
        }
    }

    async create(attributes) {
        attributes.id = this.randomId()
        const records = await this.getAll()
        await records.push(attributes)
        this.writeAll(records)
    }

    async update(id, attributes) {
        const records = await this.getAll()
        const record = records.find(record => record.id === id)
        if (!record) {
            throw new Error(`There is no user with this id:${id}`)
        }
        attributes.id = id
        Object.assign(record, attributes)
        this.writeAll(records)


        // moze i ovako
        // const index = await records.findIndex(record => record.id === id)
        // attributes.id = records[index].id
        // index >= 0 ? await records.splice(index, 1, attributes) : null   
        // this.writeAll(records)
    }
    async delete(id) {
        const records = await this.getAll()
        const filteredRecords = records.filter(record => record.id !== id)
        this.writeAll(filteredRecords)
        
        
        // can be doen and this way
        // const index = await records.findIndex(record => record.id === id)
        // index >= 0 ? await records.splice(index, 1) : null       
        // this.writeAll(records)
    }
    randomId() {
        return crypto.randomBytes(12).toString('hex')
    }
    async writeAll(records) {
        await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 4))
    }
}

module.exports = new UsersRepositories('users.json')