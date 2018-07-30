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
    src: "./src/assets/jello.scs"
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
