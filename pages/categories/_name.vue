<template>
  <div>
    <header-bar />
    <v-layout mt-5 />
    <v-content>
      <v-layout
        v-for="(article, index) in articles"
        :key="index"
        justify-center
        align-center
        mt-3
        mb-3>
        <v-flex xs12 sm10 md8>
          <v-card>
            <v-img
              :src="article.thumbnail"
              aspect-ratio="2.75"
            ></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ article.title }}</h3>
                <div style="margin-top: 1rem;">{{ article.description }}</div>
              </div>
            </v-card-title>

            <v-list class="dark-theme" dense dark style="margin-left: 1rem;margin-right: 1rem">
              <v-layout wrap align-center justify-center row fill-height>
                <v-flex xs12 md3 lg3>
                  <v-list-tile @click="onClick">
                    <v-list-tile-action>
                      <v-icon>updated</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ article.updated_at }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-flex>
                <v-flex xs12 md3 lg3>
                  <nuxt-link :to="`/categories/${ article.category }`">
                    <v-list-tile  @click="onClick">
                      <v-list-tile-action>
                        <v-icon>category</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>{{ article.category }}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </nuxt-link>
                </v-flex>
                <v-flex xs12 md3 lg3>
                  <v-list-tile  @click="onClick">
                    <v-list-tile-action>
                      <v-icon>tag</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ article.tags }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-flex>
              </v-layout></v-list>

            <v-card-actions style="margin-top: 1rem;">
              <v-btn flat color="orange">Share</v-btn>
              <nuxt-link :to="`/articles/${ article.path }`">
                <v-btn flat color="orange">Explore</v-btn>
              </nuxt-link>
            </v-card-actions>
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
import splitExt from '../../modules/splitExt'

export default {
  components: {
    HeaderBar
  },
  async asyncData({ params }) {
    let summary = await import(`~/contents/summary.json`)
    summary = summary.fileMap
    const articles = []
    Object.keys(summary).forEach((key) => {
      if (summary[key].category === params.name) {
        summary[key].path = splitExt(summary[key].base)[0]
        if (!summary[key].thumbnail) {
          summary[key].thumbnail = require('@/assets/contents/default.svg')
        }
        articles.push(summary[key])
      }
    })
    articles.sort(function (a, b) {
      return (a.updated_at > b.updated_at) ? -1 : 1
    })
    return {
      articles: articles
    }
  },
  methods: {
    onClick: function () {
      // eslint-disable-next-line no-console
      console.log('clickevent')
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
