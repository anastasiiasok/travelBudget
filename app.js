const express = require('express')
const createError = require('http-errors');
const sessionFileStore = require('session-file-store')
const logger = require('morgan');
const methodOverride = require('method-override')
const session = require('express-session')
const app = express()
const path = require('path')
const hbs = require('hbs')
const indexRoute = require('./src/routes/index')
const loginRoute = require('./src/routes/login')
const signupRoute = require('./src/routes/signup')
const accountRoute = require('./src/routes/account')
const newtripRoute = require('./src/routes/newtrip')
const dbConnect = require('./src/config/db')

const PORT = process.env.PORT || 3000
// dbConnect()

app.set('session cookie name', 'sid')
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src', 'views'))
hbs.registerPartials(path.join(__dirname, 'src', 'views', 'partials'))
app.use(logger('dev'));
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('trust proxy', 1);

const FileStore = sessionFileStore(session) 
// app.use(session({
//   name: app.get('session cookie name'),
//   secret: process.env.SESSION_SECRET,
//   store: new FileStore({
//     secret: process.env.SESSION_SECRET,
//   }),
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: process.env.NODE_ENV === 'production',
//     maxAge: 1000 * 60 * 60 * 24
//   },
// }));

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(function (req, res, next) {
  next(createError(404));
});

// app.use('/', indexRoute)
// app.use('/login', loginRoute)
// app.use('/signup', signupRoute)
// app.use('/account', accountRoute)
app.use('/newtrip', newtripRoute)

app.listen(PORT, () => {
  console.log('Server has been started on port: ', PORT)
})

module.exports = app;
