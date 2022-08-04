
require('dotenv/config');

const accountSid = process.env.TWILIO_accountSid;
const authToken = process.env.TWILIO_authToken;


const enviarSMS = async (to, subject, cuerpo) => {
//const client = require('twilio')(accountSid, authToken); 
const client = require('twilio')(accountSid, authToken); 
console.log(`${to} - ${process.env.TWILIO_sms_from}` )
    client.messages.create({
        body: `${subject} - ${cuerpo}`,
        from: `${process.env.TWILIO_sms_from}`,
        to: `+${to}`
    })
        .then(info => console.log(info))
        .catch(error => console.log(error))
        

}

module.exports = {
    enviarSMS
}

