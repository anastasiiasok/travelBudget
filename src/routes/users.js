const express = require('express')

const router = express.Router()
const usersController = require('../controllers/users-controller')

router
.route('/signup')
.get(usersController.renderSignUp)
.post(usersController.signUp)

router
  .route('/login')
  .get(usersController.renderLogIn)
  // .post(usersController.LogIn)

module.exports = router
