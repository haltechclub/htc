<template>
  <div>
    <header-bar />
    <v-content>
      <v-container>
        <v-layout justify-center align-center>
          <div>
            <logo></logo>
            <div class="links">
              <a href="https://haltechclub.connpass.com/" target="_blank" class="button--green">connpass</a>
              <a href="https://github.com/orgs/haltechclub" target="_blank" class="button--grey">GitHub</a>
            </div>
          </div>
        </v-layout>
      </v-container>
      <v-container>
        <v-layout justify-center align-center>
          <div id="purpose" v-html="$md.render(purpose.bodyContent)"></div>
        </v-layout>
      </v-container>
      <v-container>
        <v-layout justify-center align-center>
          <div id="next" v-html="$md.render(next.bodyContent)"></div>
        </v-layout>
      </v-container>
    </v-content>
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
    const next = await import(`~/contents/json/next.json`)
    const summary = await import(`~/contents/summary.json`)
    return {
      purpose: purpose,
      next: next,
      summary: summary.fileMap
    }
  }
}
</script>

<style scoped lang="scss">
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
  #purpose,#next /deep/ {
    h2{
      font-size: 2rem;
      margin: 1rem;
    }

    font-size: 22px;
  }
</style>
