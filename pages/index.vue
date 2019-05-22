<template lang="pug">
  div
    header-bar
    section.container
      div
        logo
        .links
          a(
            href="https://nuxtjs.org/"
            target="_blank"
            class="button--green"
          )
            | Documentation
          a(
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
            class="button--grey"
          )
            | GitHub
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
