require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const MessageHandler = require('./handlers/messageHandler')
const CommandHandler = require('./handlers/commandHandler')
class TgBot {
  constructor(token) {
    this.token = token
    this.bot = null
    this.commandHandler = null
    this.messageHandler = null
    this.initialize()
  }

  initialize() {
    try {
      this.bot = new TelegramBot(this.token, { polling: true })
      console.log('telegramBot ---- OK')
      this.commandHandler = new CommandHandler(this.bot)
      this.messageHandler = new MessageHandler(this.bot)
    } catch (error) {
      console.error('Error initializing bot:', error)
    }
  }

  static getInstance() {
    if (!TgBot.instance) {
      TgBot.instance = new TgBot()
    }
    return TgBot.instance
  }
}
const myBot = new TgBot(process.env.TG_TOKEN)

module.exports = TgBot
