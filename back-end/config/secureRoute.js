import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'

export const secureRoute = async (req, res, next) => {
  try {
    // * check if theres a token on the incoming request
    console.log('checking for token')
    if (!req.headers.authorization) throw new Error()
    // * extract the token from the request
    const token = req.headers.authorization.replace('Bearer ', '')
    console.log('auth received')
    // * get the user information from the token 
    const payload = jwt.verify(token,secret)// decodes the token, checks its valid using the secret and returns the payload (info about the user)
    // * find the user in the db, check if they exist
    console.log('user authenicated in the db')
    const userToVerify = await User.findById(payload.sub)
    if (!userToVerify) throw new Error()
    // * set new key on the request object called currentUser, set value to be the user object returned from the request above
    req.currentUser = userToVerify
    console.log('user verified')
    next()
  } catch (err) {
    return res.status(401).json({ 'message': 'Unauthorized' })
  }
}