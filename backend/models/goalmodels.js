const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
  text: {
    type: String,
    required: [true, "Please provide goal"],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
}
)

module.exports = mongoose.model("Goal", goalSchema) ;