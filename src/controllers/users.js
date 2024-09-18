import userModel from "../models/users.model.js"
import { createHash, isValidPassword } from '../utils.js'

class Carts{
  constructor(){
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
      const user = await userModel.findOne({ email }, { email: 1, first_name: 1, last_name: 1, password: 1, role:1 });
      if (!user){
        this.error = "Usuario no encontrado"
        return undefined
      }
      if (isValidPassword(user, password)){ console.log('va login')
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
      const user = userModel.findOne({ email })
      console.log(user.email)
      if (user && user.email===email){
        this.error = "No se puede crear usuario, ya hay registrado con el email ingresado"
        return undefined
      } else{ 
        const newUser = new userModel({first_name, last_name, email, age, password:createHash(password), cart, role})
        await newUser.save()
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
      const user = await userModel.findOne({ _id: id });
      if(first_name&&first_name.trim()!='') user.first_name=first_name.trim()
      if(last_name&&last_name.trim()!='') user.last_name=last_name.trim()
      if(age&& parseInt(age)>0) user.age=age
      if(password&&password.trim()!='') user.password=createHash(password)
      if(cart) user.cart=cart
      if(role&&role.trim()!='') user.role=role.trim()
       console.log(user)
      let result = await userModel.updateOne({ _id: id }, user)
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
      const result = await userModel.deleteOne({ _id: id })
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

export default Carts