// Gulp addOns
var gulp 			= require('gulp');
var concat 			= require('gulp-concat');
var uglify 			= require('gulp-uglify');
var clean 			= require('gulp-rimraf');
var inject 			= require('gulp-inject');
var less 			= require('gulp-less');
var minifyCSS 		= require('gulp-minify-css');
var flatten 		= require('gulp-flatten');
var htmlreplace 	= require('gulp-html-replace');
var watch 			= require('gulp-watch');
var include 		= require('gulp-include');
var livereload 		= require('gulp-livereload');
// var autoprefixer 	= require('gulp-autoprefixer');

// Node addOns
var runSequence 	= require('run-sequence');
var express 		= require('express');
var browserSync 	= require('browser-sync');


// Paths
var distDirectry = 'www';



/************************************************************
Initialize Starts
************************************************************/
// Default Runner
gulp.task('default', function() {
	console.log( 'gulp dev : gulp pro : gulp clean : gulp dev-server : gulp pro-server');
});
/************************************************************
Initialize Ends
************************************************************/




/************************************************************
Tools Starts
************************************************************/
// Remove Packge
gulp.task('clean', function(){
	return gulp.src( distDirectry ).pipe(clean());
});

// htmls
gulp.task('devToPro', function() {

	// Index
	gulp.src([
			'index.html'
		])
		.pipe(gulp.dest( distDirectry ));

	// App
	gulp.src([
			'app/**'
		])
		.pipe(gulp.dest( distDirectry + '/app'));

	// Assets
	gulp.src([
			'assets/**'
		])
		.pipe(gulp.dest( distDirectry + '/assets'));

});

// index
gulp.task('index', function() {
	// gulp.src('index.html')
	// 	.pipe(gulp.dest( distDirectry ));

	// Reference - https://www.npmjs.com/package/gulp-html-replace

	gulp.src('index.html')
		.pipe(htmlreplace({
			'css-libs': 'assets/vendors/css/bundle.css',
			'js-libs': 'assets/vendors/js/bundle.js',
			'css-app': 'assets/css/app.css',
			'js-app': 'app/app.js'
		}))
		.pipe(gulp.dest( distDirectry ));

});

/************************************************************
Tools Endss
************************************************************/






/************************************************************
Servers Starts
************************************************************/
// Static server runing browser-sync
gulp.task('browser-sync', function() {
	// Reference - http://www.browsersync.io/docs/options/#option-browser
    browserSync({
        server: {
            baseDir: "./" + distDirectry
        },
		ui: {
			port: 4000
		}
    });
});

// Run Production Server
gulp.task('pro-server', ['pro'], function() {
	// var express = require('express');
	var app = express();
	app.use(express.static(__dirname + '/' + distDirectry ));
	app.listen(4000);

	console.log( 'Pointing to /www' );
	console.log( 'SERVER RUNNING AT : http://localhost:4000' );
	console.log( 'STOP SERVER by : crtl + c' );

});

// Run Dev Server
gulp.task('dev-server', ['dev'], function() {
	// var express = require('express');
	var app = express();
	app.use(express.static(__dirname));
	app.listen(4000);

	console.log( 'Pointing to /' );
	console.log( 'SERVER RUNNING AT : http://localhost:4000' );
	console.log( 'STOP SERVER by : crtl + c' );

});
/************************************************************
Servers Ends
************************************************************/



/************************************************************
Productoin Starts
************************************************************/
// Pro Package
gulp.task('pro', function(callback) {
	runSequence(
		'clean', [
			'devToPro'
		],
		callback);
});
/************************************************************
Productoin Ends
************************************************************/




/************************************************************
Development Starts
************************************************************/
// Dev Package
gulp.task('dev', function(callback) {
	runSequence(
		[
			'less',
			'bowersPackages',
			'scripts',
			'watch'
			// 'express-dev'
		],
		callback);
});

// bowersPackages
gulp.task('bowersPackages', function() {

	// Reference Include : gulp-include - https://www.npmjs.com/package/gulp-include

	var bowerPath = 'bower_components/';

	// var minjs = '/**/*.min.js';
	// var mincss = '/**/*.min.css';
	var fontFiles = '/**/*.{ttf,woff,woff2,eof,otf,svg}';

	// fonts
	gulp.src([
			bowerPath + 'fontawesome' + fontFiles, 
			bowerPath + 'bootstrap' + fontFiles
		])
		.pipe(flatten())
		.pipe(gulp.dest( 'assets/fonts' ));

	// js
	gulp.src('assets/js/dev-libs.js')
		.pipe(include())
		// .pipe(flatten())
		.pipe(concat('master-libs.js'))
		// .pipe(uglify())
		.pipe(gulp.dest( 'assets/js' ));


	// Less
	gulp.src('assets/less/dev-libs.less')
		.pipe(less())
		.pipe(concat('master-libs.css'))
		// .pipe(minifyCSS())
		.pipe(gulp.dest( 'assets/css' ));

});

// Script
gulp.task('scripts', function() {

	// Scripts
	gulp.src('assets/js/dev-script.js')
		.pipe(include())
		// .pipe(flatten())
		.pipe(concat('master-script.js'))
		// .pipe(uglify())
		.pipe(gulp.dest( 'assets/js' ));

	// APP
	gulp.src('app/dev-app.js')
		.pipe(include())
		// .pipe(flatten())
		.pipe(concat('master-app.js'))
		// .pipe(uglify())
		.pipe(gulp.dest( 'app' ));
});

// Less
gulp.task('less', function() {
	
	// Less
	gulp.src('assets/less/dev-style.less')
		.pipe(less())
		.pipe(concat('master-style.css'))
		// .pipe(minifyCSS())
		.pipe(gulp.dest( 'assets/css' ));

});

// Watch
gulp.task('watch', function() {

	// Style
	gulp.watch('assets/less/*.less', ['less']);

	console.log('WATCHING STYLES : LESS FILES - assets/less/');

	// Scripts
	gulp.watch([
		// Watch these
		'app/*.js',
		'assets/js/*.js',

		// Ignoring these
		'!app/*-app.js',
		'!assets/js/*-libs.js',
		'!assets/js/*-script.js'
		], ['scripts']);
	console.log('WATCHING SCRIPTS :  "_*.js" in app/ and assets/js/ ');

});

/************************************************************
Development Ends
************************************************************/









