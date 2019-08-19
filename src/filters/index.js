import Vue from 'vue'
import formatCurrency from '@/filters/formatCurrency'
import formatDate from '@/filters/formatDate'
import reverseDate from '@/filters/reverseDate'

Vue.filter('formatCurrency', formatCurrency)
Vue.filter('formatDate', formatDate)
Vue.filter('reverseDate', reverseDate)
