const express = require('express')

const router = express.Router()
const usersController = require('../controllers/users-controller')
const userMiddle = require('../middleware/user')

router
.route('/signup')
.get(usersController.renderSignUp)
.post(usersController.signUp)

router
  .route('/login')
  .get(userMiddle.isAuth, usersController.renderLogIn)
  .post(userMiddle.userName, usersController.signIn)
  router
  .route('/logout')
  .get(usersController.logout)

module.exports = router
