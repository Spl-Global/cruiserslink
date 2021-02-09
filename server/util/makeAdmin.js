const admin = require('firebase-admin')
const makeAdmin = function (uid) {
    admin
        .auth()
        .setCustomUserClaims(uid, { admin: true })
        .then(() => {
            console.log(`Custom claim set for uid ${uid}`)
        });
}
// const uidToMakeAdmin = 'yUy3Uqzj2VPmAKqw6AHhIbEFhep2'
// makeAdmin(uidToMakeAdmin)

const addAttribute = async function (ref) {
    try {
        const userDocs = await admin.firestore().collection(ref).get()
        userDocs.docs.forEach(doc => {
            admin.firestore().collection(ref).doc(doc.id).update({
                status: "pending",
            })
        })
    } catch (err) {

    }
}
// addAttribute('TipsAndTricks')