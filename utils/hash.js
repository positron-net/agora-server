const { pbkdf2 } = require('crypto') // import "pbkdf2" from crypto

module.exports = (text, password) => {
  return new Promise(resolve => {
    // hash a text with a password
    pbkdf2(text, password, 100000, 16, 'sha512', (err, derivedKey) => {
      if (err) throw err
      resolve(derivedKey.toString('hex')) // return the hash in hexadecimal
    })
  })
}