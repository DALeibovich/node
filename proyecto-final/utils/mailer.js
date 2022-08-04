const { createTransport } = require('nodemailer');
require('dotenv/config')

const enviarEmail = async (to, subject, cuerpo) => {
    const transporter = createTransport({
        service: process.env.SENDER_HOST,
        port: process.env.SENDER_PORT,
        auth: {
            user: process.env.SENDER_USER,
            pass: process.env.SENDER_PASS 
        }
    });

    const mailOptions = {
        from: process.env.ADMINISTRADOR_EMAIL,
        to: to,
        subject: subject,
        html: cuerpo,

    }
  
        await transporter.sendMail(mailOptions)
            .then(info => console.log(info))
            .catch(err => console.log(err))
  
}

module.exports = {
    enviarEmail
}