var gulp = require('gulp');
var gls = require('gulp-live-server');
var paths = gulp.paths;

gulp.task('server', function() {
    //1. run your script as a server 
    var server = gls.new(paths.src + '/app.js');
    server.start();
    gulp.watch(paths.src + '/**.*.js', function() {
      server.start.bind(server)()
    });
});