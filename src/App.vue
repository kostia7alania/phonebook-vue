<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Test</span>
        <span class="font-weight-light">PHONEBOOK</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/kostia7alania/phonebook-vue"
        target="_blank"
      >
        <v-icon>code</v-icon>
        <span class="mr-2 ml-1">
          Repository</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <phonebook/>
    </v-content>
  </v-app>
</template>

<script>
import phonebook from './Phonebook'

export default {
  name: 'App',
  components: {
    phonebook
  },
  data () {
    return {}
  }
}
</script>
