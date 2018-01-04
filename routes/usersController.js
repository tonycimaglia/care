var express = require('express');
var router = express.Router();
const User = require('../db/models/User')

/* GET users listing. */
router.get('/', function (request, response) {

  User.find({})
    .then((users) => {
      response.render('users/index', {
        users,
        pageTitle: 'Nurses'
      })
    })
    .catch((error) => {
      console.log(error)
    })
});

// create a nurse

router.get('/new', (request, response) => {
  response.render('users/new', { pageTitle: 'New Nurse' })
})

router.post('/', (request, response) => {
  const newUser = request.body

  User.create(newUser)
    .then(() => {
      response.redirect('/users')
    })
    .catch((error) => {
      console.log(error)
    })
})

router.get('/:userId', (request, response) => {
  const userId = request.params.userId
  User.findById(userId)
    .then((user) => {
      response.render('users/show', {
        user,
        pageTitle: user.name
      })
    })
    .catch((error) => {
      console.log(error)
    })
})


module.exports = router;
