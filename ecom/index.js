const fs = require('fs')
const express = require('express')
const app = express();
const ejs = require('ejs')
const bodyParser = require('body-parser')
const {addUser} = require('./users')


app.set('view engine', 'ejs');
app.use(express.static('themes'));
app.use(bodyParser.urlencoded({extended: true}))
 
app.get('/', (req, res) => {
    res.render('index');
})

app.get('/sign-up', (req, res) => {
    // console.log(req.body)
    
    res.render('signUp');
})

app.post('/sign-up', (req, res) => {
    addUser(req.body.email, req.body.password)  
    res.redirect('/');
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
