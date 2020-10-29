require('dotenv').config()
const bcrypt = require('bcrypt')
const User = require('../models/user-model')
const salt = process.env.saltRounds || 10

const serializeUser = (user) => {
  return {
    id: user.id,
    email: user.email
  }
}

const renderSignUp = (req, res) => {
  res.render('signup')
}

const renderLogIn = (req, res) => {
  res.render('login')
}

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  console.log('req.body', name, email, password)
   
    try {
     
if (name && email && password) {
 const hashPass = await bcrypt.hash(password, Number(salt))

      const newUser = new User({
        email,
        name,
        password: hashPass, 
      })


      await newUser.save()
    console.log(newUser)
      req.session.user = serializeUser(newUser)
console.log(serializeUser(newUser))
     
      res.redirect('/account')
    } 
   else {
    res.render('signup', { error: 'Wrong Email or Password' })
  }
    } catch (e) {
  
      res.render('signup', { error: 'User not found please try again' })
    }

}

module.exports = {
  renderSignUp,
  renderLogIn,
  signUp,
}
