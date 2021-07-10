const Model = require('./model')

const createOne = async (data) => {
  const client = await Model.create(data)

  return client
}

const findAll = async () => {
  const clients = await Model.find({active: true})

  return clients
}

const findOne = async (id) => {
  try {
    const client = await Model.findOne({id})

    return client
  } catch (error) {
    return error
  }
}

const updateOne = async (id, data) => {
  try {
    
    const client = await Model.findOne({id})
    
    if (client) {

      const reference = {
        id: client.id,
        name: client.name,
        lastname: client.lastname,
        age: client.age
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
          }}, {new: true}
        )
  
        return result
      }
    } else {

      return client
    }

  } catch (error) {
    return error
  }
}

const deleteOne = async (id) => {
  try {
    const client = await Model.findOneAndDelete({id})

    return client
  } catch (error) {
    return error
  }
}

module.exports = {
  createOne,
  findAll,
  findOne,
  updateOne,
  deleteOne
}