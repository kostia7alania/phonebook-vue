<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
      
      <toolbar />

        <v-list two-line>
            <v-subheader>today</v-subheader>
          <template v-for="item in items">
            <contact :item="item" :key="item.phone"/>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import toolbar from './components/Toolbar.vue'
import contact from './components/Contact.vue'
import { mapGetters } from 'vuex'

  export default {
    name: 'phone-book',
    components: {toolbar, contact},
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        'items'
      ])
    }
  }
</script>

<style scoped lang="scss">
.contact-row { cursor: pointer; }
</style>
