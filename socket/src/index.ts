import express from 'express'
import { Server } from 'socket.io'
import http from 'http'

const PORT = process.env.PORT || 8900
const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

let users: { userId: string; socketId: string }[] = []

const addUser = (userId: string, socketId: string) => {
  !users.some(user => user.userId === userId) &&
    users.push({ userId, socketId })
}

const removeUser = (socketId: string) => {
  users = users.filter(user => user.socketId !== socketId)
}

const getUser = (senderId: string) => {
  return users.find(user => user.userId === senderId)
}

io.on('connection', socket => {
  //when connect
  console.log('a user connected')

  // take userId and socketId from user
  socket.on('addUser', userId => {
    addUser(userId, socket.id)
    io.emit('getUsers', users)
    console.log(users)
  })

  //send and get message
  socket.on('sendMessage', ({ senderId, text, receiverId }) => {
    const user = getUser(receiverId)
    io.to(user!.socketId).emit('getMessage', {
      senderId,
      text
    })
  })
  // when disconnect
  socket.on('disconnect', () => {
    console.log('a user disconnected')
    removeUser(socket.id)
  })
})

httpServer.listen(PORT, () => {
  console.log(`Server started at ${PORT}`)
})
