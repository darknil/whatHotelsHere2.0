const messages = {
  startMessage:
    'Welcome to our hotel search bot!\n🌍 Please specify the city where you want to find a hotel: [city]\n⭐️ Specify the hotel rating: [rating]\n🔎 After filling in all the fields, click the "Search" button to find suitable hotels.\n',
  sendCity: 'send city name :',
  sendRating: 'send rating in numbers(1-5) :',
  confirmation: (city, rating) => {
    return `City: ${city}\nRating :${rating}`
  },
  correct: 'correct?',
}
module.exports = messages
