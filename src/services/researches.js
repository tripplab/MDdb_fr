import apiService from './api-service'

const researchesService = {}

/**
 * Retrieve a researches by it's id
 * @param  array params (optional)
 * @return researches
 */
researchesService.list = function (params) {
  return apiService.get(`/studies`, { params }).then(res => res.data)
}

export default researchesService
