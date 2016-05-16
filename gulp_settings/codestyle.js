'use strict';

var gulp = require('gulp'),
jscs = require('gulp-jscs'),
jshint = require('gulp-jshint'),
paths = gulp.paths,
util = require('gulp-util'),
sfx = require("sfx"),
makeSound = require('./makeSound'),
pathSrc;

var styleFailed;
var styleFailedLastTime;
function codeStyleFailure() {
  styleFailed = true;
}
function notifySuccess() {
  if (styleFailedLastTime && !styleFailed) {
    sfx.ping();
  }
  styleFailedLastTime = styleFailed;
  styleFailed = false;
}

gulp.task('jscs', function () {
  pathSrc = getPathFiles(util.env.tags);
  return gulp.src(pathSrc)
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(makeSound.jscs(codeStyleFailure))
});
 
gulp.task('jshint', function() {
  pathSrc = getPathFiles(util.env.tags);
  return gulp.src(pathSrc)
    .pipe(jshint())
    .pipe(jshint.reporter())
    .pipe(makeSound.jshint(codeStyleFailure))
    .on('end', notifySuccess)
});


gulp.task('code-style', ['jscs', 'jshint'], function () {
  if (styleFailedLastTime) {
    process.exit(1);
  }
});

gulp.task('code-style:watch', ['jscs', 'jshint'], function() {
    var pathSrc = getPathFiles(util.env.tags);
    gulp.watch(pathSrc, ['jscs', 'jshint']);
});

function getPathFiles(tag) {
  if(!tag) {
    return [paths.src + '/**/*.js', '!**/public/**', '!**/jsdoc.conf.js' ];
  }

  if(!tag.pop) {
    return [getCorrectPath(tag)];
  }

  var pathArr = [];
  for(var i = 0; i < tag.length; i++) {
    pathArr.push(getCorrectPath(tag[i]));
  }
  return pathArr;
}

function getCorrectPath(tag) {
  if(tag.slice(-3) === '.js') {
    return paths.src + '/**/' + tag;
  } else {
    return paths.src + '/**/' + tag + '/**/*.js';
  }
}