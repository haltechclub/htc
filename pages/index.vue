<template>
  <div>
    <header-bar />
    <section class="container">
      <div>
        <logo></logo>
        <div class="links">
          <a href="https://nuxtjs.org/" target="_blank" class="button--green">Cannpus</a>
          <a href="https://github.com/Tim0401" target="_blank" class="button--grey">GitHub</a>
        </div>
      </div>
    </section>
    <section class="container">
      <div v-html=$md.render(purpose.bodyContent)></div>
    </section>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import HeaderBar from '~/components/Header.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import 'vuetify/dist/vuetify.min.css'

export default {
  components: {
    Logo,
    HeaderBar
  },
  async asyncData() {
    const purpose = await import(`~/contents/json/purpose.json`)
    const summary = await import(`~/contents/summary.json`)
    return {
      purpose: purpose,
      summary: summary.fileMap
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
