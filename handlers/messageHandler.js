const UserService = require('../services/userService')
const messages = require('../config/messages')
const form = require('../modules/form')
class MessageHandler {
  constructor(bot) {
    if (MessageHandler.instance) {
      return MessageHandler.instance
    }
    this.bot = bot
    this.form = new form(this.bot)
    this.bot.on('message', (msg) => {
      this.handleUserMessage(msg)
    })
    MessageHandler.instance = this
  }
  async handleUserMessage(msg) {
    if (msg.text && msg.text.startsWith('/')) {
      return
    }
    const chatId = msg.chat.id
    const username = msg.chat.username
    const firstName = msg.chat.first_name
    const lastName = msg.chat.last_name
    console.log(chatId, username, firstName, lastName)
    const candidate = await UserService.getUser(chatId)
    if (candidate) {
      const [category, specificState] = candidate.state.split('.')
      switch (category) {
        case 'form':
          this.form.proccesMessage(msg, candidate)
          break
        case 'choise':
          break
        case 'hotel':
          break
        default:
          break
      }
      console.log(candidate.state)
    } else {
      await UserService.createUser(chatId, firstName, lastName, username)
      await this.bot.sendMessage(chatId, messages.startMessage)
      this.bot.sendMessage(chatId, messages.sendCity)
    }
  }
}
module.exports = MessageHandler
