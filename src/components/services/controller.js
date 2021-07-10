const Model = require('./model')

const createOne = async (data) => {
  try {
    
    const service = await Model.create(data)
  
    return service

  } catch (error) {
    return error
  }
}

const findAll = async () => {

  try {
    
    const services = await Model.find()
  
    return services
    
  } catch (error) {
    return error
  }
}

const findOne = async (id) => {
  try {

    const service = await Model.findOne({id})
    
    return service
  } catch (error) {
    return error
  }
}

const changeStatus = async (id) => {
  try {
    const isActive = await Model.findOne({id})

    if (isActive) {
      
      if(isActive.active) {
        
        await Model.findOneAndUpdate({id}, {$set: {active: false}})
        const service = await Model.findOne({id})
        return service

      } else {

        await Model.findOneAndUpdate({id}, {$set: {active: true}})
        const service = await Model.findOne({id})
        return service
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
    
    const service = await Model.findOne({id})
    
    if (service) {

      const reference = {
        id: service.id,
        name: service.name,
        description: service.description,
        value: service.value,
        duration: service.duration
      }
  
      if(JSON.stringify(data) === JSON.stringify(reference)) {
  
        return false
      } else {
  
        const result = await Model.findOneAndUpdate({id},
          {$set: {
            id: data.id,
            name: data.name,
            description: data.description,
            value: data.value,
            duration: data.duration
          }}, {new: true}
        )
  
        return result
      }
    } else {

      return service
    }

  } catch (error) {
    return error
  }
}

const deleteOne = async (id) => {
  try {
    const service = await Model.findOneAndDelete({id})

    return service
  } catch (error) {
    return error
  }
}

module.exports = {
  createOne,
  findAll,
  findOne,
  changeStatus,
  updateOne,
  deleteOne
}