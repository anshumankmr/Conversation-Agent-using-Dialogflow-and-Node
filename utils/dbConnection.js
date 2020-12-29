const mongoose = require('mongoose');

connect = (url = 'mongodb://localhost:27017/api-design', opts = {}) => {
  return mongoose.connect(
    url,
    { ...opts, useNewUrlParser: true }
  )
}
module.exports = connect;