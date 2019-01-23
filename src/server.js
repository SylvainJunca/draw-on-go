const io = require('socket.io')();



const port = 1337
io.listen(port)
console.log(`Listening on port ${port}...` )

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
  io.to(room).emit('players', rooms[room])
}
const usernameInRoom = (whichRoom, username) => {
  //const room = io.sockets.adapter.rooms[whichRoom];
  rooms[whichRoom] ? people = rooms[whichRoom] : people = [];
  people.push(username)
  rooms[whichRoom] = people;
  console.log(`people is the room : ${people}`)
}

const listRooms = () => {
  const listRooms = []
  for (const room in rooms) {
    listRooms.push(room)
  }
  return listRooms;
}

io.on('connection', function(socket) {
  socket.emit('connection', 'Welcome ' + socket.id);
  socket.emit('listRooms', listRooms());

  socket.on('username', (username) => {
    socket.username = username;
    console.log(` socket id : ${socket.id} username ${socket.username}`);
  })
  
  socket.on('room', () => {
    const room = createRoom();
    socket.join(room);
    rooms[room] = []
    usernameInRoom(room, socket.username);
    playerEnters(room);
    io.emit('listRooms', listRooms());
    console.log(`List of existing rooms : ${rooms} and ${io.sockets.adapter.rooms}`)
    socket.emit('room', room )
  })
  socket.on('join', (room) => {
    
    console.log(`tries to enter room ${room}`)
    if (rooms[room]) {
      socket.join(room);
      usernameInRoom(room, socket.username);
      playerEnters(room);
      console.log(`There are now ${rooms[room]} people in your room`)
      socket.emit('room', room )
    } else {
      socket.emit('err', 'Please verify your code')
    }
  })

  socket.on('submitName', (name) => {

  } )
  socket.on('disconnect', () => {
    io.emit('myCustomEvent', {customEvent: 'Custom Message'})
    console.log('Socket disconnected: ')
  })

})