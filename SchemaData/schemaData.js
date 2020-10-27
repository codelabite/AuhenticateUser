const mongoose = require('mongoose')
const anySchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    
  }, 
  
  email: {
    type: String,
    require: true,
    unique: [true, "Name already exist"]
  },

  password: {
    type: String,
    require: true,  
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model("user", anySchema)
