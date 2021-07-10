const mongoose = require('mongoose')

const connectDB = async(url) => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });

  try {
    console.log('MongoDB Ready!')
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectDB