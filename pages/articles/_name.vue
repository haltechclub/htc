<template>
  <div>
    <header-bar />
    <section class="container">
      <div id="content" v-html=$md.render(article.bodyContent)></div>
    </section>
  </div>
</template>

<script>
import HeaderBar from '~/components/Header.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import 'vuetify/dist/vuetify.min.css'

export default {
  components: {
    HeaderBar
  },
  async asyncData({ params }) {
    const article = await import(`~/contents/json/${params.name}.json`)
    return {
      article: article
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.links {
  padding-top: 15px;
}
</style>
