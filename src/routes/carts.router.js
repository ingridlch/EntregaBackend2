const express = require("express")
const router  = express.Router()

const cCarts = require("./../controllers/carts.js");

// agrega nuevo carrito
router.post("/carts", (req, res) => {console.log("post carrito")
  const {products} = req.body;
  const icarts = new cCarts();
  icarts.setCart(products)
    .then(cart=>{
      if(cart){
        res.json(cart)
      } else {
        res.status(400).json({message:"Carrito no creado"})
      }
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error'}))
})

// lista productos del carrito
router.get("/carts/:cid", (req,res)=>{
  const id = parseInt(req.params.cid);
  if(isNaN(id) || id<=0) res.status(400).json({error: 'No se puede buscar carrito'})
  const icarts = new cCarts();
  icarts.getCart(id)
    .then(products=>{
      if(products){
        res.json(products)
      } else {
        res.status(400).json({message:"No se pudo buscar carrito"})
      }
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error'}))
})


// agrega un producto o cantidad al carrito
router.post("/carts/:cid/product/:pid", (req,res)=>{
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);
  if(isNaN(cid) || cid<=0 || isNaN(pid) || pid<=0) res.status(400).json({error: 'No se puede agregar productos al carrito'})
  const icarts = new cCarts();
  icarts.setProductByCart(cid,pid)
    .then(cart=>{
      if(cart){
        res.json(cart)
      } else {
        res.status(400).json({message:"Carrito no actualizado"})
      }
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error'}))
})


module.exports = router