<template>
   <v-layout>
        <v-flex d-none d-md-flex d-lg-flex lg6 md6>
            <v-img :src="bg" max-height="540"></v-img>
        </v-flex>
        <v-flex xs12 sm12 md6 lg6 xl12>
            <v-card class="mx-auto p-3">
                <v-toolbar dark color="blue darken-3">
                    <v-toolbar-title>
                        {{ $t('iniciar') }}
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-text-field v-model="email" autofocus color="accent" label="Email" required>
                    </v-text-field>
                    <v-text-field v-model="password" type="password" color="accent" label="Password" required>
                    </v-text-field>
                    <v-flex class="red--text" v-if="errorL">
                        {{errorL}}
                    </v-flex>
                </v-card-text>
                <v-card-actions class="px-3 pb-3">
                    <v-flex text-xs-right>
                        <v-btn @click="ingresar()" color="primary">Ingresar</v-btn>
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
            errorL:null,
            bg: require("@/assets/img/bg-image.png")
        }
    },
    methods:{
        ingresar(){
            axios.post('usuario/login',{email: this.email, password: this.password})
            .then(respuesta =>{
                return respuesta.data;
            })
            .then(data =>{
                console.log("logueado")
                this.$store.dispatch("guardarToken",data.tokenReturn);
                this.$router.push({ name: 'home' });
            })
            .catch(error =>{
                console.log(error);
                this.errorL=null;
                if (error.response.status==404){
                    this.errorL='No existe el usuario o las credenciales son incorrectas.';
                } else{
                    this.errorL='Ocurrió un error con el servidor.';
                }
            });
        }
    }
}
</script>

