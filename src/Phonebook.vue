<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
      
      <toolbar/>
      <v-card-title class="headline font-weight-regular blue-grey white--text">
        Contacts 
        <v-btn @click="newContact" absolute fab dark right small color="pink">
              <v-icon>add</v-icon>
        </v-btn>
      </v-card-title>
         
          <v-list two-line>
              <v-subheader>today</v-subheader>
            <template v-for="item in FILTERED_ITEMS">
              <contact :item="item" :key="item.guid"/>
            </template>

            <v-alert
                v-if="!FILTERED_ITEMS.length"
                :value="true"
                type="warning"
                outline
              >{{noItems}}
              </v-alert>
          </v-list> 
      </v-card>

      <ContactInfo
        isCreating=1
        v-if="showDialog"
        :item="{}"
        :show="showDialog"
        :isEditing="true"
        @close="closeModal"
        @cancel="closeModal"
        @save="saveClick"
      />
                  
    </v-flex>
  </v-layout>
</template>

<script>
import toolbar from './components/Toolbar.vue'
import contact from './components/Contact.vue'
import { mapGetters, mapMutations } from 'vuex'
import ContactInfo from './components/Contact-info.vue';

  export default {
    name: 'phone-book',
    components: {toolbar, contact, ContactInfo},
    data() {
      return {
        showDialog: false
      }
    },
    computed: {
      ...mapGetters([
        'FILTERED_ITEMS', 'FILTER_ITEMS_BY_NAME', 'IS_SEARCH_MODE'
      ]),
      noItems() {
        return this.IS_SEARCH_MODE&&this.FILTER_ITEMS_BY_NAME && `No contacts found for query "${this.FILTER_ITEMS_BY_NAME}"` || 'Contact list is empty'
      }
    },
    methods: {
      ...mapMutations([
        'NEW_ITEM'
      ]),
      newContact() {
        this.showDialog=true 
        console.log('newContact')
      },
      saveClick(newItem) {
        this.showDialog=false
        this.NEW_ITEM(newItem)
        console.log('saveClick')
      },
      closeModal() {
        this.showDialog=false
        console.log('closeModal')
      }
    }
  }
</script>

