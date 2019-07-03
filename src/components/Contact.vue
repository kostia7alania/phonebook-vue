<template>
  <v-hover :key="item.phone+'n'">

    <v-card @click="showDialog=true"
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
      class="mx-auto contact-row" 
    >
    <v-divider :key="item.phone"  :inset="true"  />
  
  <v-layout align-center> 
    <v-flex xs11>
      <v-list-tile
        :key="item.name"
        avatar
      >
        <v-list-tile-avatar>
          <img :src="userPicture">
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title v-html="item.name"></v-list-tile-title>
          <v-list-tile-sub-title v-html="item.phone"></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile> 

      </v-flex xs1>
      <v-flex>
      <actionBtns :item="item" @edit="editClick" @delete="deleteClick"/>
      </v-flex>
    </v-layout>

    <ContactInfo
      :item="item"
      :show="showDialog"
      :isEditing="isEditing"
      @edit="editClick"
      @delete="deleteClick"
      @close="closeModal"
      @save="saveClick"
      @cancel="cancelClick"
    />

    </v-card>
  </v-hover>
</template>

<script>
  import actionBtns from './ActionBtns';
  import ContactInfo from './Contact-info';
  import { mapMutations } from 'vuex';
  const { getGuid } = require('@/common/functions');
 
  export default {
    name: 'contact',
    props: ['item'],
    components: { actionBtns, ContactInfo},
    data() {
      return {
        showDialog: false,
        isEditing: false
      }
    },
    computed: {
      userPicture(){
        return 'https://i.pravatar.cc/100?'+getGuid()
      },
    },
    methods: {
      ...mapMutations([
        'SET_ITEM',
        'DELETE_ITEM',
        'SET_SNACK_MSG'
      ]),
      editClick(){
        console.log('editClick=>',this.item.guid)
        this.isEditing = true
        this.showDialog = true
      },
      deleteClick() {
        this.DELETE_ITEM(this.item.guid)
        this.SET_SNACK_MSG('Contact has been deleted')
      },
      closeModal(){
        this.showDialog = false
        this.isEditing = false
      },
      saveClick(newItem) {
        console.warn('save')
        this.SET_ITEM(newItem)
        this.isEditing = false
        this.SET_SNACK_MSG('Contact has been updated')
      },
      cancelClick() {
        this.isEditing = false
      }
    }
  }

</script>

<style scoped lang="scss">
  .contact-row { cursor: pointer; }
</style>
