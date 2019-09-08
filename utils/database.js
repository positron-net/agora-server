const fs = require('fs') // import "file system" module
const { resolve } = require('path') // import "resolve" function from "path" module

const dbPath = resolve('./database') // get databse absolute path from the relative pash with the "resolve" function

// if database directory doesn't exist
if (!fs.existsSync(dbPath)) {
  fs.mkdirSync(dbPath) // create it
}

module.exports = {
  // to put data in the database
  put (key, value) { // we need a key to link the value
    return new Promise((resolve, reject) => {
      fs.exists(`${dbPath}/${key}`, exists => { // check if the key already exist
        if (exists) { // if the key exist
          fs.writeFile(`${dbPath}/${key}/index.json`, JSON.stringify(value), err => { // rewrite the file with the new values
            if (err) reject(err) // if there is an error, stop the function and return it
            resolve({  message: 'SUCCESS' }) // when the function is successfully executed
          })
        } else {
          fs.mkdir(`${dbPath}/${key}`, err => { // create a directory for the key
            if (err) reject(err) // if there is an error, stop the function and return it
            fs.writeFile(`${dbPath}/${key}/index.json`, JSON.stringify(value), err => { // write the file
              if (err) reject(err) // if there is an error, stop the function and return it
              resolve({  message: 'SUCCESS' }) // when the function is successfully executed
            })
          })
        }
      })
    })
  },

  // remove a key
  remove (key) {
    return new Promise((resolve, reject) => {
      if (fs.existsSync(`${dbPath}/${key}`)) { // if the directory/key exist
        fs.unlink(`${dbPath}/${key}`, err => { // remove the directory
          if (err) reject(err) // if there is an error, stop the function and return it
          resolve({  message: 'SUCCESS' }) // when the function is successfully executed
        })
      } else {
        reject({ message: 'UNKNOW_KEY' }) // If the key is not found
      }
    })
  },

  // get value from a key
  get (key) {
    return new Promise((resolve, reject) => {
      fs.exists(`${dbPath}/${key}`, exists => { // if the directory/key exist
        if (exists) {
          fs.readFile(`${dbPath}/${key}/index.json`, (err, data) => { // read the file
            data = JSON.parse(data) // parse json
            resolve(data) // return the conten of the file
          })
        } else {
          reject({ message: 'UNKNOW_KEY' }) // If the key is not found
        }
      })
    })
  },

  // verify if the value exist
  has (key) {
    return new Promise((resolve, reject) => {
      fs.exists(`${dbPath}/${key}`, exists => { // if directory/key exist
        if (exists) {
          resolve({  message: 'SUCCESS' }) // when the function is successfully executed
        } else {
          reject({ message: 'UNKNOW_KEY' }) // If the key is not found
        }
      })
    })
  },

  // list all keys
  list () {
    return new Promise((resolve, reject) => {
      fs.readdir(dbPath, (err, files) => {
        if (err) reject(err)
        resolve(files)
      })
    })
  }
}