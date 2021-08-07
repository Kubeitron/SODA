export * from '~/.nuxt-storybook/storybook/preview.js'
import { addDecorator } from '@storybook/vue'

const vuetifyDecorator = () => ({
  template: '<v-app><story/></v-app>',
  props: {
    vuetifyDark: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    vuetifyDark: {
      handler() {
        this.$vuetify.theme.dark = this.vuetifyDark
      },
      immediate: true,
    },
  },
})

addDecorator(vuetifyDecorator)