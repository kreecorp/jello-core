
'use strict';

var
    gulp = require('gulp'),
    connect = require('gulp-connect'),
    htmlmin = require('gulp-htmlmin'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    jshint = require('gulp-jshint');

var path = {
    html: {
        src: './index.html',
        views: './views/*/*.html',
        viewsbuild: './public/views',
        build: './public/'
    },
    css: {
        watch: './src/css/*.css',
        build: './public/src/css/',

    },
    js: {
        watch: './src/js/*.js',
        build: './public/src/js/'
    },
    img: {
        src: './src/img/*',
        build: './public/src/img/'
    }
}

// Basic server on port:2018
gulp.task('server', function () {
    connect.server({
        livereload: true,
        port: 2018
    });
})


// HTML loader
gulp.task('html', function () {
    return gulp.src(path.html.src)
        .pipe(connect.reload());
})


// HTML auto reloader
gulp.task('html:watch', function () {
    gulp.watch(path.html.src, ['html'])
})


// Views loader
gulp.task('views:watch', function () {
    gulp.watch(path.html.views, ['html'])
})

// eslint & jshint for js files
gulp.task('js'),
    function () {
        return gulp.src(path.js.watch)
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(jshint.reporter('fail'))
    }

// watch js files with eslint jshint on
gulp.task('js:watch', function () {
    gulp.watch(path.js.watch, ['js'])
})

// css compiler
gulp.task('css', function () {
    return gulp.src(path.css.watch)
        .pipe(connect.reload());
});

// css watcher
gulp.task('css:watch', function () {
    gulp.watch(path.css.watch, ['css']);
});

gulp.task('dev', ['css', 'js', 'js:watch', 'html:watch', 'views:watch', 'css:watch', 'server']);


// Build config

// build index.html file
gulp.task('index-build', function () {
    return gulp.src(path.html.src)
        .pipe(htmlmin({
            collapseWhitespace: true,
        }))
        .pipe(gulp.dest(path.html.build));
});


gulp.task('views-build', function () {
    return gulp.src(path.html.views)
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(path.html.viewsbuild));
});


gulp.task('css-build', function () {
    return gulp.src(path.css.watch)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(path.css.build));
});

gulp.task('image-build', function () {
    return gulp.src(path.img.src)
        .pipe(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            imagemin.jpegtran({
                progressive: true
            }),
            imagemin.optipng({
                optimizationLevel: 5
            }),
            imagemin.svgo({
                plugins: [{
                        removeViewBox: true
                    },
                    {
                        cleanupIDs: false
                    }
                ]
            })
        ]))
        .pipe(gulp.dest(path.img.build))
});


gulp.task('js-build', function (cb) {
    pump([
            gulp.src(path.js.watch),
            uglify(),
            gulp.dest(path.js.build)
        ],
        cb
    );
});

gulp.task('build', ['index-build', 'views-build', 'css-build', 'image-build', 'js-build']);
