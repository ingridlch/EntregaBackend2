import UsersDAO from "../dao/classes/users.dao.js"
import CartsDAO from "../dao/classes/carts.dao.js"
import ProductsDAO from "../dao/classes/products.dao.js"
import TicketsDAO from "../dao/classes/tickets.dao.js"
import UserRepository from "./users.repositories.js"
import CartRepository from "./carts.repositories.js"
import ProductRepository from "./products.repositories.js"

export const userService = new UserRepository(new UsersDAO())
export const cartService = new CartRepository(new CartsDAO(),ProductsDAO,TicketsDAO)
export const productService = new ProductRepository(new ProductsDAO())