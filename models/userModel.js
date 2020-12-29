const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    carLicense:{
        type: String,
        required: true,
        trim: true
    }
  },
  { timestamps: true }
)



module.exports = mongoose.model('user', userSchema);