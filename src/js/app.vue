<style lang="scss">
	/* all necessary mixins, frameworks and variables */
	@import 'includes';

	/* Global styles (only include this up in app.vue) */
	@import 'global';

	.global-header__nav {
		@include container();
	}
</style>

<template>
	<wrapper>
		<header role="banner" class="global-header">
			<nav class="global-header__nav">
				<router-link to="/foo" active-class="active">Foo</router-link>
				<router-link to="/bar" active-class="active">Bar</router-link>
			</nav>

			<h1>{{ msg }}</h1>
		</header>

		<router-view></router-view>

	</wrapper>
</template>

<script>
	export default {
		name: 'app',
		data () {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		}
	}
</script>