var kit = require('node-kit');
var through2 = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
//var defaults = require('lodash.defaults');

module.exports = function (options) {

  function transform (file, enc, next) {
    var self = this;

    if (file.isNull()) {
      this.push(file); // pass along
      return next();
    }

    if (file.isStream()) {
      this.emit('error', new PluginError('gulp-kit', 'Streaming not supported'));
      return next();
    }

    //var str = file.contents.toString('utf8');


    try {
      var html = kit(file.path);
      file.contents = new Buffer(html);
      file.path = gutil.replaceExtension(file.path, '.html');
      self.push(file);
    } catch( e ) {
      self.emit('error', new PluginError('gulp-kit', e));
    }

    next();

    /*less.render(str, opts, function (err, css) {
      if (err) {

        // convert the keys so PluginError can read them
        err.lineNumber = err.line;
        err.fileName = err.filename;

        // add a better error message
        err.message = err.message + ' in file ' + err.fileName + ' line no. ' + err.lineNumber;

        self.emit('error', new PluginError('gulp-kit', err));
      } else {
        file.contents = new Buffer(css);
        file.path = gutil.replaceExtension(file.path, '.css');
        self.push(file);
      }
      next();
    });*/
  }

  return through2.obj(transform);
};
