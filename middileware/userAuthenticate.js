exports.auth = (req, res, next) => {
 console.log(req.url)
 if (req.cookies) {
  next()
 } else {
  res.redirect('/auth/login')
 }
}