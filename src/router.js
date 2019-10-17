import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Home from './views/Home.vue'
import Admin from './views/Admin.vue'
import ViewJSON from './views/ViewJSON.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Game from './views/Game.vue'
import Add from './views/Add.vue'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        administrador: true,
        jugador: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        administrador: true,
      }
    },
    {
      path: '/admin/:name/json/:id/',
      name: 'JSON',
      component: ViewJSON,
      meta: {
        administrador: true,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        libre: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        libre: true
      }
    },
    {
      path: '/play/:id/level/:game',
      name: 'play',
      component: Game,
      meta: {
        jugador: true,
        administrador: true
      }
    },
    {
      path: '/add',
      name: 'add',
      component: Add,
      meta: {
        administrador: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        libre: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.libre)){
    next();
  } else if ( store.state.user && store.state.user.rol == 'administrador'){
    if (to.matched.some(record => record.meta.administrador)){
      next();
    }
  } else if ( store.state.user && store.state.user.rol == 'jugador'){
    if (to.matched.some(record => record.meta.jugador)){
      next();
    }
  } else{
    next({name: 'login'});
  }
})

export default router;
