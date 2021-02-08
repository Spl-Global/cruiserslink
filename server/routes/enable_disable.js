const admin = require('firebase-admin')
const showUsers = require('../util/showUsers')
module.exports = (app) => {
    app.get('/api/enable_disable', async (req, res) => {
        try {
            const limit = 10;
            const jsonReq = req.body.data
            const uid = req.headers['authorization'].split(' ')[1]
            const userRecord = await admin.auth().getUser(uid);
            if (userRecord.customClaims.admin) {
                const { pageToken } = req.query
                const usersList = await showUsers(limit);
                let docs = {}
                const results = await admin.firestore().collection('Users').where('__name__', 'in', usersList.users.map(x => x.uid)).get()
                results.forEach(doc => {
                    docs[doc.id] = doc.data()
                })
                res.send({
                    users: usersList.users.map(user => {
                        return { ...user, ...docs[user.uid] }
                    }),
                    pageToken: usersList.pageToken ? usersList.pageToken : null
                })
            } else {
                res.status(401).send({ message: 'Not Authorized', code: 401 })
            }
        } catch (err) {
            res.status(401).send({ message: err.message })
        }
    })

    app.post('/api/enable_disable', async (req, res) => {
        try {
            const { id, value } = JSON.parse(req.body)
            const uid = req.headers['authorization'].split(' ')[1]
            const adminRecord = await admin.auth().getUser(uid);
            if (adminRecord.customClaims.admin) {
                const userRecord = await admin.auth().updateUser(id, { disabled: value });
                admin.firestore().collection('Users').doc(id).update({ disabled: value })
                res.status(200).send({ disabled: true })
            } else {
                res.status(401).send({ message: 'Not Authorized', code: 401 })
            }
        } catch (err) {
            res.status(401).send({ message: err.message })
        }
    })
}