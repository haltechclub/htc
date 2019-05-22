<template lang="pug">
  div
    v-navigation-drawer(v-model="drawer" app fixed disable-resize-watcher dark)
      v-list(dense)
        img.logo(:src="require('@/assets/htc-dark.svg')" height="56rem")
        v-list-tile(@click="")
          v-list-tile-action
            v-icon dashboard
          v-list-tile-content
            v-list-tile-title TOP
        v-subheader category
    v-toolbar(dark)
      v-toolbar-side-icon(@click.stop="drawer = !drawer")
        v-icon code
      v-toolbar-title.headline
        img(:src="require('@/assets/htc-dark.svg')" height="56rem")
      v-spacer
      v-toolbar-items
        v-btn(flat)
          v-icon fab fa-github
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
  data: () => ({
    drawer: null
  })
}
</script>
