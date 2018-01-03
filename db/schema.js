const mongoose = require('mongoose')
const Schema = mongoose.Schema


const PatientSchema = new Schema(
    {
        roomNumber: {
            type: Number,
            required: true,
            unique: false
        },
        miscInfo: {
            type: String,
            required: false,
            unique: false
        },
        //tasks: [TaskSchema]
    },
    {
        timestamps: {}
    }
)

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: false
        },
        phoneNumber: {
            type: Number,
            required: true,
            unique: [true, 'This phone number is already taken!']
        },
        floor: {
            type: String,
            required: true,
            unique: false
        },
        patients: [PatientSchema]
    },
    {
        timestamps: {}
    }
)

module.exports = {
    UserSchema,
}