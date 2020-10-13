<template>
  <v-list-item class="elevation-1 mb-3" @click="$router.push(`/grupos/${group.id}/transacoes`)">
		<v-list-item-icon>
			<v-avatar size="40" rounded="0" :color="color">
			</v-avatar>
		</v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>
        <span class="font-weight-regular">{{ group.name }}</span>
        <span class="font-weight-light ml-2 text-caption grey--text text--darken-2"> {{ group.members.length }} membros</span>
      </v-list-item-title>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import { Group } from "@/models";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class GroupListItem extends Vue {
  @Prop({ required: true, type: Object })
  group!: Group;
	
	get color() {
		return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
	} 
}
</script>
