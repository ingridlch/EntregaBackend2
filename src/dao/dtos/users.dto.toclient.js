export default class UserDTOtoClient {
    constructor(user){
      if(user){
        this.first_name = user.first_name
        this.last_name  = user.last_name
        this.role       = user.role
      } 
    }
  }