import express from "express"
const router  = express.Router()
import Products from "./../controllers/products.js"

// devuelve todos los productos 
router.get("/", (req, res) => {
  const iproducts = new Products();
  iproducts.getProducts()
    .then(products =>{
      const cant = products.length;
      res.render('home',{cant,products})
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error'}))
})

// devuelve todos los productos trabajando con websockets
router.get("/realtimeproducts", (req, res) => {
  const iproducts = new Products();
  iproducts.getProducts()
    .then(products =>{
      res.render('realTimeProducts',{products})
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error'}))
})

export default router