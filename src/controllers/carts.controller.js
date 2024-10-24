import {cartService} from '../repositories/index.js'

export const setCart = (req, res) => {
  const {products} = req.body;
  cartService.setCart(products)
    .then(cart=>{
      if(cart){
        res.json(cart)
      } else {
        res.status(400).json({error:cartService.getError()})
      }
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error. '+(error._message? error._message:'')}))
}

export const getCart = (req,res)=>{
  const cid = req.params.cid;
  cartService.getCart(cid)
    .then(cart=>{
      if(cart){
        res.send({result: "success", payload:cart})
      } else {
        res.status(400).json({error:cartService.getError()})
      }
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error. '+(error._message? error._message:'')}))
}

export const setProductByCart = (req,res)=>{
  const cid = req.params.cid;
  const pid = req.params.pid;
  cartService.setProductByCart(cid,pid)
    .then(result=>{
      if(result){
        res.send({result: "success", payload:result})
      } else {
        res.status(400).json({error:cartService.getError()})
      }
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error.'+(error._message? error._message:'')}))
}

export const delProductByCart = (req,res)=>{
  const cid = req.params.cid;
  const pid = req.params.pid;
  cartService.delProductByCart(cid,pid)
    .then(result=>{
      if(result){
        res.send({result: "success", payload:result})
      } else {
        res.status(400).json({error:cartService.getError()})
      }
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error. '+(error._message? error._message:'')}))
}

export const delProductsByCart = (req,res)=>{
  const cid = req.params.cid;
  cartService.delProductsByCart(cid)
    .then(result=>{
      if(result){
        res.send({result: "success", payload:result})
      } else {
        res.status(400).json({error:cartService.getError()})
      }
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error. '+(error._message? error._message:'')}))
}

export const updateProductsByCart = (req,res)=>{
  const cid = req.params.cid;
  const {products} = req.body;
  cartService.updateProductsByCart(cid,products)
    .then(result=>{
      if(result){
        res.send({result: "success", payload:result})
      } else {
        res.status(400).json({error:cartService.getError()})
      }
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error. '+(error._message? error._message:'')}))
}

export const updateQuantityByCartProduct = (req,res)=>{
  const cid = req.params.cid;
  const pid = req.params.pid;
  let {quantity} = req.body;  
  cartService.updateQuantityByCartProduct(cid,pid,quantity)
    .then(result=>{
      if(result){
        res.send({result: "success", payload:result})
      } else {
        res.status(400).json({error:cartService.getError()})
      }
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error. '+(error._message? error._message:'')}))
}

export const getCartForView = (req, res) => {
  /* const cid = '66bb94084b9db89b660ccfb8'// se define carrito por defecto */
  const cid = req.params.cid;
  cartService.getCart(cid)
    .then(cart=>{
      if(cart){
        cart.result = (cart.products && cart.products.length>0) ? true : false;
        res.render('cart',cart)
      } else {
        res.status(400).json({result: "error", message:cartService.getError()})
      }
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error'}))
}

export const setFinishCart = (req,res) => {
  const cid = req.params.cid;
  const email = req.params.email;
  cartService.setFinishCart(cid,email)
    .then(result=>{
      if(result){
        res.send({result: "success", payload:result})
      } else {
        res.status(400).json({error:cartService.getError()})
      }
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error'}))
}