import cartModel from "../models/carts.model.js"
import productModel from "../models/products.model.js"
import TicketsDAO from "./tickets.dao.js"

class CartsDAO{
  constructor(){
    this.error = ''
  }

  // Crea nuevo carrito
  async setCart(products){
    try{
      const novalidos = this.getNoValidProducts(products);
      if(novalidos){
        console.log("Productos no validos")
        return undefined
      }
      const cart = await cartModel.create({products})
      console.log("Carrito creado correctamente")
      return cart
    } catch(error){
      console.log(error)
      throw error
    }
  }

  // Busca carrito por id y lista los productos que le pertenecen
  async getCart(cid){
    try{
      const cart = await cartModel.findOne({ _id: cid }).populate("products.product").lean()
      console.log("Busca carrito")
      return cart;
    } catch(error){
      throw error
    }
  }

  // Agrega producto al carrito o aumenta cantidad
  async setProductByCart(cid,pid){
    try{console.log('agrega p al cart')
      const cart = await cartModel.findOne({ _id: cid })
      const pindex = cart.products.findIndex(pr => pr.product.toString()===pid);
      if(pindex<0){
        cart.products.push({product:pid,quantity:1})
      } else {
        cart.products[pindex].quantity++
      }
      const result = await cartModel.updateOne({ _id: cid }, cart)
      return result;
    } catch(error){
      throw error
    }
  }

  // Elimina del carrito el producto indicado
  async delProductByCart(cid,pid){
    try{
      const cart = await cartModel.findOne({ _id: cid })
      const products = cart.products.filter(pr => pr.product.toString()!==pid);
      cart.products = products
      const result = await cartModel.updateOne({ _id: cid }, cart)
      return result;
    } catch(error){
      throw error
    }
  }  

  // Elimina todos los productos del carrito
  async delProductsByCart(cid){
    try{
      const cart = await cartModel.findOne({ _id: cid })
      cart.products=[]
      const result = await cartModel.updateOne({ _id: cid }, cart)
      return result;
    } catch(error){
      throw error
    }
  }  

  // Actualiza el carrito con el arreglo de productos pasado
  async updateProductsByCart(cid,products){
    try{      
      const novalidos = getNoValidProducts(products);
      if(novalidos){
        console.log("Productos no validos")
        return undefined
      }
      const cart = await cartModel.findOne({ _id: cid })
      cart.products=products
      const result = await cartModel.updateOne({ _id: cid }, cart)
      return result;
    } catch(error){
      throw error
    }
  }  

  // Actualiza la cantidad del producto indicado del carrito
  async updateQuantityByCartProduct(cid,pid,pquantity){
    try{
      const quantity = parseInt(pquantity)
      if(isNaN(quantity)||quantity<=0){
        this.error = "Cantidad no válida"
        return undefined
      }
      const cart = await cartModel.findOne({ _id: cid })
      // buscar producto
      const pindex = cart.products.findIndex(pr => pr.product.toString()===pid);
      if(pindex<0){
        this.error = "Producto no válido"
        return undefined
      } else {
        cart.products[pindex].quantity = quantity
      }
      const result = await cartModel.updateOne({ _id: cid }, cart)
      return result;
    } catch(error){
      throw error
    }
  }  

  // finaliza el proceso de compra del carrito
  async setFinishCart(cid,email){console.log(' finish cart 1 ')
    try {
      if(!cid || cid===""){ this.error = "Id de carrito válido"; return undefined;}
      const cart = await cartModel.findOne({ _id: cid })
      const products=[]//productos con stock suficiente para compra
      const productscart = []// productos sin stock suficiente, se quedan en el carrito
      let amount = 0; 
      let result = null
      //recorre los productos del carrito, si tiene stock lo descuenta, si no tiene lo deja en el carrito
      for(let i=0; i<cart.products.length; i++){
        const producto = await productModel.findOne({ _id: cart.products[i].product })
        if(producto.stock>=cart.products[i].quantity){
          producto.stock=producto.stock-parseInt(cart.products[i].quantity);
          amount += parseInt(cart.products[i].quantity) * parseFloat(producto.price);
          result = await productModel.updateOne({ _id: cart.products[i].product }, producto)
          products.push(cart.products[i])
        } else {
          productscart.push(cart.products[i])
        }
      }
      if(amount<=0){ this.error = "No hay stock para los productos del carrito"; return undefined;}
      // genera ticket de compra
      const Ticket = new TicketsDAO();
      const ticket = Ticket.setTicket(amount,email,products)
      // actualiza carrito dejando los productos que no tenian stock
      cart.products = productscart
      let resultcart = await cartModel.updateOne({ _id: cid }, cart)
      return {products_no_process:productscart}
    } catch(error){
      throw error
    }
  }

  getNoValidProducts(products){
      let novalidos = false;
      if(products.some(pr=>(!Number.isInteger(pr.quantity)))){
        this.error = 'Cantidad no válida'
        return true
      }
      if(products.some(pr=>(!(pr.product)||pr.product===''))){
        this.error = 'Id de producto no válido'
        return true
      }
      return novalidos
  }

  getError(){
    return this.error
  }

}

export default CartsDAO