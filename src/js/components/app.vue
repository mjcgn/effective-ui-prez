<style lang="scss">
	/* all necessary mixins, frameworks and variables */
	@import 'includes';

	/* Global styles (only include this up in app.vue) */
	@import 'global';
</style>

<template>
	<wrapper>
		<bg></bg>
		<navigation></navigation>
		<router-view></router-view>
	</wrapper>
</template>

<script>
	export default {
		name: 'app',
		components: {
			bg: require('./bg.vue'),
			navigation: require('./navigation.vue')
		}
	}
</script>