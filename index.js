const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
app.use(express.static(path.join(__dirname, 'client/build')))
app.use(require("body-parser").text());
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(require('body-parser').json());
// Loads the FirebaseAdmin Client from the credentials
// require('./server/services/FirebaseAdminService')
// require('./server/util/makeAdmin')
// require('./Server/Services/FirebaseAdminService')

// require('./Server/Routes/getUserData')(app)
// require('./Server/Routes/getProjectsData')(app)
app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/public/favicon.ico'))
})


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Mixing it up on port ${PORT}`)
})
