var gulp = require('gulp'),
  mocha = require('gulp-mocha'),
  paths = gulp.paths,
  istanbul = require('gulp-istanbul'),
  util = require('gulp-util'),
  sfx = require("sfx");

gulp.task('pre-coverage', function () {
  return gulp.src([paths.src + '/**/*.js', '!**/public**', '!**/jsdoc.conf.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('pre-test', function () {
  return gulp.src([paths.src + '/**/*.js', '!**/public**', '!**/jsdoc.conf.js']);
});

gulp.task('coverage', ['pre-coverage'], function () {
  pathSrc = getPathFiles(util.env.tags);
  return gulp.src(pathSrc, {read: false})
    .pipe(mocha({timeout: 15000}))
    .pipe(istanbul.writeReports())
    .once('end', function () {
      process.exit();
    });

});

gulp.task('unit', ['pre-test'], function () {
  pathSrc = getPathFiles(util.env.tags);
  return gulp.src(pathSrc, {read: false})
    .pipe(mocha({timeout: 15000}))
    .once('end', function () {
      process.exit();
    });

});

gulp.task('unit-watch', function() {
  var error = false;
  var lastError = false;
  function handleError(err) {
    sfx.blow();
    this.emit('end');
    error = true;
  }
  function handleEnd() {
    if (lastError && !error) {
      sfx.ping();
    }
    lastError = error;
    error = false;
  }
  pathSrc = getPathFiles(util.env.tags);
  gulp.src(pathSrc, {read: false})
    .pipe(mocha({timeout: 15000}))
    .on("error", handleError)
    .on("end", handleEnd);
  gulp.watch(paths.src + '/**/*.js', function () {
    return gulp.src(pathSrc, {read: false})
      .pipe(mocha({timeout: 15000}))
      .on("error", handleError)
      .on("end", handleEnd);
  });
});

function getPathFiles(tag) {
  if(!tag) {
    return [paths.src + '/**/*.spec.js'];
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