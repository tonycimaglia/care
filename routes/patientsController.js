var express = require('express');
var router = express.Router({mergeParams: true});
const User = require('../db/models/User')


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

module.exports = router

