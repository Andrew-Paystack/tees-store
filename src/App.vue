<template>
  <div id="app">
    <Layout />
    <Magazine />
  </div>
</template>

<script>
import Layout from './components/Layout.vue'
import Magazine from './components/Magazine.vue'
export default {
  name: 'App',
  components: {
    Layout,
    Magazine
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
