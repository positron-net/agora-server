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
  async list (number) {

    let r = []

    db.list()
    .then(clients => {
      for (let i = 0; clients.length > i; i++) {
        db.get(clients[i])
        .then(data => {
          r.push({
            token: clients[i],
            data: data
          })
        })
        .catch(e => reject(e)) 
      }

      console.log(r)
    })
    /*
    return new Promise((resolve, reject) => {

    })
    */
  }
}

module.exports = users