const keyboards = {
  confirmation: {
    reply_markup: {
      keyboard: [
        [{ text: 'no,fill out again' }, { text: 'yes,search hotels' }],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  },
}
module.exports = keyboards
