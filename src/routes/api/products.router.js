import express from "express"
const router  = express.Router()
import {getProducts,getProduct,setProduct,updateProduct,delProduct} from "./../../controllers/products.controller.js"
import { handlePolicies } from '../../utils.js'

router.get("/", getProducts)// devuelve todos los productos con filtros, paginación y ordenamiento
router.get("/:pid", getProduct)// devuelve producto por ID
router.post("/", handlePolicies(["admin"]), setProduct) // agrega nuevo producto
router.put("/:pid", handlePolicies(["admin"]), updateProduct) // mofidica producto 
router.delete("/:pid", handlePolicies(["admin"]), delProduct) // elimina producto

export default router