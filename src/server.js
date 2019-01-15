const io = require('socket.io')();



const port = 1337
io.listen(port)
console.log(`Listening on port ${port}...` )

const connected = []

io.on('connection', function(socket) {
  connected.push(socket)
  console.log(connected)
  socket.emit('connection', 'hello')
})