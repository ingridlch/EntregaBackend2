import userModel from "../models/users.model.js"

class UsersDAO{
  constructor(){}
  // Busca user por email
  async getByEmail(email){
    const user = await userModel.findOne({ email }, { email: 1, first_name: 1, last_name: 1, password: 1, role:1, cart: 1 });
    return user;
  }

  async getById(id){
    const user = await userModel.findOne({ _id: id });
    return user;
  }

  async create(user){
    const newUser = new userModel(user)
    return await newUser.save()
  }

  async update(id,user){
    let result = await userModel.updateOne({ _id: id }, user)
    return result
  }

  async delete(id){
    const result = await userModel.deleteOne({ _id: id })
    return result
  }
}

export default UsersDAO