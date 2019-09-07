const auth = require('../controller/auth') // import "auth" module

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
        auth.connect(request.content.username, request.content.password, request.content.digit, request.content.port, remote.address)
        .then(msg => resolve(msg))
        .catch(err => reject(err))
      break
      case 'GET_CLIENT': // if the message is "GET CLIENT"
        resolve({
          ip: '8.6.82.37',
          port: 46540
        })
      break
      default: // if the user sent an unknow request
        reject({ message: 'UNKNOW_REQUEST' })
    }
  })
}