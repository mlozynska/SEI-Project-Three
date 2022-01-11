import User from '../models/user.js'

export const getAllUsers = async (_req, res) => {
  try {
    const getUsersData = await User.find().populate('favouriteParks')
    return res.status(200).json(getUsersData)
  } catch (err) {
    return res.status(404).json({ message: 'Users not found' })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const removeUser = await User.findOneAndRemove({ _id: id })
    if (!removeUser) throw new Error()
    return res.status(200).json({ message: 'User Data has been deleted!' })
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}