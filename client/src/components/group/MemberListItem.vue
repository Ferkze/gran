<template>
  <v-list-item class="elevation-1 mb-3">
		<v-list-item-icon>
			<v-avatar size="40" rounded="0" :color="color">
			</v-avatar>
		</v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>
        <span class="font-weight-regular">{{ member.username }}</span>
      </v-list-item-title>
      <v-list-item-subtitle>
        <span class="font-weight-regular">{{ member.email }}</span>
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { Group, User } from "@/models";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class MemberListItem extends Vue {
  @Prop({ required: true, type: Object })
	member!: User
	
	get color() {
		return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
	}
}
</script>
