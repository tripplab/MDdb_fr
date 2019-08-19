import apiService from './api-service'

const loginService = {}

/**
 * Retrieve token with user and password
 * @param  array params (optional)
 * @return token
 */
loginService.auth = function (params) {
  return apiService.post(`/auth/login`, params).then(res => res.data)
}

export default loginService
