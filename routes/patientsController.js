var express = require('express');
var router = express.Router({ mergeParams: true });
const User = require('../db/models/User')

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

// new patient route

router.get('/new', (request, response) => {
    response.render('patients/new', {
      pageTitle: 'New Patient'
    })
  })

// router.post('/', (request, response) => {
//     const userId = request.params.userId
//     const newPatient = request.body

//     User.findById(userId)
//         .then((user) => {
//             user.patients.push(newPatient)
//             return user.save()
//         })
//         .then(() => {
//             response.redirect(`/users/${userId}/patients`)
//         })
//         .catch((error) => {
//             console.log(error)
//         })

// })

module.exports = router

