<template>
  <v-container class="">
    <h1>{{ $route.name }}</h1>
    <v-divider />
    <section>
      <v-subheader>
        Account
      </v-subheader>
      <v-card>
        <v-row>
          <v-col cols="3" class="text-center">
            <v-avatar color="grey" height="72px" width="72px">
              <span class="headline white--text font-weight-bold">{{ user.firstName[0] }}</span>
            </v-avatar>
          </v-col>
          <v-col cols="9">
            <p>{{ `${user.firstName} ${user.lastName}` }}</p>
            <p>{{ `${user.email}` }}</p>
            <p>{{ `Criado em ${user.createdAt}` }}</p>
          </v-col>
        </v-row>
      </v-card>
      <div class="mt-3 text-sm-right">
        <v-btn color="error" outlined class="mr-3" v-text="'Delete Account'" />
        <v-btn color="error" v-text="'Logout'" />
      </div>
    </section>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import auth from '@/store/modules/auth'
import { User } from '../../models/user'

@Component({
  name: 'SettingsView'
})
export default class Settings extends Vue {
  get user(): User | null {
    return auth.user
  }
}
</script>
