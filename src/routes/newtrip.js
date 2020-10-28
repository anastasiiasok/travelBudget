const express = require('express');
const router = express.Router();
const userController = require('../controllers/newtrip-controller')

router
  .route('/')
  .get(userController.renderNewtrip)

module.exports = router
