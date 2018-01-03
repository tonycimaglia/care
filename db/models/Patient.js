const mongoose = require('mongoose')
const Schema = require('../schema')

const Patient = mongoose.model('Patient', Schema.PatientSchema)

module.exports = Patient