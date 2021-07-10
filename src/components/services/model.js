const mongoose = require('mongoose')
const Schema = mongoose.Schema

const service = new Schema({
  id: {
    type: String,
    required: 'ID required!'
  },
  name: {
    type: String,
    required: 'Name required!'
  },
  description: {
    type: String,
    default: 'No description'
  },
  value: {
    type: Number,
    required: 'Value required!'
  },
  duration: {
    type: Number,
    required: 'Duration required!'
  },
  active: {
    type: Boolean,
    default: true
  }
})

const Model = mongoose.model('services', service)

module.exports = Model