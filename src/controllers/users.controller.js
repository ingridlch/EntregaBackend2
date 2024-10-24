import {userService} from '../repositories/index.js'
import jwt from 'jsonwebtoken'
import config from "./../config/config.js"

export const loginUser = (req,res)=>{ console.log('entra login')
  const {email,password} = req.body
  userService.getUserPassword(email,password)
    .then(user=>{
      if(user){console.log('sigue login '+email+' - '+user.role)
        let token = jwt.sign({email, role:user.role},config.secret_key,{expiresIn:"24h"})  
        res.send({message: "Inicio de sesión exitoso",token})
      } else {
        res.status(userService.getTipoError()).json({error:userService.getError()})
      }
    })
    .catch(error => res.status(500).json({error: "Internal Server Error. "+(error._message? error._message:'')}))
}

export const current = (req,res)=>{
  userService.getUserByEmail(req.user.email)
    .then(user=>{
      if(user){
        res.send(user)
      } else {
        res.status(userService.getTipoError()).json({error:userService.getError()})
      }
    })
    .catch(error => res.status(500).json({error: "Internal Server Error. "+(error._message? error._message:'')}))
}

export const registerUser = (req,res)=>{console.log("nuevo usuario")
  const {first_name, last_name, email, age, password, cart, role} = req.body
  userService.setUser(first_name, last_name, email, age, password, cart, role)
    .then(user=>{
      if(user){
        res.send({result: "success", payload:user})
      } else {
        res.status(400).json({error:userService.getError()})
      }
    })
    .catch(error => res.status(500).json({error: "Internal Server Error. "+(error._message? error._message:'')}))
}

export const updateUser = (req,res)=>{
  const mail = req.params.mail;
  const {first_name, last_name, age, password, cart, role} = req.body
  userService.updateUser(mail, first_name, last_name, age, password, cart, role)
  .then(user=>{
    if(user){
      res.send({result: "success", payload:user})
    } else {
      res.status(400).json({error:userService.getError()})
    }
  })
  .catch(error => res.status(500).json({error: "Internal Server Error. "+(error._message? error._message:'')}))
}

export const delUser = (req,res)=>{
  const id = req.params.id;
  userService.delUser(id)
  .then(result=>{
    if(result){
      res.send({result: "success", message:"Usuario eliminado correctamente"})
    } else {
      res.status(400).json({error:userService.getError()})
    }
  })
  .catch(error => res.status(500).json({error: "Internal Server Error. "+(error._message? error._message:'')}))
}