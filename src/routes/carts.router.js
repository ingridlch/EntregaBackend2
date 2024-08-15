import express from "express"
const router  = express.Router()
import Carts from "./../controllers/carts.js"

// agrega nuevo carrito
router.post("/", (req, res) => {
  const {products} = req.body;
  const icarts = new Carts();
  icarts.setCart(products)
    .then(cart=>{
      if(cart){
        res.json(cart)
      } else {
        res.status(400).json({error:"Carrito no creado. "+icarts.getError()})
      }
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error. '+(error._message? error._message:'')}))
})

// busca carrito y lista productos 
router.get("/:cid", (req,res)=>{
  const cid = req.params.cid;
  if(!cid || cid==='') res.status(400).json({error: 'No se puede buscar carrito. Id vacio'})
  const icarts = new Carts();
  icarts.getCart(cid)
    .then(cart=>{
      if(cart){
        res.send({result: "success", payload:cart})
      } else {
        res.status(400).json({error:"No se pudo buscar carrito, "+icarts.getError()})
      }
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error. '+(error._message? error._message:'')}))
})


// agrega un producto o cantidad al carrito
router.post("/:cid/product/:pid", (req,res)=>{
  const cid = req.params.cid;
  const pid = req.params.pid;
  if(!cid || cid==='') res.status(400).json({error: 'No se puede agregar productos, id de carrito inválido'})
  if(!pid || pid==='') res.status(400).json({error: 'No se puede agregar al carrito, id de producto inválido'})
  const icarts = new Carts();
  icarts.setProductByCart(cid,pid)
    .then(result=>{
      if(result){
        res.send({result: "success", payload:result})
      } else {
        res.status(400).json({error:"No se pudo actualizar carrito."})
      }
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error.'+(error._message? error._message:'')}))
})

// elimina un producto del carrito
router.delete("/:cid/products/:pid", (req,res)=>{
  const cid = req.params.cid;
  const pid = req.params.pid;
  if(!cid || cid==='') res.status(400).json({error: 'No se puede eliminar producto, id de carrito inválido'})
  if(!pid || pid==='') res.status(400).json({error: 'No se puede eliminar producto, id inválido'})
  const icarts = new Carts();
  icarts.delProductByCart(cid,pid)
    .then(result=>{
      if(result){
        res.send({result: "success", payload:result})
      } else {
        res.status(400).json({error:"No se pudo eliminar producto."})
      }
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error. '+(error._message? error._message:'')}))
})

// elimina todos los productos del carrito
router.delete("/:cid", (req,res)=>{
  const cid = req.params.cid;
  if(!cid || cid==='') res.status(400).json({error: 'No se puede eliminar los productos del carrito, id inválido'})
  const icarts = new Carts();
  icarts.delProductsByCart(cid)
    .then(result=>{
      if(result){
        res.send({result: "success", payload:result})
      } else {
        res.status(400).json({error:"No se pudo eliminar productos del carrito."})
      }
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error. '+(error._message? error._message:'')}))
})

// actualiza carrito con el arreglo de productos pasado
router.put("/:cid", (req,res)=>{
  const cid = req.params.cid;
  if(!cid || cid==='') res.status(400).json({error: 'No se puede actualizar productos del carrito, id inválido'})
  const {products} = req.body;  
  const icarts = new Carts();
  icarts.updateProductsByCart(cid,products)
    .then(result=>{
      if(result){
        res.send({result: "success", payload:result})
      } else {
        res.status(400).json({error:"No se pudo actualizar carrito. "+icarts.getError()})
      }
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error. '+(error._message? error._message:'')}))
})

// actualiza producto del carrito con la cantidad pasada por body
router.put("/:cid/products/:pid", (req,res)=>{
  const cid = req.params.cid;
  const pid = req.params.pid;
  let {quantity} = req.body;  
  if(!cid || cid==='') res.status(400).json({error: 'No se puede actualizar productos, id de carrito inválido'})
  if(!pid || pid==='') res.status(400).json({error: 'No se puede actualizar carrito, id de producto inválido'})
  const icarts = new Carts();
  icarts.updateQuantityByCartProduct(cid,pid,quantity)
    .then(result=>{
      if(result){
        res.send({result: "success", payload:result})
      } else {
        res.status(400).json({error:"No se pudo actualizar carrito. "+icarts.getError()})
      }
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error. '+(error._message? error._message:'')}))
})

export default router