<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card> 
      <toolbar @showMenu="showMenu"/>
      <v-card-title class="headline font-weight-regular blue-grey white--text">
      
            <v-badge color="">
              <template v-slot:badge>
                <span> {{count}}</span>
              </template>
                 Contacts
            </v-badge>
        <v-btn @click="newContact" absolute dark right small color="pink">
          <v-icon>add</v-icon>
        </v-btn>
      </v-card-title>
         
          <v-list two-line>
            <template v-for="(item,i) in FILTERED_ITEMS">

              <v-subheader
                v-if="showSubheader(i,item)"
                :key="item.guid+2">
                {{ item.name&&item.name[0] | subheaderFilter}}
              </v-subheader>
              <contact
                :item="item"
                :key="item.guid"
              />
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
    
    <navigation 
      :show="isNaviShow"
      @setNaviShow="setNaviShow($event)"
      @showImport="showImport"
    />
    
    <Import v-if="isImportShow" :show="isImportShow" @hide="hideImport"/>

  </v-layout>
</template>

<script>
import toolbar from './components/Toolbar.vue'
import contact from './components/Contact.vue'
import { mapGetters, mapMutations } from 'vuex'
import ContactInfo from './components/Contact-info.vue';
import navigation from './components/Navigation.vue';
import Import from './components/Import'

  export default {
    name: 'phone-book',
    components: {toolbar, contact, ContactInfo, navigation, Import},
    data() {
      return {
        showDialog: false,
        isNaviShow: null,
        isImportShow:null,
      }
    },
    computed: {
      ...mapGetters([
        'FILTERED_ITEMS', 'FILTER_ITEMS_BY_NAME', 'IS_SEARCH_MODE'
      ]),
      count(){
        return this.FILTERED_ITEMS && this.FILTERED_ITEMS.length
      },
      noItems() {
        return this.IS_SEARCH_MODE&&this.FILTER_ITEMS_BY_NAME && `No contacts found for query "${this.FILTER_ITEMS_BY_NAME}"` || 'Contact list is empty'
      }
    },
    methods: {
      ...mapMutations([
        'NEW_ITEM'
      ]),
      showSubheader(i,item) {
        if(!i) return true
        const prevName = this.FILTERED_ITEMS[i-1].name && this.FILTERED_ITEMS[i-1].name[0]
        const nextName = item.name&&item.name[0]
        return (""+prevName).toUpperCase() != (""+nextName).toUpperCase()
      },
      showMenu(){
        this.isNaviShow = !this.isNaviShow
      },
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
      },
      setNaviShow(state) {
        this.isNaviShow = state
      },
      showImport(){
        this.isImportShow = true
      },
      hideImport(){
        this.isImportShow = false
      }
    },
    filters: {
      subheaderFilter(e) {
        return typeof e == 'string' && e.toUpperCase() || ''
      }
    }
  }
</script>

<style lang="scss">
  .v-card.v-sheet.theme--light {
    max-height: 96vh;
  }
</style>