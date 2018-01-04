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

module.exports = router;
