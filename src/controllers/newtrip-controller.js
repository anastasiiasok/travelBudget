const Trip = require('../models/trip-model')
const Category = require('../models/category-model')

const renderNewtrip = (req, res) => {
  res.render('newtrip')
}

const createNewTrip = async (req, res) => {
  let name = req.body.newTripName;
  let cost = req.body.fullTripCost;
  let categories = []

  if (name && cost) {
    try {

      const newTrip = new Trip({
        name,
        cost,
        categories
      })
      
      await newTrip.save()

      res.redirect('/newtrip/category')
    } catch (e) {
      console.log(e);
      res.render('newtrip', { error: 'This trip already exist or incorrect data!' })
    }
  } else {
    res.render('newtrip', {error: 'Not all fields are filled!'})
}
}

const renderCreateCategory = (req, res) => {
  res.render('createcategory')
}

const createNewCategory = async (req, res) => {
  let name = req.body.newCategoryName;
  let cost = req.body.fullCost;
  let payers = req.body.payers.split(',');
  let payerCost = Math.floor((cost / payers.length) * 100) / 100
  let payerCostArr = []
  for (let i = 0; i < payers.length; i++) {
    payerCostArr.push({ name: payers[i], cost: payerCost })
  }
  console.log(payerCostArr);

  if (name && cost && payers) {
    try {

      const newCategory = new Category({
        name,
        cost,
        users: payerCostArr
      })
      
      await newCategory.save()
      res.render('equally', { name, payers, payerCost  })

    } catch (e) {
      console.log(e);
      res.render('createcategory', { error: 'This category already exist or incorrect data!' })
    }
  } else {
    res.render('createcategory', {error: 'Not all fields are filled!'})
}
}

const renderCastomizeCategory = (req, res) => {
  let name = req.body.newCategoryName;
  res.render('castomizeCategory', {name})
}

const castomizeCategory = async (req, res) => {
  let name = req.body.newCategoryName;
  let cost = req.body.fullCost;
  let payers = req.body.payers.split(',');

  if (name && cost && payers) {
    try {
      
      res.render('castomizeCategory', { name, payers })

    } catch (e) {
      console.log(e);
      res.render('castomizeCategory', { error: 'Incorrect data!' })
    }
  } else {
    res.render('castomizeCategory', {error: 'Not all fields are filled!'})
}
}

module.exports = {
  renderNewtrip,
  renderCreateCategory,
  createNewTrip,
  createNewCategory,
  renderCastomizeCategory,
  castomizeCategory
}
