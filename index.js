const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const http = require('http');
const https = require('https');
const app = express();

var certificade
try {
    certificade = {
        key: fs.readFileSync('/etc/letsencrypt/live/cleaningservicesperfect.com/privkey.pem', 'utf8'),
        cert: fs.readFileSync("/etc/letsencrypt/live/cleaningservicesperfect.com/fullchain.pem", 'utf8')
    };

} catch (error) {
    console.log(error)
}


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('common'));

app.use('/', express.static('build'))
const portHttp = 8081;
const portHttpS = 443
const httpsServer = https.createServer(certificade, app);
const httpServer = http.createServer(app);


httpServer.listen(portHttp, function () {
    console.log("JSON Server is running on " + portHttp);
});

try {
    httpsServer.listen(portHttpS, function () {
        console.log('Second site is running on port ' + portHttpS);
    });
} catch (error) {
    console.log(error)
}

