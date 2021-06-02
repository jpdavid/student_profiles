const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

// const router = require('./router.js');

const PORT = 8080;
const server = express();

server.use(bodyparser.json());
server.use(morgan('dev'));
server.use(cors());

server.use(express.static(path.join(__dirname, '../client/dist')));
// server.use('/api', router);

server.listen(PORT, () => {
  console.log(`Now listening on port: ${PORT}`);
});

module.exports = server;
