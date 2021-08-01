<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon title="Go to SODA on Github" @click.stop="openGithub">
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer color="primary">
      <v-container>
        <v-row justify="space-around">
          <v-col v-for="link in items" :key="link.title">
            <v-btn
              color="white"
              class="my-2"
              to="/home"
              text
              nuxt>
              {{ link.title }}
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="space-around">
          <span
            >{{ new Date().getFullYear() }} - <strong>SODA</strong> - soda-ui({{ version }}) - soda-api({{ version }}) - soda-other({{ version }})</span
          >
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import { repository, version} from '../package.json';
export default {
  name: "default",
  data() {
    return {
      version: version,
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Dashboard',
          to: '/',
        },
        {
          icon: 'mdi-card-search-outline',
          title: 'Search',
          to: '/search',
        },
        {
          icon: 'mdi-playlist-plus',
          title: 'Getting Started',
          to: '/soda/getting-started',
        },
        {
          icon: 'mdi-folder-information-outline',
          title: 'Documentation',
          to: '/soda/docs',
        },
        {
          icon: 'mdi-pencil-ruler',
          title: 'Contributing',
          to: '/soda/contribution',
        },
      ],
      miniVariant: false,
      right: true,
      title: 'SODA'
    }
  },
  methods: {
    openGithub() {
      window.open(repository.url)
    },
  },
}
</script>
