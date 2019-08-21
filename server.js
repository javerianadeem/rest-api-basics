const http = require('http');
const app = require('./app');

// port 3000 will be used as a local host
const port = ('port',process.env.PORT || 3000)

const server = http.createServer(app);

server.listen(port);