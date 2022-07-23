<template>
  <v-app>
    <v-main>
      <CTop />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import CTop from './components/CTop.vue';

export default Vue.extend({
  name: 'App',

  components: {
    CTop,
  },

  data: () => ({
    //
  }),
});
</script>
