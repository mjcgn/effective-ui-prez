<style lang="scss">
	/* all necessary mixins, frameworks and variables */
	@import 'includes';

	.slide {
		@include container();
		height: auto;
		min-height: 100%;
		padding: 2 * $base__line-height 0;
	}

	.slide--title {
		align-items: center;
		background-color: $color__green;
		color: $color__white;

		h1 {
			border-color: $color__white;
			margin-top: 0;
		}

		h2 {
			margin-bottom: 0;
		}
	}

	.slide__content {
		@include cols(3.5,4);
		@include pre(0.25,4);
		@include post(0.25,4);

		@include breakpoint(tablet) {
			@include cols(7);
			@include pre(0.5);
			@include post(0.5);
		}
	}
</style>

<template>
	<main v-show="isController == false" class="slide" v-bind:class="[currentSlide == 0 ? 'slide--title' : '']">
		<div class="slide__content">
			<div v-html="slideText"></div>
			<div v-show="currentSlide == 0">Socket ID: {{ socketId }}</div>
		</div>

	</main>
</template>

<script>
	export default {
		store: window.store,
		data () {
			return {
				slideText: ''
			}
		},
		computed: {
			socketId () {
				return this.$store.state.socketId;
			},
			isController () {
				return this.$store.state.isController;
			},
			currentSlide () {
				return this.$route.params.id;
			}
		},
		watch: {
			'$route' (to, from) {
				this.$store.state.currentSlide = this.$route.params.id;
				window.scrollTo(0,0);
				this.xhr();
			}
		},
		created () {
			this.$store.state.isController = false;
			this.xhr();
		},
		methods: {
			xhr () {
				var _this = this;
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function(e) {
					if (this.readyState == 4 && this.status == 200) {
						_this.slideText = window.marked(this.responseText);
					}
				};
				xhttp.open("GET", '/md/' + this.$route.params.id + '.md', true);
				xhttp.send();
			}
		}
	}
</script>