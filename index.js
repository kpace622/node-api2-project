// const express = require('express');
// const server = express();
const server = require('./server.js')

server.listen(5000, () => {
    console.log('server running on local host 5000')
})

// server.get('/', (req, res) => {
//     res.send('<h2>Practice with Node</h2>')
// });

