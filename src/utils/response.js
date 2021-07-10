const success = (req, res, status, log, message, data) => {
  console.log(log)

  res.header({
    message: message
  })

  res.status(status || 200).send(data)
}

const error = (req, res, status, log, message, data) => {
  console.log(log)

  res.header({
    message: message
  })

  res.status(status || 500).send(data)
}

module.exports = {
  success,
  error
}