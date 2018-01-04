require('dotenv').config()

const User = require('./models/User')
const Patient = require('./models/Patient')
const Task = require('./models/Task')
const mongoose = require('mongoose')

// connect to database
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.once('open', () => {
    console.log(`Mongoose has connected to MongoDB`)
})

mongoose.connection.on('error', (error) => {
    console.error(`
    MongoDB connection error!!! 
    ${error}
  `)
    process.exit(-1)
})

// Delete all users, then add some fake ones
User.remove({})
    .then(() => {
        const nurseRatched = new User({
            name: 'Nurse Ratched',
            phoneNumber: 4048675309,
            floor: '5b',
            patients: []
        })

        const seedPatient1 = new Patient({
            roomNumber: 67,
            miscInfo: 'He likes to spit',
            tasks: []
        })

        const seedTask1 = new Task({
            description: 'Clamp chest tube'
        })
        seedPatient1.tasks.push(seedTask1)

        const seedPatient2 = new Patient({
            roomNumber: 74,
            miscInfo: 'Pain Seeking',
            tasks: []
        })

        const seedTask2 = new Task({
            description: 'Discontinue heparin drip'
        })
        seedPatient2.tasks.push(seedTask2)

        nurseRatched.patients.push(seedPatient1, seedPatient2)

        return nurseRatched.save()

    }).catch((error) => {
        console.log('!!!!! ERROR SAVING SEEDED DATA !!!!!')
        console.log(error)
    }).then(() => {
        mongoose.connection.close()
        console.log(`
      Finished seeding database...
      
      Disconnected from MongoDB
    `)
    })
