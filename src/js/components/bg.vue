<style lang="scss">
	/* all necessary mixins, frameworks and variables */
	@import 'includes';

	#bg {
		// filter: blur($base__line-height * .125);
		bottom: 0;
		display: block;
		height: 100%;
		left: 0;
		pointer-events: none;
		position: fixed;
		right: 0;
		top: 0;
		width: 100%;
		z-index: 1;
	}

	.tr_1 {
		fill: rgba(192,192,192, .25);
	}
	.tr_2 {
		fill: rgba(192,192,192, .125);

	}
	.tr_3 {
		fill: rgba(192,192,192, .0625);

	}
	.tr_4 {
		fill: rgba(192,192,192, 0);
	}
</style>

<template>
	<svg id="bg"></svg>
</template>

<script>
	export default {
		name: 'bg',
		methods: {
			bg () {
				let svg = window.D3.select('#bg'),
					t_h = window.base__lineHeight * .5,
					t_w = Math.round(t_h * 1.155),
					w_w = window.innerWidth,
					w_h = window.innerHeight,
					n = 1,
					s = 2;

				// reset
				svg.html('');

				// vertical loop
				for ( var v = 0; v < Math.ceil(w_h/t_h); v++ ) {
					var y_o = v * t_h; // vertical Y offset

					// horizontal loop
					for ( var h = -1; h < Math.ceil(w_w/t_w) * 2; h++ ) {
						var x_o = h / 2 * t_w; // horizontal X offset
						if (n % 2 == 1) {
							svg.append('path').attr('d', 'M' + x_o + ' ' + y_o + ' L' + (x_o + t_w) + ' ' + y_o + ' L' + (x_o + t_w / 2) + ' ' + (y_o + t_h) + ' Z').attr('class', 'tr_' + Math.ceil(Math.random() * 4));
						} else {
							svg.append('path').attr('d', 'M' + x_o + ' ' + (y_o + t_h) + ' L' + (x_o + t_w / 2) + ' ' + y_o + ' L' + (x_o + t_w) + ' ' + (y_o + t_h) + ' Z').attr('class', 'tr_' + Math.ceil(Math.random() * 4));
						}
						n++;
					}
				}
			}
		},
		mounted () {
			window.addEventListener('resize', this.bg);
			this.bg();
		},
	}
</script>