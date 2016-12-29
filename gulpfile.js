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

// SCSS
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),

// ImageMin
	imagemin = require('gulp-imagemin'),

// directory variables
	sourceDir = 'src/',
	buildDir = 'public/';

// Single-use Gulp build task
gulp.task('build', ['fonts', 'js', 'img', 'svg']);

// Watch build task
gulp.task('watch', function () {

	// start livereload
	livereload.listen({
		'basePath': './'
	});

	// minify and move JavaScript
	gulp.watch(sourceDir + 'js/**/*', ['js']);

	// move fonts
	gulp.watch(sourceDir + 'fonts/**/*', ['fonts']);

	// compile and move SCSS
	gulp.watch(sourceDir + 'scss/**/*', ['js']);

	// optimize and move images
	gulp.watch(sourceDir + 'images/**/*', ['img']);

	// optimize and move svg
	gulp.watch(sourceDir + 'svg/**/*', ['svg']);
});

gulp.task('scss', function () {
	return gulp.src(sourceDir + 'scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'Explorer >= 9'],
			cascade: false
		}))
		.pipe(sourcemaps.write())

		.pipe(gulp.dest(buildDir + 'css'))
		.pipe(livereload());
});

gulp.task('fonts', function () {
	return gulp.src(sourceDir + 'fonts/**/*')
		.pipe(gulp.dest(buildDir + 'fonts/'));
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
		.pipe(gulp.dest(buildDir + 'svg'));
});

gulp.task('img', function () {
	"use strict";

	return gulp.src(sourceDir + 'img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest(buildDir + 'img'));
});
