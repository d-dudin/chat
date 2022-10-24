const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/main.html');
})

app.use(express.static(__dirname + '/styles'))

io.on('connection', (socket) => {
  socket.on('chat message', (data) => {
    console.log('msg received', data);
    io.emit('chat message', {
      message: data.message,
      name: data.name
    })
  })
})

http.listen(8888, () => {
  console.log('Сервер запущен')
});