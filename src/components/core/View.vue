<template>
<div>
    <core-app-bar />
    <core-drawer />
    <v-content>
    <v-container fluid>
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-container>
  </v-content>
</div>
</template>
<script>
export default {
    name: 'CoreView',
    components: {
        CoreDrawer: () => import('./Drawer'),
        CoreAppBar: () => import('./AppBar'),
    },
}
</script>