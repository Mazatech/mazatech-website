var gulp = require('gulp');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var cp = require('child_process');
var imagemin = require('gulp-imagemin');
var newer = require('gulp-newer');
var browserSync = require('browser-sync');

var jekyllCommand = (/^win/.test(process.platform)) ? 'jekyll.bat' : 'jekyll';

/*
 * Build the Jekyll Site
 * runs a child process in node that runs the jekyll commands
 */
function jekyllBuild(cbDone) {
	// console.log('jekyllBuild');
	return cp.spawn(jekyllCommand, ['build'], {stdio: 'inherit'}).on('close', cbDone);
}

function browserSyncReload(cbDone) {
	// console.log('browserSyncReload #0');
	browserSync.reload();
	// console.log('browserSyncReload #1');
	if (cbDone) { 
		cbDone(); 
	}
	// console.log('browserSyncReload #2');
}

function browserSyncWithServer(cbDone) {
	// console.log('browserSyncWithServer 0');
	browserSync({
		server: {
			baseDir: '_site'
		}
	});
	// console.log('browserSyncWithServer #1');
	if (cbDone) { 
		cbDone(); 
	}
}

/*
* Compile and minify sass
*/
function css() {
	// console.log('css executing');
  	return gulp.src('src/styles/**/*.scss')
	    .pipe(plumber())
	    .pipe(sass())
	    .pipe(csso())
	    .pipe(gulp.dest('assets/css/'));
}

/*
* Compile fonts
*/
function fonts() {
	// console.log('fonts executing');
	return gulp.src('src/fonts/**/*.{ttf,woff,woff2}')
		.pipe(plumber())
		.pipe(gulp.dest('assets/fonts/'));
}

/*
 * Minify images
 */
function images() {
	// console.log('images executing');
	return gulp.src('src/img/**/*.{jpg,png,gif}')
		.pipe(newer('assets/images/'))
		.pipe(plumber())
		.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
		.pipe(gulp.dest('assets/images/'));
}

function svg() {
	// console.log('images executing');
	return gulp.src('src/img/**/*.svg')
		.pipe(newer('assets/images/'))
		.pipe(plumber())
		.pipe(gulp.dest('assets/images/'));
}

/**
 * Compile and minify js
 */
function js() {
	// console.log('js executing');
	return gulp.src('src/js/**/*.js')
		.pipe(plumber())
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('assets/js/'));
}

gulp.task('jekyllRebuild', gulp.series(jekyllBuild, browserSyncReload));
gulp.task('browserSync', gulp.series(jekyllBuild, browserSyncWithServer));
gulp.task('css', css);
gulp.task('js', js);
gulp.task('fonts', fonts);
gulp.task('images', images);
gulp.task('svg', svg);


/**
 * Watch for surces changes
 */
function watch() {
	// console.log('watch enter');
	gulp.watch('src/styles/**/*.scss', gulp.series('css', 'jekyllRebuild'));
	gulp.watch('src/js/**/*.js', gulp.series('js', 'jekyllRebuild'));
	gulp.watch('src/fonts/**/*.{tff,woff,woff2}', gulp.series('fonts', 'jekyllRebuild'));
	gulp.watch('src/img/**/*.{jpg,png,gif}', gulp.series('images', 'jekyllRebuild'));
	gulp.watch('src/img/**/*.{svg}', gulp.series('svg', 'jekyllRebuild'));
	gulp.watch('_includes/*.html', gulp.series('jekyllRebuild', 'jekyllRebuild'));
	// console.log('watch exit');
}

gulp.task('watch', watch);

gulp.task('buildNoimg', gulp.parallel('css', 'js', 'fonts'));
gulp.task('build', gulp.parallel('css', 'js', 'fonts', 'images', 'svg'));

gulp.task('runWebsite', gulp.series('buildNoimg', 'browserSync'));

exports.default = gulp.parallel('runWebsite', 'watch');
