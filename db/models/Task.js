const mongoose = require('mongoose')
const Schema = require('../schema')

const Task = mongoose.model('Task', Schema.TaskSchema)

module.exports = Task