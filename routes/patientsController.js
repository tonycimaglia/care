var express = require('express');
var router = express.Router({ mergeParams: true });
const User = require('../db/models/User')


// new patient route

router.get('/new', (request, response) => {
    const userId = request.params.userId
    console.log("I am the" + userId)
    response.render('patients/new', {
        userId,
        pageTitle: 'New Patient'
    })
})

// show a specific patient

router.get('/:patientId', (request, response) => {
    const userId = request.params.userId
    const patientId = request.params.patientId
    User.findById(userId)
        .then((user) => {
            const patient = user.patients.id(patientId)
            response.render('patients/show', {
                userId,
                patient,
                pageTitle: 'Patient'
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

// create a new patient

router.post('/', (request, response) => {
    const userId = request.params.userId
    const newPatient = request.body

    User.findById(userId)
        .then((user) => {
            user.patients.push(newPatient)
            return user.save()
        })
        .then(() => {
            response.redirect(`/users/${userId}`)
        })
        .catch((error) => {
            console.log(error)
        })

})

// delete a patient

router.get('/:patientId/delete', (request, response) => {
    const userId = request.params.userId
    const patientId = request.params.patientId
  
    User.findById(userId)
      .then((user) => {
        user.patients.id(patientId).remove()
        return user.save()
      })
      .then(() => {
        response.redirect(`/users/${userId}`)
      })
      .catch((error) => {
        console.log(error)
      })
  })

module.exports = router

