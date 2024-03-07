const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
//   {
//     text: {
//       type: String,
//       required: [true, "Please provide goal"],
//     },

//   { timestamps: true,},
//   }
  {
  //each goal is written by what user
  //reference a user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
  },
  {
    timestamps: true,
  },
  { collection : 'mernlearn' }
)

module.exports = mongoose.model("Goal", goalSchema);