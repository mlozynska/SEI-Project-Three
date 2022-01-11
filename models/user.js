import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  favouriteParks: [{ type: mongoose.Schema.ObjectId, ref: 'Park' }]
},
{ 
  timestamps: true
})



// * Remove password when returning user as JSON in the response, that happens in the controllers
userSchema.set('toJSON', { // * when data is set to json in the response (in controllers)
  virtuals: true,
  transform(_doc, json) {
    delete json.password// * delete password key from json object
    return json // * return the rest of the object
  }
})

// * Create virtual field for the password confirmation
userSchema
  .virtual('passwordConfirmation')// * define name of the virtual field
  .set(function (passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation // * set the value of the virtual field to be the value of the passwordConfirmation that comes in with the request body
  })

// * Custom pre validation, will happen before mongoose does its own validation to check data types etc
// * this.isModified -> checks if password is new, or if password has been updated
userSchema
  .pre('validate', function(next) {
    if (this.isModified('password') && this.password !== this._passwordConfirmation) {
      this.invalidate('passwordConfirmation', 'does not match')// * throw an error if password is new or updated and doesnt match the password confirmation
    }
    next()
  })

// * Custom pre save, will happen after mongoose validation, but before anything is saved to the db
// * Need to hash the password to make sure we dont save plain text passwords

userSchema
  .pre('save', function (next) {
    if (this.isModified('password')) { // * check if password is new or has been updated
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync()) // * hash the password and set result as value of password field
    }
    next()// * move on to mongoose saving into the db
  })
// * defining a custom method that will be available to use on all instances of the user
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password)// * this function will hash incoming password and compare with hashed password stored in the db
}
userSchema.plugin(uniqueValidator)

export default mongoose.model('User', userSchema)