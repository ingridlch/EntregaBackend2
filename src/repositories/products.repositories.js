import productDTO from "../dao/dtos/products.dto.js" // DTO para moldear el objeto y pasarlo al DAO
export default class ProductRepository {
  constructor(dao) {
    this.dao = dao;
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
      let result = await this.dao.getByFilters(filtro, opciones)   
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
      if(!id || id==="") {
        this.error = "No se puede buscar producto. Id no válido"
        return undefined
      }
      const producto = await this.dao.getById(id)
      return producto;
    } catch(error) {
      console.log("Error al buscar producto");
      throw error
    }
  }

  // Crea nuevo producto
  async setProduct(title, description, code, price, stock, category, thumbnails){
    try {
      if (title.trim()!=='' && description.trim()!=='' && code.trim()!=='' && !isNaN(parseFloat(price)) && !isNaN(parseInt(stock)) && category.trim()!==''){
        const product = new productDTO({title, description, code, price, stock, category, thumbnails});
        let result = await this.dao.create(product)
        console.log("Producto creado correctamente");
        return result;
      } else {
        this.error = "Producto no creado. Todos los datos son obligatorios, stock y price deben ser numéricos"
        return undefined
      }
    } catch(error){
      console.log("Error al guardar producto");
      throw error
    }
  }

  // Modifica producto
  async updateProduct(pid, title, description, code, price, stock, category, thumbnails){
    try {
      this.error = ''
      if(!pid || pid==="") this.error = "No se puede modificar producto. Id no válido"
      if(title && title.trim()==='') this.error = "No se puede modificar producto: title no puede ser vacío"
      if(description && description.trim()==='') this.error = "No se puede modificar producto: description no puede ser vacío"
      if(code && code.trim()==='') this.error = "No se puede modificar producto: code no puede ser vacío"
      if(price && isNaN(parseFloat(price))) this.error = "No se puede modificar producto: price debe ser numérico"
      if(stock && isNaN(parseInt(stock))) this.error = "No se puede modificar producto: stock debe ser entero"
      if(category && category.trim()==='') this.error = "No se puede modificar producto: category no puede ser vacío"
      if(this.error!=='') return undefined;

      const product = await this.dao.getById(pid)
      let productToUpdate = new productDTO(product,{title, description, code, price, stock, category, thumbnails});
      let result = await this.dao.update(pid, productToUpdate)
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
      if(!pid || pid==="") {
        this.error = "No se puede eliminar producto. Id no válido"
        return undefined
      }
      const result = await this.dao.delete(pid)
      console.log("Producto eliminado correctamente",result);
      return true;
    } catch(error){
      console.log("Error al dar de baja producto")
      throw error
    }
  }

  getError(){
    return this.error
  }

}