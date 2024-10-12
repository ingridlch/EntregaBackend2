import ticketModel from "../models/tickets.model.js"

class TicketsDAO{
  constructor(){
    this.error = ''
  }

  // Crea nuevo Ticket
  async setTicket(amount,purchaser,products){
    try{
      const cant = await ticketModel.countDocuments()
      const code = 'C'+(cant+1)// los tickets no pueden eliminarse, por lo que se puede crear el codigo contando la cantidad
      const d = new Date();
      const purchase_datetime = d.getFullYear()+"-"+((d.getMonth()+1)>9?(d.getMonth()+1):"0"+(d.getMonth()+1))+"-"+(d.getDate()>9?d.getDate():"0"+d.getDate())+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
      const ticket = await ticketModel.create({code,purchase_datetime,amount,purchaser,products})
      console.log("Ticket creado correctamente")
      return ticket
    } catch(error){
      console.log(error)
      throw error
    }
  }

}  

export default TicketsDAO