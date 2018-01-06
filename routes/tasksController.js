const express = require('express');
var router = express.Router({ mergeParams: true });
const User = require('../db/models/User')


router.get('/new', (request, response) => {
    const userId = request.params.userId
    const patientId = request.params.patientId
    console.log("Am I getting here?")
    User.findById(userId)
      .then((user) => {
        const patient = user.patients.id(patientId)
  
        response.render('tasks/new', {
          userId,
          patient,
          pageTitle: 'New Task'
        })
      })
  })

module.exports = router;