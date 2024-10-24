import { fileURLToPath } from "url"
import { dirname } from "path"
import bcrypt from "bcryptjs"
import passport from "passport"
import { error } from "console"
import jwt from 'jsonwebtoken'
import config from "./config/config.js"

const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10))
export const isValidPassword = (user, password) => bcrypt.compareSync(password,user.password)

export const passportCall = (strategy) => {
  return async (req,res,next)=>{
    passport.authenticate(strategy, function(err, user, info){
      if(err){
        return next(err)
      }
      if(!user){
        return res.status(401).send({ error: info.messages ? info.messages : info.toString() })
      }
      req.user = user
      next()
    })
    (req,res,next)
  }
}

export const handlePolicies = (policies) => {
  return (req, res, next) => {
    if (policies.includes("PUBLIC")) {
      next()
    } else {
      const token = req.headers.authorization
      if (!token) {
        return res.status(401).json({ message: "Token no ha sido proporcionado, no se puede realizar la acción" })
      }
      try {
        const token_verify = jwt.verify(token.split(" ")[1], config.secret_key)
        if (policies.includes(token_verify.role)) {
          req.params.email = token_verify.email
          next()
        } else {
          return res.status(403).json({ message: "Acceso denegado por politicas de autorización" })
        }
      } catch (error) {
        return res.status(401).json({ message: "Token de autorizacion inválido, no se puede realizar la acción" })
      }
    }
  }
}

export const authorization = () =>{
  return async (req, res, next) =>{
    if(!req.user) return res.status(401).send({error: "User unauthorized"})
    if(req.user.role!=='user'||req.user.role!=='admin')  return res.status(403).send({error: "No permission for type of user"})
    next()  
  }
}