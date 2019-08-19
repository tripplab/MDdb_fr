<template>
  <v-app id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </v-app>
</template>

<script>
const defaultLayout = 'dashboard'
export default {
  computed: {
    layout () {
      return (this.$route.meta.layout || defaultLayout) + '-layout'
    }
  },
  created () {
  },
  updated () {
  }
}
</script>

<style lang="scss">
@import 'scss/main';
#app {
  font-family: 'Poppins', sans-serif;
}

.section {
  min-height: 80vh;
}
</style>
