import nodemailer from "nodemailer"
import config from './index.js'

// get these values from mailtrap
let transporter = nodemailer.createTransport({
    host: config.SMTP_MAIL_HOST,
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.SMTP_MAIL_USERNAME, // generated ethereal user
      pass: config.SMTP_MAIL_PASSWORD, // generated ethereal password
    },
  });


  export default transporter