<template>
    <v-app-bar
      app
      fixed
      color="white"
    >
      <h1 class="ml-3 mr-5 primary--text">Sokoban</h1>
      <template v-if="logueado && this.$route.name === 'home'">
      <v-text-field
        v-model="search"
        solo-inverted
        flat
        hide-details
        label="Search"
        prepend-inner-icon="search"
      ></v-text-field>
      </template>
      <div class="flex-grow-1"></div>

      <v-tab v-if="logueado && this.$route.name !== 'home'"  @click="go('/')">
        <span> {{ $t('inicio') }} </span>
        <v-btn icon>
          <v-icon>home</v-icon>
        </v-btn>
      </v-tab>

      <v-tab v-if="logueado && esAdministrador" @click="go('/admin')">
        <span> {{ $t('usuarios') }} </span>
        <v-btn  icon>
          <v-icon>supervised_user_circle</v-icon>
        </v-btn>
      </v-tab>

      <v-tab v-if="!logueado" @click="go('/register')">
        <span> {{ $t('registrate') }} </span>
        <v-btn icon>
          <v-icon>account_box</v-icon>
        </v-btn>
      </v-tab>

      <v-tab v-if="!logueado && this.$route.name != 'login'" @click="go('/login')">
        <span> {{ $t('inicar') }} </span>
        <v-btn icon>
          <v-icon>label</v-icon>
        </v-btn>
      </v-tab>

      <v-tab v-if="esAdministrador"  @click="go('/add')">
        <span> {{ $t('añadir') }} </span>
        <v-btn icon>
          <v-icon>add</v-icon>
        </v-btn>
      </v-tab>

      <v-tab v-if="logueado" @click="salir()">
        <span> {{ $t('salir') }} </span>
        <v-btn icon>
          <v-icon>logout</v-icon>
        </v-btn>
      </v-tab>

       <v-tab @click="go('/about')">
        <span> {{ $t('sobre') }} </span>
        <v-btn icon>
          <v-icon>contact_support</v-icon>
        </v-btn>
      </v-tab>
    </v-app-bar>
</template>
<script>
import axios from 'axios';
export default {
  props: {
      source: String,
  },
  name: 'AppBar',
  data: () => ({
    search: '',
  }),
  computed: {
    logueado(){
      return this.$store.state.user;
    },
    esAdministrador(){
      return this.$store.state.user && this.$store.state.user.rol == 'administrador';
    },
    esJugador(){
      return this.$store.state.user && this.$store.state.user.rol == 'jugador';
    },
  },
  watch: {
    search (filter) {
      if(filter != ''){
        this.$store.commit("SET_FILTERED_LEVEL", filter)
      } else {
        this.$store.commit("SET_LEVELS", this.levels)
      }
    }
  },
  created(){
    this.$store.dispatch("autoLogin");
  },
  methods: {
    go(path){
      this.$router.push(`${path}`)
    },
    salir(){
      this.$store.dispatch("salir");
    }
  }
};
</script>