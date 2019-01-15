const io = require('socket.io')();



const port = 1337
io.listen(port)
console.log(`Listening on port ${port}...` )

const connected = {}
rooms = [];

const createRoom = () => {
  let room = "";
  const char_list = "ABCDEFGHJKMNPQRSTUVWXYZ0123456789";
  for(let i=0; i < 6; i++ ){  
    room += char_list.charAt(Math.floor(Math.random() * char_list.length));
  }
return room;
}

io.on('connection', function(socket) {
  socket.emit('connection', 'Welcome');

  socket.on('room', () => {
    const room = createRoom();
    socket.join(room);
    rooms.push[room];
    socket.emit('room', `You've joined room ${room}`)
  })
  socket.on('join', (room) => {
    const existing = false;
    for (const each in rooms) {
      if (each === room) existing = true;
    }
    if (existing) {
    socket.join(room);
    socket.emit('room', `You've joined room ${room}`)
    }
  })

  socket.on('submitName', (name) => {

  } )


})