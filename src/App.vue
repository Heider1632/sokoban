<template>
  <v-app id="app">
    <core-view />
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
    CoreView: () => import('@/components/core/View'),
  },
};
</script>
<style>
#app{
  font-family: 'Mansalva', cursive;
}

body{
  overflow-y: hidden;
}

#app .v-navigation-drawer__border {
  display: none
}

</style>
