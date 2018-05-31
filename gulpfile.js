'use strict';

var
    gulp = require('gulp'),
    sass = require('gulp-sass'),

    paths = {
        sass: {
            src: './src/demo.scss',
            dest: './src/'
        }
    }
gulp.task('sass', function () {
    return gulp.src(paths.sass.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.sass.dest));
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/*.scss', ['sass']);
});

gulp.task('server', function () {
    return gulp.src('src')
        .pipe(server({
            livereload: true,
            open: true,
            port: 3000
        }));
});


gulp.task('start', ['sass', 'sass:watch', 'server']);