import {productService} from '../repositories/index.js'
import servidor from "./../server.js"

export const getProducts = (req, res) => {console.log('entro')
  productService.getProducts(req.query.limit,req.query.page,req.query.query,req.query.sort)
    .then(result =>{
      result.result = (result.totalDocs && result.totalDocs>0) ? "success" : "error";
      res.send(result)
    })
    .catch(error => res.status(500).json({error: "Internal Server Error. "+(error._message? error._message:'')}))
}

export const getProduct = (req,res)=>{
  const id = req.params.pid;
  productService.getProduct(id)
    .then(product=>{
      if(product){
        res.send({result: "success", payload:product})
      } else {
        res.status(404).json({error:productService.getError()})
      }
    })
    .catch(error => res.status(500).json({error: "Internal Server Error. "+(error._message? error._message:'')}))
}

export const setProduct = (req,res)=>{console.log("nuevo producto")
  const {title, description, code, price, stock, category, thumbnails} = req.body;
  productService.setProduct(title, description, code, price, stock, category, thumbnails)
    .then(product=>{
      if(product){
        servidor.io.emit("crea",product)
        res.send({result: "success", payload:product})
      } else {
        res.status(400).json({error:productService.getError()})
      }
    })
    .catch(error => res.status(500).json({error: "Internal Server Error. "+(error._message? error._message:'')}))
}

export const updateProduct = (req,res)=>{console.log("put")
  const id = req.params.pid;
  const {title, description, code, price, stock, category, thumbnails} = req.body;  
  productService.updateProduct(id, title, description, code, price, stock, category, thumbnails)
    .then(product=>{
      if(product){
        res.send({result: "success", payload:product})
      } else {
        res.status(400).json({error:productService.getError()})
      }
    })
    .catch(error => res.status(500).json({error: "Internal Server Error. "+(error._message? error._message:'')}))
}

export const delProduct= (req,res)=>{
  const id = req.params.pid;
  productService.delProduct(id)
    .then(result=>{
      if(result){
        servidor.io.emit("elimina",id)
        res.send({result: "success", message:"Producto eliminado correctamente"})
      } else {
        res.status(400).json({error:productService.getError()})
      }
    })
    .catch(error => res.status(500).json({error: "Internal Server Error. "+(error._message? error._message:'')}))
}

export const getProductsForView = (req, res) => {
  productService.getProducts(req.query.limit,req.query.page,req.query.query,req.query.sort)
    .then(results =>{
      results.result = (results.totalDocs && results.totalDocs>0) ? true : false;
      res.render('index',results)
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error'}))
}

export const getProductsForViewRealTime = (req, res) => {
  productService.getProducts()
    .then(results =>{
      res.render('realTimeProducts',results)
    })
    .catch(error => res.status(500).json({error: 'Internal Server Error'}))
}