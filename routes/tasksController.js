const express = require('express');
var router = express.Router({ mergeParams: true });
const User = require('../db/models/User')


router.get('/new', (request, response) => {
    const userId = request.params.userId
    const patientId = request.params.patientId
    
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

router.post('/', (request, response) => {
    const userId = request.params.userId
    const patientId = request.params.patientId
    const newTask = request.body

    User.findById(userId)
        .then((user) => {
            const patient = user.patients.id(patientId)
            patient.tasks.push(newTask)
            console.log(patient.tasks)
            return user.save()
        })
        .then(() => {
            response.redirect(`/users/${userId}/patients/${patientId}`)
        })
})

module.exports = router;