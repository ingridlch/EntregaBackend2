const express = require("express")
const router  = express.Router()

const cProducts = require("./../controllers/products.js");

// devuelve todos los productos 
router.get("/products", (req, res) => {
  const limit = parseInt(req.query.limit);
  const iproducts = new cProducts();
  iproducts.getProducts()
    .then(products =>{
      if(!isNaN(limit) && limit>0){
        res.json(products.slice(0,limit))
      } else {
        res.json(products)
      }
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error'}))
})

// devuelve producto por ID
router.get("/products/:pid", (req,res)=>{
  const id = parseInt(req.params.pid);
  if(isNaN(id) || id<=0) res.status(400).json({error: 'No se puede buscar producto'})
  const iproducts = new cProducts();
  iproducts.getProduct(id)
    .then(product=>{
      if(product){
        res.json(product)
      } else {
        res.status(404).json({message:"Producto no encontrado"})
      }
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error'}))
})

// agrega nuevo producto
router.post("/products", (req,res)=>{
  const {title, description, code, price, stock, category, thumbnails} = req.body;
  const iproducts = new cProducts();
  iproducts.setProduct(title, description, code, price, stock, category, thumbnails)
    .then(product=>{
      if(product){
        res.json(product)
      } else {
        res.status(400).json({message:"Producto no creado"})
      }
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error'}))
})

router.put("/products/:pid", (req,res)=>{console.log('put')
  const id = parseInt(req.params.pid);
  if(isNaN(id) || id<=0) res.status(400).json({error: 'No se puede modificar producto'})
  const {title, description, code, price, stock, category, thumbnails} = req.body;  
  const iproducts = new cProducts();
  iproducts.updateProduct(id, title, description, code, price, stock, category, thumbnails)
    .then(product=>{
      if(product){
        res.json(product)
      } else {
        res.status(400).json({message:"Producto no modificado"})
      }
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error'}))
})

router.delete("/products/:pid", (req,res)=>{
  const id = parseInt(req.params.pid);
  if(isNaN(id) || id<=0) res.status(400).json({error: 'No se puede eliminar producto'})
  const iproducts = new cProducts();
  iproducts.delProduct(id)
    .then(result=>{
      if(result){
        res.json({message:"Producto eliminado correctamente"})
      } else {
        res.status(400).json({message:"Producto no eliminado"})
      }
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error'}))
})

module.exports = router