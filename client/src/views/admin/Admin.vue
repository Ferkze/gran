<template>
  <v-container>
      <v-row>
          <v-col>
              <h2>Administração</h2>
          </v-col>
      </v-row>
      <v-row>
          <v-col>
              <v-list>
                  <v-list-item v-for="item in items" :key="item.route" @click="$router.push(item.route)">
                      <v-list-item-content>
                        {{ item.title }}
                    </v-list-item-content>
                </v-list-item>
              </v-list>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Admin extends Vue {
    items = [
      { route: '/admin/usuarios', title: 'Usuários' }
    ]
}
</script>

<style>

</style>