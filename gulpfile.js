/*eslint no-unused-vars:0, no-console:0*/

var fs = require("fs"),
	gulp = require('gulp'),
	watch = require('gulp-watch'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	livereload = require('gulp-livereload'),

// Javascript linting and minification
	browserify = require('browserify'),
	uglify = require('gulp-uglify'),
	babelify = require('babelify'),
	vueify = require('vueify'),

// ImageMin
	imagemin = require('gulp-imagemin'),

// directory variables
	sourceDir = 'src/',
	buildDir = 'public/';

// Single-use Gulp build task
gulp.task('build', ['fonts', 'js', 'img', 'svg', 'markdown']);

// Watch build task
gulp.task('watch', function () {

	// start livereload
	livereload.listen({
		'basePath': './'
	});

	// compile SCSS and Vue Components
	gulp.watch(sourceDir + 'scss/**/*', ['js']);

	// compile vue components
	gulp.watch(sourceDir + 'js/**/*', ['js']);

	// move markdown
	gulp.watch(sourceDir + 'md/**/*', ['markdown']);

	// move fonts
	gulp.watch(sourceDir + 'fonts/**/*', ['fonts']);

	// optimize and move images
	gulp.watch(sourceDir + 'images/**/*', ['img']);

	// optimize and move svg
	gulp.watch(sourceDir + 'svg/**/*', ['svg']);
});

gulp.task('fonts', function () {
	return gulp.src(sourceDir + 'fonts/**/*')
		.pipe(gulp.dest(buildDir + 'fonts/'))
		.pipe(livereload());
});

gulp.task('markdown', function () {
	return gulp.src(sourceDir + 'md/**/*')
		.pipe(gulp.dest(buildDir + 'md/'))
		.pipe(livereload());
});

gulp.task('vueify', function () {
	var b = browserify({
		entries: [sourceDir + 'js/main.js'],
		debug: true
	});

	var bundle = function () {
		return b
			.transform("babelify", {presets: ["es2015"]})
			.transform(vueify, {
				sass: {
					includePaths: [sourceDir + 'scss/'],
					outputStyle: 'compressed'
				},
			})
			.bundle()
			.pipe(source('main.js'))
			.pipe(buffer())
			.pipe(gulp.dest(buildDir + 'js/'));
	};

	return bundle();
});

gulp.task('js', ['vueify'], function() {
	return gulp.src(buildDir + 'js/main.js')
		.pipe(uglify({
			mangle: false,
			compress: false,
			preserveComments: true
		}))
		.pipe(gulp.dest(buildDir + 'js/'))
		.pipe(livereload());
});

gulp.task('svg', function () {
	"use strict";

	return gulp.src(sourceDir + 'svg/**/*')
		.pipe(gulp.dest(buildDir + 'svg'))
		.pipe(livereload());
});

gulp.task('img', function () {
	"use strict";

	return gulp.src(sourceDir + 'img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest(buildDir + 'img'))
		.pipe(livereload());
});
