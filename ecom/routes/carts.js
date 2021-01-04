// const express = require('express')
// const cartRepo = require('../repositories/carts')
// const productRepo = require('../repositories/products')

// const router = express.Router()

// //add to cart route
// router.post('/products', async (req, res) => {
//     let cart
//     if (req.session.cartId) {
//         cart = await cartRepo.getOne(req.session.cartId)
//     } else {
//         cart = await cartRepo.create({items: []})
//         req.session.cartId = cart.id
//     }


//     const existingItem = await cart.items.find(item => item.id === req.body.productId)

//     if (existingItem) {
//         existingItem.quantity++ 
//     } else {
//         cart.items.push({id: req.body.productId, quantity: 1})
//     }

//     await cartRepo.update(cart.id, {items: cart.items})

//     res.send(`proizvbod ${req.body.productId} je dodat u korpu`)
// })
// //list items to cart
// router.get('/', async (req, res) => {
//     if (!req.session.cartId) {
//         return res.redirect('/')
//     }
//     const cart = await cartRepo.getOne(req.session.cartId)
//     console.log(cart.items[0].id)
//     const product = await productRepo.getOne(cart.items[0].id)
//     console.log(product.title)
//     res.render('cart', {products: []})
    
// })

// router.get('/products', async (req, res) => {
//     const card = await cartRepo.getOne(req.session.cartId)
//     console.log(card.items[0].id)
//     const id = await card.items[0].id
//     const product = await productRepo.getOne(id)

//     res.send({card, product})
// })

// router.get('/delete', async (req, res) => {
//     // console.log(req.body.productId)
//     req.session.cartId = null
//     res.send('card id is deleted')
    
// })

// //delete items from cart
// router.delete('/:id', async(req, res) => {

// })



// module.exports = router

const express = require('express');
const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products');
// const cartShowTemplate = require('../views/carts/show');

const router = express.Router();

// Receive a post request to add an item to a cart
router.post('/cart/products', async (req, res) => {
  // Figure out the cart!
  let cart;
  if (!req.session.cartId) {
    // We dont have a cart, we need to create one,
    // and store the cart id on the req.session.cartId
    // property
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    // We have a cart! Lets get it from the repository
    cart = await cartsRepo.getOne(req.session.cartId);
  }

  const existingItem = cart.items.find(item => item.id === req.body.productId);
  if (existingItem) {
    // increment quantity and save cart
    existingItem.quantity++;
  } else {
    // add new product id to items array
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }
  await cartsRepo.update(cart.id, {
    items: cart.items
  });

  res.send('Product added to cart');
});

// Receive a GET request to show all items in cart
router.get('/cart', async (req, res) => {
  if (!req.session.cartId) {
    return res.redirect('/');
  }

  const cart = await cartsRepo.getOne(req.session.cartId);
  console.log(cart.items[0].id)
  const product = await productsRepo.getOne(cart.items[0].id);
  console.log(product)
//   for (let item of cart.items) {
//     const product = await productsRepo.getOne(item.id);

//     item.product = product;
//     // console.log(product)
//   }
//   console.log(cart.items)

  res.render('cart', { products: cart.items });
});

// Receive a post request to delete an item from a cart

module.exports = router;
