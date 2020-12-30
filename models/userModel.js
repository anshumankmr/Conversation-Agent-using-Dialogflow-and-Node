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
    phoneNumber:{
      type: Number,
      required: true,
      trim: true
    },
    caseID:{
        type: String,
        required: true,
        trim: true
    }
  },
  { timestamps: true }
)



module.exports = mongoose.model('user', userSchema);