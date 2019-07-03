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
          <v-slide-x-reverse-transition
            mode="out-in"
          > 
          </v-slide-x-reverse-transition>
        </template>
      </v-autocomplete>
 
</template>


<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

  export default {
    data () {
      return { 
        selected: null,
      }
    }, 
    watch: {
      selected(neww) {
        this.SET_FILTER_BY_NAME(neww)
      },
      items(newItems) {
        if(!newItems.filter(item => item.name == this.FILTER_ITEMS_BY_NAME).length) {
          this.selected = null
        }
      }
    },
    computed: {
      ...mapGetters([
        'items', 'FILTER_ITEMS_BY_NAME'
      ])
    },
    methods: {
      ...mapMutations([
        'SET_FILTER_BY_NAME'
      ])
    }
  }
</script>
