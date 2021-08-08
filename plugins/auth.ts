import Vue from 'vue'
import VueKeyCloak from '@dsb-norge/vue-keycloak-js'
import { VueKeycloakInstance } from "@dsb-norge/vue-keycloak-js/dist/types";


// Expansion so keycloak is available in app conext
declare module 'vue/types/vue' {
  interface Vue {
    $keycloak: VueKeycloakInstance
  }
}
export default ({ app }: any) => {
  Vue.use(VueKeyCloak, {
    init: {
      responseType: 'code',
      onLoad: 'login-required',
      flow: 'standard'
    },
    config: {
      realm: app.$config.KEYCLOAK_REALM,
      url: app.$config.KEYCLOAK_HOST,
      clientId: app.$config.KEYCLOAK_CLIENT_ID
    },
    onReady(keycloak) {
      console.log(keycloak)
    }
  })
}

