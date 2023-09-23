const logger = require('./logger')
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const sendToEmail = (options) => {
 logger.log('info', 'sending email......')

 const createTransporter = async () => {
  const oauth2Client = new OAuth2(
   process.env.EMAIL_CLIENT_ID,
   process.env.EMAIL_CLIENT_SECRET,
   "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
   refresh_token: process.env.EMAIL_REFRESHTOKEN
  });

  const accessToken = await new Promise((resolve, reject) => {
   oauth2Client.getAccessToken((err, token) => {
    if (err) {
     throw new Error("Failed to create access token :(");
    }
    resolve(token);
   });
  });
  const transporter = nodemailer.createTransport({
   service: "gmail",
   auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USERNAME,
    accessToken,
    clientId: process.env.EMAIL_CLIENT_ID,
    clientSecret: process.env.EMAIL_CLIENT_SECRET,
    refreshToken: process.env.EMAIL_REFRESHTOKEN
   }
  });
  return transporter
 };

 const sendEmail = async (emailOptions) => {
  const emailTransporter = await createTransporter();
  emailTransporter.sendMail(emailOptions, (err, result) => {
   if (err) {
    throw new Error('Email sending fail')
   }
   logger.log('info', 'email sent...')
  });
 };

 sendEmail({
  subject: options.subject,
  text: options.message,
  to: options.email,
  from: process.env.EMAIL_USERNAME
 })

}


module.exports = sendToEmail

