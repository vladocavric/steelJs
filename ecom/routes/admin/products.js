const express = require('express')
const methodOverride = require('method-override')
const multer  = require('multer')

const {handleErrors, isSignIn} = require('./middlewares')
const productsRepo = require('../../repositories/products')
const {requireTitle, requirePrice} = require('./validators')

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.use(methodOverride('_method'))

router.get('/admin/products', isSignIn, async (req, res) => {
        const products = await productsRepo.getAll()
        res.render('products/index', {products})
})

router.get('/admin/products/new', isSignIn, (req, res) => {
    res.render('products/new', {errors: []})
})

router.post('/admin/products', isSignIn, upload.single('image'), [requirePrice, requireTitle], handleErrors('products/new'), async (req, res) => {
    const {title, price} = req.body
    const image = req.file.buffer.toString('base64')
    const product = await productsRepo.create({title, price, image})
    res.redirect('/admin/products')
})

router.get('/admin/products/:id', isSignIn, async (req, res) => {
    const product = await productsRepo.getOneBy({id: req.params.id})
    if (!product) {
        res.redirect('/')
    }
    res.send(product)
})

router.get('/admin/products/:id/edit', isSignIn, async (req, res) => {
    const product = await productsRepo.getOneBy({id: req.params.id})
    if (!product) {
        res.redirect('/admin/products')
    }
    const {title, price, id} = product
    res.render('products/edit', {title, price, id, errors: []})
})

router.put('/admin/products/:id', isSignIn, upload.single('image'), [requirePrice, requireTitle], async (req, res) => {
    const attributes = req.body
    const image = req.file.buffer.toString('base64')
    const updatedProduct = await productsRepo.update(req.params.id, attributes)
    res.redirect(`/admin/products`)
})

router.delete('/admin/products/:id', isSignIn, async (req, res) => {
    await productsRepo.delete(req.params.id)
    res.redirect('/admin/products')
})

module.exports = router