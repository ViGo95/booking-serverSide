const Model = require('./model')

const createOne = async (data) => {
  const employee = await Model.create(data)

  return employee
}

const findAll = async () => {
  const employees = await Model.find({active: true})

  return employees
}

const findOne = async (id) => {
  try {
    const employee = await Model.findOne({id})

    return(employee)
  } catch (error) {
    return error
  }
}

const updateTickets = async (id, ticketID, ticketStatus) => {
  
  try {

    if(ticketStatus) {

      const employee = await Model.findByIdAndUpdate(id, 
        {$push:{'tickets': ticketID}},
        {safe: true, upsert: true}
      )

      return employee
    } else {

      const employee = await Model.findByIdAndUpdate(id, 
        {$pull:{'tickets': ticketID}},
        {safe: true, upsert: true}
      )
      
      return employee
    }
  } catch (error) {
    return error
  }
}

const changeStatus = async (id) => {
  try {
    const isActive = await Model.findOne({id})

    if (isActive) {
      
      if(isActive.active) {
        await Model.findOneAndUpdate(id, {$set: {active: false}})
        const employee = await Model.findOne({id})
        return employee
      } else {
        await Model.findOneAndUpdate(id, {$set: {active: true}})
        const employee = await Model.findOne({id})
        return employee
      }
    } else {

      return isActive
    }
    
  } catch (error) {
    return error
  }
}

const updateOne = async (id, data) => {
  try {
    const employee = await Model.findOne({id})
    console.log(employee)
    if (employee) {
      
      const reference = {
        id: employee.id,
        name: employee.name,
        lastname: employee.lastname,
        age: employee.age
      }
      
      if(JSON.stringify(data) === JSON.stringify(reference)) {
  
        return false
      } else {
  
        const result = await Model.findOneAndUpdate({id},
          {$set: {
            id: data.id,
            name: data.name,
            lastname: data.lastname,
            age: data.age
          }}, {new:true}
        )
  
        return result
      }
    } else {
      return employee
    }


  } catch (error) {
    
    return error
  }
}

const updateServices = async (id, serviceID) => {
  try {
    let updatedEmployee

    const employee = await Model.findOne({id})
    
    if (employee) {
      const status = employee.services.filter(service => service._id == serviceID)
      
      if(status[0]) {
        updatedEmployee = await Model.findOneAndUpdate({id}, 
          {$pull:{'services': serviceID}},
          {safe: true, upsert: true}
        )
      } else {
        updatedEmployee = await Model.findOneAndUpdate({id}, 
          {$push:{'services': serviceID}},
          {safe: true, upsert: true}
        )
      }
  
      return await Model.findById(updatedEmployee._id)
    } else {

      return false
    }
  } catch (error) {
    return error
  }
}

const deleteOne = async (id) => {
  try {
    const employee = await Model.findOneAndDelete({id})

    return employee
  } catch (error) {
    return error
  }
}

module.exports = {
  createOne,
  findAll,
  findOne,
  updateTickets,
  changeStatus,
  updateOne,
  updateServices,
  deleteOne
}