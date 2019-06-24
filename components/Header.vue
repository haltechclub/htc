<template>
  <div class="dark-theme">
    <v-navigation-drawer
      v-model="drawer"
      app
      fixed
      dark
      hide-overlay>
      <v-list dense>
        <img class="logo" :src="require('@/assets/htc-dark.svg')" height="56rem"/>
        <nuxt-link to="/">
          <v-list-tile @click="onClick">
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>TOP</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </nuxt-link>
        <v-subheader>category</v-subheader>
        <div v-for="category in categories" :key="category">
          <nuxt-link :to="`/categories/${ category }`">
            <v-list-tile @click="onClick">
              <v-list-tile-action>
                <v-icon>dashboard</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ category }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </nuxt-link>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark dense fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer">
        <v-icon>code</v-icon>
      </v-toolbar-side-icon>
      <nuxt-link to="/">
        <v-toolbar-title class="headline">
          <img :src="require('@/assets/htc-dark.svg')" height="56rem"/>
        </v-toolbar-title>
      </nuxt-link>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat="flat" href="https://github.com/orgs/haltechclub" target="_blank">
          <v-icon>fab fa-github</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<style>
  .logo {
    margin: 1rem auto;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

</style>

<script>
export default {
  data() {
    const summary = require(`~/contents/summary.json`).fileMap
    let categories = Object.keys(summary).map(key => summary[key].category)
    categories = Array.from(new Set(categories))
    categories.sort()
    return {
      drawer: null,
      categories: categories
    }
  },
  methods: {
    onClick: function () {
    }
  }
}
</script>
