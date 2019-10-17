<template>
  <v-layout>
    <v-flex >
       <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="users"
          :search="search"
          sort-by="Nombre"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Usuarios</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <div class="flex-grow-1"></div>
              <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-select
                            :items="items"
                            v-model="editedItem.rol"
                            filled
                            label="Rol"
                            dense
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              edit
            </v-icon>

            <v-icon
              small
              class="mr-2"
              @click="go(item._id, item.nombre)"
            >
              code
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary">Reset</v-btn>
          </template>
        </v-data-table>
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
  name: 'admin',
  data: () => ({
    users: [],
    items: ["administrador", "jugador"],
    loading: false,
    selection: 1,
    search: '',
    dialog: false,
    headers: [
      {
        text: 'Nombre',
        align: 'left',
        filterable: false,
        value: 'nombre',
      },
      { text: 'Email', value: 'email' },
      { text: 'Rol', value: 'rol' },
      { text: 'Estado', value: 'estado' },
      { text: 'Actions', value: 'action', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      role: ''
    }
  }),
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
  },
  mounted(){
    let header={"Token" : this.$store.state.token};
    let configuracion= {headers : header};
    axios.get('usuario/list', configuracion)
    .then(users => {
      this.users = users.data
    })
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      if (this.editedIndex > -1) {
        let header={"Token" : this.$store.state.token};
        let configuracion= {headers : header};
        axios.post('usuario/update', this.editedItem, configuracion)
        .then(result => {
          console.log(result)
        }) 
        .catch(e => console.log(e));
      }
      this.close()
    },
    go(id, name){
      this.$router.push(`/admin/${name}/json/${id}/`)
    }
  },
};
</script>
