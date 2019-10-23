<template>
  <v-layout>
    <v-flex >
      <v-card>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex
              xs12
              md6
              lg3
              v-for="(progress, key) in levels"
              :key="key"
            >
              <v-card flat tile :disabled="!progress.status">
                <v-img
                  height="250"
                  :src="img"
                ></v-img>

                <v-card-title>Nivel {{ progress.Juego.nombre }}</v-card-title>

                <v-card-text>
                  <div class="my-4 subtitle-1 red--text" v-if="!progress.completed">
                    Incompleto
                  </div>
                  <div v-else class="my-4 subtitle-1 info--text">
                    Completo
                  </div>
                </v-card-text>

                <v-card-actions>
                  <template v-if="esJugador || esAdministrador">
                  <v-btn
                    color="deep-purple accent-4"
                    text
                    @click="play(progress._id, progress.Juego.nombre)"
                    class="mx-auto"
                    block
                  >
                  <v-icon>play_circle_filled</v-icon>
                  </v-btn>
                  </template>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
        </v-card>
    </v-flex>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-layout>
</template>

<script>
import axios from 'axios'
export default {
  name: 'home',
  data: () => ({
    loading: false,
    selection: 1,
    img: require("@/assets/img/banner.png"),
    index: undefined,
    id: undefined
  }),
  methods: {
    play(id, route){
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.$router.push(`play/${id}/level/${route}`)
        }, 3000)  
    },
    go(path){
      this.$router.push(`${path}`)
    }
  },
  mounted(){
    let header={"Token" : this.$store.state.token};
    let configuracion= {headers : header};

    this.getLevels(configuracion)
    this.findIndex(this.levels)
    this.id = this.levels[parseInt(this.index)-1]._id
    this.updateProgress(configuracion)
    this.getLevels(configuracion)
  },
  methods: {
    getLevels(configuracion){
      axios.get('/progreso/list',  { params: {
        valor: this.$store.state.user._id
      } }, configuracion).then(levels => {
        this.$store.commit("SET_LEVELS", levels.data)
      })
    },
    updateProgress(configuracion){
      axios.post('/progreso/status', { _id: this.id } ,configuracion)
      .then(response => {
        console.log(response)
      })
    },
    findIndex(array){
      this.index = array.findIndex(function(level) {
        if(level.status === true && level.completed === true){
          return level
        }
      });
    }
  },
  computed: {
    levels(){
      return this.$store.state.progress
    },
    esAdministrador(){
      return this.$store.state.user && this.$store.state.user.rol == 'administrador';
    },
    esJugador(){
      return this.$store.state.user && this.$store.state.user.rol == 'jugador';
    }
  }
};
</script>
