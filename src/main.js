// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import moment from 'moment'
import VueSwal from 'vue-swal'
import Toasted from 'vue-toasted'
import App from './App'
import router from './router/index'
import store from './store/index'

// Template
import 'jquery/dist/jquery.min.js'
import 'bootstrap'
import './vendors/mdi/css/materialdesignicons.min.css'
import './vendors/base/vendor.bundle.base.css'
import './vendors/datatables.net-bs4/dataTables.bootstrap4.css'
import './assets/css/style.css'

// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import icons from './icons'

// Vuetify
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

// Select with Search
import vSelect from 'vue-select'

// Base Layouts
import DashboardLayout from '@/components/layouts/DashboardLayout'
import EmptyLayout from '@/components/layouts/EmptyLayout'

// Global Filters
import './filters'

// Vue i18n
import VueI18n from 'vue-i18n'
import validationMessages from 'vee-validate/dist/locale/es'

// Validator
import VeeValidate from 'vee-validate'

// Configure Vue-i18n + Vee-Validate
Vue.prototype.moment = moment

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'es',
  silentTranslationWarn: true
})

Vue.use(VeeValidate, {
  i18nRootKey: 'validations',
  i18n,
  dictionary: {
    es: validationMessages
  }
})

// Register Components
icons.forEach(icon => library.add(icon))
Vue.component('fai', FontAwesomeIcon)

Vue.use(Vuetify)

Vue.component('v-select', vSelect)

Vue.component('dashboard-layout', DashboardLayout)
Vue.component('empty-layout', EmptyLayout)

Vue.config.productionTip = false

Vue.use(VueSwal)

Vue.use(Toasted)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
