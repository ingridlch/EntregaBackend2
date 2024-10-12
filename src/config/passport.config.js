import passport from 'passport'
import userModel from '../dao/models/users.model.js'
import jwt from 'passport-jwt'

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const cookieExtractor = (req)=>{
  let token = null
  console.log(req.headers)
  if(req && req.headers){
    token = req.headers.authorization.split(' ')[1]
  }
  return token
}

const initializePassport = () => {
  passport.use('jwt',new JWTStrategy({
    jwtFromRequest:ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey:'coderSecret'
  },async(jwt_payload,done)=>{
    try{
      return done(null,jwt_payload)
    } catch(error) {
      return done(error)
    }
  }))

  passport.serializeUser((user,done)=>{
    done(null,user._id)
  })
  passport.deserializeUser(async(id,done)=>{
    let user = await userModel.findById(id)
    done
  })
}

export default initializePassport