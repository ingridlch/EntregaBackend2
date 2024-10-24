import TicketRepository from "./tickets.repositories.js";

export default class CartRepository {
  constructor(dao,productDao,ticketDao) {
    this.dao = dao;
    this.productDao = productDao;
    this.ticketDao = ticketDao;
    this.error = ''
  }

    // Crea nuevo carrito
  async setCart(products){
    try{
      const novalidos = this.getNoValidProducts(products);
      if(novalidos){
        this.error = "No se pudo crear carrito "+this.error
        return undefined
      }
      const cart = await this.dao.create({products})
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
      if(!cid || cid==="") {
        this.error = "No se puede buscar carrito. Id no válido"
        return undefined
      }
      const cart = await this.dao.getByIdProducts(cid)
      console.log("Busca carrito")
      return cart;
    } catch(error){
      throw error
    }
  }

  // Agrega producto al carrito o aumenta cantidad
  async setProductByCart(cid,pid){
    try{console.log('agrega p al cart')
      if(!cid || cid==="") {
        this.error = "No se puede agregar productos, id de carrito inválido"
        return undefined
      }
      if(!pid || pid==="") {
        this.error = "No se puede agregar al carrito, id de producto inválido"
        return undefined
      }
      const cart = await this.dao.getById(cid)
      const pindex = cart.products.findIndex(pr => pr.product.toString()===pid);
      if(pindex<0){
        cart.products.push({product:pid,quantity:1})
      } else {
        cart.products[pindex].quantity++
      }
      const result = await this.dao.update(cid,cart)
      return result;
    } catch(error){
      throw error
    }
  }

  // Elimina del carrito el producto indicado
  async delProductByCart(cid,pid){
    try{
      if(!cid || cid==="") {
        this.error = "No se puede eliminar producto, id de carrito inválido"
        return undefined
      }
      if(!pid || pid==="") {
        this.error = "No se puede eliminar producto, id inválido"
        return undefined
      }
      const cart = await this.dao.getById(cid)
      const products = cart.products.filter(pr => pr.product.toString()!==pid);
      cart.products = products
      const result = await this.dao.update(cid,cart)
      return result;
    } catch(error){
      throw error
    }
  }  

  // Elimina todos los productos del carrito
  async delProductsByCart(cid){
    try{
      if(!cid || cid==="") {
        this.error = "No se puede eliminar los productos del carrito, id inválido"
        return undefined
      }
      const cart = await this.dao.getById(cid)
      cart.products=[]
      const result = await this.dao.update(cid,cart)
      return result;
    } catch(error){
      throw error
    }
  }  

  // Actualiza el carrito con el arreglo de productos pasado
  async updateProductsByCart(cid,products){
    try{ 
      if(!cid || cid==="") {
        this.error = "No se puede actualizar productos del carrito, id inválido"
        return undefined
      }     
      const novalidos = getNoValidProducts(products);
      if(novalidos){
        this.error = "No se pudo actualizar carrito. "+this.error;
        return undefined
      }
      const cart = await this.dao.getById(cid)
      cart.products=products
      const result = await this.dao.update(cid,cart)
      return result;
    } catch(error){
      throw error
    }
  }  

  // Actualiza la cantidad del producto indicado del carrito
  async updateQuantityByCartProduct(cid,pid,pquantity){
    try{
      if(!cid || cid==="") {
        this.error = "No se puede actualizar productos, id de carrito inválido"
        return undefined
      }
      if(!pid || pid==="") {
        this.error = "No se puede actualizar carrito, id de producto inválido"
        return undefined
      }
      const quantity = parseInt(pquantity)
      if(isNaN(quantity)||quantity<=0){
        this.error = "No se pudo actualizar carrito. Cantidad no válida"
        return undefined
      }
      const cart = await this.dao.getById(cid)
      // buscar producto
      const pindex = cart.products.findIndex(pr => pr.product.toString()===pid);
      if(pindex<0){
        this.error = "No se pudo actualizar carrito. Producto no válido"
        return undefined
      } else {
        cart.products[pindex].quantity = quantity
      }
      const result = await this.dao.update(cid,cart)
      return result;
    } catch(error){
      throw error
    }
  }  

  // finaliza el proceso de compra del carrito
  async setFinishCart(cid,email){console.log(' finish cart 1 ')
    try {
      if(!cid || cid===""){ this.error = "Id de carrito válido"; return undefined;}
      const cart = await this.dao.getById(cid)
      const products=[]//productos con stock suficiente para compra
      const productscart = []// productos sin stock suficiente, se quedan en el carrito
      let amount = 0; 
      let result = null
      let productDAO = new this.productDao()
      //recorre los productos del carrito, si tiene stock lo descuenta, si no tiene lo deja en el carrito
      for(let i=0; i<cart.products.length; i++){
        const producto = await productDAO.getById(cart.products[i].product)
        if(producto.stock>=cart.products[i].quantity){
          producto.stock=producto.stock-parseInt(cart.products[i].quantity);
          amount += parseInt(cart.products[i].quantity) * parseFloat(producto.price);
          result = await productDAO.update(cart.products[i].product, producto) 
          products.push(cart.products[i])
        } else {
          productscart.push(cart.products[i])
        }
      }
      if(amount<=0){ this.error = "No hay stock para los productos del carrito"; return undefined;}
      // genera ticket de compra
      const ticketService = new TicketRepository(new this.ticketDao())
      const ticket = ticketService.setTicket(amount,email,products)
      // actualiza carrito dejando los productos que no tenian stock
      cart.products = productscart
      let resultcart = await this.dao.update(cid,cart)
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