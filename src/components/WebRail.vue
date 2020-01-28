<template>
    <v-navigation-drawer permanent>
        <v-list>
            <v-list-item v-for="item in items" :key="item.name">
                <v-list-item-icon></v-list-item-icon>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class WebRail extends Vue {
    items = [
        { name: 'Overview', route: '/dashboard', icon: 'mdi-view-dashboard' }
    ]
}

</script>