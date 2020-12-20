#!/usr/bin/env node

const fs = require('fs')
const chalk = require('chalk')
const path = require('path')
const { lstat } = fs.promises

const targetDir = process.argv[2] || process.cwd()
// console.log(targetDir)

fs.readdir(targetDir, async (err, filenames) => {
    if (err) {
        throw new Error(err)
    }
    const statPromises = filenames.map(filename => {
        return lstat(path.join(targetDir, filename))
    })
    const allStats = await Promise.all(statPromises)
    for (let stats of allStats) {
        const index = allStats.indexOf(stats)
        console.log(filenames[index], stats.isFile())
    }
})