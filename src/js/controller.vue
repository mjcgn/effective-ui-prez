<style lang="scss">
	/* all necessary mixins, frameworks and variables */
	@import 'includes';

	.controller {
		padding: $base__line-height 0;
	}

	.keyboard {
		@include container;
		display: flex;
		margin: $base__line-height auto;
		width: 11 * $base__line-height;
	}

	.keyboard__btn {
		background-color: $color__green;
		border: none;
		border-radius: 0.125 * $base__line-height;
		color: $color__white;
		display: block;
		height: 3 * $base__line-height;
		width: 3 * $base__line-height;

		&:nth-of-type(1) {
			margin: 0 4 * $base__line-height $base__line-height 4 * $base__line-height;
		}
	}

	.scroll {
		border-radius: 0.125 * $base__line-height;
		border: solid 0.0625 * $base__line_height $color__black;
		margin: auto;
		padding: $base__line-height;
		width: 11 * $base__line-height;

		h3 {
			pointer-events: none;
			text-align: center;
			text-transform: uppercase;
		}
	}

	.clientSelect {
		display: flex;
		margin: auto;
		width: 11 * $base__line-height;

		label {
			display: block;
			font-weight: 700;
			margin: 0;
			width: 50%;
		}

		select {
			display: block;
			height: $base__line-height;
			line-height: $base__line-height;
			vertical-align: bottom;
			width: 50%;
		}
	}
</style>

<template>
	<div class="controller">
		<div class="clientSelect">
			<label for="clients">Select a Client</label>
			<select id="clients" v-model="currentClient">
				<option v-for="client in clients" v-if="client.isController == false">{{ client.id }}</option>
			</select>
		</div>

		<div class="keyboard" v-show="currentClient !== ''">
			<button class="keyboard__btn" id="btn-up" v-on:click="onUpClick">
				<i class="fa fa-arrow-up" aria-hidden="true"></i>
			</button>
			<button class="keyboard__btn" id="btn-l" v-on:click="onLeftClick">
				<i class="fa fa-arrow-left" aria-hidden="true"></i>
			</button>
			<button class="keyboard__btn" id="btn-dn" v-on:click="onDownClick">
				<i class="fa fa-arrow-down" aria-hidden="true"></i>
			</button>
			<button class="keyboard__btn" id="btn-r" v-on:click="onRightClick">
				<i class="fa fa-arrow-right" aria-hidden="true"></i>
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'app',
		store: window.store,
		data () {
			return {
				clients: [],
				currentClient: ''
			};
		},
		created () {
			var _this = this;
			this.$store.state.isController = true;
			// socket listeners
			window.socket.on('clients', function(e) {
				_this.clients = e;
			});
			window.socket.emit('controllerStatus', true);
		},
		methods: {
			onUpClick (e) {
				window.socket.emit('up', this.currentClient);
			},
			onDownClick (e) {
				window.socket.emit('down', this.currentClient);
			},
			onLeftClick (e) {
				window.socket.emit('left', this.currentClient);
			},
			onRightClick (e) {
				window.socket.emit('right', this.currentClient);
			},
		}
	}
</script>