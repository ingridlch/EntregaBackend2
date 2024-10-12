import Carts from '../dao/classes/carts.dao.js'

export const setCart = (req, res) => {
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
}

export const getCart = (req,res)=>{
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
}

export const setProductByCart = (req,res)=>{
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
}

export const delProductByCart = (req,res)=>{
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
}

export const delProductsByCart = (req,res)=>{
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
}

export const updateProductsByCart = (req,res)=>{
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
}

export const updateQuantityByCartProduct = (req,res)=>{
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
}

export const getCartForView = (req, res) => {
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
}

export const setFinishCart = (req,res) => {
  const cid = req.params.cid;
  const email = req.params.email;
  const icarts = new Carts();
  icarts.setFinishCart(cid,email)
    .then(result=>{
      if(result){
        res.send({result: "success", payload:result})
      } else {
        res.status(400).json({error:icarts.getError()})
      }
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error'}))
}