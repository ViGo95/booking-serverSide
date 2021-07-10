const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const employee = new Schema({
  id: {
    type: Number,
    required: 'ID required!'
  },
  password: {
    type: String,
    required: 'Password required!'
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
  services: [{
    type: ObjectId,
    ref: 'services',
    autopopulate: true
  }],
  active: {
    type: Boolean,
    default: true
  },
  tickets: [{
    type: ObjectId,
    ref: 'tickets',
    autopopulate: true
  }]
})

employee.plugin(require('mongoose-autopopulate'))

const Model = mongoose.model('employees', employee)

module.exports = Model