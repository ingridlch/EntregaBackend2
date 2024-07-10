const fs = require('fs').promises

class Carts{
  constructor(){
    this.file = "carrito.json"
  }

  // Crea nuevo carrito
  async setCart(products){
    try{
      if(products.some(pr=>(!Number.isInteger(pr.product)||!Number.isInteger(pr.quantity)))){
        console.log("Productos no validos")
        return undefined
      }
      const carts = await this.readCarts();
      const id    = carts.length+1;
      const cart  = {id,products}
      carts.push(cart);
      await fs.writeFile(this.file, JSON.stringify(carts,null,2));
      console.log("Carrito creado correctamente");
      return cart;
    } catch(error){
      throw error
    }
  }

  // Busca carrito por id y lista los productos que le pertenecen
  async getCart(id){
    try{
      const carts = await this.readCarts();
      const cart = carts.find(ca=>ca.id===id);
      console.log("Busca carrito")
      return (cart) ? cart.products : undefined;
    } catch(error){
      throw error
    }
  }

  // Agrega producto al carrito o aumenta cantidad
  async setProductByCart(cid,pid){
    try{
      const carts  = await this.readCarts();
      const cindex = carts.findIndex(ca => ca.id === cid);
      if(cindex<0){
        console.log("Error al modificar carrito, id de carrito no valido");
        return undefined
      }
      const pindex = carts[cindex].products.findIndex(pr => pr.id === pid);
      if(pindex<0){
        carts[cindex].products.push({produc:pid,quantity:1})
      } else {
        carts[cindex].products[pindex].quantity++;
      }
      await fs.writeFile(this.file, JSON.stringify(carts,null,2));
      console.log("Carrito modificado, producto agregado correctamente");
      return carts[cindex];
    } catch(error){
      throw error
    }
  }

  // Lectura de todos los carritos del archivo carrito.json
  async readCarts(){
    try{
      const data = await fs.readFile(this.file, 'utf8')
      return JSON.parse(data);
    } catch(error){
      if(error.code === 'ENOENT'){
        return []
      } else {
        throw error
      }
    }
  }

}

module.exports = Carts