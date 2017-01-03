<style lang="scss">
	/* all necessary mixins, frameworks and variables */
	@import 'includes';

	/* Global styles (only include this up in app.vue) */
	@import 'global';

	.global-header {
		left: 0;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 10;
	}

	.global-header__nav {
		@include container();
	}

	.global-header__nav a {
		transition: color 0.5s, background-color 0.5s;

		background-color: $color__green;
		color: $color__white;
		display: block;
		flex: auto;
		font-weight: 700;
		line-height: 2 * $base__line-height;
		text-align: center;

		&.active, &:hover {
			background-color: $color__white;
			color: $color__green;
		}
	}
</style>

<template>
	<wrapper>
		<bg></bg>

		<header v-show="isController == false" role="banner" class="global-header">
			<nav class="global-header__nav">
				<router-link to="/slides/0" active-class="active" exact>Introduction</router-link>
				<router-link to="/slides/1" active-class="active" exact>Antecedents</router-link>
				<router-link to="/slides/2" active-class="active" exact>Goals &amp; Initiatives</router-link>
				<router-link to="/slides/3" active-class="active" exact>Roles &amp; Responsibilities</router-link>
				<router-link to="/slides/4" active-class="active" exact>Challenges</router-link>
				<router-link to="/slides/5" active-class="active" exact>Learning Experiences</router-link>
			</nav>
		</header>

		<router-view></router-view>
	</wrapper>
</template>

<script>
	export default {
		name: 'app',
		components: {
			bg: require('./bg.vue')
		},
		store: window.store,
		computed: {
			isController () {
				return this.$store.state.isController;
			},
			numSlides () {
				return this.$store.state.numSlides;
			}
		},
		created () {
		},
	}
</script>