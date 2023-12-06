require('dotenv').config()
const db = require('mongoose')
db.connect(process.env.dbURI + process.env.dbName, {})
db.connection.once('connected', () => {
  console.log('telegramBot DB ---- OK')
})
module.exports = db
