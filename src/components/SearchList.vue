<template>
  <v-autocomplete
    :items="items"
    v-model="selected"
    item-text="name"
    item-value="name"
    autofocus
    clearable
    solo
    dark
    hint="type..."
    label="I'm looking for..."
    persistent-hint 
  >
  <template v-slot:append-outer>
    <v-slide-x-reverse-transition mode="out-in"></v-slide-x-reverse-transition>
  </template>
  </v-autocomplete>
</template>


<script>
import { mapGetters, mapMutations } from 'vuex'
  export default {
    data () {
      return { 
        selected: null,
      }
    }, 
    watch: {
      COUNT_FILTERED_ITEMS(count) {
        if(count == 0) {
          this.SET_FILTER_BY_NAME(null)
          this.SET_IS_SEARCH_MODE(false)

        }
      },
      selected(neww) {
        this.SET_FILTER_BY_NAME(neww)
      },
      items(newItems) {
        if(!this.FILTER_ITEMS_BY_NAME) return;
        if(!newItems.filter(item => item.name == this.FILTER_ITEMS_BY_NAME).length) {
          this.selected = null
          this.SET_IS_SEARCH_MODE(false)
        }
      }
    },
    beforeDestroy(){
      this.SET_FILTER_BY_NAME(null)
      this.SET_IS_SEARCH_MODE(false)
    },
    computed: {
      ...mapGetters([
        'items', 'FILTER_ITEMS_BY_NAME', 'COUNT_FILTERED_ITEMS'
      ])
    },
    methods: {
      ...mapMutations([
        'SET_FILTER_BY_NAME', 'SET_IS_SEARCH_MODE'
      ])
    }
  }
</script>
