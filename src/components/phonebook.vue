<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
      
      <toolbar />

        <v-list two-line>
            <v-subheader>
              today
            </v-subheader>

          <template v-for="(item, index) in items">
          
            <v-hover :key="index+'h'">

              <v-card 
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 12 : 2}`"
                class="mx-auto contact-row" 
              >
            <v-divider :key="index"  :inset="true"  />
            <v-list-tile
              :key="item.name"
              avatar
            >

                <v-list-tile-avatar>
                  <img src="https://via.placeholder.com/150">
                </v-list-tile-avatar>


                <v-list-tile-content>
                  <v-list-tile-title v-html="item.name"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="item.phone"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              
              </v-card>
            </v-hover>

          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import toolbar from './Toolbar.vue';
  export default {
    components: {toolbar},
    data() {
      return {
        items:[
          {
            guid: Math.floor(Math.random()*100000000000),
            phone: "+79680608071",
            name: 'Kostia',
          },
          {
            guid: Math.floor(Math.random()*100000000000),
            phone: "+79680608022",
            name: 'Kosti222',
          }
        ]

      }
    },
    computed: {
      itemsComputed() {

      }
    }
  }
</script>

<style scoped lang="scss">
.contact-row {
  cursor: pointer;
}
</style>
