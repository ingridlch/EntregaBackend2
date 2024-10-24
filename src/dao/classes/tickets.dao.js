import ticketModel from "../models/tickets.model.js"

class TicketsDAO{
  constructor(){
  }
 
  async create(pticket){
    const ticket = await ticketModel.create(pticket)
    return ticket
  }
 
}  

export default TicketsDAO