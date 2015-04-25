'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var less = require('gulp-less');
var mocha = require('gulp-mocha');
var preprocess = require('gulp-preprocess');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var traceur = require('gulp-traceur');


// =============================================================================
// Build Client App
// =============================================================================

// move dependencies into build dir
gulp.task('dependencies', function() {
  return gulp.src([
      'node_modules/angular2/node_modules/rx/dist/rx.all.js',
      'node_modules/angular2/node_modules/traceur/bin/traceur.js',
      'node_modules/angular2/node_modules/traceur/bin/traceur-runtime.js',
      'node_modules/angular2/node_modules/zone.js/zone.js',
      'node_modules/es6-module-loader/dist/es6-module-loader.js',
      'node_modules/es6-module-loader/dist/es6-module-loader.js.map',
      'node_modules/systemjs/dist/system.js',
      'node_modules/systemjs/dist/system.js.map'
    ])
    .pipe(gulp.dest('web-app/public/lib'));
});

// tanspile, concat & move angular
gulp.task('angular2', function() {
  return gulp.src([
      traceur.RUNTIME_PATH,
      'node_modules/angular2/es6/prod/*.es6',
      'node_modules/angular2/es6/prod/src/**/*.es6'
    ], {
      base: 'node_modules/angular2/es6/prod'
    })
    .pipe(rename(function(path) {
      path.dirname = 'angular2/' + path.dirname;
      path.extname = '';
    }))
    .pipe(traceur({
      modules: 'instantiate',
      moduleName: true
    }))
    .pipe(concat('angular2.js'))
    .pipe(gulp.dest('web-app/public/lib'));
});

// transpile & move js
gulp.task('js', function() {
  return gulp.src('web-app/client_app/**/*.js')
    .pipe(rename({
      extname: ''
    }))
    .pipe(traceur({
      modules: 'instantiate',
      moduleName: true,
      annotations: true,
      types: true
    }))
    .pipe(rename({
      extname: '.js'
    }))
    .pipe(gulp.dest('web-app/public'));
});

// move html
gulp.task('html', function() {
  return gulp.src('web-app/client_app/**/*.html')
    .pipe(gulp.dest('web-app/public'));
});

// =============================================================================
// Less
// =============================================================================
gulp.task('less', function () {
	gulp.src('./web-app/client_app/less/*.less')
		.pipe(less())
		.pipe(gulp.dest('./web-app/public/css'))
		.pipe(livereload());
});

// =============================================================================
// Watch
// =============================================================================
gulp.task('watch', function() {
  gulp.watch('web-app/client_app/**/*.js', ['js']);
  gulp.watch('web-app/client_app/**/*.html', ['html']);
  gulp.watch('web-app/client_app/**/*.less', ['less']);
});


// =============================================================================
// Serve
// =============================================================================
gulp.task('serve', function () {
	livereload.listen();
	nodemon({
		script: 'web-app/app.js',
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
	return gulp.src('./web-app/app/**/*.spec.js', {
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

// =============================================================================
// Tasks
// =============================================================================
gulp.task('build-client-app', ['dependencies', 'angular2', 'js', 'html', 'less']);
gulp.task('dev', ['serve', 'watch']);

gulp.task('default', [
  'build-client-app'
]);
