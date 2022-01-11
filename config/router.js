import express from 'express'
import { createPark, deletePark, editingPark, getAllParks, getParkByID } from '../controlers/parks.js'
import { getRegion } from '../controlers/filters.js'
import { addComment, deleteComment, showComments } from '../controlers/comments.js'
import { loginUser, registerUser } from '../controlers/auth.js'
import { secureRoute } from '../config/secureRoute.js'
import { userProfile } from '../controlers/userProfile.js'
import { deleteUser, getAllUsers } from '../controlers/users.js'
import { addFavPark, deleteFavParks } from '../controlers/favParks.js'

const router = express.Router()

router.route('/london-parks-api')
  .get(getAllParks)
  .post(secureRoute,createPark)

router.route('/london-parks-api/:id')
  .get(getParkByID)
  .delete(secureRoute,deletePark)
  .post(secureRoute,editingPark)

router.route('/london-parks-api/region/:id')
  .get(getRegion)

router.route('/login')
  .post(loginUser)

router.route('/register')
  .post(registerUser)

router.route('/allusers')
  .get(getAllUsers)

router.route('/profile')
  .get(secureRoute,userProfile)
  .delete(secureRoute,)

router.route('/profile/:id')  
  .delete(secureRoute,deleteUser)

router.route('/favourite-parks')
  .post(secureRoute,addFavPark)
  .delete(secureRoute, deleteFavParks)

router.route('/london-parks-api/:id/comments')
  .post(secureRoute,addComment)
  .get(showComments)

router.route('/london-parks-api/:id/comments/:commentId')
  .delete(secureRoute,deleteComment)
export default router