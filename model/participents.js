const mongoose = require('mongoose')

const participant = mongoose.Schema({
    
    has_password:{type:String},
    email:{type:String}
    // tournament: { type: mongoose.Schema.Types.ObjectId, ref: 'tournament' },
    
})

module.exports = mongoose.model('participant',participant)