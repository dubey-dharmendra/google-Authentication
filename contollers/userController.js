const logger = require('../utils/logger')

const googleAuth = require('../utils/googleAuth')
const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
 console.log(req.url)
 try {
  res.render('login')
  logger.log('info', 'login page')
 } catch (error) {
  logger.error('error', error)
 }
}

exports.googleRedirect = async (req, res) => {
 console.log(req.url)
 try {
  const user = await googleAuth.getGoogleUser(req.query)
  const jwtToken = jwt.sign(user, process.env.JWT_SECRET)
  res.cookie(process.env.COOKIES_NAME, jwtToken, { maxAge: 900000, httpOnly: false })
  logger.log('info', 'google redirect')
  res.redirect('/auth/about')
 } catch (error) {
  logger.error('error', error)
 }
}

exports.about = async (req, res) => {
 try {
  res.render('about');
  logger.log('info', 'about page')
 } catch (error) {
  logger.error('error', error)
 }
}

exports.logout = (req, res) => {
 try {
  res.clearCookie(process.env.COOKIES_NAME)
  req.logOut();
  res.redirect('/')
  logger.log('info', 'logout page')
 } catch (error) {
  logger.error('error', error)
 }
}