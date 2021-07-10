require('dotenv').config()

module.exports = {
  SERVER: {
    PORT: process.env.PORT || '3000',
    HOST: 'http://localhost:'
  },
  DB: {
    USER: process.env.DBUSER,
    PASSWORD: process.env.DBPASSWORD,
    NAME: process.env.DBNAME,
    URL: `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.29vqj.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
  }
}