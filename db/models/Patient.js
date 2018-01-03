const mongoose = require('mongoose')
const Schema = require('../schema')

const User = mongoose.model('Patient', Schema.PatientSchema)

module.exports = User