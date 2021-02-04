const admin = require('firebase-admin')
const makeAdmin = function (uid) {
    admin
        .auth()
        .setCustomUserClaims(uid, { admin: true })
        .then(() => {
            console.log(`Custom claim set for uid ${uid}`)
        });
}
const uidToMakeAdmin = 'yUy3Uqzj2VPmAKqw6AHhIbEFhep2'
makeAdmin(uidToMakeAdmin)