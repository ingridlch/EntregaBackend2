import express from "express"
import {Server} from "socket.io"
import { createServer } from 'node:http'

const app  = express()
const server = createServer(app)
const io = new Server(server, {})

io.on('connection', socket => {
  console.log("Cliente conectado")  
  socket.on('message', msg => console.log(`El cliente dice ${msg}`))
})

const servidor = {io,server,app}  
export default servidor