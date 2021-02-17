require('../services/FirebaseAdminService')
const admin = require('firebase-admin')
const createEmail = (to, body) => {
    return {
        to: to,
        message: {
            subject: '[NO-REPLY] CruisersLINK Message',
            text: `Dear User! \n
                     ${body}
                     Regards,
                     CruisersLINK ADMIN
                     `,

        }
    }
}
const email = "sohail@systemplus.co"
const body = "Just sending a test email"
admin
    .firestore()
    .collection('mail')
    .add(createEmail(email, body))
    .then(snap => {
        console.log(`Email Sent to ${email}`)
    })