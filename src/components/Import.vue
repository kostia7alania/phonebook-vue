<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="isShow"
      max-width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        > 
            <v-layout justify-space-between align-center>
              <v-flex xs8>
                <v-icon>contacts</v-icon> 
                Import contacts 
              </v-flex>
              <v-flex xs4>
                <input type="file" id="fileElem" ref="fileElem" :accept="accept" style="display:none" @change="handleFiles($event)">
                <v-btn flat class="mr-0" @click.native="openFileDialog" color="primary"><v-icon>eject</v-icon> Browse</v-btn>
              </v-flex>
            </v-layout> 
        </v-card-title>

 

        <v-divider></v-divider>

        <v-card-text v-if="selectedFile">
            <div v-if="!isSupportedType">
              File {{filename}} has unsupported data type
            </div>
            <div v-else>
              <p>File name: {{filename}} </p>
              <p>Size: {{filesize}} </p> 
              <p>Modified: {{fileDateModified}} </p> 
              <div>

                      <v-textarea
                        class="text-area"
                        v-model="filePreview"
                        auto-grow
                        box
                        outline
                        counter
                        color="deep-purple"
                        label="Preview" 
                      />

              </div>
            </div>
        </v-card-text>

        <v-card-actions>
          <v-btn v-if="filePreviewJson" color="red" flat @click="importContacts"
              :loading="loading"
              :disabled="loading"
          >
            <v-icon>check</v-icon>
            Merge contacts</v-btn>
          <v-spacer></v-spacer>


          <v-btn
            color="primary"
            flat
            @click="isShow = false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  props: [
    'show'
  ],
  data() {
    return {
      accept: 'application/json',
      selectedFile: null,
      filePreview: null,
      loading: false,
    }
  },
  computed: {
    ...mapGetters([
      'items'
    ]),
    isShow: {
      get() {
        return this.show
      },
      set(e) {
        !e && this.$emit('hide')
      }
    },
    isSupportedType() {
      return this.selectedFile.type == this.accept
    },
    filename() {
      return this.selectedFile.name
    },
    filesize() {
      const s = this.selectedFile.size
      const k = 1000
      const m = k*k
      const g = k*k*k
      return s<k && s+' B' ||
             s<m && s/k+' kB'||
             s<g && s/m+' mB' 

    },
    fileDateModified() {
      return new Date(this.selectedFile.lastModified).toLocaleString()
    },
    filePreviewJson() {
      let res;
      try {
        res = this.filePreview && JSON.parse(this.filePreview)
      } catch(e) {
        console.warn('[filePreviewJson]: err while json parse => ', e)
        res = false
      } 
      return res
    },
  },
  methods: {
    ...mapActions([
      'IMPORT_ITEMS'
    ]),
    ...mapMutations([
      'SET_SNACK_MSG'
    ]),
    async importContacts() { 
      this.loading = true
      const res =  await this.IMPORT_ITEMS(this.filePreviewJson) 
      const { created, merged } = res
      setTimeout(()=>{
        this.isShow = false
      }, 1000)
      let stat = 'Import status: Created: '+created+', updated: '+merged
      console.log('stat=>',stat)
      this.$nextTick(()=>this.SET_SNACK_MSG(stat))

    },
    openFileDialog(){
      this.$refs['fileElem'].click()
    },
    handleFiles(event) {
      this.filePreview = null
      if(event.target.files.length==0) {
        return this.selectedFile = null 
      }
      this.selectedFile = event.target.files[0]
      this.filePreviewHandler()
    },
    filePreviewHandler() {
      const f = this.selectedFile
      if(!this.isSupportedType) return;
      const reader = new FileReader();
      reader.onload = ( () => {
        return e => { 
          let res = e.target.result.replace('data:application/json;base64,', '')
          this.filePreview = atob(res)
        };
      })(f);
      reader.readAsDataURL(f);
    }
  }
}
</script> 
 