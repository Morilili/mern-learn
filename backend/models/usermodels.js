const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'please add a name']
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true 
  }
  },
  {
    timestamps: true
  },
  { collection : 'mernlearn' }
)

module.exports = mongoose.model('Users', userSchema)