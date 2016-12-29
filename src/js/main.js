// force production for builds
process.env.NODE_ENV = 'production';

// dependencies
const Vue = require('vue');
const VueRouter = require('vue-router');
Vue.use(VueRouter);

// components
const App = require('./App.vue');
const Foo = require('./home__index.vue');

// router
const routes = [
	{ path: '/', component: Foo },
	{ path: '/foo', component: Foo }
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

// fade in our page
const classes = document.querySelector('body').className;
document.querySelector('body').className += (classes.length) ? ' body--loaded' : 'body--loaded';
