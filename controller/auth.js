const key = config.key // get the Agora' private key
const hash = require('../utils/hash') // imort "hash" module
const db = require('../utils/database') // import "database" module

const auth = {
  // Generate a token
  generate (user, password, digit) {
    return new Promise(resolve => {
      // hash username + digit with the password and the Agora' pivate key
      console.log(user, digit, password)
      hash(user + digit, password + key).then(token => {
        resolve(token) // return the token
      })
    })
  },

  // To register a new user
  login (user, password, digit) {
    return new Promise(resolve => {
      this.generate(user, password, digit).then(token => { // generating token
        db.put(token, {}) // put void value in the db
        .then(() => resolve(token)) // return token
        .catch(err => reject(err)) // if there is an error, send it to the user
      })
    })
  },

  // To update the address and port of an user
  connect (user, password, digit, address, port) {
    return new Promise((resolve, reject) => {
      this.generate(user, password, digit).then(token => { // generate the token
        db.has(token).then(() => { // verify if the user exist or not
          db.put(token, { // put the data in the DB
            address: address,
            port: port,
            lastUpdate: Date.now()
          }).then((msg) => resolve(msg)) // when the function successfully worked
            .catch(err => reject(err)) // if there is an error, send it to the user
        }).catch(err => reject(err)) // if there is an error, send it to the user
      })
    })
  }
}

module.exports = auth // export module