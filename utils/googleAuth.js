const { google } = require('googleapis');
const axios = require('axios')
const sendEmail = require('./email')

const oauth2Client = new google.auth.OAuth2(
 process.env.CLIENT_ID,
 process.env.CLIENT_SECRET,
 'http://localhost:3000/auth/google/redirect'
);

exports.getGoogleAuthURL = (req, res) => {
 console.log(req.url)
 const scopes = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'];
 const url = oauth2Client.generateAuthUrl({
  access_type: 'offline', prompt: 'consent', scope: scopes,
 });
 res.redirect(url)
}


exports.getGoogleUser = async ({ code }) => {
 const { tokens } = await oauth2Client.getToken(code);
 if (tokens.access_token) {
  const googleUser = (await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`, {
   headers: { Authorization: `Bearer ${tokens.id_token}`, },
  })).data
  sendEmail({ email: googleUser.email, subject: 'login', message: 'You are login sucessfully' })
  return googleUser;
 } else {
  throw new Error('Token Expire')
 }
}