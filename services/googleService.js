require('dotenv').config()

const { Client } = require('@googlemaps/google-maps-services-js')
class GoogleService {
  static async getGeoCode(address) {
    try {
      const client = new Client({})

      const params = {
        address: address,
        key: process.env.GOOGLE_TOKEN,
      }

      const response = await client.geocode({ params })
      const results = response.data.results

      if (results.length > 0) {
        const location = results[0].geometry.location
        const coordinates = {
          lat: location.lat,
          lng: location.lng,
        }
        return coordinates
      } else {
        throw new Error('Координаты не найдены.')
      }
    } catch (error) {
      console.error('Ошибка при получении координат:', error.message)
      throw error
    }
  }
  static async searchHotels(coordinates, rating) {
    try {
      const client = new Client({})
      const params = {
        location: `${coordinates.lat},${coordinates.lng}`,
        radius: 1500,
        type: 'lodging',
        key: process.env.GOOGLE_TOKEN,
        rating: rating,
      }

      const response = await client.placesNearby({ params })
      console.log(response.data)
      if (response.data.status === 'ZERO_RESULTS') {
        return false
      }
      const results = response.data.results
      return results
    } catch (error) {
      console.error(error)
    }
  }
  static async getHotelsPhoto(placeId) {
    const apiKey = process.env.GOOGLE_TOKEN
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${apiKey}`

    try {
      const response = await axios.get(url)
      const photos = response.data.result.photos

      if (photos && photos.length > 0) {
        const photoUrls = photos.map((photo) => {
          return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photo.photo_reference}&key=${apiKey}`
        })

        return photoUrls
      } else {
        return []
      }
    } catch (error) {
      console.error('Error fetching hotel photos:', error)
      return []
    }
  }
}

module.exports = GoogleService
