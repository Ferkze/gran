<template>
    <v-container>
        <v-row cols="1">
            <web-rail></web-rail>
        </v-row>
        <v-row cols="11"></v-row>
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