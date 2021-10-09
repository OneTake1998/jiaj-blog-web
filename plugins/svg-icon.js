import SvgIcon from '@/components/SvgIcon/index.vue' // svg component
import Vue from 'vue'

Vue.component('svg-icon', SvgIcon)
 
const req = require.context('@/assets/icons/svg', true, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

