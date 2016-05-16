'use strict';

var gulp = require('gulp');

function initGulpBuilds(newTaskTolog) {
  gulp.paths = {
    src: './app',
    test: './app/test'
  };

  require('require-dir')('./gulp_settings');

  gulp.task('default', function () {
    console.log('Usage: gulp (server|unit|unit:watch|code-style|code-style:watch)');
    console.log('\tserver - run development server');
    console.log('\tunit [--tags feature]... - run unit tests once');
    console.log('\tunit:watch [--tags feature]... - run unit tests continuously (on every change)');
    console.log('\tcode-style [--tags file.js]... [--tags folder]... - run static code analyzer once');
    console.log('\tcode-style:watch [--tags file.js]... [--tags folder]... - continuously run static code analyzer ' +
        '(on every change)');
    console.log('\tjsdoc - run jsdoc generator')
    console.log('\tmigrate - run database migration')
    if (!!newTaskTolog) {
      newTaskTolog.forEach(function(item) {
        console.log(item)
      })
    }
  });

  // Aliases
  gulp.task('s', ['server']);
  gulp.task('u', ['unit']);
  gulp.task('uw', ['unit-watch']);
  gulp.task('cs', ['code-style']);
  gulp.task('csw', ['code-style:watch']);
  gulp.task('jsdoc', ['js-doc']);
  gulp.task('m', ['migrate']);
}

module.exports = initGulpBuilds;