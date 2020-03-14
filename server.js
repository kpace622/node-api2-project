const express = require('express');
// const Data = require('./data/db') 
const postsRouter = require('./postsRouter');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());
server.use('/api/posts', postsRouter)

server.get('/', (req, res) => {
    res.send('<h2>Practice with Node</h2>')
});

module.exports = server;
