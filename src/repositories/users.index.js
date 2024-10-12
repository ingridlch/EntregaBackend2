import UsersDAO from "../dao/classes/users.dao.js"
import UserRepository from "./users.repositories.js"

const userService = new UserRepository(new UsersDAO())
export default userService