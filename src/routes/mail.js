const express = require('express');
const router = express.Router();
const mailController = require('../controllers/mail-controller')

router
  .route('/')
  .get(mailController.renderSendMailForm)
  .post(mailController.sendMail)

module.exports = router
