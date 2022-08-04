
require('dotenv/config');

const accountSid = process.env.TWILIO_accountSid;
const authToken = process.env.TWILIO_authToken;


const enviarWhatsapp = async (to, subject, cuerpo) => {
    const client = require('twilio')(accountSid, authToken);

    console.log(`${to} - ${process.env.TWILIO_whatsapp_from}`)
    client.messages.create({
        body: `${subject} - ${cuerpo}`,
        from: `whatsapp:${process.env.TWILIO_whatsapp_from}`,
        to: `whatsapp:${to}`
    })
        .then(info => console.log(info))
        .catch(error => console.log(error))

}

module.exports = {
    enviarWhatsapp
}



