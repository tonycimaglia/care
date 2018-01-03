var express = require('express');
var router = express.Router();

const User = require('../db/models/User')

/* GET users listing. */
router.get('/', function(req, res, next) {

  User.find({})
    .then((users) => {
      res.render(users, 'users/index', {
        users
      })
    })
});

module.exports = router;
