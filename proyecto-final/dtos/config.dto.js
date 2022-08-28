// DTO para mostrar la configuracion
class ConfigDTO {
    constructor(env) {
        this.PORT = env.PORT;
        this.DB_ENGINE = env.DB_ENGINE;
        this.SESSION_KEY = env.SESSION_KEY;
        this.SESSION_SECRET = "*********";
        this.COOKIE_MAXAGE = env.COOKIE_MAXAGE;
        this.MONGO_DB = "*********";
        this.MONGO_LOCAL = env.MONGO_LOCAL;
        this.MONGO_TTL = env.MONGO_TTL;
        this.SERVER_MODO = env.SERVER_MODO;
        this.ADMINISTRADOR = env.ADMINISTRADOR;
        this.ADMINISTRADOR_EMAIL = env.ADMINISTRADOR_EMAIL;
        this.ADMINISTRADOR_TEL = env.ADMINISTRADOR_TEL;
        this.SENDER_USER = env.SENDER_USER;
        this.SENDER_PASS = "*********";
        this.SENDER_HOST = env.SENDER_HOST;
        this.SENDER_PORT = env.SENDER_PORT;
        this.ENVIAR_MAIL = env.ENVIAR_MAIL;
        this.ENVIAR_WHATSAPP = env.ENVIAR_WHATSAPP;
        this.ENVIAR_SMS = env.ENVIAR_SMS;
        this.TWILIO_accountSid = env.TWILIO_accountSid;
        this.TWILIO_authToken = "*********";
        this.TWILIO_sms_from = env.TWILIO_sms_from;
        this.TWILIO_whatsapp_from = env.TWILIO_whatsapp_from;

    }
}

module.exports = { ConfigDTO };
