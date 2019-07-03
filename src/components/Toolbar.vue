<template>
        <v-toolbar color="cyan" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title v-if="!IS_SEARCH_MODE">Phonebook</v-toolbar-title>
          <v-spacer></v-spacer>

          <search-list v-if="IS_SEARCH_MODE"/>

          <v-btn @click="searchClick" icon>
            <v-icon>{{IS_SEARCH_MODE?'close':'search'}}</v-icon>
          </v-btn>

        </v-toolbar>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex';
import SearchList from './SearchList.vue';

  export default {
    components: {
      SearchList
    },
    data () {
      return { }
    },
    computed: {
      ...mapGetters([
        'IS_SEARCH_MODE'
      ])
    },
    methods: {
      ...mapMutations([
        'SET_IS_SEARCH_MODE',  
      ]),
      searchClick() {
         this.SET_IS_SEARCH_MODE(!this.IS_SEARCH_MODE)
      }
    }
  }
</script>