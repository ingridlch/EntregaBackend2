export default class TicketDTO {
  constructor(ticket){//code, purchase_datetime, amount, purchaser, products
    this.code              = ticket.code
    this.purchase_datetime = ticket.purchase_datetime
    this.amount            = ticket.amount
    this.purchaser         = ticket.purchaser
    this.products          = ticket.products
  }
}