/*var gulp = require('gulp'),
	gutil = require('gulp-util');

gulp.task('default', function() {
	return gutil.log('gulp is running');
})*/

var gulp 	= require('gulp'),
	gutil 	= require('gulp-util'),
	less	= require('gulp-less'),
	cleanCSS= require('gulp-clean-css'),
	connect = require('gulp-connect'),
	LessAutoprefix = require('less-plugin-autoprefix'),
	jshint 	= require('gulp-jshint'),
	imagemin = require('gulp-imagemin');

var autoprefix = new LessAutoprefix({ browsers: ['last 10 versions'] });

gulp.task('default', ['watch'])

gulp.task('html', function(){
	return gulp.src('./src/*.html')
		.pipe(connect.reload());
})

gulp.task('compile-less', function() {
	gulp.src('./src/assets/styles/main.less')
		.pipe(less({plugins:[autoprefix]}))
		.pipe(cleanCSS())
		.pipe(gulp.dest('./src/assets/css/'))
		.pipe(connect.reload());
})

gulp.task('img-min', () =>
	gulp.src('./src/assets/img/*')
		.pipe(imagemin({
			interlaced: true,
			progressive: true,
			optimizationLevel: 5,
			svgoPlugins: [{ removeViewBox: true }]
		}))
		.pipe(gulp.dest('./src/assets/img/'))
);

gulp.task('watch', function() {
	connect.server({
		root: 'src',
		port: 8001,
		livereload: true,
		host: '0.0.0.0'
	});
	gulp.watch('./src/assets/img/*.jpg', ['img-min']);
	gulp.watch('./src/assets/img/*.png', ['img-min']);
	gulp.watch('./src/*.html', ['html']);
	gulp.watch('./src/assets/styles/*.less', ['compile-less']);
})
