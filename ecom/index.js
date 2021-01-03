const fs = require('fs')
const express = require('express')
const app = express();
const ejs = require('ejs')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const authRoutes = require('./routes/admin/auth')
const productRoutes = require('./routes/admin/products')



app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieSession({
    keys: ['koji sam ja sebi kralj']
}))
app.use(authRoutes)
app.use(productRoutes)

app.get('/', (req, res) => {
    res.render('index');
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
