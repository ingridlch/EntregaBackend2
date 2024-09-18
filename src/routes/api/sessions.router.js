import {Router} from 'express'
import { createHash, isValidPassword, passportCall, authorization } from '../../utils.js'
import jwt from 'jsonwebtoken'
import Users from './../../models/users.model.js'

const router = Router();

router.post('/login',async(req,res)=>{console.log('entra login')
  const {email,password} = req.body
  if(!(email && email.trim()!='' && password && password.trim()!='')) res.status(400).json({error: "Falta email y/o password"})
  try {
    const user = await Users.findOne({ email }, { email: 1, first_name: 1, last_name: 1, password: 1, role:1 });
    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });
    if (isValidPassword(user, password)){ console.log('va login')
      let token = jwt.sign({email, role:user.role},"coderSecret",{expiresIn:"24h"})  
      res.send({message: "Inicio de sesión exitoso",token})
    } else {
      return res.status(403).send({ status: "error", error: "Usuario o password incorrecto" })
    }
  } catch(err) {
    res.status(500).send('Error en login de usuario '+err)
  }  
})

router.get('/current',passportCall('jwt'), authorization('user'), (req,res)=>{
  res.send(req.user)
})

router.post('/register', async(req, res)=>{
  const {first_name, last_name, email, age, password, cart, role} = req.body
  if(!(email && email.trim()!='' && password && password.trim()!='')) res.status(400).json({error: "No se puede crear usuario. Falta email y/o password"})
  console.log('pass '+password+' - '+createHash(password))
  try{
    const user = Users.findOne({ email }, { email: 1})
    console.log(user.email)
    if (user && user.email===email){
      res.status(400).json({error: "No se puede crear usuario, ya hay registrado con el email ingresado"})
    } else{ 
      const newUser = new Users({first_name, last_name, email, age, password:createHash(password), cart, role})
      await newUser.save()
      res.send({result: "success", payload:newUser}) 
    }
  } catch(err){
    res.status(500).send('Error al registrar usuario '+err)
  }
})

router.put("/:id", async(req,res)=>{
  const id = req.params.id;
  if(!id || id==="") res.status(400).json({error: "No se puede modificar usuario. Id no válido"})
  const {first_name, last_name, email, age, password, cart, role} = req.body
  try{
    const user = await Users.findOne({ _id: id });
    if(first_name&&first_name.trim()!='') user.first_name=first_name.trim()
    if(last_name&&last_name.trim()!='') user.last_name=last_name.trim()
    if(email&&email.trim()!='') user.email=email.trim()
    if(age&& parseInt(age)>0) user.age=age
    if(password&&password.trim()!='') user.password=createHash(password)
    if(cart) user.cart=cart
    if(role&&role.trim()!='') user.role=role.trim()
      console.log(user)
    await Users.updateOne({ _id: id }, user)
    res.send({result: "success", payload:user})
  } catch(err){
    res.status(500).send('Error al modificar usuario')
  }
})

router.delete("/:id", async(req,res)=>{
  const id = req.params.id;
  if(!id || id==="") res.status(400).json({error: "No se puede eliminar usuario. Id no válido"})
  try{
    await Users.deleteOne({ _id: id })
    res.send({result: "success"})
  } catch(err){
    res.status(500).send('Error al eliminar usuario')
  }
})



export default router;