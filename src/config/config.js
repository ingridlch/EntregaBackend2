import dotenv from "dotenv"

dotenv.config()

export default {
    port       : process.env.PORT,
    mongo_url  : process.env.MONGO_URL,
    secret_key : process.env.SECRET_KEY,
    transport_service : process.env.TRANSPORT_SERVICE,
    transport_port    : process.env.TRANSPORT_PORT,
    transport_user    : process.env.TRANSPORT_USER,
    transport_pass    : process.env.TRANSPORT_PASS
}