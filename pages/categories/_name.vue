<template>
  <div>
    <header-bar />
    <div v-for="(article, index) in articles" :key="index">
      <v-layout mt-3 mb-3>
        <v-flex xs12 sm10 offset-sm1>
          <v-card>
            <v-img
              :src="require('@/assets/contents/' + article.thumbnail)"
              aspect-ratio="2.75"
            ></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ article.title }}</h3>
                <div> {{ article.description }} </div>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn flat color="orange">Share</v-btn>
              <nuxt-link :to="`/articles/${ article.path }`">
                <v-btn flat color="orange">Explore</v-btn>
              </nuxt-link>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
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
          summary[key].thumbnail = 'default.svg'
        }
        articles.push(summary[key])
      }
    })
    return {
      articles: articles
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
