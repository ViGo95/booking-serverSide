const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const ticket = new Schema({
  services: [{
    type: ObjectId,
    ref: 'services',
    autopopulate: true,
    required: 'One service at least required!'
  }],
  client: {
    type: ObjectId,
    ref: 'clients',
    autopopulate: true,
    required: 'Client required!'
  },
  employee: {
    type: ObjectId,
    ref: 'employees',
    autopopulate: true,
    required: 'Employee required!'
  },
  date: {
    type: Date,
    default: Date.now,
    required: 'Date required!'
  },
  active: {
    type: Boolean,
    default: true
  },
  duration: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

ticket.plugin(require('mongoose-autopopulate'))

const Model = mongoose.model('tickets', ticket)

module.exports = Model