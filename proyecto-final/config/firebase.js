
const firebaseconn = {
    serviceAccount: {
        "type": "service_account",
        "project_id": "<sample>",
        "private_key_id": "<sample>",
        "private_key": "-----BEGIN PRIVATE KEY-----\<sample>\n-----END PRIVATE KEY-----\n",
        "client_email": "<sample>",
        "client_id": "<sample>",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "<sample>"
           },

    databaseURL: ""
}

module.exports = firebaseconn;
