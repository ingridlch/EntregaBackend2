import cartModel from "../models/carts.model.js"

class CartsDAO{
  constructor(){
  }

  // Busca carrito por id
  async getById(cid){
    const cart = await cartModel.findOne({ _id: cid })
    return cart;
  }

  // Busca carrito por id y lista productos con su nombre
  async getByIdProducts(cid){
    const cart = cartModel.findOne({ _id: cid }).populate("products.product").lean()
    return cart;
  }

  async create(products){
    const cart = await cartModel.create(products)
    return cart
  }

  async update(cid,cart){
    let result = await cartModel.updateOne({ _id: cid }, cart)
    return result
  }


}

export default CartsDAO