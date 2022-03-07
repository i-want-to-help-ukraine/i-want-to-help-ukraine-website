import axios from './axios'

const getVolunteers = async () => {
  const response = await axios.get('/users')
  return response.data
}

// await patchVolunteerByiD(volunteer.user_id, { "user_metadata" : { "facebook": "https://www.facebook.com/alenatymko" } })
const patchVolunteerByiD = async (userId, data) => {
  const response = await axios.patch(`users/${userId}`, data)
  return response.data
}

export { getVolunteers, patchVolunteerByiD }
