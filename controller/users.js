const db = require('../utils/database') // import "database" module

const users = {
  // get a specific user with a token
  get (token) {
    return new Promise((resolve, reject) => {
      db.get(token) // get user in the database
      .then(data => resolve(data)) // return datas
      .catch(e => reject(e)) // if there is an error with the database
    })
  },

  // get a list of user
  list (number) {
    return new Promise((resolve, reject) => {
      db.list() // list all the users
      .then(files => {
        if (files.length < number) { // if the number of users is less than the number got by the "princpal" user.
          resolve(files) // return datas
        } else { // also
          const offset = Math.round(files.length / number) // we create an offset
          let tokens = [] // this array will store all the tokens
  
          for (let i = 0; i < number; i++) {
            tokens.push(files[i + offset])
          }
  
          resolve(tokens) // return datas
        }
      })
      .catch(e => reject(e)) // if there is an error with the database
    })
  }
}

module.exports = users