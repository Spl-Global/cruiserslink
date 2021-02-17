const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
app.use(express.static(path.join(__dirname, 'client/build')))
app.use(require("body-parser").text());
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(require('body-parser').json());
// Loads the FirebaseAdmin Client from the credentials
require('./server/services/FirebaseAdminService')
require('./server/util/showUsers')
// require('./server/util/sendEmail')
// require('./server/util/makeAdmin')
// require('./Server/Services/FirebaseAdminService')

// require('./Server/Routes/getUserData')(app)
// require('./Server/Routes/getProjectsData')(app)

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:5000/"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
require('./server/routes/enable_disable')(app)
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
