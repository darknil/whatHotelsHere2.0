const UserService = require('../services/userService')
const messages = require('../config/messages')
const userStates = require('../config/userStates')
const keyboards = require('../config/keyboard')
const GoogleService = require('../services/googleService')
class form {
  constructor(bot) {
    this.bot = bot
  }
  async proccesMessage(msg, user) {
    const [category, specificState] = user.state.split('.')
    const chatId = msg.chat.id
    const message = msg.text
    switch (specificState) {
      case 'awaitingCity':
        await UserService.updateUserField(chatId, 'city', message)
        UserService.updateUserField(
          chatId,
          'state',
          userStates.form.awaitingRating
        )
        this.bot.sendMessage(chatId, messages.sendRating)
        break
      case 'awaitingRating':
        const isNumber = /^\d+$/.test(message)

        if (isNumber) {
          if (isNumber >= 1 && isNumber <= 5) {
            await UserService.updateUserField(chatId, 'stars', message)
            await UserService.updateUserField(
              chatId,
              'state',
              userStates.form.confirmation
            )
            const user = await UserService.getUser(chatId)
            await this.bot.sendMessage(
              chatId,
              messages.confirmation(user.city, user.stars)
            )
            this.bot.sendMessage(
              chatId,
              messages.correct,
              keyboards.confirmation
            )
          } else {
            this.bot.sendMessage(chatId, 'send me number from 1 to 5')
          }
        } else {
          this.bot.sendMessage(chatId, 'send me number from 1 to 5')
        }
        break
      case 'confirmation':
        if (message === 'no,fill out again') {
          await UserService.updateUserField(
            chatId,
            'state',
            userStates.form.awaitingCity
          )
          await this.bot.sendMessage(chatId, messages.startMessage)
          this.bot.sendMessage(chatId, messages.sendCity)
        } else if (message === 'yes,search hotels') {
          const user = await UserService.getUser(chatId)
          console.log(user)
          const adress = user.city
          const rating = user.stars
          const coordinates = await GoogleService.getGeoCode(adress)
          console.log(coordinates)
          console.log(rating)
          const hotels = await GoogleService.searchHotels(coordinates, rating)
          if (!hotels) {
            UserService.updateUserField(
              chatId,
              'state',
              userStates.form.awaitingCity
            )
            await this.bot.sendMessage(chatId, 'empty respons. Try again')
            this.bot.sendMessage(chatId, messages.sendCity)
            return
          }
          console.log(hotels)
          const update = await UserService.updateUserField(
            chatId,
            'hotels',
            hotels
          )
          await UserService.updateUserField(
            chatId,
            'state',
            userStates.choise.default
          )
        } else {
          this.bot.sendMessage(chatId, 'wrong option')
        }
        break
      default:
        break
    }
  }
}
module.exports = form
