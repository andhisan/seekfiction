import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  theme: {
    extend: {
      fontFamily: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono'
      },
      colors: {
        primary: {
          '50': '#f4f9fe',
          '100': '#e9f3fd',
          '200': '#c9e1f9',
          '300': '#a8cff6',
          '400': '#67abef',
          DEFAULT: '#2687e8',
          '500': '#2687e8',
          '600': '#227ad1',
          '700': '#1d65ae',
          '800': '#17518b',
          '900': '#134272'
        }
      }
    }
  }
})
