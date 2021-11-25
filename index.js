const kit = require('node-kit');
const through2 = require('through2');
const PluginError = gutil.PluginError;
const path = require('path');
const partialPrefix = '_';
const replaceExt = require('replace-ext');

function isPartial(filepath) {
  return path.basename(filepath)[0] === partialPrefix;
}

module.exports = function (options) {
  options = options || {};
	options.variables = options.variables || {};
	options.forbiddenPaths = options.forbiddenPaths || [];

  function transform (file, enc, next) {
    var self = this;

    if (file.isNull()) {
      this.push(file); // pass along
      return next();
    }

    if(isPartial(file.path) && !options.compilePartials) {
      return next();
    }

    if (file.isStream()) {
      this.emit('error', new PluginError('gulp-kit', 'Streaming not supported'));
      return next();
    }

    try {
      const html = new kit.Kit(file.path, options.variables, options.forbiddenPaths.slice()).toString();
      file.contents = new Buffer.from(html);
			file.path = (options.fileExtension) ? replaceExt(file.path, options.fileExtension) : replaceExt(file.path, '.html');
      self.push(file);
    } catch( e ) {
      self.emit('error', new PluginError('gulp-kit', e));
      self.emit('end');
    }

    next();
  }

  return through2.obj(transform);
};
