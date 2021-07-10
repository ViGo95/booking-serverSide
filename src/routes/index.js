const employees = require('../components/employees/network')
const clients = require('../components/clients/network')
const services = require('../components/services/network')
const tickets = require('../components/tickets/network')

const router = (app) => {
  app.use('/employees', employees)
  app.use('/clients', clients)
  app.use('/services', services)
  app.use('/tickets', tickets)
}

module.exports = router