const admin = require('firebase-admin')
admin.initializeApp({
  credential:admin.credential.cert({
    'type': 'service_account',
    'project_id': 'auth-dev-53c9b',
    'private_key_id': '92cb7751693c7c65519d20b960b2bdbd6e50aa42',
    'private_key': process.env.FIREBASE_KEY.replace(/\\n/g, '\n'),
    'client_email': 'firebase-adminsdk-tkqnz@auth-dev-53c9b.iam.gserviceaccount.com',
    'client_id': '108149143544479518783',
    'auth_uri': 'https://accounts.google.com/o/oauth2/auth',
    'token_uri': 'https://oauth2.googleapis.com/token',
    'auth_provider_x509_cert_url': 'https://www.googleapis.com/oauth2/v1/certs',
    'client_x509_cert_url': 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-tkqnz%40auth-dev-53c9b.iam.gserviceaccount.com'
  })
})

module.exports=admin