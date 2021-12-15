import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true, maxLength: 300 },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },// this will go when we will do authorization bit
  rating: { type: Number, required: true, min: 1, max: 5 }
},
{
  timestamps: true
}
)
const parkSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true, unique: true },
  postcode: { type: String, required: true, unique: true },
  dogFriendly: { type: String },
  cyclistFriendly: { type: String },
  images: [{ type: String, required: true }],
  url: { type: String },
  activites: [{ type: String }],
  region: { type: String }, 
  comments: [commentSchema],
  latitude: { type: String },
  longitude: { type: String }
})

// * RATINGS
// * virtual getter -> virtual field, added to the object before its returned as JSON
parkSchema.virtual('averageRating') // * define name of new key for the virtual field
  .get(function() {
    // * if there are no comments, return a string
    if (!this.comments.length) return 'Not rated yet'
    // * iterate through the comments array, add up all of the ratings
    const sumOfRatings = this.comments.reduce((acc, comment) => {
      if (!comment.rating) return acc
      return acc + comment.rating
    }, 0)
    // * return the average of the ratings, fixed to 2 decimal places
    return (sumOfRatings / this.comments.length).toFixed(2)
  })

// * make sure that when show data is returned as JSON, virtual fields are included
parkSchema.set('toJSON', { virtuals: true }) 
parkSchema.plugin(uniqueValidator)

export default  mongoose.model('Park', parkSchema) 