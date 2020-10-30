const Trip = require('../models/trip-model')
const Category = require('../models/category-model')

const renderTripReport = (req, res) => {
  res.render('summary')
}

const allTrips = async (req, res) => {
  const allTrips = await Trip.find();
  res.render('allTrips', {allTrips})
}

const findTripById = async (req, res) => {
  let trip = await Trip.findById(req.params.id);
  let allCategories = await Category.find();
  let users = []
  for (let i = 0; i < allCategories.length; i++) {
    users.push(allCategories[i].users)
  }

  let names = []
  let usersArr = users.flat()

  console.log('usersArr >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', usersArr);

  for (let i = 0; i < usersArr.length; i++) {
    names.push(usersArr[i].name)
  }
  
  resultNames = [...new Set(names)]
  console.log('resultNames >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', resultNames);
  
  let userSpent = 0;
  let resulCostArr = [];

  for (let i = 0; i < resultNames.length; i++) {
    for (let j = 0; j < usersArr.length; j++) {
      if (usersArr[j].name === resultNames[i]) {
          userSpent += Number(usersArr[j].cost)
      }
    }
    resulCostArr.push({ name: resultNames[i], cost: userSpent })
    userSpent = 0;
  }

  console.log('resulCostArr >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', resulCostArr);
    
  res.render('summary', { trip, allCategories, resultNames, resulCostArr });
}

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
  let categoryName = req.body.newCategoryName;
  let fullCost = req.body.fullCost;
  let payers = req.body.payers.split(',');
  res.locals.payers = payers

  if (categoryName && fullCost && payers) {
    try {
      
      res.render('castomizeCategory', { categoryName, payers, fullCost })

    } catch (e) {
      console.log(e);
      res.render('castomizeCategory', { error: 'Incorrect data!' })
    }
  } else {
    res.render('castomizeCategory', {error: 'Not all fields are filled!'})
}
}

const renderSavedCastomizeCategory = async (req, res) => {
  let categoryName = req.body.categoryName;
  let castomCost = req.body.castomizeCategoryCost;
  let payers = req.body.payer;
  res.render('savedCastomizeCategory', {categoryName, castomCost, payers})
}

const saveCastomizeCategory = async (req, res) => {
  let categoryName = req.body.categoryName;
  let castomCost = req.body.castomizeCategoryCost;
  let payers = req.body.payer;
  let fullCost = req.body.fullCost;

  let castomCostArr = [];

  for (let i = 0; i < payers.length; i++) {
    castomCostArr.push({ name: payers[i], cost: castomCost[i] })
  }
  
  if (castomCost) {
    try {
      const newCategory = new Category({
        name: categoryName,
        cost: fullCost,
        users: castomCostArr
      })

      await newCategory.save()
      res.render('savedCastomizeCategory', {categoryName, castomCostArr, payers})
      
    } catch (e) {
      console.log(e);
      res.render('savedCastomizeCategory', { error: 'Incorrect data!' })
    }
  } else {
    res.render('savedCastomizeCategory', {error: 'Not all fields are filled!'})
}
}

module.exports = {
  renderNewtrip,
  renderCreateCategory,
  createNewTrip,
  createNewCategory,
  renderCastomizeCategory,
  castomizeCategory,
  renderSavedCastomizeCategory,
  saveCastomizeCategory,
  renderTripReport,
  allTrips,
  findTripById
}
