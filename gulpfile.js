"use strict";

var gulp = require("gulp"),
  connect = require("gulp-connect"),
  htmlmin = require("gulp-htmlmin"),
  sass = require("gulp-sass"),
  cleanCSS = require("gulp-clean-css"),
  autoprefixer = require("gulp-autoprefixer");

var paths = {
  index: {
    src: "./index.html",
    build: "./public/"
  },
  views: {
    src: "./views/*/*.html",
    build: "./public/views/"
  },
  sass: {
    src: "./style.scss",
    srcBuild: "./public/",
    jello: "./src/assets/*/*.scss"
  },
  css: {
    src: "./style.css",
    build: "./public/"
  },
  jello: {
    index: "./src/assets/sass/jello.scss"
  }
};

// Local Server Config

// Basic server on port:2018

const server = () => {
  connect.server({
    livereload: true,
    port: 2018
  });
};

const html = () => {
  return gulp.src(paths.index.src).pipe(connect.reload());
};

const htmlWatcher = () => {
  gulp.watch(paths.index.src);
};

const views = () => {
  return gulp.src(paths.views.src).pipe(connect.reload());
};

const viewsWatcher = () => {
  gulp.watch(paths.views.src, gulp.parallel(views));
};

const sassConverter = () => {
  return gulp
    .src(paths.sass.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./"))
    .pipe(connect.reload());
};

const styleWatcher = () => {
  gulp.watch(paths.sass.src, gulp.parallel(sassConverter));
};

const SassWatcher = () => {
  gulp.watch(paths.sass.watch, gulp.parallel(sassConverter));
};

const jello = () => {
  gulp.watch(paths.jello.index, gulp.parallel(sassConverter));
};

gulp.task(
  "dev",
  gulp.series(
    server,
    html,
    sassConverter,
    views,
    styleWatcher,
    SassWatcher,
    jello,
    htmlWatcher,
    viewsWatcher
  )
);
