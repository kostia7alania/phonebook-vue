<template> 
    <v-dialog
      v-model="isShowing"
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
                <div class="headline">{{headline}}</div>
                <span class="grey--text" v-if="itemCreatedDate">Created: {{itemCreatedDate}}</span>
               <span class="grey--text" v-if="itemUpdatedDate"><br>Updated: {{itemUpdatedDate}}</span>
               <span class="grey--text" v-if="itemImportedDate"><br>Imported: {{itemImportedDate}}</span>
              </div>
            </v-card-title>
 
            <v-card-text class="pt-0">
              <v-text-field
                :disabled="!isEditing"
                @keyup.enter="saveClick"
                v-model.trim="itemBuffer.name"
                label="Name"
                prepend-icon="person"
                :rules="nameRules"
                required
                :validate="false"
             />
              <v-text-field
                :disabled="!isEditing"
                @keyup.enter="saveClick"
                v-model.trim="itemBuffer.phone"
                label="Phone"
                prepend-icon="phone"
                :rules="phoneRules"
                required
                :validate="false"

             />
            </v-card-text>
  
            <v-divider></v-divider>
    
            <v-card-actions>

              <v-btn v-if="!isEditing" flat @click="$emit('edit')">Edit</v-btn>
              <v-btn v-if="!isEditing" flat @click="$emit('delete')" color="purple">Delete</v-btn>
            
              <v-btn :disabled="!isSaveBtnActive" v-if="isEditing" flat @click="saveClick">Save</v-btn>
              <v-btn v-if="isEditing" flat @click="cancelClick">Cancel</v-btn>
              
              <v-spacer></v-spacer>

              <v-btn color="primary" flat @click="$emit('close')"> Close
              </v-btn>

              
            </v-card-actions>
            
          </v-card>
        </v-flex>
      </v-layout>
  
    </v-dialog>
</template>

<script>
  export default {
    props: ['show', 'item', 'isEditing', 'isCreating'],
    data () {
      return {
        itemBuffer: {},
        nameRules: [
          v => !!v || 'Name is required',
        ],
        phoneRules: [
          v => !!v || 'Phone is required',
        ],
        
      }
    },
    mounted() {
      this.refreshItems();
    },
    computed: {
      headline() {
        return this.isCreating && 'New contact' ||
              this.isEditing && 'Edit contact '
              || 'Contact info'
      },
      randomImage() {
        return 'https://picsum.photos/500?' + this.item.phone
      },
      isShowing: {
        get() {
          return this.show
        },
        set(e) {
          !e && this.$emit('close')
        }
      },
      itemCreatedDate() {
        return this.dateParse(this.item.createdAt) 
      },
      itemUpdatedDate() {
        return this.dateParse(this.item.updatedAt) 
      },
      itemImportedDate() {
        return this.dateParse(this.item.importedAt)
      },
      isSaveBtnActive() {
        const name = this.itemBuffer.name
        const phone = this.itemBuffer.phone
        return typeof name == 'string' && typeof phone == 'string' && name && phone
      }
    },
    methods: {
      dateParse(date) {
        const dt = date && new Date(date)
        return dt && !isNaN(+dt) && dt.toLocaleString()
      },
      saveClick(){
        if(this.isSaveBtnActive) this.$emit('save', this.itemBuffer)
      },
      cancelClick(){
        this.refreshItems()
        this.$emit('cancel')
      },
      refreshItems() {
        this.itemBuffer = {...this.item }
      }
    }
  }
</script>