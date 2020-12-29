const mongoose = require("mongoose")

const querySchema = new mongoose.Schema(
  {
    model:{
      type: String,
      required: true,
      trim: true
    },  
    brand: {
      type: String,
      required: true,
      trim: true
    },
    issue:{
        type: String,
        required: true,
        trim: true
    }
  },
  { timestamps: true }
)



module.exports = mongoose.model('query', querySchema);