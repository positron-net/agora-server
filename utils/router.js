const auth = require('../controller/auth') // import "auth" module
const users = require('../controller/users')

module.exports = (request, remote) => {
  return new Promise((resolve, reject) => {
    switch (request.action) {

      case 'LOGIN_USER': // if the message is "LOGIN_USER"
        auth.login(request.content.username, request.content.password, request.content.digit)
        .then(token => resolve({
          username: `${request.content.username}#${request.content.digit}`,
          token: token
        }))
      break

      case 'CONNECT': // if the message is "CONNECT"
        auth.connect(request.content.username, request.content.password, request.content.digit, remote.address, request.content.port)
        .then(msg => resolve(msg))
        .catch(err => reject(err))
      break

      case 'GET_USER': // if the message is "GET CLIENT"
        users.get(request.content.token)
        .then(msg => resolve(msg))
        .catch(e => reject(e))
      break

      case 'GET_USERS': // if the message is "LIST_USERS"
        users.list(request.content.number)
        .then(msg => resolve(msg))
        .catch(e => reject(e))
      break
      default: // if the user sent an unknow request
        reject({ message: 'UNKNOW_REQUEST' })
    }
  })
}