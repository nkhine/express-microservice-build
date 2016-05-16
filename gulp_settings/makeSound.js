var through = require('through2');
sfx = require("sfx");
module.exports = {
  jshint: function(errorCb) {
    var jshint = function(file, encoding, callback) {
      if(!file.jshint.success) {
        sfx.hero();
        if (errorCb)
          errorCb();
      }
      callback();
    }; 

    return through.obj(jshint);
  },
  jscs: function(errorCb) {
    var jscs = function(file, encoding, callback) {
      if(!file.jscs.success) {
        sfx.hero();
        if (errorCb)
          errorCb();
      }
      callback();
    }; 

    return through.obj(jscs);
  }
}
