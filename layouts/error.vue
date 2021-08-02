<template>
  <v-container>
    <div class="text-center">
      <h2 v-if="error.statusCode === 404">
        <v-icon x-large>mdi-alert-rhombus-outline</v-icon>
        Page not found
      </h2>
      <h2 v-else>
        <v-icon x-large>mdi-alert-rhombus-outline</v-icon>
        An error occurred
      </h2>
      <hr class="my-12">
      <h3>Rate your SODA Experience</h3>
      <v-rating
        empty-icon="mdi-bottle-soda-classic-outline"
        full-icon="mdi-bottle-soda-classic"
        half-icon="mdi-bottle-soda-classic"
        hover
        length="5"
        size="128"
        :value="3"
      ></v-rating>
      <v-btn text to="/">Submit</v-btn>
    </div>
  </v-container>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error',
  }
</script>

<style scoped>
.text-center {
  margin: 20% 0 0;
}
</style>