const { expressjwt: jwt } = require('express-jwt');

const RequireSignIn = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
})

module.exports = { RequireSignIn };