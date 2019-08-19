import Vue from 'vue'
import trae from 'trae'
import configService from './api-config'
import store from '@/store/index'
import router from '@/router/index'
import Toasted from 'vue-toasted'

Vue.use(Toasted)

const apiService = trae.create({
  baseUrl: configService.apiUrl
})

const addTokenToRequest = (config) => {
  config.headers['Authorization'] = store.getters.getToken
  return config
}

apiService.before(addTokenToRequest)

const fullfillMiddleware = (res) => {
  return res
}

const rejectMiddleware = (err) => {
  console.error('Error: ', err.status)
  let msg = 'Ocurrió un problema'
  if (err.status == '403') {
    msg = 'Contraseña o usuario incorrecto, intente de nuevo'
  }
  if (err.status == '422') {
    msg = err.data.error.message
  }
  if (err.status == '401') {
    msg = 'La sesión del usuario ha expirado'
  }
  Vue.toasted.show(msg, {
    type: 'error',
    icon: 'error_outline',
    duration: 3000,
    fullWidth: true,
    position: 'top-center',
    fitToScreen: true
  })
  if (err.status == '401') {
    router.push('/logout')
  }
  return Promise.reject(err)
}

apiService.after(fullfillMiddleware, rejectMiddleware)

export default apiService
