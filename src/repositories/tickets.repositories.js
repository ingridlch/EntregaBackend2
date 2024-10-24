import ticketDTO from "../dao/dtos/tickets.dto.js" // DTO para moldear el objeto y pasarlo al DAO
import transport from "./../config/transport.js"
import config from './../config/config.js'
import {v4} from 'uuid'

export default class TicketRepository {
  constructor(dao) {
    this.dao = dao;
  }

 // Crea nuevo Ticket
 async setTicket(amount,purchaser,products){
    try{
      const code = v4();
      const d = new Date();
      const purchase_datetime = d.getFullYear()+"-"+((d.getMonth()+1)>9?(d.getMonth()+1):"0"+(d.getMonth()+1))+"-"+(d.getDate()>9?d.getDate():"0"+d.getDate())+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
      const ticketToInsert = new ticketDTO({code,purchase_datetime,amount,purchaser,products})
      const ticket = await this.dao.create(ticketToInsert)
      let result = await transport.sendMail({
        from : config.transport_service,
        to : purchaser, //purchaser: email del usuario
        subject : 'Ticket de compra en PUERTO DELICIA',
        html : `<div>
        <h3>¡Felicitaciones! ¡Su compra en PUERTO DELICIA finalizó exitosamente!</h3>
        <h4>Ticket: ${ ticket.id } <h4>
        <h4>Total de la compra: $ ${ amount }.<h4>
        <p>En breve nos comunicaremos para coordinar el envío y ¡que disfrute su compra!</p>
        <div>`
      })
      console.log("Ticket creado correctamente")
      return ticket
    } catch(error){
      console.log(error)
      throw error
    }
  }

}