import User from '../models/user.js'
import Park from '../models/parks_model.js'

export const addFavPark = async (req, res) => {
  try {
    const { targetPark } = req.body
    const [ user ] = await User.find({ _id: req.currentUser._id }) 
    const [ park ] = await Park.find({ _id: targetPark })
    if (!user) throw new Error('no data available for this user')
    user.favouriteParks.push(park._id)
    await user.save({ validateModifiedOnly: true })
    return res.status(200).json(user)
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: 'error processing this request' })
  }

}
export const deleteFavParks = async (req, res) => {
  try {
    const { targetPark } = req.body
    const [ user ] = await User.find({ _id: req.currentUser._id }) 
    if (!user) throw new Error('no data available for this user')
    const parkToDelete = user.favouriteParks.indexOf(targetPark)
    user.favouriteParks.splice(parkToDelete, 1)
    await user.save({ validateModifiedOnly: true })
    return res.status(200).json(user)
    
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: 'error processing this request' })
  }

}

