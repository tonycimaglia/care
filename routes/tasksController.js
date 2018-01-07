const express = require('express');
const router = express.Router({ mergeParams: true })
const User = require('../db/models/User')



router.get('/new', (request, response) => {
    const userId = request.params.userId
    const patientId = request.params.patientId

    User.findById(userId)
        .then((user) => {
            console.log("this is the" + user + "for the new route")
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
            console.log("this is the user" + user)
            const patient = user.patients.id(patientId)
            patient.tasks.push(newTask)
            return user.save()
        })
        .then(() => {
            response.redirect(`/users/${userId}/patients/${patientId}`)
        })
})

router.get('/:taskId/delete', (request, response) => {
    const userId = request.params.userId
    const patientId = request.params.patientId
    const taskId = request.params.taskId
    console.log("this is the Id " + userId)
    User.findById(userId)
        .then((user) => {
            console.log("this is the user " + user)
            const patient = user.patients.id(patientId)
            patient.tasks.id(taskId).remove()

            return user.save()
        })
        .then(() => {
            response.redirect(`/users/${userId}/patients/${patientId}`)
        })
        .catch((error) => {
            console.log(error)
        })
})

module.exports = router;