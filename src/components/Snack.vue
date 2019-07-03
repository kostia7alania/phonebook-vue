<template>
    <v-snackbar
      v-model="isShowing"
      :timeout="timeout"
      absolute
      top
      center
    > 
    {{SNACK_MSG}}
    </v-snackbar>
</template>

<script> 
import { mapGetters, mapMutations } from 'vuex';
  export default {
    name: 'snack',  
    data() {
      return {
        timeout: 4000,
        forceHide: false,

      }
    }, 
    methods: {
      ...mapMutations([
        'SET_SNACK_MSG'
      ]),
    },
    watch: {
      SNACK_MSG(neww) {
        if(neww) {
          this.forceHide = true
          this.$nextTick(()=>this.forceHide = false)
        }
      }
    },
    computed: {
      ...mapGetters([
        'SNACK_MSG'
      ]),
      isShowing: {
        get() {
          return this.SNACK_MSG && !this.forceHide
        }, 
        set(e) {
          !e && this.SET_SNACK_MSG(false)
        }
      }
    }
  }

</script>
 
