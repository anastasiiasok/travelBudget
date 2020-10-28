const express = require('express')

const router = express.Router()
const usersController = require('../controllers/loginup')



router
.route('/signup')
.get(usersController.renderSignUp)
.post(usersController.signUp)

router
  .route('/login')
  .get(usersController.renderSignIn)
  .post(usersController.LogIn)

module.exports = router