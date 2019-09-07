global.config = require('./config.json.js') // import config file
const console = require('./utils/logger.js.js') // import console module
const router = require('./utils/router.js.js') // import router
const db = require('./utils/database') // init db

console.log('\033c') // clear the terminal

const dgram = require('dgram') // import dgram
const server = dgram.createSocket('udp4') // create a new connection

// just to respond to a client
const send = (msg, remote, r) => {
  // creating packet
  const packet = JSON.stringify({
    action: msg.action,
    content: r
  })

  // sending it
  server.send(packet, remote.port, remote.address, (err) => {
    if (err) console.error(err) // if there is an error, show it in the terminal
  })
}

// on sever error
server.on('error', (err) => {
  console.error(err.stack) // show error message in the terminal
  server.close() // close the server
})

// When a message is received from a client
server.on('message', (msg, remote) => {
  console.log(`New message from [${remote.address}:${remote.port}]`) // show it in the terminal

  msg = JSON.parse(msg) // parse the json
  router(msg, remote)
  .then(result => send(msg, remote, result)) // send the result
  .catch(result => { // show and send the error
    console.warn(`Error for [${remote.address}:${remote.port}] : ${result.message}`)
    send(msg, remote, result)
  })
})

// On listening
server.on('listening', () => {
  const address = server.address() // get server' address
  console.log(`Server listening [${address.address}:${address.port}]`) // show on terminal
})

server.bind(config.port) // bind the port