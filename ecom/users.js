const fs = require('fs')

const addUser = (email, password) => {
    const users = loadUsers()
    const newUser = {
        email,
        password
    }
    const duplicatedUser = users.find(user => user.email === email)
    if (!duplicatedUser) {
        users.push(newUser)
        saveUsers(users)
        console.log('new user has been added')
    } else {
        console.log('this email is taken')
    }
}

const saveUsers = (users) => {
    const usersString = JSON.stringify(users)
    fs.writeFileSync('users.json', usersString)
}

const loadUsers = () => {
    try {
        const users = JSON.parse(fs.readFileSync('users.json').toString())
        return users
    } catch {
        return[]
    }
}

module.exports = {
    addUser
}