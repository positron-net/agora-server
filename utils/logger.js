const chalk = require('chalk')

module.exports = {
  log (message) {
    console.log(`${chalk.blue.bold('[INFO]')} ${chalk.gray('>')} ${chalk.white(message)}`)
  },

  warn (message) {
    console.log(`${chalk.yellow.bold('[WARNING]')} ${chalk.gray('>')} ${chalk.white(message)}`)
  },

  error (message) {
    console.log(`${chalk.red.bold('[ERROR]')} ${chalk.gray('>')} ${chalk.white(message)}`)
  },

  load (message) {
    console.log(`${chalk.magenta.bold('[...]')} ${chalk.gray('>')} ${chalk.white(message)}`)
  },

  done (message) {
    console.log(`${chalk.green.bold('[✔]')} ${chalk.gray('>')} ${chalk.white(message)}`)
  }
}