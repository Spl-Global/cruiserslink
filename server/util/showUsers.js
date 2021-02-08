const admin = require('firebase-admin')
module.exports = showUsers = (number, pageToken = null) => {
    if (pageToken) {
        return admin
            .auth()
            .listUsers(number, pageToken)
    } else {
        return admin
            .auth()
            .listUsers(number)
    }
}
