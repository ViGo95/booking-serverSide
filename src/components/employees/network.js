const router = require('express').Router()

const Controller = require('./controller')
const response = require('../../utils/response')

router.post('/', async (req, res) => {
  try {

    const employee = await Controller.findOne(req.body.id)

    if(!employee) {

      const newEmployee = await Controller.createOne(req.body)
  
      response.success(req, res, 200,
        'Employee created!',
        'You have created a new employee',
        newEmployee
      )
    } else {

      response.error(req, res, 400,
        `[DB]: Employee ID ${employee.id} duplicated`,
        'Employee duplicated...',
        'Este ID de empleado ya esta registrado.'
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
    
    const employees = await Controller.findAll()

    if(employees) {

      if(employees[0]) {

        response.success(req, res, 200,
          'Ok!',
          'Found!',
          employees
        )
      } else {

        response.success(req, res, 200,
          '[DB]: NO EMPLOYEES.',
          'Found!',
          'No hay empleados activos en este momento.'
        )
      }
    } else {
      
      response.error(req, res, 404,
        '[DB]: Not found.',
        'Employees not found.',
        'Oops, employees not found... :('
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

router.get('/:id', async (req, res) => {
  try {

    const employee = await Controller.findOne(req.params.id)

    if(employee) {

      response.success(req, res, 200,
        'Ok!',
        'Found!',
        employee
      )
    } else {

      response.error(req, res, 404,
        '[DB]: Not found.',
        'Employee not found.',
        'No se ha encontrado el empleado'
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

router.patch('/:id', async (req, res) => {
  const data = {
    id: parseInt(req.body.id),
    name: req.body.name,
    lastname: req.body.lastname,
    age: req.body.age
  }
  
  if(req.body.status) {
    try {

      const employee = await Controller.changeStatus(req.params.id)

      if (employee) {
        response.success(req, res, 200,
          'Ok!',
          'Found!',
          employee
        )
      } else {

        response.error(req, res, 404,
          '[DB]: NOT FOUND.',
          'Not found...',
          `No se encontro ningun empleado con el ID: ${req.params.id}`
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
          `No se encontro ningun empleado con el ID: ${req.params.id}`
        )
      } else {
        
        response.success(req, res, 200,
          'Ok!',
          'Not changes',
          `No han habido cambios para el empleado ${data.name} ${data.lastname}`
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

router.patch('/:id/:serviceID', async (req, res) => {
  try {

    const employee = await Controller.updateServices(req.params.id, req.params.serviceID)
    
    if (employee) {
      
      response.success(req, res, 200,
        'Ok!',
        'Found!',
        employee
      )
    } else {

      response.error(req, res, 404,
        '[DB]: NOT FOUND.',
        'Not found...',
        `No se encontro ningun empleado con el ID: ${req.params.id}`
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
        `El empleado con id: ${req.params.id} fue eliminado.`
      )
    } else {

      response.error(req, res, 404,
        `[DB]: ${req.params.id} NOT FOUND!`,
        `El ID: ${req.params.id} no ha sido encontrado.`,
        `No se encontro ningun empleado con el ID: ${req.params.id}`
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