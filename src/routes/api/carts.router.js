import express from "express"
const router  = express.Router()
import {setCart,getCart,setProductByCart,delProductByCart,delProductsByCart,updateProductsByCart,updateQuantityByCartProduct,setFinishCart} from "./../../controllers/carts.controller.js"
import { handlePolicies } from '../../utils.js'

router.post("/", handlePolicies(["user"]), setCart) // agrega nuevo carrito
router.get("/:cid", getCart) // busca carrito y lista productos 
router.post("/:cid/product/:pid", handlePolicies(["user"]), setProductByCart) // agrega un producto o cantidad al carrito
router.delete("/:cid/products/:pid", delProductByCart) // elimina un producto del carrito
router.delete("/:cid", delProductsByCart) // elimina todos los productos del carrito
router.put("/:cid", handlePolicies(["user"]), updateProductsByCart) // actualiza carrito con el arreglo de productos pasado
router.put("/:cid/products/:pid", handlePolicies(["user"]), updateQuantityByCartProduct) // actualiza producto del carrito con la cantidad pasada por body
router.post("/:cid/purchase", handlePolicies(["user"]), setFinishCart)

export default router