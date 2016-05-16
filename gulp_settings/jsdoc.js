var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('js-doc', shell.task(['./node_modules/jsdoc/jsdoc.js -c ./node_modules/express-microservice-build/jsdoc.conf.js -r -d jsdoc']))
