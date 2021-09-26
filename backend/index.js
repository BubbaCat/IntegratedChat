const express = require('express');
const config = require('./config/app');
const router = require('./router');
const cors = require('cors');
const app = express();
const http = require('http');
//const SocketServer = require('./socket');
const port = config.appPort;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(router);
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));

//const server = http.createServer(app);

//SocketServer(server);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
