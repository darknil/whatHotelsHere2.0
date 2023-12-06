// UserService
const UserModel = require('../models/userModel'),
  userStates = require('../config/userStates')
class UserService {
  async createUser(chatId, firstName, lastName, username) {
    try {
      const state = userStates.form.awaitingCity
      const newUser = await UserModel.create({
        chatId,
        firstName,
        lastName,
        username,
        state,
      })
      console.log('User created:', newUser)
      return newUser
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }
  async getUser(chatId) {
    try {
      const user = await UserModel.findOne({ chatId })
      if (user) {
        return user
      } else {
        console.log('User not found.')
        return null
      }
    } catch (error) {
      console.error('Error finding user:', error)
      throw error
    }
  }
  async updateUserField(chatId, field, value) {
    try {
      const filter = { chatId }
      const update = { $set: { [field]: value } }
      const updatedUser = await UserModel.updateOne(filter, update)
      if (updatedUser.modifiedCount === 1) {
        // console.log(`User's ${field} updated successfully.`)
        return updatedUser
      } else {
        console.log(
          `User's ${field} not updated. User not found or field value is the same.`,
          filter,
          update
        )
        return null
      }
    } catch (error) {
      console.error(`Error updating user's ${field}:`, error)
      throw error
    }
  }
}

module.exports = new UserService()
