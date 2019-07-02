<template> 
    <v-dialog
      v-model="showComp"
      width="500"
    > 
      <v-layout row>
        <v-flex xs12 >
          <v-card>
            <v-img
              :src="randomImage"
              height="100px"
            >
            </v-img>

            <v-card-title primary-title>
              <div>
                <div class="headline">Contact info</div>
                <span class="grey--text" v-if="itemCreatedDate">Created: {{itemCreatedDate}}</span>
               <br><span class="grey--text" v-if="itemUpdatedDate">Updated: {{itemUpdatedDate}}</span>
              </div>
            </v-card-title>
 
            <v-card-text class="pt-0">
              <v-text-field
                :disabled="!editMode"
                v-model="itemBuffer.name"
                label="Name"
                prepend-icon="person"
             />
              <v-text-field
                :disabled="!editMode"
                v-model="itemBuffer.phone"
                label="Phone"
                prepend-icon="phone"
             />
            </v-card-text>
  
            <v-divider></v-divider>
    
            <v-card-actions>

              <v-btn v-if="!editMode" flat @click="$emit('edit')">Edit</v-btn>
              <v-btn v-if="!editMode" flat @click="$emit('delete')" color="purple">Delete</v-btn>
            
              <v-btn v-if="editMode" flat @click="saveClick">Save</v-btn>
              <v-btn v-if="editMode" flat @click="cancelClick">Cancel</v-btn>
              
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                flat
                @click="$emit('close')"
              > Close
              </v-btn>

              
            </v-card-actions>
            
          </v-card>
        </v-flex>
      </v-layout>
  
    </v-dialog>
</template>

<script>
  export default {
    props: ['show', 'item', 'editMode'],
    data () {
      return {
        itemBuffer: {}
      }
    },
    mounted() {
      this.refreshItems();
    },
    computed: {
      randomImage() {
        return 'https://picsum.photos/500?' + this.item.phone
      },
      showComp: {
        get() {
          return this.show
        },
        set(e) {
          !e && this.$emit('close')
        }
      },
      itemCreatedDate() {
        let dt = this.item.created
        dt = dt && new Date(dt)
        return !isNaN(+dt) && dt.toLocaleString()
      },
      itemUpdatedDate() {
        let dt = this.item.updated
        dt = dt && new Date(dt)
        return dt && !isNaN(+dt) && dt.toLocaleString()
      }
    },
    methods: {
      saveClick(){
        this.$emit('save', this.itemBuffer)
      },
      cancelClick(){
        this.refreshItems()
        this.$emit('cancel')
      },
      refreshItems() {
        this.itemBuffer = {...this.item}
      }
    }
  }
</script>