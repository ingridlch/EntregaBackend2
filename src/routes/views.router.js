import express from "express"
const router  = express.Router()
import Products from "./../controllers/products.js"
import Carts from "./../controllers/carts.js"

// devuelve todos los productos 
router.get("/products", (req, res) => {
  const iproducts = new Products();
  iproducts.getProducts(req.query.limit,req.query.page,req.query.query,req.query.sort)
    .then(results =>{
      results.result = (results.totalDocs && results.totalDocs>0) ? true : false;
      res.render('index',results)
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error'}))
})

// vista de un carrito
router.get("/carts/:cid", (req, res) => {
  const cid = '66bb94084b9db89b660ccfb8'// se define carrito por defecto
  /* si no fuera un carrito por defecto considera el parámetro recibido como se ve en las líneas comentadas
  const cid = req.params.cid;
  if(!cid || cid==='') res.status(400).json({result: "error", error: 'No se puede buscar carrito'}) */
  const icarts = new Carts();
  icarts.getCart(cid)
    .then(cart=>{
      if(cart){
        cart.result = (cart.products && cart.products.length>0) ? true : false;
        res.render('cart',cart)
      } else {
        res.status(400).json({result: "error", message:"No se pudo buscar carrito"})
      }
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error'}))
})

// devuelve todos los productos trabajando con websockets
router.get("/realtimeproducts", (req, res) => {
  const iproducts = new Products();
  iproducts.getProducts()
    .then(results =>{
      res.render('realTimeProducts',results)
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error'}))
})

export default router