<template>
	<v-btn color="primary" v-bind="$attrs" v-on="$listeners" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class BaseButton extends Vue { }
</script>
