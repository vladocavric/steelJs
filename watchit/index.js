#!/usr/bin/env node
const fs = require('fs')
const {spawn} = require('child_process')
const chokidar = require('chokidar')
const debounce = require('lodash.debounce')
const prog = require('caporal')
const chalk = require('chalk')

const fsPromises = fs.promises

prog
    .version('1.0.0')
    .argument('[filename]', 'Name of a file to execute')
    .action( async ({filename}) => {
        const name = filename || 'index.js'

        try {
            await fsPromises.access(name)
        } catch (err) {
            throw new Error(`Could not find the file ${name}`)
        }
        let proc
        const start = debounce(() => {
            if (proc) {
                proc.kill()
            }
            console.log(chalk.bgYellow.black('>>>starting process<<<'))
            proc = spawn('node', [name], {stdio: 'inherit'})
        }, 100)
        
        chokidar.watch('.')
            .on('add', start)
            .on('change', start)
            .on('unlink', start)
        
    })

prog.parse(process.argv)



