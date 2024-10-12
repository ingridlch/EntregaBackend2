import productModel from "../models/products.model.js"

class ProductsDAO{
  constructor(){
    this.error = ''
  }

  // Busca todos los productos, filtros, paginación y ordenamiento
  async getProducts(plimit=10,ppage=1,pquery='',psort=''){
    try {
      // si se pasó el parámetro query se filtra por categoría (category) o disponibilidad (status=true|false)
      const query = pquery && pquery!=='' ? pquery : ''
      const filtro = query==='' ? {} : ((query==='true'||query==='false') ? {status:query} : {category: query})

      // seteo opciones 
      let limit = parseInt(plimit)
      let page  = parseInt(ppage)
      limit = (!isNaN(limit) && limit>0) ? limit : 10
      page  = (!isNaN(page) && page>0) ? page : 1
      const opciones = { page, limit, lean: true }
      const sort = (psort && (psort==='asc' || psort ==='desc')) ? psort : ''
      if(sort!=='') opciones.sort = {price: sort}

      // busco productos
      const result = await productModel.paginate(filtro, opciones)      
      result.payload = result.docs
      delete result.docs
      result.prevLink = result.hasPrevPage ? `http://localhost:8080/products?limit=${limit}&page=${result.prevPage}&query=${query}&sort=${sort}` : ''
      result.nextLink = result.hasNextPage ? `http://localhost:8080/products?limit=${limit}&page=${result.nextPage}&query=${query}&sort=${sort}` : ''
      return result
    } catch(error) {
      console.log("Error al buscar productos");
      throw error
    }
  }

  // Busca producto por id
  async getProduct(id){
    try {
      const producto = await productModel.findOne({ _id: id })
      return producto;
    } catch(error) {
      console.log("Error al buscar producto");
      throw error
    }
  }

  // Crea nuevo producto
  async setProduct(ptitle, pdescription, pcode, pprice, pstock, pcategory, pthumbnails){
    try {
      const product = this.getValidNew(ptitle, pdescription, pcode, pprice, pstock, pcategory, pthumbnails);
      if(product){
        let result = await productModel.create(product)
        console.log("Producto creado correctamente");
        return result;
      } else {
        console.log("Error al crear producto, faltan datos");
        return undefined
      }
    } catch(error){
      console.log("Error al guardar producto");
      throw error
    }
  }

  // Modifica producto
  async updateProduct(pid, ptitle, pdescription, pcode, pprice, pstock, pcategory, pthumbnails){
    try {
      const product = await productModel.findOne({ _id: pid });
      if(ptitle){
        if(ptitle.trim()!=''){
          product.title=ptitle.trim()
        } else {
          this.error = "Title no debe ser vacío"
          return undefined
        }
      }
      if(pdescription){
        if(pdescription.trim()!=''){
          product.description=pdescription.trim()
        } else {
          this.error = "Description no debe ser vacío"
          return undefined
        }
      }
      if(pcode){
        if(pcode.trim()!=''){
          product.code=pcode.trim()
        } else {
          this.error = "Code no debe ser vacío"
          return undefined
        }
      }
      if(pprice){
        if(!isNaN(parseFloat(pprice))){
          product.price=parseFloat(pprice)
        } else {
          this.error = "Price debe ser un valor numérico"
          return undefined
        }
      }
      if(pstock){
        if(!isNaN(parseFloat(pstock))){
          product.stock=parseFloat(pstock)
        } else {
          this.error = "Stock debe ser un valor numérico"
          return undefined
        }
      }
      if(pcategory){
        if(pcategory.trim()!=''){
          product.category=pcategory.trim()
        } else {
          this.error = "Category no debe ser vacío"
          return undefined
        }
      }
      product.thumbnails= (pthumbnails && Array.isArray(pthumbnails)) ? pthumbnails : product.thumbnails
      
      let result = await productModel.updateOne({ _id: pid }, product)
      console.log("Producto modificado correctamente");
      return result;
    } catch(error){
      console.log("Error al modificar producto");
      throw error
    }
  }

  // Baja de producto 
  async delProduct(pid){
    try{
      const result = await productModel.deleteOne({ _id: pid })
      console.log("Producto eliminado correctamente",result);
      return true;
    } catch(error){
      console.log("Error al dar de baja producto")
      throw error
    }
  }

  // Valida todos los datos para crear producto
  getValidNew(ptitle, pdescription, pcode, pprice, pstock, pcategory, pthumbnails){
    let result=undefined
    const title = ptitle.trim()
    const description = pdescription.trim()
    const code = pcode.trim()
    const price = parseFloat(pprice)
    const stock = parseInt(pstock)
    const category = pcategory.trim()
    const thumbnails = pthumbnails===undefined|| !Array.isArray(pthumbnails) ? [] : pthumbnails
    const status = true    
    if (title!=='' && description!=='' && code.trim()!=='' && !isNaN(price) && !isNaN(stock) && category!==''){
      result = {title, description, code, price, status, stock, category, thumbnails}
    } else {
      this.error = "Todos los datos son obligatorios, stock y price deben ser numéricos"
    }
    return result;  
  }

  getError(){
    return this.error
  }
    
}

export default ProductsDAO