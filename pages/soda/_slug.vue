<template>
  <article class="content-container">
    <h1>{{ page.title }}</h1>
    <nuxt-content :document="page" />
  </article>
</template>

<script>
  let title = '';
  export default {
    async asyncData({ $content, params }) {
      title = params.slug
      const page = await $content(params.slug.toUpperCase()).fetch()
      return {page, title}
    },
    head() {
      return {
        title
      };
    }
  } 
</script>