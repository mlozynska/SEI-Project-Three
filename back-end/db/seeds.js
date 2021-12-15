import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'
import Park from '../models/parks_model.js'
import User from '../models/user.js'
import parkData from './data/parks_data.js'
import userData from './data/user_data.js'

const seedDatabase = async () => {
  try {
    await mongoose.connect(dbURI)
    console.log('connected to the database successfully')

    await mongoose.connection.db.dropDatabase()
    console.log('db dropped, data cleared')

    //adding data into each model

    const parks = await Park.create(parkData)
    console.log('parks created')

    const users = await User.create(userData)
    console.log('users created')

    //close connection to the database
    await mongoose.connection.close()
    console.log('connection to the database closed')

  } catch (err) {
    console.log('error has occured while trying to connect to the database')
    console.log(err)
    await mongoose.connection.close()
    console.log('connection to database closed')
  }
}

seedDatabase()