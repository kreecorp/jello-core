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
gulp.task("server", function() {
  connect.server({
    livereload: true,
    port: 2018
  });
});

gulp.task("html", function() {
  return gulp.src(paths.index.src).pipe(connect.reload());
});

gulp.task("html:watch", function() {
  gulp.watch(paths.index.src, ["html"]);
});

gulp.task("views", function() {
  return gulp.src(paths.views.src).pipe(connect.reload());
});

gulp.task("views:watch", function() {
  gulp.watch(paths.views.src, ["views"]);
});

gulp.task("sass", function() {
  return gulp
    .src(paths.sass.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./"))
    .pipe(connect.reload());
});

gulp.task("style:watch", function() {
  gulp.watch(paths.sass.src, ["sass"]);
});

gulp.task("sass:watch", function() {
  gulp.watch(paths.sass.watch, ["sass"]);
});
gulp.task("jello", function() {
  gulp.watch(paths.jello.index, ["sass"]);
});

gulp.task("dev", [
  "server",
  "html",
  "html:watch",
  "views",
  "views:watch",
  "sass",
  "sass:watch",
  "style:watch",
  "jello"
]);

// Build Config

gulp.task("index-build", function() {
  return gulp
    .src(paths.index.src)
    .pipe(
      htmlmin({
        collapseWhitespace: true
      })
    )
    .pipe(gulp.dest(paths.index.build));
});

gulp.task("css-build", function() {
  return gulp
    .src(paths.css.src)
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest(paths.css.build));
});

gulp.task("build", 
["index-build", "sass", "css-build"]);
