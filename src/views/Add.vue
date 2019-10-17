<template>
  <v-layout>
    <v-flex xs6 sm6 md6 lg6 x6>
      <v-card
        class="mx-auto"
        max-width="600"
        tile
      >
      <v-card-text>
        <div>Acciones</div>
        <v-text-field v-model="nombre" label="Nombre de Nivel"></v-text-field>
        <v-card-actions>
          <v-select
            v-model="element"
            :items="items"
            label="Elemento"
            outlined
          ></v-select>
        </v-card-actions>
        <v-text-field v-model="x" label="Y"></v-text-field>
        <v-text-field v-model="y" label="X"></v-text-field>
        <v-card-actions>
        <v-btn 
          color="primary"
          class="mx-auto"
          @click="addToTable"
        >
          <v-icon>add</v-icon>
        </v-btn>
        <v-btn 
          color="success full-width"
          class="mx-auto"
          @click="send"
        >
          <v-icon>send</v-icon>
        </v-btn>
        </v-card-actions>
      </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs8 sm8 md8 lg8 xl8>
      <div class="game"></div>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from 'axios';
export default {
    name: 'Add',
    data: () => ({
      play: false,
      items: [ "player", "blocks", "walls", "goals"],
      element: '',
      nombre: '',
      level: {
        player: {},
        blocks: [],
        goals : [],
        walls : []
      },
      x: 0,
      y: 0,
      imgPlayer: require("@/assets/img/player-retro.png"),
      imgGoal: require("@/assets/img/goals.png"),
      imgObstacule: require("@/assets/img/obstacule.jpg")
    }),
    mounted(){
      this.Sokoban(8,8);
    },
    methods: {
      update(){
          for(var i=0,l=this.level.walls.length;i<l;i++)
          this.draw(this.level.walls[i], "rgb(184, 184, 184)", this.imgObstacule);

          for(var i=0,l=this.level.blocks.length;i<l;i++)
          this.draw(this.level.blocks[i], "rgb(181, 184, 255)");

          for(var i=0,l=this.level.goals.length;i<l;i++)
          this.draw(this.level.goals[i], "rgb(255, 235, 0)", this.imgGoal);

          this.draw(this.level.player, "rgb(130, 212, 130)", this.imgPlayer);
      },
      draw(pos, color, img){
          var $row = $($(".f")[pos.y]), $cell = $($(".cell", $row)[pos.x]);              
          if(img !== undefined) {
            $cell.css("background", `url(${img})`);
            $cell.css("background-size", "60px 60px")
          } else {
            $cell.css("background", color);
          }
      },
      Sokoban(width,heigth){
        let $this = this;

        var init = function(){
            for(var i=0;i<width;i++){
            $(".game").append(`<div class='f'>${i}</div>`);
            var $row = $($(".game .f")[$(".game .f").length-1]);
            for(var j=0;j<heigth;j++){
                $row.append(`<div class='cell'>${j}</div>`);
                if(i==0 || i==width-1 || j==0 || j==heigth-1){
                    $this.level.walls.push({x:i,y:j});
                }    
            }
        }

        $this.update();
        return false;
        }
        return init();
      },
      addToTable(){
        let $this = this;
        if($this.element !== 'player'){
          
          $this.level[$this.element].push({x: parseInt($this.x), y: parseInt($this.y)})
        }else{
          $this.level[$this.element].x = parseInt($this.x);
          $this.level[$this.element].y = parseInt($this.y);
        }

        $this.update()
      },
      send(){
        let $this = this;
        let header={"Token" : this.$store.state.token};
        let configuracion= {headers : header};
        axios.post('/juego/add', { player: this.level.player, blocks: this.level.blocks, walls: this.level.walls, goals: this.level.goals, nombre: this.nombre }, configuracion)
        .then(response => {
          $this.$router.go({ path: '/' })
        })
        .catch(e => console.log(e))
      }
    }
}
</script>