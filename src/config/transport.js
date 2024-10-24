import nodemailer from 'nodemailer';
import config from "./config.js"

const transport = nodemailer.createTransport({
  service : config.transport_service,
  port    : config.transport_port,
  auth    : {
    user  : config.transport_user,
    pass  : config.transport_pass
  }
})

export default transport