import express from "express"
import handlebars from 'express-handlebars'
import bodyParser from "body-parser"
import mongoose from './config/database.js';
import productsRouter from "./routes/api/products.router.js"
import cartsRouter from "./routes/api/carts.router.js"
import sessionsRouter from './routes/api/sessions.router.js'
import viewsRouter from "./routes/views.router.js"
import servidor from "./server.js"
import passport from "passport"
import initializePassport from "./config/passport.config.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { __dirname } from "./utils.js"
import config from "./config/config.js"

const PORT = config.port

//configurar Handlebars, public, cookies y passport
servidor.app.use(bodyParser.urlencoded({ extended: false }))
servidor.app.use(bodyParser.json())
servidor.app.use(cors())
servidor.app.engine('handlebars',handlebars.engine())
servidor.app.set('views', __dirname + '/views')
servidor.app.set('view engine','handlebars')
servidor.app.use(express.static(__dirname+'/public'))
servidor.app.use(express.json())
servidor.app.use(cookieParser())
initializePassport()
servidor.app.use(passport.initialize())

servidor.app.use("/api/products",productsRouter)
servidor.app.use("/api/carts",cartsRouter)
servidor.app.use("/api/sessions",sessionsRouter)
servidor.app.use("/",viewsRouter)

const httpServer = servidor.server.listen(PORT, () => console.log(`Server running on port ${PORT}`))