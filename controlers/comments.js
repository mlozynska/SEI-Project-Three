import Park from '../models/parks_model.js'

// showing all commments for park
export const showComments = async (req, res) => {
  try {
    const { id } = req.params
    const comment = await Park.findById(id).populate({
      path: 'comments',
      populate: { 
        path: 'owner',
        model: 'User'
      }
    })
    return res.status(200).json(comment.comments)
  } catch (err) {
    return res.status(404).json()
  }
}

// adding comments
export const addComment = async (req, res) => {
  try {
    //get id of the park
    const { id } = req.params
    const park = await Park.findById(id) // finding park we want to add comment to
    if (!park) throw new Error() // error handleing
    const newComment = { ...req.body, owner: req.currentUser._id } //this will go when we will do authorization bit
    park.comments.push(newComment) //adding comment to the park object
    await park.save({ validateModifiedOnly: true }) // saving comment in db
    return res.status(200).json(park) // returning park with new comment
  } catch (err) {
    return res.status(422).json({ message: err.message })
  }
}


// deleting commment
export const deleteComment = async (req, res) => {
  try {
    const { id, commentId } = req.params // destrcuturing id and comment id
    const park = await Park.findById(id) // finding where comments lives
    if (!park) throw new Error()
    const commentToDelete = park.comments.id(commentId) // finding comment by its id
    if (!commentToDelete) throw new Error()
    // if (!commentToDelete.owner.equals(req.currentUser._id)) throw new Error('unauthorized') to use when authorization will  be ready
    await commentToDelete.remove() //removing comment
    await park.save({ validateModifiedOnly: true }) //saving park without removed comment
    return res.sendStatus(204)
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}