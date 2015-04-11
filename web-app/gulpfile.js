'use strict';

var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	livereload = require('gulp-livereload'),
	less = require('gulp-less'),
	mocha = require('gulp-mocha'),
	preprocess = require('gulp-preprocess');

// =============================================================================
// Less
// =============================================================================
gulp.task('less', function () {
	gulp.src('./public/css/*.less')
		.pipe(less())
		.pipe(gulp.dest('./public/css'))
		.pipe(livereload());
});

// =============================================================================
// Watch
// =============================================================================
gulp.task('watch', function () {
	gulp.watch('./public/css/*.less', ['less']);
});

// =============================================================================
// Develop
// =============================================================================
gulp.task('develop', function () {
	livereload.listen();
	nodemon({
		script: 'app.js',
		ext: 'js coffee handlebars',
	}).on('restart', function () {
		setTimeout(function () {
			livereload.changed(__dirname);
		}, 500);
	});
});

// =============================================================================
// Tests
// =============================================================================
gulp.task('test', function () {
	return gulp.src('./app/**/*.spec.js', {
			read: false
		})
		.pipe(preprocess({
			context: {
				NODE_ENV: 'test',
				DEBUG: true
			}
		}))
		.pipe(mocha({
			reporter: 'spec'
		}))
		.once('end', function () {
			process.exit();
		});
});

gulp.task('default', [
  'less',
  'develop',
  'watch'
]);
