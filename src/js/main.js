// force production for builds
process.env.NODE_ENV = 'production';

// dependencies
const Marked = require('marked');
const Vue = require('vue');
const VueRouter = require('vue-router');
const Vuex = require('vuex');
const D3 = require('d3');
const io = require('socket.io-client');

Vue.use(VueRouter);
Vue.use(Vuex);

// global variables
window.base__lineHeight = ((1.25 * 16) * 1.5);
window.socket = io();
window.D3 = D3;
window.marked = Marked;
window.marked.setOptions({
	renderer: new marked.Renderer(),
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: false,
	smartLists: true,
	smartypants: false
});

// global store
window.store = new Vuex.Store({
	state: {
		isController: false,
		clients: [],
		socketId: '',
		numSlides: 7,
		currentSlide: 0
	}
});

// components
const App = require('./components/app.vue');
const Slide = require('./components/slide.vue');
const Controller = require('./components/controller.vue');

// router
const routes = [
	{ path: '/', redirect: 'slides/0' },
	{ path: '/slides/:id', component: Slide },
	{ path: '/controller', component: Controller }
];

const router = new VueRouter({
	routes: routes,
	mode: 'history'
})

new Vue({
	router: router,
	el: '#app',
	render: h => h(App)
});

// set socket listeners
window.socket.on('connect', function() {
	window.store.state.socketId = window.socket.id;
});
window.socket.on('up', function() {
	window.scrollBy(0, -1 * window.base__lineHeight * 4);
});
window.socket.on('down', function() {
	window.scrollBy(0, window.base__lineHeight * 4);
});
window.socket.on('left', function() {
	window.store.state.currentSlide--;
	if (window.store.state.currentSlide < 0) {
		window.store.state.currentSlide = window.store.state.numSlides - 1;
	}
	router.push('/slides/' + window.store.state.currentSlide);
});
window.socket.on('right', function() {
	window.store.state.currentSlide++;
	if (window.store.state.currentSlide > window.store.state.numSlides - 1) {
		window.store.state.currentSlide = 0;
	}
	router.push('/slides/' + window.store.state.currentSlide);
});

// fade in our page
const classes = document.querySelector('body').className;
document.querySelector('body').className += (classes.length) ? ' body--loaded' : 'body--loaded';