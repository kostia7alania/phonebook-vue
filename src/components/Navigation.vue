<template>
    <v-navigation-drawer
      v-model="isShow"
      :mini-variant="mini"
      absolute
      dark
      temporary
    >
      <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{username}}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider light></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          @click="naviClick(item.title)"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: ['show'],
  data() {
    return { 
        items: [
          { title: 'Phonebook', icon: 'contact_phone' },
          { title: 'Export', icon: 'cloud_upload' },
          { title: 'Import', icon: 'cloud_download' },
          { title: 'Export to CSV', icon: 'description' },
          { title: 'Feedback', icon: 'question_answer' }
        ],
        mini: false,
        right: null,
        username: 'Konstantin Bazrov'
    }
  },
  computed: {
    isShow: {
      get() {
        return this.show
      },
      set(e){
        this.$emit('setNaviShow', e)
      }
    }
  },
  methods: {
    ...mapActions([
      'SAVE_CONTACTS', 'SAVE_CONTACTS_CSV'
    ]),
    naviClick(title) { 
      if(title=='Phonebook') {
        console.log('Phonebook')
      }
      
      if(title=='Export') {
        this.SAVE_CONTACTS();
      }

      if(title=='Import') { 
        this.$emit('showImport')
      }

      if(title=='Export to CSV') { 
        this.SAVE_CONTACTS_CSV();
      }
      
      if(title=='Feedback') {
        console.log('Feedback')
      }
      
      this.$emit('setNaviShow', false)
    }
  }
}
</script>