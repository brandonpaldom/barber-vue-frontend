import api from '../lib/axios.js'

export default {
  create(appointment) {
    return api.post('/appointments', appointment)
  },
  getByDate(date) {
    return api.get(`/appointments?date=${date}`)
  },
  getByUser(id) {
    return api.get(`/users/${id}/appointments`)
  },
  getById(id) {
    return api.get(`/appointments/${id}`)
  },
  update(id, appointment) {
    return api.put(`/appointments/${id}`, appointment)
  },
  delete(id) {
    return api.delete(`/appointments/${id}`)
  },
}
