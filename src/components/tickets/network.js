const router = require('express').Router()

const Controller = require('./controller')
const response = require('../../utils/response')

const clients = require('../clients/controller')
const employees = require('../employees/controller')
const services = require('../services/controller')

router.post('/', async (req, res) => {
  try {
    
    const newTicket = await Controller.createOne(req.body)
    const toEmployee = await employees.updateTickets(
      newTicket.employee,
      newTicket._id,
      newTicket.active
    )

    let ticketDuration = 0

    newTicket.services.forEach(service => {
      ticketDuration +=  service.duration
    });

    await Controller.updateOne(newTicket._id, {duration: ticketDuration})
    
    response.success(req, res, 200,
      'Ticket created!',
      `New ticket assignate to ${toEmployee.name} ${toEmployee.lastname}`,
      newTicket
    )

  } catch (error) {

    response.error(req, res, 500,
      error,
      'Oops, something was wrong...',
      ':('
    )
  }
})

router.get('/', async (req, res) => {
  try {
    const tickets = await Controller.findAll()

    if(tickets) {
      if(tickets[0]) {
        response.success(req, res, 200,
          'Ok!',
          'Found!',
          tickets
        )
      } else {
        response.success(req, res, 200,
          'Ok!',
          'Found!',
          'No hay tickets activos en este momento.'
        )
      }
    } else {
      response.error(req, res, 404,
        '[DB]: Not found.',
        'Tickets not found.',
        'Oops, tickets not found... :('
      )
    }

  } catch (error) {
    response.error(req, res, 500, error, 'Oops, something was wrong...', ':(')
  }
})

router.get('/:id', async (req, res) => {
  try {
    const ticket = await Controller.findOne(req.params.id)
    
    if (ticket) {
      response.success(req, res, 200, 'Ok!', 'Found!', ticket)
    } else {
      response.error(req, res, 404, '[DB]: Not found.', 'Ticket not found.', 'No se ha encontrado el ticket')
    }

  } catch (error) {
    response.error(req, res, 500, error, 'Internal troubles...', ':(')
  }
})

router.patch('/:id', async (req, res) => {
  const data = {
    services: req.body.services,
    employee: req.body.employee,
    date: req.body.date
  }

  if(req.body.status) {
    try {
      const ticket = await Controller.closeTicket(req.params.id)
  
      if (ticket) {
        await employees.updateTickets(ticket.employee_id._id, ticket._id, false)

        response.success(req, res, 200,
          'Ok!',
          'Found!',
          `El ticket ${ticket._id} se ha cerrado exitosamente!`
        )
      } else {
        response.error(req, res, 404,
          '[DB]: Not found.',
          'Ticket not found.',
          'Oops, no se ha encontrado el ticket.'
        )
      }
  
    } catch (error) {
      response.error(req, res, 500,
        error,
        'Internal troubles...',
        ':('
      )
    }
  } else {
    try {
  
      const result = await Controller.updateOne(req.params.id, data)
  
      if(result) {
  
        response.success(req, res, 200,
          'Ok!',
          'Updated!',
          result
        )
      } else if(result === null) {
  
        response.error(req, res, 404,
          '[DB]: NOT FOUND.',
          'Not found...',
          'No se encontro ningun ticket...'
        )
      } else {
        
        response.success(req, res, 200,
          'Ok!',
          'Not changes',
          'No han habido cambios para el ticket'
        )
      }
    } catch (error) {
  
      response.error(req, res, 500,
        error,
        'Oops, something was wrong...',
        ':('
      )
    }
  }
})

router.delete('/:id', async (req, res) => {
  try {

    const deleted = await Controller.deleteOne(req.params.id)

    if(deleted) {

      response.success(req, res, 200,
        'Ok!',
        'Found!',
        `El ticket fue eliminado.`
      )
    } else {

      response.error(req, res, 404,
        `[DB]: ${req.params.id} NOT FOUND!`,
        `El ticket no ha sido encontrado.`,
        'Oops, no se ha encontrado el ticket.'
      )
    }
  } catch (error) {

    response.error(req, res, 500,
      error,
      'Oops, something was wrong...',
      ':('
    )
  }
})

module.exports = router