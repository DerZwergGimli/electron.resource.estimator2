import { defineStore } from 'pinia'
import { useDark, useLocalStorage, useToggle } from '@vueuse/core'

export const useThemeStore = defineStore('themeStore', {
  state: () => {
    return {
      is_dark: useDark(),
    }
  },
  actions: {
    toggleDark() {
      useToggle(!this.is_dark)
      this.is_dark = !this.is_dark
    },
  },
})
