const route = require('express').Router()
const userController = require('../contollers/userController')
const userAuthenticate = require('../middileware/userAuthenticate')
const googleAuth = require('../utils/googleAuth')

route.get('/login', userController.login)

route.get('/google', googleAuth.getGoogleAuthURL)

route.get('/google/redirect', userController.googleRedirect)

route.get('/about', userAuthenticate.auth, userController.about)

route.get('/logout', userAuthenticate.auth, userController.logout)



module.exports = route