var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('migrate', shell.task(['node ./app/migration']))
