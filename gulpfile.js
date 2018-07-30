"use strict";

var gulp = require("gulp"),
  connect = require("gulp-connect"),
  htmlmin = require("gulp-htmlmin"),
  sass = require("gulp-sass"),
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
    watch: "./src/assets/sass/*/*.scss"
  }
};

// Local Server Config

// Basic server on port:2018
gulp.task("server", function() {
  connect.server({
    livereload: true,
    port: 2018
  });
});

gulp.task("html", function() {
  return gulp.src(path.index.src).pipe(connect.reload());
});

gulp.task("html:watch", function() {
  gulp.watch(path.index.src, ["html"]);
});

gulp.task("views", function() {
  return gulp.src(path.views.src).pipe(connect.reload());
});

gulp.task("views:watch", function() {
  gulp.watch(path.views.src, ["views"]);
});

gulp.task("sass", function() {
  return gulp
    .src(paths.sass.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./"));
});

gulp.task("sass:watch", function() {
  gulp.watch(path.sass.watch, ["sass"]);
});

gulp.task("dev", ["html", "html:watch", "views", "views:watch", "sass:watch"]);
