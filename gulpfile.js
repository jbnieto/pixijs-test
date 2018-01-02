/***** 
*
* Install first this modules as devDependencies
* 
*  npm install browser-sync gulp gulp-autoprefixer gulp-connect gulp-load-plugins gulp-sass --save-dev
*  
******/

var gulp    = require('gulp'),
$       = require('gulp-load-plugins')(),
connect = require('gulp-connect'),
browserSync = require('browser-sync').create();

var sassPaths = [
'assets/sass'
];

gulp.task('webserver', function() {
connect.server({
livereload: true,
port: 8000,
host: '0.0.0.0'
});
});

// Static server
gulp.task('browser-sync', function() {
browserSync.init({
    server: {
        baseDir: "./"
    }
});
});

gulp.task('html', function () {
gulp.src('*.html')
.pipe(connect.reload());
});

gulp.task('js', function () {
gulp.src('*.js')
.pipe(connect.reload());
});

gulp.task('sass', function() {
return gulp.src('assets/sass/*.scss')
.pipe($.sass({
  includePaths: sassPaths
})
.on('error', $.sass.logError))
.pipe(gulp.dest('assets/css'))
.pipe(connect.reload());
});

gulp.task('watch', ['sass','html', 'js'], function() {
gulp.watch(['*.html'], ['html']);
gulp.watch(['includes/**/*.html'], ['html']);
gulp.watch(['assets/sass/**/*.scss'], ['sass']);
gulp.watch(['assets/js/**/*.js'], ['js']);
});

gulp.task('default', ['sass', 'webserver', 'watch']);