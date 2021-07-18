<template>
  <article class="content-container">
    <h1>{{ page.title }}</h1>
    <nuxt-content :document="page" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const page = await $content('GETTING_STARTED').fetch()

    return {
      page,
    }
  },
  head() {
    return {
      title: "Getting Started"
    };
  }
}
</script>
