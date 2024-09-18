import {Router} from 'express'
import { passportCall, authorization } from '../../utils.js'
import jwt from 'jsonwebtoken'
import Users from "./../../controllers/users.js"

const router = Router();

router.post('/login',async(req,res)=>{console.log('entra login')
  const {email,password} = req.body
  const iusers = new Users();
  iusers.getUserPassword(email,password)
    .then(user=>{
      if(user){
        let token = jwt.sign({email, role:user.role},"coderSecret",{expiresIn:"24h"})  
        res.send({message: "Inicio de sesión exitoso",token})
      } else {
        res.status(iusers.getTipoError()).json({error:iusers.getError()})
      }
    })
    .catch(error => res.status(500).json({error: "Internal Server Error. "+(error._message? error._message:'')}))
})

router.get('/current',passportCall('jwt'), authorization('user'), (req,res)=>{
  res.send(req.user)
})

router.post("/register", (req,res)=>{console.log("nuevo usuario")
  const {first_name, last_name, email, age, password, cart, role} = req.body
  const iusers = new Users();
  iusers.setUser(first_name, last_name, email, age, password, cart, role)
    .then(user=>{
      if(user){
        res.send({result: "success", payload:user})
      } else {
        res.status(400).json({error:iusers.getError()})
      }
    })
    .catch(error => res.status(500).json({error: "Internal Server Error. "+(error._message? error._message:'')}))
})

router.put("/:id", (req,res)=>{
  const id = req.params.id;
  const {first_name, last_name, age, password, cart, role} = req.body
  const iusers = new Users();
  iusers.updateUser(id, first_name, last_name, age, password, cart, role)
  .then(user=>{
    if(user){
      res.send({result: "success", payload:user})
    } else {
      res.status(400).json({error:iusers.getError()})
    }
  })
  .catch(error => res.status(500).json({error: "Internal Server Error. "+(error._message? error._message:'')}))
})

router.delete("/:id", (req,res)=>{
  const id = req.params.id;
  const iusers = new Users();
  iusers.delUser(id)
  .then(result=>{
    if(result){
      res.send({result: "success", message:"Usuario eliminado correctamente"})
    } else {
      res.status(400).json({error:iusers.getError()})
    }
  })
  .catch(error => res.status(500).json({error: "Internal Server Error. "+(error._message? error._message:'')}))
})


export default router;