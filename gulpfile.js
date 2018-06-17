"use strict";

var gulp = require("gulp"),
  sass = require("gulp-sass"),
  connect = require("gulp-connect");

let paths = {
  html: {
    base: "./src/index.html",
    views: "./src/views/*.html"
  },
  sass: {
    src: "./src/demo.scss",
    dest: "./src/"
  }
};

// Server at port 2020
gulp.task("server", function() {
  connect.server({
    root: "./src",
    livereload: true,
    port: 2020
  });
});

// HTML auto reloader
gulp.task("html", () => {
  return gulp.src(paths.html.base).pipe(connect.reload());
});

gulp.task("views", () => {
  return gulp.src(paths.html.views).pipe(connect.reload());
});

gulp.task("html:watch", () => {
  gulp.watch(paths.html.src, ["html"]);
});

gulp.task("views:watch", () => {
  gulp.watch(paths.html.views, ["views"]);
});

// Sass compiler and auto reloader
gulp.task("sass", function() {
  return gulp
    .src(paths.sass.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(paths.sass.dest));
});

gulp.task("component:watch", function() {
  gulp.watch("./src/*/*.scss", ["sass"]);
});

gulp.task("sass:watch", function() {
  gulp.watch("./src/*.scss", ["sass"]);
});

gulp.task("start", [
  "server",
  "html",
  "html:watch",
  "views",
  "views:watch",
  "sass",
  "component:watch",
  "sass:watch"
]);
