<template>
  <div id="app">
    <c-top />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Vuetify from 'vuetify'
// eslint-disable-next-line
import CTop from './components/CTop.vue'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'


Vue.use(Vuetify)

export default Vue.extend({
  name: 'App',
  components: {
    CTop
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
