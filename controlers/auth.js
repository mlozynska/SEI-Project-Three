import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'

export const registerUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body)
    return res.status(201).json({ message: `Welcome ${newUser.username}` })
  } catch (err) {
    return res.status(422).json(err)
  }
}

export const loginUser = async (req, res) => {
  try {
    // * find the user in the db
    const userToLogin = await User.findOne({ email: req.body.email })
    // * check if the user exists, and that the passwords match, if either are false throw an error
    if (!userToLogin || !userToLogin.validatePassword(req.body.password)) {
      throw new Error()
    }
    // * generate a token for the user
    // * we need to pass "sign" the "sub" which is the id of the user
    // * 2nd we pass the secret it needs to encode the token
    // * 3rd we pass it when the token should expire
    const token = jwt.sign({ sub: userToLogin._id }, secret, { expiresIn: '7 days' })
    // * return the token in the response along with a message
    return res.status(200).json({ 'message': `Welcome back ${userToLogin.username}`, token })
  } catch (err) {
    return res.status(404).json({ message: 'Unauthorized' })
  }
}