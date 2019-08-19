import apiService from './api-service'

const usersService = {}

/**
 * Retrieve a users by it's id
 * @param  array params (optional)
 * @return users
 */
usersService.list = function (params) {
  return apiService.get(`/users`, { params }).then(res => res.data)
}

/**
 * Retrieve a users by it's id
 * @param  int id
 * @param  array params (optional)
 * @return users
 */
usersService.getById = function (id, params) {
  return apiService.get(`/users/${id}`, { params }).then(res => res.data).catch(error => error)
}

/**
 * Update a users by it's id
 * @param  int id
 * @param  array params (optional)
 * @return users
 */
usersService.updateById = function (id, body) {
  body['_method'] = 'PUT'
  return apiService.post(`/users/${id}`, body).then(res => res.data)
}

/**
 * Create a promoters by it's id
 * @param  object body
 * @return promoters
 */
usersService.post = function (body) {
  return apiService.post(`/users`, body).then(res => res.data)
}

export default usersService
