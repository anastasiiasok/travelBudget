require('dotenv').config()

const renderSignUp = (req, res) => {
  res.render('signup')
}

const renderLogIn = (req, res) => {
  res.render('login')
}

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (email && password && name) {
    try {

      const newUser = new User({
        email,
        name,
        password, 
      })


      await newUser.save()

      res.redirect('/account')

    } catch (e) {
  
      res.render('signup', { error: 'User not found please try again' })
    }

  } else {
    res.render('signup', { error: 'Wrong Email or Password' })
  }
}

module.exports = {
  renderSignUp,
  renderLogIn,
  signUp,
}
