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

  async getAll (clients) {
    let r = []

    for (let i = 0; clients.length > i; i++) {
      await db.get(clients[i])
      .then(data => {
        r.push({
          token: clients[i],
          data: data
        })
      })
      .catch(e => { return e }) 
    }

    return r
  },

  // get a list of user
  list (number) {
    return new Promise(resolve => {
      db.list()
      .then(clients => {
  
        this.getAll(clients)
        .then(r => {
          resolve(r)
        })
  
      }) 
    })
  }
}

module.exports = users