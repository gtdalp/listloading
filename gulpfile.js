var gulp      = require('gulp');
var uglify    = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rename    = require('gulp-rename');
var del       = require('del');
var eslint    = require('gulp-eslint');

// 清空目录
gulp.task('clear', function () {
    del(['./dist']);
});

// 压缩js
gulp.task('build', ['build-minifyCss'], function () {
    gulp.src(['./build/*.js'])
        .pipe(uglify())
        .pipe(rename('listloading.min.js'))
        .pipe(gulp.dest('./dist/js/'));
});
// 压缩css
gulp.task('build-minifyCss', function () {
    gulp.src(['./demos/*.css'])
        .pipe(minifyCss())
        .pipe(rename('listloading.min.css'))
        .pipe(gulp.dest('./dist/css/'));
});