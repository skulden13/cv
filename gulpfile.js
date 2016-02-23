var gulp = require('gulp');
var	autoprefixer = require('gulp-autoprefixer');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var open = require('gulp-open');
var concat = require('gulp-concat');
var port = process.env.port || 3031;
var sass = require('gulp-sass');

gulp.task('browserify', function() {
	gulp.src('./app/src/js/App.jsx')
		.pipe(browserify({ transform: 'reactify' }))
		.pipe(rename('app.js'))
		.pipe(gulp.dest('./app/dist/js'))
});

gulp.task('open', function() {
	var options = {
		uri: 'http://localhost:' + port
	};

	gulp.src('./app/index.html')
		.pipe(open(options));
});

gulp.task('connect', function() {
	connect.server({
		root: 'app',
		port: port,
		livereload: true
	});
});

gulp.task('js', function() {
	gulp.src('./app/dist/**/*.js')
		.pipe(connect.reload());
});

gulp.task('html', function() {
	gulp.src('./app/*.html')
		.pipe(connect.reload());
});

gulp.task('css', function() {
	gulp.src('./app/*.css')
		.pipe(connect.reload());
});

gulp.task('sass', function () {
  gulp.src('./app/src/css/**/*.scss')
  	.pipe(autoprefixer())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/dist/css'));
});

gulp.task('watch', function() {
	gulp.watch('app/dist/js/*.js', ['js']);
	gulp.watch('app/index.html', ['html']);
	gulp.watch('app/src/js/**/*.jsx', ['browserify']);
	gulp.watch('app/src/css/**/*.scss', ['sass', 'css']);
});

gulp.task('default', ['browserify']);

gulp.task('serve', ['browserify', 'connect', 'open', 'watch']);