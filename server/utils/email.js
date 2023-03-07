const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    //1) create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    //2) define email options
    const mailOptions = {
      from: 'Natours <hello@natours.io>',
      to: options.email,
      subject: options.subject,
      text: options.message,
    };
    //3) send the email

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
