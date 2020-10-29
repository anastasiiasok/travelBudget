const mongoose = require('mongoose')

const dbConnectionURL = `mongodb://localhost:27017/travelBudget`

function dbConnect() {
  mongoose.connect(dbConnectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) return console.log(err)
    return console.log('Success connected to travelBudget database')
  })
}

module.exports = dbConnect
