<template>
    <v-layout>
        <v-flex>
            <v-card>
                <v-card-title>
                {{ user != null ? user : 'Indefinido' }}
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
                </v-card-title>
                <v-data-table 
                    :headers="mainHeaders"
                    :items="results"
                    :search="search"
                    :expanded.sync="expanded"
                    show-expand
                    item-key="name"
                    class="elevation-1"
                >
                    <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length">
                            <v-card flat>
                                <v-card-text>
                                    <v-data-table 
                                        :headers="subHeaders"
                                        :items="item.steps"
                                        item-key="color"
                                        hide-default-footer
                                    >
                                        <template slot="items" scope="props">
                                            <td class="text-xs">{{ props.item.text }}</td>
                                        </template>

                                        <template v-slot:item.icon="{ item }">
                                            <v-icon>{{ item.icon  }}</v-icon>
                                        </template>

                                        <template v-slot:item.count="{ item }">
                                            <v-chip color="info" dark>{{ item.count.length }}</v-chip>
                                        </template>
                                    </v-data-table>
                                </v-card-text>
                            </v-card>
                        </td>
                    </template>
                
                <template v-slot:item.start="{ item }">
                    <v-chip color="success" dark>{{ new Date(item.start).toLocaleString() }}</v-chip>
                </template>

                <template v-slot:item.end="{ item }">
                    <v-chip color="red" dark>{{ new Date(item.end).toLocaleString() }}</v-chip>
                </template>

                <template v-slot:item.duration="{ item }">
                    <v-chip color="info" dark>{{ millisToMinutesAndSeconds(item.duration) }}</v-chip>
                </template>

                <template v-slot:item.steps="{ item }">
                    <v-chip color="primary" dark>{{ item.steps.length }}</v-chip>
                </template>

                </v-data-table>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
import axios from 'axios'
export default {
    name: 'ViewJSON',
    data: () => ({
        search: '',
        results: [],
        expanded: [],
        mainHeaders: [
            { text: 'Nivel', value: 'level' },
            { text: 'Pasos', value: 'steps' },
            { text: 'Inicio', value: 'start' },
            { text: 'Final', value: 'end' },
            { text: 'Duracion', value: 'duration' }
        ],
        subHeaders: [
            { text: 'Direccion', value: 'text' },
            { text: 'Icono', value: 'icon' },
            { text: 'Veces', value: 'count' }
        ],
        subItems: [
            { color: 'Red', value: '1' },
            { color: 'Green', value: '2' },
            { color: 'Blue', value: '3' },
            { color: 'Black', value: '4' }
        ],
        user: null
    }),
    mounted(){
        this.getJSON()
        this.user = this.$route.params.name
    },
    methods: {
        getJSON(){
            axios.get('/juego/json', { params: { _id: this.$route.params.id } } )
            .then(result => {
                this.results = result.data
            })
            .catch(e => console.log(e))
        },
        millisToMinutesAndSeconds(millis) {
            var minutes = Math.floor(millis / 60000);
            var seconds = ((millis % 60000) / 1000).toFixed(0);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        }
    }
}
</script>