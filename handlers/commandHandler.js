const UserService = require('../services/userService')
const messages = require('../config/messages')
const userStates = require('../config/userStates')
class CommandHandler {
  constructor(bot) {
    this.bot = bot
    this.bot.onText(/\/start/, this.proccesStart.bind(this))
  }
  async proccesStart(msg) {
    const chatId = msg.chat.id
    const username = msg.chat.username
    const firstName = msg.chat.first_name
    const lastName = msg.chat.last_name
    const candidate = await UserService.getUser(chatId)
    if (candidate) {
      const state = candidate.state
      const [category, specificState] = state.split('.')
      await UserService.updateUserField(
        chatId,
        'state',
        userStates.form.awaitingCity
      )
      await this.bot.sendMessage(chatId, messages.startMessage)
      this.bot.sendMessage(chatId, messages.sendCity)
    } else {
      await UserService.createUser(chatId, firstName, lastName, username)
      await this.bot.sendMessage(chatId, messages.startMessage)
      this.bot.sendMessage(chatId, messages.sendCity)
    }
  }
}
module.exports = CommandHandler
