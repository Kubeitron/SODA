<template>
    <v-row>
      <v-col>
        <v-system-bar
          :class="systemBarClass"
          height="48">
          <v-icon>{{ icon }}</v-icon>
          This is a status message
        </v-system-bar>
      </v-col>
    </v-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      status: 'error'
    };
  },
  computed: {
    icon(): string {
      // todo: create icon wrapping models
      if('error' === this.status) {
        return 'mdi-account-alert';
      } else if ('warning' === this.status) {
        return 'mdi-airbag';
      } else if ('green' === this.status) {
        return 'mdi-timeline-check-outline';
      }
      return '';
    },
    systemBarClass(): string {
      return this.status;
    }
  },
  head() {
    // todo: can this be linked to the router?
    return {
      title: "Dashboard"
    };
  }
})
</script>

