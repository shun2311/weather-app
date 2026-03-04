/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Composables
import { createVuetify } from 'vuetify'
// Styles
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
const myCustomTheme = {
  dark: false,
  colors: {
    background: 'hsl(243, 96%, 9%)',
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
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme,
    },
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
