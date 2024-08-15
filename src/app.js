import express from "express"
import handlebars from 'express-handlebars'
import __dirname from "./utils.js"
import mongoose from "mongoose"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js"
import servidor from "./server.js"
const PORT = 8080

servidor.app.use(express.json())
servidor.app.use(express.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://user:user@codercluster.cf9yy1h.mongodb.net/coderbase?retryWrites=true&w=majority&appName=CoderCluster")
.then(()=>console.log("conectado a la db"))
.catch(error=>console.error("error en conexion a la db", error))

//configurar Handlebars
servidor.app.engine('handlebars',handlebars.engine())
servidor.app.set('views', __dirname + '/views')
servidor.app.set('view engine','handlebars')
servidor.app.use(express.static(__dirname+'/public'))

servidor.app.use("/api/products",productsRouter)
servidor.app.use("/api/carts",cartsRouter)
servidor.app.use("/",viewsRouter)

const httpServer = servidor.server.listen(PORT, () => console.log(`Server running on port ${PORT}`))