# gulp-kit
Integrates [`node-kit`](https://github.com/jeremyworboys/node-kit) 
with [`gulp`](http://gulpjs.com/) to compile 
[`.kit`](http://incident57.com/codekit/help.html#kit) templates 
with your own build system.

[![NPM version](https://badge.fury.io/js/gulp-kit.svg)](http://badge.fury.io/js/gulp-kit)

## Usage
    
    var kit = require('gulp-kit');

    gulp.task('default', function(){
        return gulp.src('src/kit/*.kit')
        .pipe(kit())
        .pipe(gulp.dest('dest/'));
    });

## Options
You can turn off the default behaviour of
ignoring attempts to compile partials by 
passing `{compilePartials : true}` to the
plugin.

      // ... as above
      .pipe( kit({compilePartials : true}) )
      // ... further pipes, as above
    
You can also pass through any user-defined CodeKit variables by passing
`{ variables: { key: value, key: value, etc. }}` to the plugin.

      // ... as above
      .pipe( kit({			
          variables: {
				"$uiVer": pkg.version,
				"$bsVer": "3.1"
		}}) )
      // ... further pipes, as above
