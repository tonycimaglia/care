const mongoose = require('mongoose')
const Schema = mongoose.Schema

/* add if user schema works
const PatientSchema = new Schema(
    {
        roomNumber: {
            type: Number,
            required: true,
            unique: false
        }
    },
    {
        timestamps: {}
    }
)
*/

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
        // patients: [PatientSchema] add back if UserSchema works
    },
    {
        timestamps: {}
    }
)

module.exports = {
    UserSchema,
}