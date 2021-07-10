const router = require('express').Router()

const Controller = require('./controller')
const response = require('../../utils/response')

router.post('/', async (req, res) => {
  try {

    const client = await Controller.findOne(req.body.id)

    if(!client) {

      const newClient = await Controller.createOne(req.body)
  
      response.success(req, res, 200,
        'Client created!',
        'You have created a new client',
        newClient
      )

    } else {

      response.error(req, res, 400,
        `[DB]: Employee ID ${client.id} duplicated`,
        'Client duplicated...',
        'Este ID de cliente ya esta registrado.'
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

router.get('/', async (req, res) => {
  try {
    const clients = await Controller.findAll()

    if(clients) {

      if(clients[0]) {

        response.success(req, res, 200,
          'Ok!',
          'Found!',
          clients
        )
      } else {

        response.success(req, res, 200,
          '[DB]: NO CLIENTS.',
          'Found!',
          'No hay clientes activos en este momento.'
        )
      }
    } else {

      response.error(req, res, 404, 
        '[DB]: Not found.', 
        'Clients not found.', 
        'No hay clientes registrados aún... :('
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

router.get('/:id', async(req, res) => {
  try {

    const client = await Controller.findOne(req.params.id)

    if(client) {

      response.success(req, res, 200,
        'Ok!',
        'Found!',
        client
      )
    } else {

      response.error(req, res, 404,
        '[DB]: Not found.',
        'Client not found.',
        `No se ha encontrado cliente para el ID: ${req.params.id}`
      )
    }

  } catch (error) {

    response.error(req, res, 500,
      error,
      'Internal troubles...',
      ':('
    )
  }
})

router.patch('/:id', async (req, res) => {
  const data = {
    id: parseInt(req.body.id),
    name: req.body.name,
    lastname: req.body.lastname,
    age: req.body.age
  }

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
        `No se encontro ningun cliente con el ID: ${req.params.id}`
      )
    } else {
      
      response.success(req, res, 200,
        'Ok!',
        'Not changes',
        `No han habido cambios para el cliente ${data.name} ${data.lastname}`
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

router.delete('/:id', async (req, res) => {
  try {

    const deleted = await Controller.deleteOne(req.params.id)

    if(deleted) {

      response.success(req, res, 200,
        'Ok!',
        'Found!',
        `El cliente con ID: ${req.params.id} fue eliminado.`
      )
    } else {

      response.error(req, res, 404,
        `[DB]: ${req.params.id} NOT FOUND!`,
        `El ID: ${req.params.id} no ha sido encontrado.`,
        'ID no encontrado.'
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