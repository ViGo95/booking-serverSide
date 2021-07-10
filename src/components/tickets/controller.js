const Model = require('./model')

const createOne = (data) => {
  const ticket = Model.create(data)

  return ticket
}

const findAll = () => {
  try {
    const tickets = Model.find()
  
    return tickets
  } catch (error) {
    return error
  }
}

const findOne = (id) => {
  try {
    const ticket = Model.findById(id)
  
    return ticket
  } catch (error) {
    return error
  }
}

const closeTicket = (id) => {
  try {

    const ticket = Model.findByIdAndUpdate(id, {$set: {active: false}})
  
      return ticket
  } catch (error) {
    return error
  }
}

const updateOne = async (id, data) => {
  try {
    
    const ticket = await Model.findById(id)
    
    if (ticket) {
      
      const reference = {
        services: ticket.services,
        employee: ticket.employee,
        date: ticket.date,
        duration: ticket.duration
      }
      
      const servicesIDs = []
      
      ticket.services.forEach(service => {
        
        servicesIDs.push(service._id)

      });
      
      if(JSON.stringify(data) === JSON.stringify(reference)) {
  
        return false

      } else if(data.services) {

        if(data.services == servicesIDs) {

          return false

        } else {

          updatedTicket = await Model.findByIdAndUpdate(id, 
            {$set:{'services': data.services}},
            {safe: true, upsert: true, new: true}
          )

          return updatedTicket

        }

      } else if(data.employee || data.date || data.duration) {
  
        const result = await Model.findByIdAndUpdate(id,
          {$set: {
            employee: data.employee,
            date: data.date,
            duration: data.duration
          }}, {new: true}
        )
        
        return result
      }
    } else {

      return ticket
    }

  } catch (error) {
    return error
  }
}

const deleteOne = async (id) => {
  try {
    const ticket = await Model.findByIdAndDelete(id)

    return ticket
  } catch (error) {
    return error
  }
}

module.exports = {
  createOne,
  findAll,
  findOne,
  closeTicket,
  updateOne,
  deleteOne
}