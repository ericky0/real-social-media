import express from 'express'
import socket, { Server } from 'socket.io'
import http from 'http'

const PORT = process.env.PORT || 8900
const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
  path: '/socket.io'
})

httpServer.listen(PORT, () => {
  console.log(`Server started at ${PORT}`)
})

// import io from 'socket.io'(8900, {
//   cors: {
//     origin: "http://localhost:3000",
//   }
// })
