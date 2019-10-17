import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import decode from 'jwt-decode'
import router from './router'
import i18n from '@/main'
import { set, toggle } from '@/utils/vuex';
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    drawer: true,
    color: 'success',
    idioma: 'es',
    user: {},
    default: {
      player : {x:1,y:1},
      blocks : [{x:3,y:3},{x:3,y:4}],
      goals  : [{x:5,y:4},{x:5,y:5}],
      walls  : [{x:7,y:1},{x:7,y:2},{x:7,y:3},{x:6,y:3},{x:6,y:4},{x:2,y:6},{x:3,y:6},{x:5,y:2},{x:6,y:2}]
    },
    token: null,
    progress: [],
  },
  getters: {
    GET_LEVEL: (state) => state.level,
    GET_USER: (state) => state.user,
  },
  mutations: {
    SET_LEVELS: (state, progress) => state.progress = progress,
    SET_FILTERED_LEVEL: (state, filter) => state.progress = state.progress.filter(progress => progress.Juego.nombre.toLowerCase().includes(filter.toLowerCase()) ),
    SET_USER: (state, user) => state.user = user.user,
    SET_TOKEN: (state,token) => state.token = token,
    UNSET_USER: (state) => state.user = null,
    UNSET_TOKEN: (state) => state.token = null,
    SET_IDIOMA: (state, idioma) => { state.idioma = idioma, i18n.locale = idioma },
    toggleDrawer: toggle('drawer'),
  },
  actions: {
    guardarToken({commit}, token){
      commit("SET_TOKEN", token)
      commit("SET_USER", decode(token))
      localStorage.setItem("token", token)
    },
    autoLogin({commit}){
      let token = localStorage.getItem("token");
      if(token) {
        commit("SET_TOKEN", token);
        commit("SET_USER", decode(token));
      }
      router.push({name: 'home'});
    },
    salir({commit}){
      commit("UNSET_TOKEN");
      commit("UNSET_USER");
      localStorage.removeItem("token");
      router.push({name: 'login'});
    }
  }
})
