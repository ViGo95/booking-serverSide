const router = require('express').Router()

const Controller = require('./controller')
const response = require('../../utils/response')

router.post('/', async (req, res) => {
  try {

    const serviceID = await Controller.findOne(req.body.id)
    
    if(serviceID) {

      response.error(req, res, 400,
        `[DB]: Service ID ${req.body.id} duplicated`,
        'Service duplicated...',
        'Este ID de servicio ya esta registrado.'
      )
        
    } else {

      const newService = await Controller.createOne(req.body)
          
      response.success(req, res, 200,
        'Service created!',
        'You have created a new service!',
        newService
      )
    }
  
  } catch (error) {
    response.success(req, res, 500, error, 'Oops, something was wrong...', ':(')
  }
})

router.get('/', async (req, res) => {
  try {
    const services = await Controller.findAll()

    if(services) {
      if (services[0]) {

        response.success(req, res, 200,
          'Ok!',
          'Found!',
          services
        )
      } else {

        response.success(req, res, 200,
          'Ok!',
          'Found!',
          'No hay servicios disponibles por el momento'
        )
      }
    } else {

      response.error(req, res, 404,
        '[DB]: Not found.',
        'Services not found.',
        'Oops, services not found... :('
      )
    }

  } catch (error) {
    response.error(req, res, 500,
      error,
      'Oops,something was wrong...',
      ':('
    )
  }
})

router.get('/:id', async (req, res) => {
  try {
    
    const service = await Controller.findOne(req.params.id)

    if (service) {

      response.success(req, res, 200,
        'Ok!',
        'Found!',
        service
      )
    } else {
      response.error(req, res, 404,
        '[DB]: Not found.',
        'Service not found.',
        'No se ha encontrado el servicio'
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
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    value: req.body.value,
    duration: req.body.duration
  }

  if(req.body.status) {
    try {

      const service = await Controller.changeStatus(req.params.id)
      
      if (service) {
        response.success(req, res, 200,
          'Ok!',
          'Found!',
          service
        )
      } else {

        response.error(req, res, 404,
          '[DB]: NOT FOUND.',
          'Not found...',
          `No se encontro ningun servicio con el ID: ${req.params.id}`
        )
      }
      
    } catch (error) {
  
      response.error(req, res, 500,
        error,
        'Oops, something was wrong...',
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
          `No se encontro ningun servicio con el ID: ${req.params.id}`
        )
      } else {
        
        response.success(req, res, 200,
          'Ok!',
          'Not changes',
          `No han habido cambios para el servicio ${data.name}`
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
        `El servicio con ID: ${req.params.id} fue eliminado.`
      )
    } else {

      response.error(req, res, 404,
        `[DB]: ${req.params.id} NOT FOUND!`,
        `El ID: ${req.params.id} no ha sido encontrado.`,
        'Servicio no encontrado.'
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