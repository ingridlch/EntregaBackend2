import userDTO from "./../dao/dtos/users.dtos.js"
import { createHash, isValidPassword } from "./../utils.js"

export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
    this.error = ''
    this.tipoerror = 400
  }

  // Busca user por email y valida password
  async getUserPassword(email,password){
    try {
      if(!(email && email.trim()!='' && password && password.trim()!='')) {
        this.error = "No se puede validar usuario. Falta email y/o password"
        return undefined
      }  
      const user = await this.dao.getByEmail(email);
      if (!user){
        this.error = "Usuario no encontrado"
        return undefined
      }
      if (isValidPassword(user, password)){
        return user
      } else {
        this.error = "Usuario o password incorrecto"
        this.tipoerror = 403
        return undefined
      }
    } catch(error) {
      console.log("Error en log de usuario ");
      throw error
    }
  }

  // Crea nuevo usuario
  async setUser(first_name, last_name, email, age, password, cart, role){
    try{
      if(!(email && email.trim()!='' && password && password.trim()!='')) {
        this.error = "No se puede crear usuario. Falta email y/o password"
        return undefined
      }
      const user =  await this.dao.getByEmail(email);
      console.log(user.email)
      if (user && user.email===email){
        this.error = "No se puede crear usuario, ya hay registrado con el email ingresado"
        return undefined
      } else{ 
        let userToInsert = new userDTO({first_name, last_name, email, age, password, cart, role});
        let result = await this.dao.create(userToInsert);
        return newUser
      }
    } catch(error){
      console.log(error)
      throw error
    }
  }

  // Modifica usuario
  async updateUser(id, first_name, last_name, age, password, cart, role){
    try {
      if(!id || id===""){ this.error = "No se puede modificar usuario. Id no válido"; return undefined;}
      const user = await this.dao.getById(id); console.log(user)
      let userToUpdate = new userDTO(user,{first_name, last_name, age, password, cart, role});
      let result = await this.dao.update(id,userToUpdate)
      return result;
    } catch(error){
      console.log("Error al modificar usuario");
      throw error
    }
  }

  // Baja de usuario 
  async delUser(id){
    try{
      if(!id || id===""){ this.error = "No se puede eliminar usuario. Id no válido"; return false;}
      let result = await this.dao.delete(id);
      console.log("Usuario eliminado correctamente",result);
      return true;
    } catch(error){
      console.log("Error al dar de baja user")
      throw error
    }
  }

  getError(){
    return this.error
  }

  getTipoError(){
    return this.tipoerror
  }

}