const mongoose = require('mongoose')
const Schema = mongoose.Schema

const client = new Schema({
  id: {
    type: Number,
    required: 'ID required!'
  },
  name: {
    type: String,
    required: 'Name required!'
  },
  lastname: {
    type: String,
    required: 'Lastname required!'
  },
  age: {
    type: Number,
    required: 'Age required!'
  },
  frequent: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  }
})

const Model = mongoose.model('clients', client)

module.exports = Model