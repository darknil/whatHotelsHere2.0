const db = require('../db/db')

const userSchema = new db.Schema({
  chatId: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  username: { type: String, unique: true, required: true },
  state: { type: String },
  city: { type: String },
  min: { type: Number },
  max: { type: Number },
  stars: { type: Number },
  hotels: { type: [Object], default: [] },
})
const UserModel = db.model('User', userSchema)
module.exports = UserModel
