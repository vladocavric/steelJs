const fs = require('fs')
const path = require('path')
const { lstat } = fs.promises
const chalk = require('chalk')
const render = require('./render')


const forbiddenDir = ['node_modules']

class Runner {
    constructor() {
        this.testFiles = []
    }
    async runTests() {
        for (let file of this.testFiles) {
            console.log(chalk.gray(`------ ${file.shortname}`))
            const beforeEaches = []
            global.render = render
            global.beforeEach = (fn) => {
                beforeEaches.push(fn)
            }
            global.it = async (description, fn) => {
                // console.log(description)
                beforeEaches.forEach(func => func())
                try {
                    await fn()
                    console.log(chalk.green.bold(`\tOK - ${description}`))
                } catch(err) {
                    console.log(chalk.red.bold(`\tX - ${description}`))
                    console.log(chalk.red.bold('\t', err.message))
                }
            }
            try {
                require(file.name)
            } catch (err) {
                const message = err.message.replace(/\n/g, '\n\t\t')
                console.log(chalk.red.bold('X - Error Loading File', file.name))
                console.log(chalk.red.bold('\t', message))
            }

        }
    }
    async collectFiles(targetDir) {
        const files = await fs.promises.readdir(targetDir)
        for (let file of files) {
            const filepath = path.join(targetDir, file)
            const stats = await lstat(filepath)

            if (stats.isFile() && file.includes('.test.js')) {
                this.testFiles.push({name: filepath, shortname: file})
            } else if (stats.isDirectory() && !forbiddenDir.includes(file)) {
                const childFolders = await fs.promises.readdir(filepath)
                files.push(...childFolders.map(f => path.join(file, f)))
            }
        }
    }
}

module.exports = Runner