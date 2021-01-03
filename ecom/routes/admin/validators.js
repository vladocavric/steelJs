const { body } = require('express-validator')
const usersRepo = require('../../repositories/users')

module.exports = {
    requireTitle: body('title')
        .trim()
        .isLength({min: 3, max: 40})
        .withMessage('Must be min 3 and max 40 characters'),
    requirePrice: body('price')
        .trim()
        .toFloat()
        .isFloat({min: 1})
        .withMessage('Must be a number with minimu value of 1$'),
    requireEmail: body('email')
        .trim()
        .isEmail()
        .custom(async (email) => {
            const existingUser = await usersRepo.getOneBy({ email })
            if (existingUser) {
                throw new Error('email in use')
            }
        }),
    requirePassword: body('password').trim().isLength({ min: 5, max: 20 }),
    requireConfirmPassword: body('confirmPassword')
        .trim()
        .isLength({ min: 5, max: 20 })
        .custom(async (confirmPassword, { req }) => {
            if (req.body.password !== confirmPassword) {
                throw new Error('passwords must metch')
            }
        }),
    requireValidEmail: body('email')
        .trim()
        .isEmail()
        .withMessage('email needs to be valid')
        .custom(async (email) => {
            const user = await usersRepo.getOneBy({ email })
            if (!user) {
                throw new Error('there is no user with this email')
            }
        }),
    requireValidPassword: body('password')
        .trim()
        .custom(async (password, {req}) => {
            const user = await usersRepo.getOneBy({ email: req.body.email })
            if (!user) {
                throw new Error('Not valid password')
            }
            const correctPass = await usersRepo.comperePasswords(user.password, password)
            if (!correctPass) {
                throw new Error('Not valid password')
            }
        })
}
