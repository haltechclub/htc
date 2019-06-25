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
                <div style="margin-top: 1rem;">{{ article.description }}</div>
              </div>
            </v-card-title>
            <v-list class="dark-theme" dark dense style="margin-left: 1rem;margin-right: 1rem">
              <v-layout wrap align-center justify-center row fill-height>
                <v-flex lg3 md3 xs12>
                  <v-list-tile @click="onClick">
                    <v-list-tile-action>
                      <v-icon>created</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ article.created_at }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-flex>
                <v-flex lg3 md3 xs12>
                  <v-list-tile @click="onClick">
                    <v-list-tile-action>
                      <v-icon>updated</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ article.updated_at }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-flex>
                <v-flex lg3 md3 xs12>
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
                </v-flex>
                <v-flex lg3 md3 xs12>
                  <v-list-tile @click="onClick">
                    <v-list-tile-action>
                      <v-icon>tag</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ article.tags }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-flex>
              </v-layout>
            </v-list>
            <v-layout ma-2 wrap align-center justify-center row>
              <v-flex lg12 md12 xs12>
                <div style="text-align: center; margin-top: 1rem">
                  <h2>{{ article.description }}</h2>
                </div>
              </v-flex>
              <v-flex lg12 md12 xs12>
                <div style="text-align: center; margin-top: 1rem">
                  <v-chip
                    class="ma-2"
                    color="indigo"
                    text-color="white"
                  >
                    <v-avatar left>
                      <span style="font-size: 8px">
                        <v-icon>far fa-calendar-alt</v-icon>
                      </span>
                    </v-avatar>
                    {{ tagItem[0] }}
                  </v-chip>
                  <v-chip
                    class="ma-2"
                    color="orange"
                    text-color="white"
                  >
                    <v-avatar left>
                      <span style="font-size: 8px">
                        <v-icon>far fas fa-history</v-icon>
                      </span>
                    </v-avatar>
                    {{ tagItem[1] }}
                  </v-chip>
                  <v-chip
                    class="ma-2"
                    color="teal"
                    text-color="white"
                  >
                    <v-avatar left>
                      <span style="font-size: 8px">
                        <v-icon>fas fa-location-arrow</v-icon>
                      </span>
                    </v-avatar>
                    {{ tagItem[2] }}
                  </v-chip>
                </div>
              </v-flex>
              <div id="content"></div>
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
      article: article,
      tagItem: [],
      content: null
    }
  },
  mounted: function () {
    const tag = this.article.bodyHtml
    const doc = new DOMParser().parseFromString(tag, 'text/html')
    const tagItem = doc.getElementsByTagName('h2')[0].nextElementSibling.innerHTML
    const ItemArray = tagItem.split('<br>')
    this.tagItem = ItemArray
    doc.getElementsByTagName('body')[0].removeChild(doc.getElementsByTagName('h2')[0].nextElementSibling)
    doc.getElementsByTagName('body')[0].removeChild(doc.getElementsByTagName('h2')[0])
    this.content = doc.getElementsByTagName('body')[0]
    document.getElementById('content').innerHTML = this.content.innerHTML
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
