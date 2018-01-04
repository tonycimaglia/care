var express = require('express');
var router = express.Router();
const User = require('../db/models/User')

/* GET users listing. */
router.get('/', function(req, res, next) {

  User.find({})
    .then((users) => {
      res.render('users/index', {
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

module.exports = router;
