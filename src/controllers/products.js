const fs = require('fs').promises

class Products{
  constructor(){
    this.file = "productos.json"
  }

  // Busca todos los productos, como se manejan bajas lógicas filtra todos los con status true
  async getProducts(){
    try {
      const products = await this.readProducts();
      return products.filter(pr=>pr.status);
    } catch(error) {
      console.log("Error al buscar productos");
      throw error
    }
  }

  // Busca producto por id
  async getProduct(id){
    try {
      const products = await this.readProducts();
      const producto = products.find(pr=>pr.id===id);
      console.log("Producto encontrado")
      return producto;
    } catch(error) {
      console.log("Error al buscar producto");
      throw error
    }
  }

  // Crea nuevo producto
  async setProduct(ptitle, pdescription, pcode, pprice, pstock, pcategory, pthumbnails){
    try {
      const product = this.getValid(0, ptitle, pdescription, pcode, pprice, pstock, pcategory, pthumbnails);
      if(product){
        const products = await this.readProducts();
        product.id = products.length+1;
        products.push(product);
        await fs.writeFile(this.file, JSON.stringify(products,null,2));
        console.log("Producto creado correctamente");
        return product;
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
      const product = this.getValid(pid, ptitle, pdescription, pcode, pprice, pstock, pcategory, pthumbnails);
      if(!product){
        console.log("Error al modificar producto, datos incorrectos");
        return undefined
      }
      const products = await this.readProducts();
      const index = products.findIndex(pr => pr.id === product.id);
      if(index<0){
        console.log("Error al modificar producto, id no valido");
        return undefined
      }
      products[index]=product;
      await fs.writeFile(this.file, JSON.stringify(products,null,2));
      console.log("Producto modificado correctamente");
      return product;
    } catch(error){
      console.log("Error al modificar producto");
      throw error
    }
  }

  // Baja lógica de producto cambiando el status a false
  async delProduct(pid){
    try{
      const products = await this.readProducts();
      const index = products.findIndex(pr => pr.id === pid);
      if(index<0){
        console.log("Error al eliminar producto, id no valido");
        return false
      }
      products[index].status=false;
      await fs.writeFile(this.file, JSON.stringify(products,null,2));
      console.log("Producto eliminado correctamente");
      return true;
    } catch(error){
      console.log("Error al dar de baja producto")
      throw error
    }
  }

  // Valida todos los datos para crear o modificar producto
  getValid(pid, ptitle, pdescription, pcode, pprice, pstock, pcategory, pthumbnails){
    let result=undefined
    const id = parseInt(pid)
    const title = ptitle.trim()
    const description = pdescription.trim()
    const code = pcode.trim()
    const price = parseFloat(pprice)
    const stock = parseInt(pstock)
    const category = pcategory.trim()
    const thumbnails = pthumbnails===undefined|| !Array.isArray(pthumbnails) ? [] : pthumbnails
    const status = true      
    if (id>=0 && title!=='' && description!=='' && code.trim()!=='' && !isNaN(price) && !isNaN(stock) && category!==''){
      result = {id, title, description, code, price, status, stock, category, thumbnails}
    } 
    return result;  
  }

  // Lectura de todos los productos del archivo productos.json
  async readProducts(){
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

module.exports = Products