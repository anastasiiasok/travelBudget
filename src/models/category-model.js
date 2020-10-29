const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    unique: true,
    required: true,
    type: String
  },
  cost: Number,
  users: Array
})

module.exports = mongoose.model('Category', categorySchema)
