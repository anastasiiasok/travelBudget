const mongoose = require('mongoose')

const tripSchema = new mongoose.Schema({
  name: {
    unique: true,
    required: true,
    type: String
  },
  cost: Number,
  categories: Array
})

module.exports = mongoose.model('Trip', tripSchema)
