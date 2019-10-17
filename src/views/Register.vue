<template>
   <v-layout>
        <v-flex d-none d-md-flex d-lg-flex lg6 md6>
            <v-img :src="bg" max-height="540"></v-img>
        </v-flex>
        <v-flex xs12 sm12 md6 lg6 xl12>
            <v-card class="mx-auto">
                <v-toolbar dark color="blue darken-3">
                    <v-toolbar-title>
                        {{ $t('registrate') }}
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-text-field v-model="nombre" autofocus color="accent" label="Nombre" required>
                    </v-text-field>
                    <v-text-field v-model="email" autofocus color="accent" label="Email" required>
                    </v-text-field>
                    <v-text-field v-model="password" type="password" color="accent" label="Password" required>
                    </v-text-field>
                    <v-flex class="red--text" v-if="errorR">
                        {{errorR}}
                    </v-flex>
                </v-card-text>
                <v-card-actions class="px-3 pb-3">
                    <v-flex text-xs-right>
                        <v-btn @click="registrar()" color="primary">Registrate</v-btn>
                    </v-flex>
                </v-card-actions>
            </v-card>
        </v-flex>
   </v-layout>
</template>
<script>
import axios from 'axios';
export default {
    data (){
        return{
            email:'',
            password:'',
            nombre: '',
            errorR:null,
            bg: require("@/assets/img/bg-image.png")
        }
    },
    methods:{
        registrar(){
            axios.post('usuario/add',{email: this.email, password: this.password, nombre: this.nombre})
            .then(respuesta =>{
                return respuesta.data;
            })
            .then(data =>{
                this.$router.push({name: 'login'});
            })
            .catch(error =>{
                //console.log(eror);
                this.errorR=null;
                if (error.response.status==404){
                    this.errorR='No existe el usuario o las credenciales son incorrectas.';
                } else{
                    this.errorR='Ocurrió un error con el servidor.';
                }
            });
        }
    }
}
</script>

