var express = require('express');
var router = express.Router();
const User = require('../db/models/User')

/* GET users listing. */
router.get('/', function(req, res, next) {

  User.find({})
    .then((users) => {
      res.render('users/index', {
        users,
        pageTitle: 'Users'
      })
    })
    .catch((error) => {
      console.log(error)
    })
});

module.exports = router;
