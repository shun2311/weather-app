/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com
 */

import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import '../styles/fonts.scss'
import '../styles/settings.scss'
import 'vuetify/styles'

const myCustomTheme = {
  dark: false,
  colors: {
    // Your previous Blue & Orange colors...
    
    // Neutrals
    'neutral-900': 'hsl(243, 96%, 9%)',
    'neutral-800': 'hsl(243, 27%, 20%)',
    'neutral-700': 'hsl(243, 23%, 24%)',
    'neutral-600': 'hsl(243, 23%, 30%)',
    'neutral-300': 'hsl(240, 6%, 70%)',
    'neutral-200': 'hsl(250, 6%, 84%)',
    'neutral-0':   'hsl(0, 0%, 100%)',
    // Mapping your Orange 500
    'orange-500': 'hsl(28, 100%, 52%)',
    
    // Mapping your Blue shades
    'blue-500': 'hsl(233, 67%, 56%)',
    'blue-700': 'hsl(248, 70%, 36%)',
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'defaukt',
    utilities: false,
    // themes: {
    //   myCustomTheme,
    // },
  },
  display: {
    mobileBreakpoint: 'md',
    thresholds: {
      xs: 0,
      sm: 600,
      md: 840,
      lg: 1145,
      xl: 1545,
      xxl: 2138,
    },
  },
})
