"use strict";

var gulp = require("gulp"),
  connect = require("gulp-connect"),
  htmlmin = require("gulp-htmlmin"),
  sass = require("gulp-sass"),
  cleanCSS = require("gulp-clean-css"),
  del = require("del"),
  netlify = require("gulp-netlify"),
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
  },
  delete: {
    index: "./public/index.html",
    css: "./public/style.css"
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
  gulp.parallel(
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

// Build Config
// Delete old build

const cleanHtml = () => {
  return del(paths.delete.index);
};
const cleanSass = () => {
  return del(paths.delete.css);
};

const buildHtml = () => {
  return gulp
    .src(paths.index.src)
    .pipe(
      htmlmin({
        collapseWhitespace: true
      })
    )
    .pipe(gulp.dest(paths.index.build));
};

const buildCss = () => {
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
};

gulp.task("clean", gulp.series(cleanHtml, cleanSass, sassConverter));

gulp.task("build", gulp.series("clean", gulp.parallel(buildHtml, buildCss)));
