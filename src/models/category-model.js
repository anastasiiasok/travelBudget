const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    unique: true,
    required: true,
    type: String
  },
  cost: {
    required: true,
    type: Number
  },
  users: {
    required: true,
    type: Array
  }
})

module.exports = mongoose.model('Category', categorySchema)
