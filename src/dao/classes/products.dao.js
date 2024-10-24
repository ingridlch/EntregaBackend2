import productModel from "../models/products.model.js"

class ProductsDAO{
  constructor(){
  }

  getProducts
  // Busca productos con los filtros y opciones pasados por parametro
  async getByFilters(filtro, opciones){
    let result = await productModel.paginate(filtro, opciones) 
    return result;
  }

  // Busca producto por id
  async getById(id){
    const producto = await productModel.findOne({ _id: id })
    return producto;
  }

  async create(pproduct){
    const product = await productModel.create(pproduct)
    return product
  }

  async update(id,product){
    let result = await productModel.updateOne({ _id: id }, product)
    return result
  }

  async delete(id){
    const result = await productModel.deleteOne({ _id: id })
    return result
  }
    
}

export default ProductsDAO