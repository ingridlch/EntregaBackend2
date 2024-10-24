export default class UserDTO {
  constructor(user,upuser){//first_name, last_name, email, age, password:createHash(password), cart, role
    if(upuser){
      this.first_name = (upuser.first_name && upuser.first_name.trim()!='') ? upuser.first_name.trim() : user.first_name
      this.last_name  = (upuser.last_name && upuser.last_name.trim()!='') ? upuser.last_name.trim() : user.last_name
      this.email      = user.email
      this.age        = upuser.age && parseInt(upuser.age)>0 ? upuser.age : user.age
      this.password   = (upuser.password && upuser.password.trim()!='') ? upuser.password : user.password
      this.cart       = (upuser.cart) ? upuser.cart : user.cart
      this.role       = (upuser.role && upuser.role.trim()!='') ? upuser.role.trim() : user.role
    } else {
      this.first_name = user.first_name.trim()
      this.last_name  = user.last_name.trim()
      this.email      = user.email
      this.age        = user.age
      this.password   = user.password
      this.cart       = user.cart
      this.role       = user.role.trim()
    }
  }
}