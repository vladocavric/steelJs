const express = require('express')

const {handleErrors} = require('./middlewares')
const usersRepo = require('../../repositories/users')
const {requireEmail, requirePassword, requireConfirmPassword, requireValidEmail, requireValidPassword} = require('./validators')
const router = express.Router()


router.get('/sign-up', (req, res) => {
    res.render('auth/signUp', {userId: req.session.userId, errors: []});
})

router.post('/sign-up',[requireEmail, requirePassword, requireConfirmPassword], handleErrors('auth/signUp'), async (req, res) => {
    const {email, password} = req.body
    const user = await usersRepo.create({email, password})
    req.session.userId = user.id
    res.redirect('/admin/products')
})

router.get('/sign-in', (req, res) => {
    res.render('auth/signIn', {errors: []});
})

router.post('/sign-in',[requireValidEmail, requireValidPassword], handleErrors('auth/signIn'), async (req, res) => {
    const {email, password} = req.body
    const user = await usersRepo.getOneBy({email})
    req.session.userId = user.id
    res.redirect('/admin/products')
    // res.send('nesto')
})

router.get('/sign-out', (req, res) => {
    req.session = null
    res.redirect('/sign-in')
})

module.exports = router