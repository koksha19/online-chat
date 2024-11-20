const express = require('express');
const http = require('http');
const path = require('path');
const {Server} = require('socket.io');

const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('./'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('New user connected');
    socket.on('message', (message) => {
        socket.broadcast.emit('message', message);
    });
});
server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
