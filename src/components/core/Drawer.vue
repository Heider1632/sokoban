<template>
 <v-navigation-drawer
    id="app-drawer"
    v-model="drawer"
    app
    color="#2d3436"
    dark
    width="60"
    floating
    mobile-break-point="991"
    persistent
  >
    <v-list-item>
      <v-list-item-title color="white">
           <v-icon>language</v-icon>
       </v-list-item-title>

    </v-list-item>

    <v-divider class="mx-3 mb-3" />

    <v-list dense>
      <!-- Bug in Vuetify for first child of v-list not receiving proper border-radius -->

      <v-list-item
        v-for="(item, i) in languages"
        :key="i"
        active-class="primary white--text"
        @click="changeIdoma(item.idioma)"
      >
        <v-list-item-icon>
            <v-img :src="item.icon" />
        </v-list-item-icon>

      </v-list-item>
    </v-list>
  </v-navigation-drawer> 
</template>
<script>
export default {
    name: 'Drawer',
    props: {
        opened: {
            type: Boolean,
            default: false,
        }
    },
    data: () => ({
        drawer: true,
        //data
        languages: [ 
            {
                text: 'español',
                idoma: 'es',
                icon: require('@/assets/flags/icons8-spain-16.png')
            }, 
            {
                text: 'inglés',
                idioma: 'en',
                icon: require('@/assets/flags/icons8-usa-16.png')
            }
        ]
    }),
    methods: {
        changeIdoma(idioma){
            this.$store.commit('SET_IDIOMA', idioma)
        }
    },
    computed: {
        inputValue() {
            return this.$store.state.drawer;
        }
    }
}
</script>