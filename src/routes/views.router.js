import express from "express"
const router  = express.Router()
import {getProductsForView,getProductsForViewRealTime} from "./../controllers/products.controller.js"
import {getCartForView} from "./../controllers/carts.controller.js"

router.get("/products", getProductsForView) // devuelve todos los productos 
router.get("/carts/:cid", getCartForView) // vista de un carrito
router.get("/realtimeproducts", getProductsForViewRealTime) // devuelve todos los productos trabajando con websockets

export default router