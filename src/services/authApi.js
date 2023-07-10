import api from '../lib/axios'

export default {
  register(user) {
    return api.post('/auth/register', user)
  },
  verify(token) {
    return api.get(`/auth/verify/${token}`)
  },
  login(user) {
    return api.post('/auth/login', user)
  },
  auth() {
    return api.get('/auth/user')
  },
  admin() {
    return api.get('/auth/admin')
  },
  forgotPassword(email) {
    return api.post('/auth/forgot-password', email)
  },
  verifyResetPasswordToken(token) {
    return api.get(`/auth/forgot-password/${token}`)
  },
  resetPassword(token, password) {
    return api.post(`/auth/forgot-password/${token}`, password)
  },
}
