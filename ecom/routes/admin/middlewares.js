const { body, validationResult } = require('express-validator')

module.exports = {
    handleErrors(template) {
        return (req, res, next) => {
            const errors = validationResult(req).errors

            if (errors.length > 0) {
                return res.render(template, { errors })
            }

            next()
        }
    },
    isSignIn(req, res, next)  {
        if (!req.session.userId) {
            res.redirect('/sign-in')
        }
        next()
    }
}
