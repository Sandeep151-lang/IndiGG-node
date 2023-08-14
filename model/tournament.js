const mongoose = require('mongoose')

const tournamentSchema = new mongoose.Schema({
    tourn_name:{type:String},
    status:{type:String},
    startDate:{type :Date},
    endDate:{type:Date},
    participant:[{type: mongoose.Schema.ObjectId, 
        ref: 'user' }]
})

module.exports = mongoose.model('tournament',tournamentSchema)