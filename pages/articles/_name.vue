<template>
  <div>
    <header-bar/>
    <v-layout mt-5/>
    <v-content>
      <v-layout justify-center align-center ma-3>
        <v-flex xs12 sm10>
          <v-card>
            <v-img
              :src="article.thumbnail ? article.thumbnail : require('@/assets/contents/default.svg')"
              aspect-ratio="2.75"
            ></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ article.title }}</h3>
                <div> {{ article.description }}</div>
              </div>
            </v-card-title>
            <v-list class="dark-theme" dark dense>
              <v-list-tile @click="onClick">
                <v-list-tile-action>
                  <v-icon>created</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ article.created_at }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile @click="onClick">
                <v-list-tile-action>
                  <v-icon>updated</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ article.updated_at }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <nuxt-link :to="`/categories/${ article.category }`">
                <v-list-tile @click="onClick">
                  <v-list-tile-action>
                    <v-icon>category</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ article.category }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </nuxt-link>
              <v-list-tile @click="onClick">
                <v-list-tile-action>
                  <v-icon>tag</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ article.tags }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-layout ma-2>
              <div id="content" v-html=$md.render(article.bodyContent)></div>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-content>
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

  #content /deep/ {
    font-size: 1.15rem;
    .iframe-container {
      margin: 1rem;
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 75%;

      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
