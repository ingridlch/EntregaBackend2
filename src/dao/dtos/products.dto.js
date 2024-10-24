export default class ProductDTO {
  constructor(product,upproduct){//title, description, code, price, stock, category, thumbnails
    if(upproduct){
      this.title       = (upproduct.title) ? upproduct.title.trim() : product.title
      this.description = (upproduct.description) ? upproduct.description.trim() : product.description
      this.code        = (upproduct.code) ? upproduct.code.trim() : product.code
      this.price       = (upproduct.price) ? parseFloat(upproduct.price) : product.price
      this.status      = product.status
      this.stock       = (upproduct.stock) ? parseInt(upproduct.stock) : product.stock
      this.category    = (upproduct.category) ? upproduct.category.trim() : product.category
      this.thumbnails  = (upproduct.thumbnails && Array.isArray(upproduct.thumbnails)) ? upproduct.thumbnails : product.thumbnails
    } else {
      this.title       = product.title.trim()
      this.description = product.description.trim()
      this.code        = product.code.trim()
      this.price       = parseFloat(product.price)
      this.status      = true
      this.stock       = parseInt(product.stock)
      this.category    = product.category.trim()
      this.thumbnails  = (product.thumbnails && Array.isArray(product.thumbnails)) ? product.thumbnails : []
    }
  }
}