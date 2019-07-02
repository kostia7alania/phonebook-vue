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
          <img src="https://via.placeholder.com/150">
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
      :editMode="editMode"
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
  export default {
    name: 'contact',
    props: ['item'],
    components: { actionBtns, ContactInfo},
    data() {
      return {
        showDialog: false,
        editMode: false,
      }
    }, 
    methods: {
      ...mapMutations([
        'SET_ITEM',
        'DELETE_ITEM'
      ]),
      editClick(){
        console.log('editClick=>',this.item.guid)
        this.editMode = true
        this.showDialog = true
      },
      deleteClick() {
        this.DELETE_ITEM(this.item.guid)
      },
      closeModal(){
        this.showDialog = false
        this.editMode = false
      },
      saveClick(e) {
        console.warn('save')
        this.SET_ITEM(this.item)
        this.editMode = false
      },
      cancelClick() {
        this.editMode = false
      }
    }
  }

</script>

<style scoped lang="scss">
  .contact-row { cursor: pointer; }
</style>
