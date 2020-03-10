<template>
    <v-container>
        <v-row cols="2">
            <web-rail></web-rail>
        </v-row>
        <v-row cols="10"></v-row>
    </v-container>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import WebRail from '../components/WebRail.vue'

@Component({
  components: {
    WebRail
  }
})
export default class Dashboard extends Vue {
    
}
            

</script>