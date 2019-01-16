const io = require('socket.io')();



const port = 1337
io.listen(port)
console.log(`Listening on port ${port}...` )

const connected = {}
rooms = {};

const createRoom = () => {
  let room = "";
  const char_list = "ABCDEFGHJKMNPQRSTUVWXYZ0123456789";
  for(let i=0; i < 6; i++ ){  
    room += char_list.charAt(Math.floor(Math.random() * char_list.length));
  }
return room;
}
const playerEnters = (room) => {
  io.to(room).emit('message',`You are now ${rooms[room]} players connected`)
}

io.on('connection', function(socket) {
  socket.emit('connection', 'Welcome ' + socket.id);

  socket.on('room', () => {
    const room = createRoom();
    socket.join(room);
    rooms[room] = 1;
    playerEnters(room);
    console.log(`List of existing rooms : ${rooms} and ${io.sockets.adapter.rooms}`)
    socket.emit('room', room )
  })
  socket.on('join', (room) => {
    
    console.log(`tries to enter room ${room}`)
    if (rooms[room]) {
      socket.join(room);
      rooms[room] += 1;
      playerEnters(room);
      console.log(`There are now ${rooms[room]} people in your room`)
      socket.emit('room', room )
    } else {
      socket.emit('err', 'Please verify your code')
    }
  })

  socket.on('submitName', (name) => {

  } )


})