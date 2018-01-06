var express = require('express');
var router = express.Router({ mergeParams: true });
const User = require('../db/models/User')
const Patient = require('../db/models/Patient')

// new patient route

router.get('/new', (request, response) => {
    const userId = request.params.userId
    console.log("I am the" + userId)
    response.render('patients/new', {
        userId,
        pageTitle: 'New Patient'
    })
})

// edit a specific patient

router.get('/:patientId/edit', (request, response) => {
    const userId = request.params.userId
    const patientId = request.params.patientId

    User.findById(userId)
        .then((user) => {
            const patient = user.patients.id(patientId)
            response.render('patients/edit', {
                userId,
                patient,
                pageTitle: 'Patient'
            })
        })
        .catch((error) => {
            console.log(error)
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

// take edit page and update existing info

router.put('/:patientId', (request, response) => {
    const userId = request.params.userId
    const updatedPatientInfo = request.body
    const patientId = request.params.patientId
    console.log(updatedPatientInfo)

    Patient.findByIdAndUpdate(patientId, updatedPatientInfo, {new: true})
      .then(() => {
        response.redirect(`/users/${userId}`)
      })
  })

module.exports = router

