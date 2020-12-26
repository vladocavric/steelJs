const fs = require('fs')
const express = require('express')
const app = express();
const ejs = require('ejs')
const bodyParser = require('body-parser')
// const {addUser} = require('./users')
const usersRepo = require('./repositories/users')


app.set('view engine', 'ejs');
app.use(express.static('themes'));
app.use(bodyParser.urlencoded({extended: true}))
 
app.get('/', (req, res) => {
    res.render('index');
})

app.get('/sign-up', (req, res) => {
    res.render('signUp');
})

app.post('/sign-up', async (req, res) => {
    const {email, password, confirmPassword} = req.body
    const existingUser = await usersRepo.getOneBy({email})
    if (existingUser) {
        res.send('Email already in use')
    } 
    if (password !== confirmPassword) {
        res.send('Please check password')
    }
    res.send('Account created')
})

app.get('/sign-in', (req, res) => {
    res.render('signIn');
})

app.post('/sign-in', (req, res) => {
    console.log(req)
    res.redirect('/');
})

app.get('*', (req, res) => {
    res.send({message: '404 page not found'});
})

const port = process.env.PORT

app.listen(port, function (err, server) {
    if (err) {
        console.log(err)
    } else {
        console.log(`server is working on link: http://localhost:${port}`)
    }
});
